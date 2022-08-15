<template>
  <div id="avatar">
    <div id="avatar-rt" ref="renderTarget" :style="`height: ${canvasHeight}px; width: ${canvasWidth}px; min-width: 320px;`">
      <div id="avatar-like">
        <div id="avatar-like-btn" v-on:click="playDance">👍I love it</div>
      </div>
    </div>

    <div
      id="three-overlay-blur"
      :style="`
        display: ${popingAni ? 'block' : 'none'};
        animationName: ${popingAni ? 'blurout' : 'none'};
      `">
    </div>

    <div
      id="three-overlay-poping"
      :style="`display: ${popingAni ? 'block' : 'none'};`">
        <div
          id="coverAni"
          :style="`
            display: ${popingAni ? 'block' : 'none'};
            animationName: ${popingAni ? 'covering' : 'none'};
          `">
          <img :src="'./assets/img/anirain-1.png'" alt="bg" width="100%" height="100%" />
        </div>
    </div>

    <div
      id="three-overlay-poping2"
      :style="`display: ${popingAni ? 'block' : 'none'}`">
      <div
        id="thankAni"
        :style="`
          display: ${popingAni ? 'block' : 'none'};
          animationName: ${popingAni ? 'poping' : 'none'};`">
        <img :src="'./assets/img/thankyou.png'" alt="bg" width="100%" height="100%" />
      </div>
    </div>
    
  </div>
</template>

<script>

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import confetti from 'canvas-confetti';
import { EventBus } from '../../bus';

let renderer,
  camera,
  scene,
  controls,
  mixer,
  clock;
let danceAniClip = null;
let avatarObj = null;
const Preset_Lights = [
  { type: "ambient", color: 0xFFFFFF, position: {x: 0, y: 0, z: 0} },
  // { type: "directional", color: 0x404040, position: {x: 0, y: 5, z: 0}, helper: true },
  { type: "spot", color: 0xffffff, position: {x: 0, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 5 },
  { type: "spot", color: 0xffffff, position: {x: 3, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 3 },
  { type: "spot", color: 0xffffff, position: {x: -3, y: 5, z: 0}, rotation: {x: 0, y: 45, z: 0}, intensive: 3 },
]

export default {
  name: "avatar",
  components:{},
  props: {
    canvasHeight: Number,
    canvasWidth: Number
  },
  data(){
    return {
      sceneLoaded: false,
      currentStateDance: false,
      popingAni: false,
      shouldRender: false
    }
  },
  mounted() {

    EventBus.$on("avatar-render", (data) => {
      console.log("avatar-render: " + data)
      this.shouldRender = data;
    })

    if(this.sceneLoaded) return;

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
      camera.position.z = 1.35;
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
        'https://isjeffcom-1251089768.cos.ap-hongkong.myqcloud.com/avatars/jeffAni.glb',
        // called when the resource is loaded
        function ( gltf ) {

          // Load animation
          mixer = new THREE.AnimationMixer(gltf.scene)

          
          gltf.scene.position.set(0.06, -1.55, 0);
          scene.add( gltf.scene );
          avatarObj = gltf;
          
          loader.load('https://isjeffcom-1251089768.cos.ap-hongkong.myqcloud.com/avatars/jeffAniDance.glb', (gltf_dance) => {
            danceAniClip = gltf_dance.animations[0];
            avatarObj.animations.push(danceAniClip);
            that.playNormal();
            EventBus.$emit("avatar-ready", true);
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
      // Play confetti animation
      confetti({origin: { x: 0.13, y: 0.65 }, angle: 90, particleCount: 90, zIndex: 2000});
      // confetti({origin: { y: 0 }, angle: 120,});
      mixer.clipAction( avatarObj.animations[0] ).stop();
      mixer.clipAction( avatarObj.animations[1] ).play();
      setTimeout(() => {
        this.popingAni = true;
      }, 3000)
      setTimeout(() => {
        // this.popingAni = true;
        mixer.clipAction( avatarObj.animations[0] ).play();
        mixer.clipAction( avatarObj.animations[1] ).stop();
        this.currentStateDance = false;
        setTimeout(() => {
          this.popingAni = false;
        },4500)
      }, 4000)
    },
    animate() {
      requestAnimationFrame(this.animate);

      const delta = clock.getDelta();
      if ( mixer ) mixer.update( delta );

      if(this.shouldRender){
        controls.update();
        this.render();
      }

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

/* Animotion for background blur effect */
#three-overlay-blur{
  width: 100%;
  height: 411px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1001;
  opacity: 0;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(32px);
  animation-duration: 1s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

/* Animotion for emoji rain */
#coverAni{
  width: 100%;
  height: 100%;
  animation-name: covering;
  animation-duration: 3s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}

/* Animation for thank you */
#thankAni{
  width: 100%;
  height: 100%;
  opacity: 0;
  animation-delay: 2.8s;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

#three-overlay-poping{
  width: 100%;
  height: 411px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1002;
}

#three-overlay-poping2{
  width: 100%;
  height: 411px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1003;
}

#avatar{
  width: 100%;
  height: 100%;
}

#avatar-rt{
  width: 100%;
  height: 100%;
}

#avatar-like{
  position: absolute;
  width: 100%;
  top: 315px;
  opacity: 0;
  transition: all 0.64s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#avatar-like:hover{
  opacity: 1;
}

#avatar-like-btn{
  height: 30px;
  width: 100px;
  border-radius: 100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 6px;
  padding-bottom: 2px;
  color: #fff;
  border: 1px solid #777777;
  transform: scale(1);
  cursor: pointer;
  background: rgba(0,0,0,0.76);
}

#avatar-like-btn:hover{
  border: 1px solid #888888;
}

#avatar-like-btn:active{
  transform: scale(0.9);
}

</style>