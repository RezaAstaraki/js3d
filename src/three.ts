import *  as t from 'three'

export function setupThree(element: HTMLDivElement) {
  const containerDiv:HTMLDivElement= document.getElementById("three") as HTMLDivElement
  
  const w = containerDiv.clientWidth
  const h = containerDiv.clientHeight
  const renderer = new t.WebGLRenderer({antialias:true}) 
  renderer.setSize(w,h)

  containerDiv.appendChild(renderer.domElement)
  const fov = 75 
  const aspect = (w&&h) ? w/h:undefined
  const near = .1 
  const far = 10
  const camera = new t.PerspectiveCamera(fov,aspect,near,far)
  camera.position.z=2
  const scene = new t.Scene()

  const geo = new t.IcosahedronGeometry(1,2)
  const mat = new t.MeshBasicMaterial({color:0xccff})
  const mesh = new t.Mesh(geo,mat)
  scene.add(mesh)



  renderer.render(scene,camera)

}
