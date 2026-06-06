import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./js/getStarfield.js";
import { getFresnelMat } from "./js/getFresnelMat.js";

// ════════════════════════════════════════════════════════════════
//  CITY DATA
// ════════════════════════════════════════════════════════════════
const CITIES = [
  { name: "New York City",    lat: 40.71,  lon: -74.01,  country: "USA" },
  { name: "Los Angeles",      lat: 34.05,  lon: -118.24, country: "USA" },
  { name: "Chicago",          lat: 41.88,  lon: -87.63,  country: "USA" },
  { name: "Houston",          lat: 29.76,  lon: -95.37,  country: "USA" },
  { name: "Phoenix",          lat: 33.45,  lon: -112.07, country: "USA" },
  { name: "San Francisco",    lat: 37.77,  lon: -122.42, country: "USA" },
  { name: "Denver",           lat: 39.74,  lon: -104.98, country: "USA" },
  { name: "Miami",            lat: 25.76,  lon: -80.19,  country: "USA" },
  { name: "Seattle",          lat: 47.61,  lon: -122.33, country: "USA" },
  { name: "Mexico City",      lat: 19.43,  lon: -99.13,  country: "Mexico" },
  { name: "Toronto",          lat: 43.65,  lon: -79.38,  country: "Canada" },
  { name: "Vancouver",        lat: 49.28,  lon: -123.12, country: "Canada" },
  { name: "Montreal",         lat: 45.50,  lon: -73.57,  country: "Canada" },
  { name: "London",           lat: 51.51,  lon: -0.13,   country: "UK" },
  { name: "Paris",            lat: 48.86,  lon: 2.35,    country: "France" },
  { name: "Berlin",           lat: 52.52,  lon: 13.41,   country: "Germany" },
  { name: "Madrid",           lat: 40.42,  lon: -3.70,   country: "Spain" },
  { name: "Barcelona",        lat: 41.39,  lon: 2.15,    country: "Spain" },
  { name: "Rome",             lat: 41.90,  lon: 12.50,   country: "Italy" },
  { name: "Milan",            lat: 45.46,  lon: 9.19,    country: "Italy" },
  { name: "Amsterdam",        lat: 52.37,  lon: 4.90,    country: "Netherlands" },
  { name: "Brussels",         lat: 50.85,  lon: 4.35,    country: "Belgium" },
  { name: "Lisbon",           lat: 38.72,  lon: -9.14,   country: "Portugal" },
  { name: "Stockholm",        lat: 59.33,  lon: 18.07,   country: "Sweden" },
  { name: "Oslo",             lat: 59.91,  lon: 10.75,   country: "Norway" },
  { name: "Copenhagen",       lat: 55.68,  lon: 12.57,   country: "Denmark" },
  { name: "Athens",           lat: 37.98,  lon: 23.73,   country: "Greece" },
  { name: "Istanbul",         lat: 41.01,  lon: 28.95,   country: "Turkey" },
  { name: "Warsaw",           lat: 52.23,  lon: 21.01,   country: "Poland" },
  { name: "Vienna",           lat: 48.21,  lon: 16.37,   country: "Austria" },
  { name: "Zurich",           lat: 47.38,  lon: 8.54,    country: "Switzerland" },
  { name: "Moscow",           lat: 55.75,  lon: 37.62,   country: "Russia" },
  { name: "St. Petersburg",   lat: 59.95,  lon: 30.32,   country: "Russia" },
  { name: "Cairo",            lat: 30.04,  lon: 31.24,   country: "Egypt" },
  { name: "Lagos",            lat: 6.52,   lon: 3.38,    country: "Nigeria" },
  { name: "Nairobi",          lat: -1.29,  lon: 36.82,   country: "Kenya" },
  { name: "Johannesburg",     lat: -26.20, lon: 28.04,   country: "S. Africa" },
  { name: "Cape Town",        lat: -33.93, lon: 18.42,   country: "S. Africa" },
  { name: "Casablanca",       lat: 33.59,  lon: -7.62,   country: "Morocco" },
  { name: "Addis Ababa",      lat: 9.03,   lon: 38.74,   country: "Ethiopia" },
  { name: "Accra",            lat: 5.60,   lon: -0.19,   country: "Ghana" },
  { name: "Dubai",            lat: 25.20,  lon: 55.27,   country: "UAE" },
  { name: "Riyadh",           lat: 24.69,  lon: 46.72,   country: "Saudi Arabia" },
  { name: "Tehran",           lat: 35.69,  lon: 51.39,   country: "Iran" },
  { name: "Mumbai",           lat: 19.08,  lon: 72.88,   country: "India" },
  { name: "New Delhi",        lat: 28.61,  lon: 77.21,   country: "India" },
  { name: "Bangalore",        lat: 12.97,  lon: 77.59,   country: "India" },
  { name: "Kolkata",          lat: 22.57,  lon: 88.36,   country: "India" },
  { name: "Karachi",          lat: 24.86,  lon: 67.01,   country: "Pakistan" },
  { name: "Dhaka",            lat: 23.81,  lon: 90.41,   country: "Bangladesh" },
  { name: "Beijing",          lat: 39.91,  lon: 116.39,  country: "China" },
  { name: "Shanghai",         lat: 31.23,  lon: 121.47,  country: "China" },
  { name: "Guangzhou",        lat: 23.13,  lon: 113.26,  country: "China" },
  { name: "Hong Kong",        lat: 22.32,  lon: 114.17,  country: "China" },
  { name: "Chengdu",          lat: 30.57,  lon: 104.07,  country: "China" },
  { name: "Tokyo",            lat: 35.69,  lon: 139.69,  country: "Japan" },
  { name: "Osaka",            lat: 34.69,  lon: 135.50,  country: "Japan" },
  { name: "Seoul",            lat: 37.57,  lon: 126.98,  country: "S. Korea" },
  { name: "Bangkok",          lat: 13.75,  lon: 100.50,  country: "Thailand" },
  { name: "Ho Chi Minh City", lat: 10.82,  lon: 106.63,  country: "Vietnam" },
  { name: "Hanoi",            lat: 21.03,  lon: 105.85,  country: "Vietnam" },
  { name: "Singapore",        lat: 1.35,   lon: 103.82,  country: "Singapore" },
  { name: "Jakarta",          lat: -6.21,  lon: 106.85,  country: "Indonesia" },
  { name: "Manila",           lat: 14.60,  lon: 120.98,  country: "Philippines" },
  { name: "Kuala Lumpur",     lat: 3.14,   lon: 101.69,  country: "Malaysia" },
  { name: "Kathmandu",        lat: 27.72,  lon: 85.32,   country: "Nepal" },
  { name: "Sydney",           lat: -33.87, lon: 151.21,  country: "Australia" },
  { name: "Melbourne",        lat: -37.81, lon: 144.96,  country: "Australia" },
  { name: "Brisbane",         lat: -27.47, lon: 153.03,  country: "Australia" },
  { name: "Auckland",         lat: -36.87, lon: 174.77,  country: "N. Zealand" },
  { name: "Sao Paulo",        lat: -23.55, lon: -46.63,  country: "Brazil" },
  { name: "Rio de Janeiro",   lat: -22.91, lon: -43.17,  country: "Brazil" },
  { name: "Buenos Aires",     lat: -34.61, lon: -58.38,  country: "Argentina" },
  { name: "Santiago",         lat: -33.46, lon: -70.65,  country: "Chile" },
  { name: "Lima",             lat: -12.04, lon: -77.03,  country: "Peru" },
  { name: "Bogota",           lat: 4.71,   lon: -74.07,  country: "Colombia" },
  { name: "Caracas",          lat: 10.49,  lon: -66.88,  country: "Venezuela" },
  { name: "Havana",           lat: 23.14,  lon: -82.36,  country: "Cuba" },
  { name: "Gibraltar",        lat: 36.14,  lon: -5.35,   country: "Gibraltar" },
  { name: "Algiers",          lat: 36.74,  lon: 3.06,    country: "Algeria" },
  { name: "Tunis",            lat: 36.82,  lon: 10.17,   country: "Tunisia" },
  { name: "Tripoli",          lat: 32.90,  lon: 13.19,   country: "Libya" },
  { name: "Baghdad",          lat: 33.34,  lon: 44.40,   country: "Iraq" },
  { name: "Beirut",           lat: 33.89,  lon: 35.50,   country: "Lebanon" },
  { name: "Tel Aviv",         lat: 32.08,  lon: 34.78,   country: "Israel" },
  { name: "Amman",            lat: 31.96,  lon: 35.95,   country: "Jordan" },
  { name: "Tbilisi",          lat: 41.69,  lon: 44.83,   country: "Georgia" },
  { name: "Baku",             lat: 40.41,  lon: 49.87,   country: "Azerbaijan" },
  { name: "Tashkent",         lat: 41.30,  lon: 69.24,   country: "Uzbekistan" },
  { name: "Almaty",           lat: 43.22,  lon: 76.85,   country: "Kazakhstan" },
  { name: "Ulaanbaatar",      lat: 47.91,  lon: 106.88,  country: "Mongolia" },
  { name: "Taipei",           lat: 25.04,  lon: 121.56,  country: "Taiwan" },
  { name: "Reykjavik",        lat: 64.13,  lon: -21.82,  country: "Iceland" },
  { name: "Helsinki",         lat: 60.17,  lon: 24.94,   country: "Finland" },
  { name: "Kyiv",             lat: 50.45,  lon: 30.52,   country: "Ukraine" },
  { name: "Bucharest",        lat: 44.43,  lon: 26.10,   country: "Romania" },
  { name: "Budapest",         lat: 47.50,  lon: 19.04,   country: "Hungary" },
  { name: "Prague",           lat: 50.08,  lon: 14.44,   country: "Czechia" },
  { name: "Belgrade",         lat: 44.80,  lon: 20.46,   country: "Serbia" },
  { name: "Colombo",          lat: 6.93,   lon: 79.85,   country: "Sri Lanka" },
  { name: "Rangoon",          lat: 16.87,  lon: 96.17,   country: "Myanmar" },
  { name: "Phnom Penh",       lat: 11.56,  lon: 104.92,  country: "Cambodia" },
];

