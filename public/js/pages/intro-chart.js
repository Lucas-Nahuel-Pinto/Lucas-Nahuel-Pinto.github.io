/**
 * Intro scene: 3D pie menu built with three.js.
 *
 * Sectors are menu entries; hovering/selecting one stretches it upward and
 * shows its label, clicking navigates. Side arrows, arrow keys and the
 * mouse wheel rotate the chart.
 */

import * as THREE from '/assets/vendor/three.module.min.js';
import { navigateWithTransition } from '/js/lib/transitions.js';

const canvas = document.getElementById('chart');
const labelEl = document.getElementById('chart-label');
const labelTextEl = document.getElementById('chart-label-text');

// Menu data: center + 3 outer segments (Chrome-style palette)
const MENU = [
  {
    id: 'about',
    kind: 'center',
    label: 'About Me',
    href: 'about.html',
    color: 0x0059bf, // white (About Me)
    css: '#ffffff',
    sr: 'sr-about'
  },
  {
    id: 'p1',
    kind: 'segment',
    label: 'Harness Manager',
    href: 'proyectos.html#harness-manager',
    color: 0xff3355, // neon red
    css: '#ffffff',
    sr: 'sr-p1',
    center: 90
  },
  {
    id: 'p2',
    kind: 'segment',
    label: 'QA Checklist',
    href: 'proyectos.html#qa-flow-checklists',
    color: 0xffe600, // neon yellow
    css: '#ffffff',
    sr: 'sr-p2',
    center: -30
  },
  {
    id: 'p3',
    kind: 'segment',
    label: 'Jira Traceability Manager',
    href: 'proyectos.html#jira-traceability',
    color: 0x2bff88, // neon green
    css: '#ffffff',
    sr: 'sr-p3',
    center: 210
  }
];

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch (err) {
  document.body.classList.add('no-webgl');
}

if (renderer) {
  init(renderer);
}

