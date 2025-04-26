import *  as t from 'three'

export function setupThree() {
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

  camera.position.set(2, 2, .5)
  camera.lookAt(0,0,0)


  const scene = new t.Scene()

  const geo = new t.BoxGeometry(.5,1,1.5)
  const mat = new t.MeshBasicMaterial({color:0xccff,wireframe:true})


  const mat2 = new t.MeshBasicMaterial({color:0xccff,wireframe:false})


  const mesh = new t.Mesh(geo,mat)

  const mesh2 = new t.Mesh(geo,mat2)
  mesh2.scale.set(1,1.1,1.1)

  mesh.add(mesh2)
  scene.add(mesh)

const axes = new t.AxesHelper(2)

scene.add(axes)

function rotate(){
	requestAnimationFrame(rotate)
	mesh.rotation.x += .01

  renderer.render(scene,camera)

}

rotate()
}
