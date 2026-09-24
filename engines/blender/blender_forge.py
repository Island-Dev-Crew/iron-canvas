"""Iron Canvas · Blender Forge — runs INSIDE Blender, headless.

    blender --background --factory-startup --python blender_forge.py -- --job job.json --out <dir>

Jobs (job.json "type"):
  selftest     cube → one Workbench frame + a GLB. Proves the install end to end in seconds.
  clay-camera  THE TWIN CAMERA. A grey, flat-shaded clay render of a camera move along rail stations,
               for Seedance 2.5 reference-to-video. The same stations drive the site's WebGL rail, so
               film and site match shot for shot. No gizmos, grids, outlines, or frame counters —
               they come back in the generation as objects.
  hero-object  a seeded procedural sculpt (form code can't cheaply make), GLB (Draco when available),
               stats, and a 4-view turntable the critic can diff.
  turntable    N frames of the hero rotating, for scroll-scrubbed frame sequences.
  matcap       one studio-lit sphere rendered square: the page's single light, as a matcap texture.

Every job writes <out>/result.json (files, params, seed, blender version) for the ledger. Colors arrive
as role tokens resolved to RGB by the caller; nothing is baked to an unexplained hex.
"""
import json
import math
import random
import sys
from pathlib import Path

import bpy  # noqa: E402 — only importable inside Blender

ARGV = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []


def arg(name, default=None):
    return ARGV[ARGV.index(name) + 1] if name in ARGV and ARGV.index(name) + 1 < len(ARGV) else default


JOB = json.loads(Path(arg("--job")).read_text(encoding="utf-8"))
OUT = Path(arg("--out", "."))
OUT.mkdir(parents=True, exist_ok=True)
SEED = int(JOB.get("seed", 5417))
RND = random.Random(SEED)
FILES = []


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    return scene


