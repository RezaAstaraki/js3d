import *  as t from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'





export function setupThree() {
  const containerDiv = document.getElementById("three") as HTMLDivElement

  const w = containerDiv.clientWidth
  const h = containerDiv.clientHeight

  const renderer = new t.WebGLRenderer({antialias:true}) 
  renderer.setSize(w,h)
  containerDiv.appendChild(renderer.domElement)

  const fov = 75 
  const aspect = w / h
  const near = .1 
  const far = 15
  const camera = new t.PerspectiveCamera(fov, aspect, near, far)

  camera.position.set(0, 3, 8)
  camera.lookAt(0, 0, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const scene = new t.Scene()

  const geo = new t.BoxGeometry(.1, 1.3, 1)
  const mat = new t.MeshBasicMaterial({color:0xccff,wireframe:false})
  const mat2 = new t.MeshBasicMaterial({color:"#fff",wireframe:true})

  const mesh = new t.Mesh(geo, mat)
  const mesh2 = new t.Mesh(geo, mat2)

  const scale = 1.001
  mesh2.scale.set(scale, scale, scale)
  mesh.add(mesh2)



  const axes = new t.AxesHelper(1.5)
  scene.add(axes)

  const pivot = new t.Group()
  pivot.add(mesh)
  mesh.position.set(1,1,0)
  for(let i=0 ; i<5 ;i++){
    let m = mesh.clone()
    m.material=mesh.material.clone()
    m.geometry=mesh.geometry.clone()
    m.position.set(0,0,0)
    m.rotation.y= Math.PI * 2 /5 * i
    m.translateX(2)
    pivot.add(m)
  }
  scene.add(pivot)

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

  function rotate(){
    requestAnimationFrame(rotate)
    pivot.rotation.y += 0.01


    // group2.rotation.z += 0.02


    controls.update() // 🔥 very important if damping enabled
    renderer.render(scene, camera)
  }
						
  rotate()
}