// ════════════════════════════════════════════════════════════════
//  STATE — lat and lon are INDEPENDENT
//  mode just controls which one the controls act on
// ════════════════════════════════════════════════════════════════
let mode       = "lat";   // "lat" | "lon"
let activeLat  = 0;       // independently stored
let activeLon  = 0;       // independently stored
let lastCity   = null;    // last city selected (for mode switch auto-snap)

const GLOBE_R  = 1.0;
const LINE_R   = 1.008;   // slightly above surface to avoid z-fighting
const TOLERANCE = 1.5;    // degrees tolerance for city highlighting
const SEG       = 256;    // ring segments

// ════════════════════════════════════════════════════════════════
//  RENDERER & SCENE — EXACTLY from the uploaded working file
// ════════════════════════════════════════════════════════════════
const width  = window.innerWidth;
const height = window.innerHeight;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.getElementById("canvas-wrap").appendChild(renderer.domElement);

THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// ── EARTH GROUP (tilted, exactly as uploaded) ──
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

// ── ORBIT CONTROLS ──
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping  = true;
controls.dampingFactor  = 0.06;
controls.minDistance    = 2;
controls.maxDistance    = 10;
controls.enablePan      = false;
controls.autoRotate     = true;
controls.autoRotateSpeed = 0.3;