def rgb(value, fallback=(0.88, 0.73, 0.43)):
    if isinstance(value, (list, tuple)) and len(value) >= 3:
        return tuple(float(c) for c in value[:3])
    if isinstance(value, str) and value.startswith("#") and len(value) == 7:
        return tuple(int(value[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return fallback


def material(name, base, emission=None, strength=0.0, roughness=0.45, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission is not None:
        # Blender 4.x names the socket "Emission Color"; 3.x "Emission".
        sock = bsdf.inputs.get("Emission Color") or bsdf.inputs.get("Emission")
        sock.default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def workbench(scene, clay=True):
    scene.render.engine = "BLENDER_WORKBENCH"
    shading = scene.display.shading
    shading.light = "STUDIO"
    shading.color_type = "SINGLE" if clay else "MATERIAL"
    if clay:
        shading.single_color = (0.62, 0.62, 0.62)
    shading.show_cavity = False
    shading.show_object_outline = False
    shading.show_specular_highlight = not clay
    scene.display.render_aa = "8"
    world = bpy.data.worlds.new("clay-world") if not scene.world else scene.world
    scene.world = world
    world.color = (0.18, 0.18, 0.18)


def camera(scene, fov_deg=40.0):
    cam_data = bpy.data.cameras.new("Camera")
    cam_data.angle = math.radians(fov_deg)
    cam = bpy.data.objects.new("Camera", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    target = bpy.data.objects.new("Target", None)
    scene.collection.objects.link(target)
    track = cam.constraints.new("TRACK_TO")
    track.target = target
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"
    return cam, target


def web_to_blender(p):
    """three.js (x, y-up, z-toward-viewer) → Blender (x, z-up, -y forward)."""
    x, y, z = (float(v) for v in p)
    return (x, -z, y)


def keyframe_interpolation(kind):
    # Set before keying — version-safe across Blender 3.x–5.x (slotted actions changed fcurve access in 4.4+).
    bpy.context.preferences.edit.keyframe_new_interpolation_type = kind


def render_frames(scene, subdir, start, end):
    folder = OUT / subdir
    folder.mkdir(parents=True, exist_ok=True)
    scene.render.image_settings.file_format = "PNG"
    scene.frame_start, scene.frame_end = start, end
    scene.render.filepath = str(folder / "frame_")
    bpy.ops.render.render(animation=True)
    frames = sorted(folder.glob("frame_*.png"))
    FILES.extend(str(f) for f in frames)
    return folder, len(frames)


def export_glb(path, draco=True):
    kwargs = dict(filepath=str(path), export_format="GLB", export_apply=True, export_materials="EXPORT")
    try:
        bpy.ops.export_scene.gltf(**kwargs, export_draco_mesh_compression_enable=draco)
    except TypeError:
        bpy.ops.export_scene.gltf(**kwargs)
    FILES.append(str(path))


# ─────────────────────────────── jobs ───────────────────────────────

def job_selftest():
    scene = reset()
    scene.render.resolution_x, scene.render.resolution_y = 320, 180
    workbench(scene)
    bpy.ops.mesh.primitive_cube_add(size=1.2)
    cam, target = camera(scene)
    cam.location = (3.0, -3.0, 2.2)
    render_frames(scene, "selftest", 1, 1)
    export_glb(OUT / "selftest.glb", draco=False)


def job_clay_camera():
    """Rail stations: [{"t": 0..1, "position": [x,y,z], "target": [x,y,z], "fov": 40}], web coordinates."""
    scene = reset()
    w, h = JOB.get("resolution", [1280, 720])
    scene.render.resolution_x, scene.render.resolution_y = int(w), int(h)
    fps = int(JOB.get("fps", 24))
    seconds = float(JOB.get("seconds", 4))
    scene.render.fps = fps
    workbench(scene, clay=True)
    # Blocking: grey primitives standing in for the scene's masses (never textured, never outlined).
    blocks = []
    for block in JOB.get("blocking", []):
        rep = block.get("repeat", {"count": 1, "step": [0, 0, 0]})
        for n in range(int(rep.get("count", 1))):
            p0, st = block.get("position", [0, 0, 0]), rep.get("step", [0, 0, 0])
            blocks.append({**block, "position": [p0[i] + st[i] * n for i in range(3)]})
    for block in blocks:
        kind = block.get("kind", "cube")
        loc = web_to_blender(block.get("position", [0, 0, 0]))
        size = block.get("size", [1, 1, 1])
        if kind == "sphere":
            bpy.ops.mesh.primitive_uv_sphere_add(radius=size[0] / 2, location=loc, segments=48, ring_count=24)
        elif kind == "cylinder":
            bpy.ops.mesh.primitive_cylinder_add(radius=size[0] / 2, depth=size[1], location=loc, vertices=48)
        elif kind == "plane":
            bpy.ops.mesh.primitive_plane_add(size=size[0], location=loc)
        else:
            bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
            bpy.context.active_object.scale = (size[0], size[2], size[1])
    if not JOB.get("blocking"):
        bpy.ops.mesh.primitive_plane_add(size=80, location=(0, 0, -2.5))
    cam, target = camera(scene, JOB.get("stations", [{}])[0].get("fov", 40))
    keyframe_interpolation("BEZIER")  # eased dolly between stations, like the WebGL rail
    stations = sorted(JOB.get("stations", []), key=lambda s: s.get("t", 0))
    if len(stations) < 2:
        raise SystemExit("clay-camera needs at least 2 rail stations")
    last = max(1, round(seconds * fps))
    for st in stations:
        frame = 1 + round(float(st.get("t", 0)) * (last - 1))
        cam.location = web_to_blender(st["position"])
        cam.keyframe_insert("location", frame=frame)
        target.location = web_to_blender(st.get("target", [0, 0, 0]))
        target.keyframe_insert("location", frame=frame)
        cam.data.angle = math.radians(float(st.get("fov", 40)))
        cam.data.keyframe_insert("lens", frame=frame)
    render_frames(scene, "clay-frames", 1, last)
    (OUT / "camera-rail.json").write_text(json.dumps({"schema": "ic-camera-rail/1", "space": "three.js", "fps": fps, "seconds": seconds, "stations": stations}, indent=2), encoding="utf-8")
    FILES.append(str(OUT / "camera-rail.json"))


def job_hero_object():
    scene = reset()
    s = JOB.get("size", 2.0)
    detail = int(JOB.get("detail", 5))
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=min(max(detail, 2), 7), radius=s / 2)
    hero = bpy.context.active_object
    hero.name = "Hero"
    tex = bpy.data.textures.new("hero-noise", type="VORONOI")
    tex.noise_scale = float(JOB.get("facet", 0.55))
    disp = hero.modifiers.new("facets", "DISPLACE")
    disp.texture = tex
    disp.strength = float(JOB.get("strength", 0.35)) * s
    disp.texture_coords = "OBJECT"
    empty = bpy.data.objects.new("seed-offset", None)
    scene.collection.objects.link(empty)
    empty.location = (RND.uniform(-50, 50), RND.uniform(-50, 50), RND.uniform(-50, 50))
    disp.texture_coords_object = empty
    hero.modifiers.new("bevel", "BEVEL").width = 0.012 * s
    hero.data.materials.append(material("hero", rgb(JOB.get("base")), rgb(JOB.get("emission"), None) if JOB.get("emission") else None,
                                        float(JOB.get("emission_strength", 0.0)), float(JOB.get("roughness", 0.32)), float(JOB.get("metallic", 0.85))))
    bpy.ops.object.select_all(action="DESELECT")
    hero.select_set(True)
    bpy.context.view_layer.objects.active = hero
    for mod in list(hero.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(empty)
    export_glb(OUT / f"{JOB.get('name', 'hero')}.glb", draco=JOB.get("draco", True))
    tris = sum(len(p.vertices) - 2 for p in hero.data.polygons)
    (OUT / f"{JOB.get('name', 'hero')}.stats.json").write_text(json.dumps({"triangles": tris, "materials": len(hero.data.materials)}), encoding="utf-8")
    scene.render.resolution_x = scene.render.resolution_y = 768
    workbench(scene, clay=False)
    cam, target = camera(scene, 32)
    for i, angle in enumerate((0, 90, 180, 270)):
        a = math.radians(angle)
        cam.location = (math.sin(a) * s * 2.6, -math.cos(a) * s * 2.6, s * 0.7)
        scene.render.filepath = str(OUT / "turntable" / f"view_{i}.png")
        bpy.ops.render.render(write_still=True)
        FILES.append(scene.render.filepath)


def job_turntable():
    scene = reset()
    src = JOB.get("glb")
    if src:
        bpy.ops.import_scene.gltf(filepath=src)
    else:
        bpy.ops.mesh.primitive_monkey_add()
    pivot = bpy.data.objects.new("pivot", None)
    scene.collection.objects.link(pivot)
    for obj in [o for o in scene.objects if o.type == "MESH"]:
        obj.parent = pivot
    frames = int(JOB.get("frames", 96))
    w, h = JOB.get("resolution", [1920, 1080])
    scene.render.resolution_x, scene.render.resolution_y = int(w), int(h)
    workbench(scene, clay=False)
    keyframe_interpolation("LINEAR")  # constant angular speed: frame N maps to scroll N
    pivot.rotation_euler = (0, 0, 0)
    pivot.keyframe_insert("rotation_euler", frame=1)
    pivot.rotation_euler = (0, 0, math.radians(360 * frames / (frames + 1)))
    pivot.keyframe_insert("rotation_euler", frame=frames)
    cam, target = camera(scene, 30)
    cam.location = (0, -6.5, 1.6)
    render_frames(scene, "turntable-frames", 1, frames)


def job_matcap():
    scene = reset()
    scene.render.resolution_x = scene.render.resolution_y = int(JOB.get("size", 512))
    scene.render.engine = "CYCLES"
    scene.cycles.samples = int(JOB.get("samples", 96))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=96, ring_count=48)
    bpy.ops.object.shade_smooth()
    sphere = bpy.context.active_object
    sphere.data.materials.append(material("matcap", rgb(JOB.get("base")), None, 0.0, float(JOB.get("roughness", 0.35)), float(JOB.get("metallic", 0.9))))
    key = bpy.data.lights.new("key", "AREA")
    key.energy = float(JOB.get("key_energy", 450))
    key.size = 3
    light = bpy.data.objects.new("key", key)
    scene.collection.objects.link(light)
    # One light for the whole page: the Tier I shadow angle, expressed as an azimuth/elevation.
    az, el = math.radians(JOB.get("azimuth", -35)), math.radians(JOB.get("elevation", 50))
    light.location = (math.sin(az) * 5 * math.cos(el), -math.cos(az) * 5 * math.cos(el), 5 * math.sin(el))
    light.rotation_euler = (math.radians(90) - el, 0, az)
    cam_data = bpy.data.cameras.new("ortho")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = 2.0
    cam = bpy.data.objects.new("cam", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    cam.location = (0, -5, 0)
    cam.rotation_euler = (math.radians(90), 0, 0)
    scene.world = bpy.data.worlds.new("matcap-world")
    scene.world.color = rgb(JOB.get("ambient"), (0.02, 0.018, 0.015))
    scene.render.filepath = str(OUT / f"{JOB.get('name', 'matcap')}.png")
    bpy.ops.render.render(write_still=True)
    FILES.append(scene.render.filepath)


JOBS = {"selftest": job_selftest, "clay-camera": job_clay_camera, "hero-object": job_hero_object, "turntable": job_turntable, "matcap": job_matcap}

if __name__ == "__main__":
    kind = JOB.get("type")
    if kind not in JOBS:
        raise SystemExit(f"unknown job type {kind!r}; expected one of {sorted(JOBS)}")
    JOBS[kind]()
    (OUT / "result.json").write_text(json.dumps({
        "schema": "ic-blender-result/1", "type": kind, "seed": SEED, "blender": bpy.app.version_string,
        "params": JOB, "files": FILES,
    }, indent=2), encoding="utf-8")
    print(f"[blender-forge] {kind} → {len(FILES)} file(s) in {OUT}")
