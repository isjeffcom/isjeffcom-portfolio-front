<template>
  <div id="avatar">
    <div id="avatar-rt" ref="renderTarget" :style="`height: ${windowSize.height}px; width: ${windowSize.width/3}px; min-width: 320px;`"></div>
  </div>
</template>

<script>

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import confetti from 'canvas-confetti';

let renderer,
  camera,
  scene,
  controls,
  mixer,
  clock;
let danceAniClip = null;
let avatarObj = null;
const Preset_Lights = [
  { type: "ambient", color: 0xFFFFFF, position: {x: 0, y: 0, z: 0}, helper: false },
  // { type: "directional", color: 0x404040, position: {x: 0, y: 5, z: 0}, helper: true },
  { type: "spot", color: 0xffffff, position: {x: 0, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 5, helper: false },
  { type: "spot", color: 0xffffff, position: {x: 3, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 3, helper: false },
  { type: "spot", color: 0xffffff, position: {x: -3, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 3, helper: false },
]

export default {
  name: "avatar",
  components:{},
  data(){
    return {
      sceneLoaded: false,
      currentStateDance: false,
      popingAni: false,
      windowSize: {height: 1080, width: 1920}
    }
  },
  mounted() {
    if(this.sceneLoaded) return;

    this.windowSize.width = window.innerWidth;
    this.windowSize.height = window.innerHeight;

    if (this.$refs.renderTarget) {
      this.InitRenderer(this.$refs.renderTarget);
      this.InitCamera(this.$refs.renderTarget);
      this.InitClock();
      this.InitControls();
      this.InitScene();
      this.InitLights();

      this.LoadAvatar();

      this.animate();

      this.sceneLoaded = true;
    }
  },
  methods: {
    InitScene() {
      scene = new THREE.Scene();
    },
    InitCamera(targetCanvas) {
      camera = new THREE.PerspectiveCamera( 40, targetCanvas.clientWidth / targetCanvas.clientHeight , 0.1, 1000 );
      camera.position.z = 2.4;
      camera.position.y = 0.2;
    },
    InitClock() {
      clock = new THREE.Clock();
    },
    InitRenderer(targetCanvas) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize( targetCanvas.clientWidth, targetCanvas.clientHeight );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setClearColor( 0x000000, 0 );
      renderer.shadowMap = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.5;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.powerPreference = "high-performance"

      targetCanvas.appendChild( renderer.domElement );
    },
    InitLights() {
      Preset_Lights.forEach(preset => {
        let light = null;
        let helper = null;
        
        if(preset.type === "ambient") light = new THREE.AmbientLight( preset.color, 1 );
        if(preset.type === "directional") light = new THREE.DirectionalLight( preset.color );
        if(preset.type === "point") light = new THREE.PointLight( preset.color, 1 ,100 );
        if(preset.type === "spot") light = new THREE.SpotLight( preset.color, preset.intensive || 1, 10 );

        if(preset.helper) {
          if(preset.type === "ambient") console.warn("Ambient light does not support helper");
          if(preset.type === "directional") helper = new THREE.DirectionalLightHelper( light, 1 );
          if(preset.type === "point") helper = new THREE.PointLightHelper( light, 1 );
          if(preset.type === "spot") helper = new THREE.SpotLightHelper( light, 1);
        }

        // Set position
        if(preset.position && light) {
          light.position.set(preset.position.x, preset.position.y, preset.position.z);
        }

        if(preset.rotation && light) {
          light.rotateX(THREE.MathUtils.degToRad(preset.rotation.x));
          light.rotateY(THREE.MathUtils.degToRad(preset.rotation.y));
          light.rotateZ(THREE.MathUtils.degToRad(preset.rotation.z));
        }

        light.castShadow = true;
        scene.add(light);
        if(helper) scene.add(helper);
      });
    },
    InitControls() {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    },
    LoadAvatar() {
      const that = this;
      const loader = new GLTFLoader();
      loader.load(
        // resource URL
        './avatar/jeffAni.glb',
        // called when the resource is loaded
        function ( gltf ) {

          // Load animation
          mixer = new THREE.AnimationMixer(gltf.scene)

          
          gltf.scene.position.set(0.02, -1.13, 0);
          scene.add( gltf.scene );
          avatarObj = gltf;
          
          loader.load('./avatar/jeffAniDance.glb', (gltf_dance) => {
            danceAniClip = gltf_dance.animations[0];
            avatarObj.animations.push(danceAniClip);
            that.playNormal();
          })
      
        },
        // called while loading is progressing
        function ( xhr ) {
      
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      
        },
        // called when loading has errors
        function ( error ) {
      
          console.log( 'An error happened' );
      
        }
      );
    },
    playNormal() {
      mixer.clipAction( avatarObj.animations[1] ).stop();
      mixer.clipAction( avatarObj.animations[0] ).play();
    },
    playDance() {
      this.currentStateDance = true;
      confetti({origin: { x: 0.5, y: 1 }, angle: 90, particleCount: 90});
      // confetti({origin: { y: 0 }, angle: 120,});
      mixer.clipAction( avatarObj.animations[0] ).stop();
      mixer.clipAction( avatarObj.animations[1] ).play();
      setTimeout(() => {
        this.popingAni = true;
      }, 4200)
      setTimeout(() => {
        this.popingAni = true;
        mixer.clipAction( avatarObj.animations[0] ).play();
        mixer.clipAction( avatarObj.animations[1] ).stop();
        this.currentStateDance = false;
        setTimeout(() => {
          this.popingAni = false;
        },4500)

      }, 6000)
    },
    animate() {
      requestAnimationFrame(this.animate);

      const delta = clock.getDelta();
      if ( mixer ) mixer.update( delta );

      controls.update();
      this.render();
    },
    render() {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }
  }
}
</script>

<style scoped>
#avatar{
  width: 100%;
  height: 100%;
}

#avatar-rt{
  width: 100%;
  height: 100%;
}
</style>