// ── TEXTURES & MESHES (exactly as uploaded) ──
const loader   = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(GLOBE_R, 14);

const material = new THREE.MeshPhongMaterial({
  map: loader.load("./images/earthmap.jpg"),
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./images/cloud_combined.jpg"),
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh   = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// ── LIGHTING (exactly as uploaded) ──
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(5, 3, 5);
scene.add(keyLight);

// ── STARFIELD ──
const stars = getStarfield({ numStars: 5000 });
scene.add(stars);

// ════════════════════════════════════════════════════════════════
//  COORDINATE CONVERSION
//  The earthmap.jpg texture (from the original repo) maps Greenwich
//  (lon=0) toward the +Z axis — which is where the camera starts.
//  Standard spherical: x = sin(φ)cos(θ), z = sin(φ)sin(θ)
//  We need lon=0 → θ=90° (so that z = sin(φ)sin(90°) = sin(φ) = +Z)
//  And increasing lon goes WEST in the texture, so we negate.
//  Therefore: θ = π/2 - lon * π/180
// ════════════════════════════════════════════════════════════════
function latLonToVec3(lat, lon, r) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = Math.PI / 2 - lon * (Math.PI / 180);
  return new THREE.Vector3(
     r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

// ════════════════════════════════════════════════════════════════
//  LINE BUILDERS
//  Lines are children of earthGroup so they tilt with the earth.
// ════════════════════════════════════════════════════════════════
function makeLatLine(lat, color, opacity) {
  const pts = [];
  const phi = (90 - lat) * (Math.PI / 180);
  const rr  = LINE_R * Math.sin(phi);
  const yy  = LINE_R * Math.cos(phi);
  // Full circle — latitude parallels wrap all the way round
  for (let i = 0; i <= SEG; i++) {
    const t = (i / SEG) * Math.PI * 2;
    pts.push(new THREE.Vector3(rr * Math.cos(t), yy, rr * Math.sin(t)));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  // depthTest ON — lines only show on the front-facing side of the globe
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, depthTest: true });
  return new THREE.Line(geo, mat);
}

function makeLonLine(lon, color, opacity) {
  const pts    = [];
  const theta0 = Math.PI / 2 - lon * (Math.PI / 180);
  for (let i = 0; i <= SEG; i++) {
    const t = (i / SEG) * Math.PI * 2;
    pts.push(new THREE.Vector3(
       LINE_R * Math.sin(t) * Math.cos(theta0),
       LINE_R * Math.cos(t),
       LINE_R * Math.sin(t) * Math.sin(theta0)
    ));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, depthTest: true });
  return new THREE.Line(geo, mat);
}

// ════════════════════════════════════════════════════════════════
//  REFERENCE LINES — added to earthGroup, tilt with planet
// ════════════════════════════════════════════════════════════════
// Equator — amber, visible but not dominant
earthGroup.add(makeLatLine(0, 0xd97706, 0.5));

// Prime meridian — blue, visible but not dominant
earthGroup.add(makeLonLine(0, 0x3b82f6, 0.5));

// Tropics + arctic circles — very subtle
[23.43, -23.43, 66.56, -66.56].forEach(lat => {
  earthGroup.add(makeLatLine(lat, 0x1e3a5f, 0.25));
});

// ════════════════════════════════════════════════════════════════
//  ACTIVE LINE — rebuilt on every degree change
// ════════════════════════════════════════════════════════════════
let activeLatLine = null;  // latitude ring (always present)
let activeLonLine = null;  // longitude ring (always present)

function rebuildActiveLines() {
  // Remove old
  if (activeLatLine) { earthGroup.remove(activeLatLine); disposeObj(activeLatLine); }
  if (activeLonLine) { earthGroup.remove(activeLonLine); disposeObj(activeLonLine); }

  // Active mode = bright + halo; inactive mode = dim, no halo
  const latActive = mode === "lat";
  activeLatLine = buildGlowLine(true,  activeLat, latActive);
  activeLonLine = buildGlowLine(false, activeLon, !latActive);
  earthGroup.add(activeLatLine);
  earthGroup.add(activeLonLine);
}

function buildGlowLine(isLat, deg, isActive) {
  const group = new THREE.Group();

  // Active line: bright teal at full opacity + double core. Inactive: muted, dim
  const coreColor   = isActive ? 0x63e4cf : 0x4a7a8a;
  const coreOpacity = isActive ? 1.0      : 0.28;

  const core = isLat
    ? makeLatLine(deg, coreColor, coreOpacity)
    : makeLonLine(deg, coreColor, coreOpacity);
  group.add(core);

  // Only draw the glow halo for the active line
  if (isActive) {
    const haloR   = LINE_R * 1.007;
    const haloPts = [];
    if (isLat) {
      const phi = (90 - deg) * (Math.PI / 180);
      const rr  = haloR * Math.sin(phi);
      const yy  = haloR * Math.cos(phi);
      for (let i = 0; i <= SEG; i++) {
        const t = (i / SEG) * Math.PI * 2;
        haloPts.push(new THREE.Vector3(rr * Math.cos(t), yy, rr * Math.sin(t)));
      }
    } else {
      const theta0 = Math.PI / 2 - deg * (Math.PI / 180);
      for (let i = 0; i <= SEG; i++) {
        const t = (i / SEG) * Math.PI * 2;
        haloPts.push(new THREE.Vector3(
           haloR * Math.sin(t) * Math.cos(theta0),
           haloR * Math.cos(t),
           haloR * Math.sin(t) * Math.sin(theta0)
        ));
      }
    }
    const haloGeo = new THREE.BufferGeometry().setFromPoints(haloPts);
    const haloMat = new THREE.LineBasicMaterial({
      color: 0x63e4cf, transparent: true, opacity: 0.35,
      depthWrite: false, depthTest: true,
    });
    group.add(new THREE.Line(haloGeo, haloMat));
  }

  return group;
}

function disposeObj(obj) {
  obj.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });
}

