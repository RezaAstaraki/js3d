import * as t from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import p from "../public/face.avif";
import b from "../public/backside.png";

export function setupThree() {
  const containerDiv = document.getElementById("three") as HTMLDivElement;

  const w = containerDiv.clientWidth;
  const h = containerDiv.clientHeight;

  const cardSize = { w: 2, h: 3, d: 0.01 };
  let cardNumbers = 10;
  const gap = cardSize.w / 2;
  const r = (cardNumbers * cardSize.w + cardNumbers * gap) / (Math.PI * 2);

  const renderer = new t.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  containerDiv.appendChild(renderer.domElement);

  const fov = 75;
  const aspect = w / h;
  const near = 0.1;
  const far = r * 10;
  const camera = new t.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, r, 3 * r);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const scene = new t.Scene();

  const textureLoader = new t.TextureLoader();
  const picTextuer = textureLoader.load(p);
  const picTextuerBack = textureLoader.load(b);

  const boxMaterial = Array.from({ length: cardNumbers }).map((_, index) => {
    if (index === 4) {
      return new t.MeshBasicMaterial({
        map: picTextuer,
        wireframe: false,
      });
    } else if (index === 5) {
      return new t.MeshBasicMaterial({
        map: picTextuerBack,
        wireframe: false,
      });
    } else {
      return new t.MeshBasicMaterial({
        color: 0xccff,
        wireframe: false,
      });
    }
  });

  const geo = new t.BoxGeometry(cardSize.w, cardSize.h, cardSize.d);

  // const mat = new t.MeshBasicMaterial({
  //   color: 0xccff,
  //   wireframe: false,
  // });
  // const mat2 = new t.MeshBasicMaterial({ color: "#fff", wireframe: true });
  // const mesh = new t.Mesh(geo, mat);
  // mesh.material.color.set("red");
  // scene.add(mesh);
  // const mesh2 = new t.Mesh(geo, mat2);
  // const scale = 1.001;
  // mesh2.scale.set(scale, scale, scale);
  // mesh.add(mesh2);
  // mesh.translateZ(r);

  const axes = new t.AxesHelper(1.5);
  scene.add(axes);

  const pivot = new t.Group();
  // mesh.position.set(0, 3, 0);

  for (let i = 0; i < cardNumbers; i++) {
    let m = new t.Mesh(geo, boxMaterial);
    m.rotation.y = ((Math.PI * 2) / cardNumbers) * i;
    m.translateZ(r);
    pivot.add(m);
  }
  scene.add(pivot);

  /**
   * group 2
   */

  // const group2 = new t.Group()
  //   const axes2 = new t.AxesHelper(1.5)
  //   group2.add(axes2)
  //   group2.position.y=3
  //   const copiedMesh = mesh.clone()
  //   copiedMesh.material = mesh.material.clone()
  //   copiedMesh.geometry= mesh.geometry.clone()
  //   copiedMesh.material.color.set('red')
  //   group2.add(copiedMesh)

  // scene.add(group2)

  let lastTime = 0;

  function rotate(time: number) {
    requestAnimationFrame(rotate);

    // group2.rotation.z += 0.02

    let deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    pivot.rotation.y += (2 / cardNumbers) * Math.PI * deltaTime;

    controls.update(); // 🔥 very important if damping enabled
    renderer.render(scene, camera);
  }

  rotate(0);
}