function init(renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearAlpha(0);
  // Soft shadows: the chart drops a shadow onto an invisible floor so it
  // reads as resting on the desk painted in the background image.
  // (r186 removed PCFSoftShadowMap; PCFShadowMap + radius gives the blur.)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  // Camera at the previous 3/4 angle, aimed at the chart's mid-height
  // so it reads centered on screen (arrows align with its center).
  camera.position.set(5.5, 5.5, 7);
  camera.lookAt(0, 2.4, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  // Almost overhead but biased toward the camera, so the shading on the
  // front faces stays nice (the shadow itself comes from the back light).
  key.position.set(1.5, 9, 4);
  scene.add(key);
  // Back light: casts the shadow toward the viewer so the pool of shade
  // lands on the desk in front of the chart where it is visible.
  const sun = new THREE.DirectionalLight(0xffffff, 0.6);
  sun.position.set(-4, 7, -8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -5;
  sun.shadow.camera.right = 5;
  sun.shadow.camera.top = 5;
  sun.shadow.camera.bottom = -5;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 5; // soft penumbra
  sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xaaccff, 0.5);
  fill.position.set(-4, -2, 3);
  scene.add(fill);

  // Ceiling-lamp light source: warm spot hanging above the chart
  const lamp = new THREE.SpotLight(0xfff2d8, 26, 0, 0.7, 0.7, 2);
  lamp.position.set(0, 4.6, 2.6);
  lamp.target.position.set(0, 0, 0);
  scene.add(lamp);
  scene.add(lamp.target);

  const group = new THREE.Group();
  // The canvas is 136% of the wrap (hover headroom); scale the scene so
  // the chart keeps exactly the same on-screen size and position.
  group.scale.setScalar(1 / 1.26);
  // Chart STANDING vertically on the ground (bottom edge at y=0). With
  // rotation.x = -π/2 the disc plane becomes vertical; local +z (the STRETCH
  // axis) maps to world +y, so hovered sectors stretch UPWARD from the floor.
  const BASE_TILT = -Math.PI / 2;
  group.rotation.x = BASE_TILT;
  group.position.y = 2.0; // R_OUT ≈ 2.0 -> bottom of the disc rests on y=0
  scene.add(group);

  const DEG = Math.PI / 180;
  const R_OUT = 2.0; // outer radius of colored ring
  const R_IN = 1.16; // inner radius of colored ring
  const WHITE_IN = 0.94; // white ring inner radius
  const WHITE_OUT = 1.2; // white ring outer (tucked under the colored ring)
  const BLUE_R = 0.9; // center disc radius
  const DEPTH = 0.7; // extrusion depth: sections extrude upward from the pie base
  // Bevels grow each sector by bevelSize on every side, so the real gap
  // at the inner radius must stay wider than 2 * bevelSize: otherwise
  // neighbouring sectors intersect (visible overlap at the seams).
  const GAP = 2.8 * DEG;

  function sectorShape(ri, ro, a1, a2) {
    const s = new THREE.Shape();
    s.moveTo(Math.cos(a1) * ro, Math.sin(a1) * ro);
    s.absarc(0, 0, ro, a1, a2, false);
    s.lineTo(Math.cos(a2) * ri, Math.sin(a2) * ri);
    s.absarc(0, 0, ri, a2, a1, true);
    s.closePath();
    return s;
  }

  const extrude = {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 64
  };

  const meshes = [];

  // 3 outer segments (interactive)
  MENU.filter((m) => m.kind === 'segment').forEach((m) => {
    const a1 = (m.center - 60) * DEG + GAP / 2;
    const a2 = (m.center + 60) * DEG - GAP / 2;
    const geo = new THREE.ExtrudeGeometry(sectorShape(R_IN, R_OUT, a1, a2), extrude);
    const mat = new THREE.MeshStandardMaterial({
      color: m.color,
      roughness: 1,
      metalness: 0.04
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { entry: m, baseEmissive: 0.2 }; // neon glow at rest
    group.add(mesh);
    meshes.push(mesh);
  });

  // White ring (decorative) — slightly shallower than the colored ring so
  // its top face never sits coplanar with the sectors (avoids z-fighting)
  const ringGeo = new THREE.ExtrudeGeometry(
    sectorShape(WHITE_IN, WHITE_OUT, 0, Math.PI * 2),
    { ...extrude, depth: DEPTH - 0.07 }
  );
  group.add(
    new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0x0a2a55, roughness: 0.5 }))
  );

  // Center disc (interactive)
  const centerEntry = MENU.find((m) => m.kind === 'center');
  const CENTER_H = DEPTH * 1.6; // center is taller but shares the sections' base plane
  const blueGeo = new THREE.CylinderGeometry(BLUE_R, BLUE_R, CENTER_H, 64);
  // CylinderGeometry's axis is +Y; rotate 90deg so the axis becomes local +Z,
  // which the standing group maps to world +Y -> the center extrudes upward.
  blueGeo.rotateX(Math.PI / 2);
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x0059bf,
    roughness: 0.55,
    metalness: 0.08,
    emissive: centerEntry.color,
    emissiveIntensity: 0
  });
  const blueMesh = new THREE.Mesh(blueGeo, blueMat);
  // Cylinder geometry is centered on its own origin, so lift it by half its
  // height: its base now sits at local z=0, exactly like the sections.
  // Same base plane, same upward face as the rest of the chart.
  blueMesh.position.z = CENTER_H / 2;
  blueMesh.userData = { entry: centerEntry, baseEmissive: 0.2 };
  group.add(blueMesh);
  meshes.push(blueMesh);

  // ---------- Shadows ----------
  // Every chart piece casts; an invisible plane catches the shadow so the
  // chart reads as resting on the desk painted in the background image.
  group.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });

  // The floor sits exactly at the chart's lowest point (computed from the
  // real bounding box, so it follows any future geometry changes).
  group.updateMatrixWorld(true);
  const baseY = new THREE.Box3().setFromObject(group).min.y;
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.62, color: 0x00040c })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = baseY + 0.02;
  floor.receiveShadow = true;
  scene.add(floor);

  // ---------- Interaction state ----------
  let hovered = null; // mesh under the pointer (mouse)

  // Sectors that present a "clickable" hand cursor on hover.
  // Keep in sync with MENU entries that are meant to read as links.
  const POINTER_HOVER_IDS = new Set(['about', 'p1', 'p2', 'p3']);
  let selected = null; // mesh tapped (touch)
  let focused = null; // mesh whose sr link has keyboard focus

  function activeMesh() {
    return hovered || focused || selected;
  }

  function updateLabel() {
    const mesh = activeMesh();
    if (mesh) {
      labelTextEl.textContent = mesh.userData.entry.label;
      labelEl.style.color = mesh.userData.entry.css;
      labelEl.classList.add('is-visible');
    } else {
      labelEl.classList.remove('is-visible');
    }
  }

  // The "About Me" label follows the ES/EN switch (product names stay).
  function applyChartLang(lang) {
    const about = MENU.find((m) => m.id === 'about');
    if (about) about.label = lang === 'en' ? 'About Me' : 'Sobre mí';
    if (labelEl.classList.contains('is-visible')) updateLabel();
  }
  applyChartLang(document.documentElement.lang || 'es');
  window.addEventListener('langchange', (e) => applyChartLang(e.detail.lang));

  function act(mesh) {
    const href = mesh.userData.entry.href;
    // Same exit flow as link clicks (veil or the About dive), so canvas
    // navigation never skips the page transition.
    if (href && href !== '#') navigateWithTransition(href);
  }

  // ---------- Pointer (mouse hover + touch 2-tap) ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(meshes, false);
    return hits.length ? hits[0].object : null;
  }

  function updateHoverCursor(hit) {
    // Hand cursor only over the sections that are meant to read as links.
    canvas.style.cursor = hit && POINTER_HOVER_IDS.has(hit.userData.entry.id) ? 'pointer' : 'default';
  }

  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const hit = pick(e.clientX, e.clientY);
    if (hit !== hovered) {
      hovered = hit;
      updateLabel();
    }
    updateHoverCursor(hit);
  });

  canvas.addEventListener('pointerleave', () => {
    if (hovered) {
      hovered = null;
      updateLabel();
    }
    updateHoverCursor(null);
  });

  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'mouse') {
      const hit = pick(e.clientX, e.clientY);
      if (hit) act(hit);
      return;
    }
    // Touch: first tap selects (stretches + shows name), second tap navigates
    const hit = pick(e.clientX, e.clientY);
    if (!hit) {
      selected = null;
    } else if (selected !== hit) {
      selected = hit;
    } else {
      act(hit);
    }
    updateLabel();
  });

  // ---------- Keyboard: sr links drive the 3D highlight ----------
  MENU.forEach((m) => {
    const el = document.getElementById(m.sr);
    const mesh = meshes.find((x) => x.userData.entry === m);
    el.addEventListener('focus', () => {
      focused = mesh;
      updateLabel();
    });
    el.addEventListener('blur', () => {
      if (focused === mesh) focused = null;
      updateLabel();
    });
  });

  // ---------- Scroll / arrow keys / side arrows: rotate the menu ----------
  const MENU_STEP = (Math.PI * 2) / 3; // one sector position per click
  // Camera sits at (5.5, 4.5, 5.5): horizontal direction +X/+Z (45deg).
  // A sector with local center angle C points at world angle C+z, so
  // z = -45deg - C puts it exactly in front of the user.
  const FACE_USER = -Math.PI / 4;

  // Start with the first sector exactly facing the user.
  const firstSegment = MENU.find((m) => m.kind === 'segment');
  let targetZ = FACE_USER - firstSegment.center * DEG;
  group.rotation.z = targetZ;

  // Traversal order: the center (About Me) is part of the arrow list too.
  const NAV_ORDER = ['about', 'p1', 'p2', 'p3'];
  let navIdx = 1; // first segment is in front at load

  // One click = one position, endlessly, in the requested direction.
  function rotateMenu(dir) {
    navIdx = (navIdx + dir + NAV_ORDER.length) % NAV_ORDER.length;
    const entry = MENU.find((m) => m.id === NAV_ORDER[navIdx]) || null;
    if (entry && entry.kind === 'segment') {
      targetZ += dir * MENU_STEP;
    }
    const mesh = entry ? meshes.find((m) => m.userData.entry === entry) : null;
    if (mesh) {
      hovered = mesh;
      updateLabel();
    }
  }

  document.querySelector('.chart-arrow--left').addEventListener('click', () => {
    rotateMenu(-1);
  });
  document.querySelector('.chart-arrow--right').addEventListener('click', () => {
    rotateMenu(1);
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetZ += e.deltaY * 0.005;
  }, { passive: false });

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); rotateMenu(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); rotateMenu(-1); }
  });

  // ---------- Resize ----------
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---------- Animation loop ----------
  const STRETCH = 0.25; // hovered sector stretches along local z (= world Y when standing) instead of lifting
  function tick() {
    // group.rotation.x stays at BASE_TILT (kept for 3D appreciation).
    // Ease the chart toward the rotation that faces the active sector.
    group.rotation.z += (targetZ - group.rotation.z) * 0.18;

    const active = activeMesh();
    meshes.forEach((mesh) => {
      const on = mesh === active;
      // Grow ONLY along local z (world up): the section extrudes upward,
      // never widens sideways.
      mesh.scale.z += ((on ? 1 + STRETCH : 1) - mesh.scale.z) * 0.16;
      mesh.material.emissive.setHex(mesh.userData.entry.color);
      const base = mesh.userData.baseEmissive || 0;
      mesh.material.emissiveIntensity = on ? base + 0.35 : base;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}