// ════════════════════════════════════════════════════════════════
//  CITY MARKERS — children of earthGroup (tilt with planet)
// ════════════════════════════════════════════════════════════════
const dotGeo  = new THREE.SphereGeometry(0.007, 7, 7);
const glowGeo = new THREE.SphereGeometry(0.013, 7, 7);
const markers = [];

CITIES.forEach(city => {
  const pos = latLonToVec3(city.lat, city.lon, GLOBE_R * 1.008);

  const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0x475569 }));
  dot.position.copy(pos);
  dot.userData.city = city;
  earthGroup.add(dot);

  const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ color: 0x63e4cf, transparent: true, opacity: 0, depthWrite: false }));
  glow.position.copy(pos);
  earthGroup.add(glow);

  markers.push({ dot, glow, city });
});

function refreshMarkers() {
  const onLine = [];
  markers.forEach(({ dot, glow, city }) => {
    const latDelta  = Math.abs(city.lat - activeLat);
    const lonDelta  = Math.abs(city.lon - activeLon);
    const activeMode = mode === "lat" ? latDelta : lonDelta;
    const onActive   = activeMode <= TOLERANCE;
    const isSelected = lastCity && city.name === lastCity.name;

    if (isSelected) {
      // Gold/orange for the specifically selected city
      dot.material.color.setHex(0xf59e0b);
      dot.scale.setScalar(2.2);
      glow.material.color.setHex(0xf59e0b);
      glow.material.opacity = 0.5;
    } else if (onActive) {
      // Teal for cities that happen to be on the active line
      dot.material.color.setHex(0x63e4cf);
      dot.scale.setScalar(1.6);
      glow.material.color.setHex(0x63e4cf);
      glow.material.opacity = 0.35;
    } else {
      dot.material.color.setHex(0x475569);
      dot.scale.setScalar(1.0);
      glow.material.opacity = 0;
    }

    if (onActive) onLine.push({ city, delta: activeMode });
  });

  onLine.sort((a, b) => a.delta - b.delta);
  renderCityList(onLine);
  return onLine;
}

