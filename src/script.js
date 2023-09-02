import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#2f303b', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const windowAmbientOcclusionTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_ambientOcclusion.jpg')
const windowColorTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_basecolor.jpg')
const windowHeightTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_height.jpg')
const windowMetalnessTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_metallic.jpg')
const windowNormalTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_normal.jpg')
const windowOpacityTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_opacity.jpg')
const windowRoughnessTexture = textureLoader.load('/textures/Glass_Window_004_SD/Glass_Window_004_roughness.jpg')

const woodWallAmbientOcclusionTexture = textureLoader.load('/textures/Wood_Wall_002_SD/Wood_Wall_002_ambientOcclusion.jpg')
const woodWallColorTexture = textureLoader.load('/textures/Wood_Wall_002_SD/Wood_Wall_002_basecolor.jpg')
const woodWallHeightTexture = textureLoader.load('/textures/Wood_Wall_002_SD/Wood_Wall_002_height.jpg')
const woodWallNormalTexture = textureLoader.load('/textures/Wood_Wall_002_SD/Wood_Wall_002_normal.jpg')
const woodWallRoughnessTexture = textureLoader.load('/textures/Wood_Wall_002_SD/Wood_Wall_002_roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const fireWoodColorTexture = textureLoader.load('/models/FirewoodSplitCollection001/FirewoodSplitCollection001_COL_4K_METALNESS.jpg')
const fireWoodAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const fireWoodAmbientOcclusionTexture = textureLoader.load('/models/FirewoodSplitCollection001/FirewoodSplitCollection001_AO_4K_METALNESS.jpg')
const fireWoodHeightTexture = textureLoader.load('/textures/door/height.jpg')
const fireWoodNormalTexture = textureLoader.load('/models/FirewoodSplitCollection001/FirewoodSplitCollection001_NRM_4K_METALNESS.jpg')
const fireWoodMetalnessTexture = textureLoader.load('/models/FirewoodSplitCollection001/FirewoodSplitCollection001_AO_4K_METALNESS.jpg')
const fireWoodRoughnessTexture = textureLoader.load('/models/FirewoodSplitCollection001/FirewoodSplitCollection001_ROUGHNESS_4K_METALNESS.jpg')

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture
  })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// House
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
      map: woodWallColorTexture,
      aoMap: woodWallAmbientOcclusionTexture,
      normalMap: woodWallNormalTexture,
      roughnessMap: woodWallRoughnessTexture
  })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2 / 2
house.add(walls)


// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    color: '#b35f45'
  })
)
roof.position.y = 2.1 + 0.5
roof.rotation.y = Math.PI / 4
roof.opacity = 1

house.add(roof)

// Chimney

const chimneyGeometry = new THREE.BoxGeometry(0.3, 1, 0.1)
const chimneyMaterial = new THREE.MeshStandardMaterial({
  color: '#b35f45'
})

const chimney1 = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
chimney1.position.x = - 1.05
chimney1.position.y = 2.7
chimney1.position.z = - 0.5
chimney1.opacity = 1
const chimney2 = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
chimney2.position.x = - 1.25
chimney2.position.y = 2.7
chimney2.position.z = - 0.6
chimney2.rotation.y = Math.PI * 0.5
chimney2.opacity = 1
const chimney3 = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
chimney3.position.x = - 0.95
chimney3.position.y = 2.7
chimney3.position.z = - 0.7
chimney3.rotation.y = Math.PI * 0.5
chimney3.opacity = 1
const chimney4 = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
chimney4.position.x = - 1.15
chimney4.position.y = 2.7
chimney4.position.z = - 0.8
chimney4.opacity = 1

house.add(chimney1, chimney2, chimney3, chimney4)


// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture
  })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 0.8
door.position.z = 2.01

house.add(door)

// Window 1
const window1 = new THREE.Mesh(
  new THREE.PlaneGeometry( 1, 0.75),
  new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    aoMap: windowAmbientOcclusionTexture,
    normalMap: windowNormalTexture,
    roughnessMap: windowRoughnessTexture
})
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
window1.position.x = 2.01
window1.position.y = 1.5
window1.position.z = - 0.5
window1.rotation.y = Math.PI / 2

house.add(window1)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#81c814'
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)

bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.2, 2.2)

bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Trees
const treeBaseGeometry = new THREE.ConeGeometry(0.75, 1.25, 32)
const treeMaterial = new THREE.MeshStandardMaterial({
  color: '#13421e'
})
const treeMiddleGeometry = new THREE.ConeGeometry(0.5, 1, 32)
const treeTopGeometry = new THREE.ConeGeometry(0.25, 0.75, 32)
const treeTruncGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32)
const treeTruncMaterial = new THREE.MeshStandardMaterial({
  color: '#2b1906'
})

const trees = new THREE.Group()
scene.add(trees)

const treeBase = new THREE.Mesh(treeBaseGeometry, treeMaterial)
treeBase.position.x = 0
treeBase.position.y = 1.5
treeBase.position.z = 0

const treeMiddle = new THREE.Mesh(treeMiddleGeometry, treeMaterial)
treeMiddle.position.x = 0
treeMiddle.position.y = 2
treeMiddle.position.z = 0

