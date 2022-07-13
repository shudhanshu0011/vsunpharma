let menu = document.querySelector(".header .menu");
let navgation = document.querySelector(".header .main-navgation");
let links = document.querySelectorAll(".header .main-navgation a");
let overlay = document.querySelector(".overlay");

// Open Navgation Links For Tablets And Mobile.
function openMobileNavgation() {
  menu.classList.add("open"); // Open Menu
  navgation.classList.add("fade-in"); // Open Mobile Navgation
  controlOverlay("open"); // Open Overlay
}

// Close Navgation Links For Tablets And Mobile.
function closeMobileNavgation() {
  menu.classList.remove("open"); // Close Menu
  navgation.classList.remove("fade-in"); // Close Mobile Navgation
  controlOverlay("!open"); // Close Overlay
}

menu.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMobileNavgation();
  } else {
    openMobileNavgation();
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNavgation();
  });
});

// Reset To Bars Icon Shape IF Width >= 1024px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && menu.classList.contains("open")) {
    // Close Menu & Mobile Navgation & Overlay
    closeMobileNavgation();
  }
});

// Control [ Open || Close ] Overlay Function.
function controlOverlay(status) {
  /// status:
  /// open => Open Overlay
  /// anything else open => close Overlay
  if (status == "open") {
    overlay.classList.add("fade-in");
    overlay.classList.remove("fade-out");
  } else {
    overlay.classList.add("fade-out");
    overlay.classList.remove("fade-in");
  }
}

var navbar = document.querySelector("header");

window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

// Constants
const dnaHeight = 200;
const radiusEdges = 3;
const variationAngle = 0.1;
const unionGap = 7;
const edgeSize = 0.3;
const verticalSeparation = edgeSize;
const DNA = new THREE.Group();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const createDNAFragment = (hasBlade, index) => {
  const dnaFragment = new THREE.Group();
  const firstEdge = new THREE.Mesh(
    new THREE.BoxGeometry(edgeSize, edgeSize, edgeSize),
    new THREE.MeshBasicMaterial({ color: `rgb(234, 60, 36)` })
  );
  const secondEdge = new THREE.Mesh(
    new THREE.BoxGeometry(edgeSize, edgeSize, edgeSize),
    new THREE.MeshBasicMaterial({ color: `rgb(6 , 102, 152)` })
  );
  firstEdge.position.x = radiusEdges * Math.sin(index * variationAngle);
  firstEdge.position.z = radiusEdges * Math.cos(index * variationAngle);
  firstEdge.position.y = verticalSeparation * index;
  secondEdge.position.x = -radiusEdges * Math.sin(index * variationAngle);
  secondEdge.position.z = -radiusEdges * Math.cos(index * variationAngle);
  secondEdge.position.y = verticalSeparation * index;

  dnaFragment.add(firstEdge);
  dnaFragment.add(secondEdge);

  if (hasBlade) {
    const blade = new THREE.Group();
    const firstBlade = new THREE.Mesh(
      new THREE.BoxGeometry(edgeSize, edgeSize, radiusEdges),
      new THREE.MeshBasicMaterial({ color: `rgb(234, 60, 36)` })
    );

    firstBlade.position.y = verticalSeparation * index;
    firstBlade.position.z = radiusEdges / 2;

    const secondBlade = new THREE.Mesh(
      new THREE.BoxGeometry(edgeSize, edgeSize, radiusEdges),
      new THREE.MeshBasicMaterial({ color: `rgb(6 , 102, 152)` })
    );

    secondBlade.position.y = verticalSeparation * index;
    secondBlade.position.z = -radiusEdges / 2;

    blade.add(firstBlade);
    blade.add(secondBlade);

    blade.rotateY(index * variationAngle);

    dnaFragment.add(blade);
  }

  // fragments = [...fragments, dnaFragment];
  DNA.add(dnaFragment);
};

for (let i = 0; i < dnaHeight; i++) {
  createDNAFragment(i % unionGap == 0, i);
}

scene.add(DNA);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 20;
camera.position.y = 20;
camera.lookAt(new THREE.Vector3(0, 24, 0));
camera.rotateZ(Math.PI / 4);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// //Time
let time = Date.now();

// Animations
const draw = () => {
  // 1. Delta Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;
  DNA.rotateY(deltaTime * 0.001);
  renderer.render(scene, camera);
  window.requestAnimationFrame(draw);
};

draw();