// ════════════════════════════════════════════════════════════════
//  UI HELPERS
// ════════════════════════════════════════════════════════════════
function fmtDeg(deg, isLat) {
  const a = Math.abs(deg).toFixed(1);
  return isLat
    ? (deg >= 0 ? `${a}° N` : `${a}° S`)
    : (deg >= 0 ? `${a}° E` : `${a}° W`);
}

function lineName(deg, isLat) {
  if (isLat) {
    if (Math.abs(deg)         < 0.3) return "Equator";
    if (Math.abs(deg - 23.43) < 0.4) return "Tropic of Cancer";
    if (Math.abs(deg + 23.43) < 0.4) return "Tropic of Capricorn";
    if (Math.abs(deg - 66.56) < 0.4) return "Arctic Circle";
    if (Math.abs(deg + 66.56) < 0.4) return "Antarctic Circle";
    return deg > 0 ? "Northern Parallel" : "Southern Parallel";
  } else {
    if (Math.abs(deg)               < 0.3) return "Prime Meridian";
    if (Math.abs(Math.abs(deg)-180) < 0.3) return "Antimeridian";
    return deg > 0 ? "East Meridian" : "West Meridian";
  }
}

function currentDeg() { return mode === "lat" ? activeLat : activeLon; }

function updateUI() {
  const isLat = mode === "lat";
  const deg   = currentDeg();

  // Left panel — show N/S for lat, E/W for lon (no + sign)
  document.getElementById("deg-display").innerHTML = fmtDeg(deg, isLat).replace("°", "<sup>°</sup>");
  document.getElementById("slider").value = deg;
  document.getElementById("num-in").value = deg.toFixed(1);

  // Right panel
  document.getElementById("rp-label").textContent = isLat ? "Active Parallel" : "Active Meridian";
  document.getElementById("rp-val").textContent   = fmtDeg(deg, isLat);
  document.getElementById("rp-name").textContent  = lineName(deg, isLat);

  rebuildActiveLines();
  refreshMarkers();
}