const treeTop = new THREE.Mesh(treeTopGeometry, treeMaterial)
treeTop.position.x = 0
treeTop.position.y = 2.5
treeTop.position.z = 0

const treeTrunc = new THREE.Mesh(treeTruncGeometry, treeTruncMaterial)
treeTrunc.position.x = 0
treeTrunc.position.y = 0.5
treeTrunc.position.z = 0

trees.add(treeBase, treeMiddle, treeTop, treeTrunc)

for(let i = 0; i < 1000; i++) {
  const angle = Math.random() * Math.PI * 2 // anywhere on a circle
  const radius = 7 + Math.random() * 20
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const scale = Math.abs((Math.random() - 0.5) * 2)

  const tree = trees.clone()
  tree.scale.set(scale, scale, scale)
  tree.position.set(x, 0, z)

  tree.castShadow = true

  scene.add(tree)
}

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  color: '#636261'
})

for(let i = 0; i < 50; i++){

  const angle = Math.random() * Math.PI * 2 // anywhere on a circle
  const radius = 3 + Math.random() * 5
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.set(x, 0.3, z)
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.1) * 0.4
  grave.castShadow = true

  graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.05)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.05)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// DoorLight
const doorLight = new THREE.PointLight('#ffa646', 2, 3)
doorLight.position.set(-1, 1.9, 2.7)
house.add(doorLight)

// WindowLight
const windowLight = new THREE.RectAreaLight('#452803', 0.2, 1, 0.75)
windowLight.position.set(2.02, 1.5, -0.5)
windowLight.rotation.y = Math.PI * 0.5
scene.add(windowLight)

// Chimney light
const chimneyLight = new THREE.SpotLight('#452803', 8, 10, Math.PI * 0.5, 0.5, 0)
chimneyLight.position.set(- 1.1, 2.9, - 0.7)
chimneyLight.target.position.set(- 1.1, 10, - 0.7)

scene.add(chimneyLight.target)
scene.add(chimneyLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#3a186b', 2, 3)
// const ghost2 = new THREE.PointLight('#00ff00', 2, 3)
// const ghost3 = new THREE.PointLight('#0000ff', 2, 3)

const ghostGeometry = new THREE.SphereGeometry(0.1, 32, 16)
const ghostMaterial = new THREE.MeshStandardMaterial({
  color: '#000000',
  transparent: true,
  opacity: 0.1
})
const ghost1Body = new THREE.Mesh(ghostGeometry, ghostMaterial)
// const ghost2Body = new THREE.Mesh(ghostGeometry, ghostMaterial)
// const ghost3Body = new THREE.Mesh(ghostGeometry, ghostMaterial)
ghost1Body.position.y = 4

scene.add(ghost1)
// scene.add(ghost1, ghost2, ghost3)
scene.add(ghost1Body)
// scene.add(ghost1Body, ghost2Body, ghost3Body)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 6
camera.position.y = 4
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#2f303b')
/**
 * Shadows
 */
renderer.shadowMap.enabled = true
moonLight.castShadow = true
doorLight.castShadow = true
chimneyLight.castShadow = true
ghost1.castShadow = true
// ghost2.castShadow = true
// ghost3.castShadow = true

walls.castShadow = true
chimney1.castShadow = true
chimney2.castShadow = true
chimney3.castShadow = true
chimney4.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true
roof.receiveShadow = true

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

// ghost2.shadow.mapSize.width = 256
// ghost2.shadow.mapSize.height = 256
// ghost2.shadow.camera.far = 7

// ghost3.shadow.mapSize.width = 256
// ghost3.shadow.mapSize.height = 256
// ghost3.shadow.camera.far = 7

renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    ghost1Body.position.x = Math.cos(ghost1Angle) * 4
    ghost1Body.position.z = Math.sin(ghost1Angle) * 4
    ghost1Body.position.y = Math.sin(elapsedTime * 3)

    // const ghost2Angle = - elapsedTime * 0.32
    // ghost2.position.x = Math.cos(ghost2Angle) * 5
    // ghost2.position.z = Math.sin(ghost2Angle) * 5
    // ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // ghost2Body.position.x = Math.cos(ghost2Angle) * 5
    // ghost2Body.position.z = Math.sin(ghost2Angle) * 5
    // ghost2Body.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    
    // const ghost3Angle = - elapsedTime * 0.18
    // ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    // ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    // ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // ghost3Body.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    // ghost3Body.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    // ghost3Body.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Window
    const colorStart = new THREE.Color('#ae82fa')
    const colorEnd = new THREE.Color('#000')
    const intensityStart = 0.8
    const intensityEnd = 0

    let time = 0
    const transitionDuration = 100

    if (Date.now() - time >= 3000) {
      time = Date.now()
      const t = (1 + Math.sin(elapsedTime / (transitionDuration * Math.random() )) * 2) / 2
      const color = new THREE.Color().lerpColors(colorStart, colorEnd, t)
      const intensity = intensityStart + (intensityEnd - intensityStart) * t

      windowLight.color = color
      chimneyLight.color = color
      windowLight.intensity = intensity
      chimneyLight.intensity = intensity

    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()