function renderCityList(activeCities) {
  document.getElementById("city-count").textContent = activeCities.length;
  const el = document.getElementById("cities-list");

  if (!activeCities.length) {
    el.innerHTML = `<div class="no-cities">No major cities within ±${TOLERANCE}° of this line</div>`;
    return;
  }

  el.innerHTML = activeCities.map(({ city, delta }) => {
    const isSelected = lastCity && city.name === lastCity.name;
    const pipColor   = isSelected ? "#f59e0b" : "var(--accent)";
    const rowBorder  = isSelected ? "border-color: rgba(245,158,11,0.4); background: rgba(245,158,11,0.06);" : "";
    return `
    <div class="city-row" style="${rowBorder}" onclick="focusCity(${JSON.stringify(city.name)})">
      <div class="city-pip" style="background:${pipColor}; box-shadow: 0 0 6px ${pipColor};"></div>
      <div class="city-row-info">
        <div class="city-row-name">${city.name}</div>
        <div class="city-row-coords">${fmtDeg(city.lat, true)} · ${fmtDeg(city.lon, false)}</div>
      </div>
      <div class="city-row-delta" style="${isSelected ? 'color:#f59e0b' : ''}">±${delta.toFixed(1)}°</div>
    </div>`;
  }).join("");
}

// ════════════════════════════════════════════════════════════════
//  MODE SWITCHING
//  Switching mode preserves both lat and lon independently.
//  If a city was last selected, the mode switch snaps to that
//  city's coordinate for the new mode, but does NOT change the other.
// ════════════════════════════════════════════════════════════════
window.setMode = function(m) {
  mode = m;
  const isLat = m === "lat";

  document.getElementById("btn-lat").classList.toggle("active", isLat);
  document.getElementById("btn-lon").classList.toggle("active", !isLat);

  const slider = document.getElementById("slider");
  const numIn  = document.getElementById("num-in");

  if (isLat) {
    slider.min = -90;  slider.max = 90;
    numIn.min  = -90;  numIn.max  = 90;
    // If a city was last selected, snap lat to that city's lat
    if (lastCity) activeLat = lastCity.lat;
  } else {
    slider.min = -180; slider.max = 180;
    numIn.min  = -180; numIn.max  = 180;
    // If a city was last selected, snap lon to that city's lon
    if (lastCity) activeLon = lastCity.lon;
  }

  updateUI();
};

// Slider — only moves the active axis
document.getElementById("slider").addEventListener("input", e => {
  const v = parseFloat(e.target.value);
  if (mode === "lat") activeLat = v;
  else                activeLon = v;
  lastCity = null; // manual move clears city context
  updateUI();
});

// Number input — only moves the active axis
document.getElementById("num-in").addEventListener("change", e => {
  let v = parseFloat(e.target.value);
  if (isNaN(v)) return;
  if (mode === "lat") {
    activeLat = Math.max(-90,  Math.min(90,  v));
  } else {
    activeLon = Math.max(-180, Math.min(180, v));
  }
  lastCity = null;
  updateUI();
});

// ════════════════════════════════════════════════════════════════
//  CITY SEARCH DROPDOWN
// ════════════════════════════════════════════════════════════════
const cityIn   = document.getElementById("city-in");
const dropdown = document.getElementById("dropdown");

function positionDropdown() {
  const rect = cityIn.getBoundingClientRect();
  dropdown.style.top   = `${rect.bottom + 4}px`;
  dropdown.style.left  = `${rect.left}px`;
  dropdown.style.width = `${rect.width}px`;
}

cityIn.addEventListener("input", () => {
  const q = cityIn.value.trim().toLowerCase();
  if (!q) { dropdown.style.display = "none"; return; }

  const hits = CITIES.filter(c =>
    c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
  ).slice(0, 8);

  if (!hits.length) { dropdown.style.display = "none"; return; }

  positionDropdown();
  dropdown.innerHTML = hits.map(c => `
    <div class="drop-item" data-city="${c.name.replace(/"/g, '&quot;')}">
      <span class="drop-name">${c.name}</span>
      <span class="drop-coord">${fmtDeg(c.lat, true)}</span>
    </div>
  `).join("");
  dropdown.style.display = "block";
});

// Use pointerdown on the dropdown itself — fires before input blur,
// and preventDefault stops the input from losing focus
dropdown.addEventListener("pointerdown", e => {
  e.preventDefault();
  const item = e.target.closest(".drop-item");
  if (!item) return;
  const name = item.dataset.city;
  if (name) window.pickCity(name);
});

cityIn.addEventListener("blur", () => {
  // Small delay so pointerdown on a dropdown item fires first
  setTimeout(() => { dropdown.style.display = "none"; }, 150);
});
window.pickCity = function(name) {
  const city = CITIES.find(c => c.name === name);
  if (!city) return;
  lastCity  = city;
  // A city sets BOTH lat and lon
  activeLat = city.lat;
  activeLon = city.lon;
  cityIn.value = city.name;
  dropdown.style.display = "none";
  updateUI();
  flyTo(city.lat, city.lon);
};

// ════════════════════════════════════════════════════════════════
//  FOCUS CITY (from right-panel list click)
// ════════════════════════════════════════════════════════════════
window.focusCity = function(name) {
  const city = CITIES.find(c => c.name === name);
  if (!city) return;
  lastCity  = city;
  activeLat = city.lat;
  activeLon = city.lon;
  updateUI();
  flyTo(city.lat, city.lon);
};

// ════════════════════════════════════════════════════════════════
//  CAMERA FLY-TO
// ════════════════════════════════════════════════════════════════
let flyTarget = null;

function flyTo(lat, lon) {
  controls.autoRotate = false;
  // Convert to world position direction (accounting for earthGroup tilt)
  const localPos = latLonToVec3(lat, lon, 1.0);
  // Apply the earthGroup's world matrix to get actual world direction
  const worldPos = localPos.clone().applyEuler(new THREE.Euler(-23.4 * Math.PI / 180, 0, 0, "XYZ"));
  // Actually apply the group's Z rotation
  const tilt = new THREE.Matrix4().makeRotationZ((-23.4 * Math.PI) / 180);
  const worldDir = localPos.clone().applyMatrix4(tilt).normalize();
  const dist = camera.position.length();
  flyTarget = worldDir.multiplyScalar(dist);
}

// ════════════════════════════════════════════════════════════════
//  GLOBE LINE DRAG
//  Raycasting against a sphere that matches earthGroup.
//  We un-apply the group's Z tilt to get local coords.
// ════════════════════════════════════════════════════════════════
const raycaster  = new THREE.Raycaster();
const mousePt    = new THREE.Vector2();
let   dragging   = false;
let   didDrag    = false;   // true if we actually moved while dragging (suppresses click)
let   hintGone   = false;

// Invisible pick sphere — added to earthGroup so it tilts with it
const pickSphere = new THREE.Mesh(
  new THREE.SphereGeometry(GLOBE_R * 1.01, 32, 32),
  new THREE.MeshBasicMaterial({ visible: false, side: THREE.FrontSide })
);
earthGroup.add(pickSphere);

function getLocalHit(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mousePt.x =  ((event.clientX - rect.left) / rect.width ) * 2 - 1;
  mousePt.y = -((event.clientY - rect.top ) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mousePt, camera);
  const hits = raycaster.intersectObject(pickSphere);
  if (!hits.length) return null;
  // The hit point is in world space; convert to earthGroup local space
  const local = earthGroup.worldToLocal(hits[0].point.clone());
  return local;
}

function localVecToLatLon(v) {
  const r   = v.length();
  const lat = Math.asin(v.y / r) * (180 / Math.PI);
  // theta = PI/2 - lon*PI/180  →  lon = (PI/2 - theta) * 180/PI
  const theta = Math.atan2(v.z, v.x);
  const lon   = (Math.PI / 2 - theta) * (180 / Math.PI);
  return { lat, lon: ((lon + 180) % 360) - 180 };
}

function nearActiveLine(local) {
  const { lat, lon } = localVecToLatLon(local);
  if (mode === "lat") return Math.abs(lat - activeLat) < 5;
  else                return Math.abs(lon - activeLon) < 8;
}

renderer.domElement.addEventListener("mousedown", e => {
  const local = getLocalHit(e);
  if (local && nearActiveLine(local)) {
    dragging = true;
    didDrag  = false;
    controls.enabled = false;
    if (!hintGone) {
      document.getElementById("drag-hint").style.opacity = "0";
      hintGone = true;
    }
  }
});

renderer.domElement.addEventListener("mousemove", e => {
  const tip = document.getElementById("tip");

  if (dragging) {
    const local = getLocalHit(e);
    if (!local) return;
    didDrag = true;
    const { lat, lon } = localVecToLatLon(local);
    if (mode === "lat") activeLat = Math.max(-90,  Math.min(90,  lat));
    else                activeLon = Math.max(-180, Math.min(180, lon));
    lastCity = null;
    updateUI();
    tip.style.display = "none";
    return;
  }

  // Hover tooltip on city dots
  const rect = renderer.domElement.getBoundingClientRect();
  mousePt.x =  ((e.clientX - rect.left) / rect.width ) * 2 - 1;
  mousePt.y = -((e.clientY - rect.top ) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mousePt, camera);
  const hits = raycaster.intersectObjects(markers.map(m => m.dot));
  if (hits.length) {
    const c = hits[0].object.userData.city;
    tip.textContent       = `${c.name} · ${c.country}`;
    tip.style.display     = "block";
    tip.style.left        = `${e.clientX + 14}px`;
    tip.style.top         = `${e.clientY - 10}px`;
    renderer.domElement.style.cursor = "pointer";
  } else {
    tip.style.display = "none";
    renderer.domElement.style.cursor = "default";
  }
});

renderer.domElement.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    controls.enabled = true;
    // didDrag stays true until after the click event fires, then resets
    setTimeout(() => { didDrag = false; }, 0);
  }
});

renderer.domElement.addEventListener("click", e => {
  if (didDrag) return;  // was a line drag, not a city tap
  const rect = renderer.domElement.getBoundingClientRect();
  mousePt.x =  ((e.clientX - rect.left) / rect.width ) * 2 - 1;
  mousePt.y = -((e.clientY - rect.top ) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mousePt, camera);
  const hits = raycaster.intersectObjects(markers.map(m => m.dot));
  if (hits.length) window.focusCity(hits[0].object.userData.city.name);
});

// ════════════════════════════════════════════════════════════════
//  WINDOW RESIZE
// ════════════════════════════════════════════════════════════════
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ════════════════════════════════════════════════════════════════
//  ANIMATION LOOP
// ════════════════════════════════════════════════════════════════
function animate() {
  requestAnimationFrame(animate);

  cloudsMesh.rotation.y += 0.0008; // match uploaded file exactly
  stars.rotation.y      -= 0.0002;

  // Smooth camera fly-to
  if (flyTarget) {
    camera.position.lerp(flyTarget, 0.055);
    if (camera.position.distanceTo(flyTarget) < 0.01) flyTarget = null;
  }

  controls.update();
  renderer.render(scene, camera);
}

// ════════════════════════════════════════════════════════════════
//  BOOT
// ════════════════════════════════════════════════════════════════
updateUI();

// Animate loading bar and reveal
const loadBar = document.getElementById("load-bar");
requestAnimationFrame(() => { loadBar.style.width = "100%"; });

setTimeout(() => {
  const loading = document.getElementById("loading");
  loading.classList.add("fade");
  setTimeout(() => { loading.style.display = "none"; }, 750);
  animate();
}, 1600);

// Auto-fade drag hint after 7s
setTimeout(() => {
  if (!hintGone) {
    document.getElementById("drag-hint").style.opacity = "0";
    hintGone = true;
  }
}, 7000);
