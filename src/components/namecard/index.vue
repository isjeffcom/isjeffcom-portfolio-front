<template>
  <div id="namecard">
    <div id="namecard-avatar-cont">
      <avatar :canvasHeight="411" :canvasWidth="423"></avatar>
    </div>

    <div id="namecard-info-cont">
      <div id="namecard-profile-pic">
        <div id="namecard-profile-pic-inner">
          <img :src="'./assets/img/namecard/head.png'" alt="head">
        </div>
      </div>

      <div id="namecard-profile-name">
        <div id="namecard-profile-name-inner">
          <img :src="'./assets/img/namecard/name.svg'" alt="name">
        </div>

        <div id="namecard-profile-motto">
          <span>Designer X Coder</span>
        </div>
      </div>
    </div>

    <div id="namecard-action-area">
      <div id="namecard-actions">

        <div class="na-btn">
          <a href="Mailto:hello@isjeff.com">
            <div class="na-btn-icon na-svg">
              <img :src="'./assets/img/namecard/namecard-icon-mail-light.svg'" alt="email me">
            </div>
          </a>

          <a href="Mailto:hello@isjeff.com">
            <div class="na-btn-label">
              <span>Contact</span>
            </div>
          </a>
          
        </div>

        <div class="na-btn" v-on:click="shareNC">
          <div class="na-btn-icon na-svg">
            <img :src="'./assets/img/namecard/namecard-icon-share-light.svg'" alt="email me">
          </div>

          <div class="na-btn-label">
            <span>Share</span>
          </div>
        </div>

      </div>
    </div>

    <div id="namecard-person">

      <div class="nc-person-s">
        <div class="nc-person-icon na-svg">
          <img :src="'./assets/img/namecard/namecard-icon-vr-light.svg'" alt="">
        </div>
        <div class="nc-person-des">
          <span>XR Researcher</span>
        </div>
      </div>

      <div class="nc-person-s">
        <div class="nc-person-icon na-svg">
          <img :src="'./assets/img/namecard/namecard-icon-dev-light.svg'" alt="">
        </div>
        <div class="nc-person-des">
          <span>Full-Stack Designer</span>
        </div>
      </div>

      <div class="nc-person-s">
        <div class="nc-person-icon na-svg">
          <img :src="'./assets/img/namecard/namecard-icon-game-light.svg'" alt="">
        </div>
        <div class="nc-person-des">
          <span>Technical Artist</span>
        </div>
      </div>

      <div class="nc-person-s">
        <div class="nc-person-icon na-svg">
          <img :src="'./assets/img/namecard/namecard-icon-code-light.svg'" alt="">
        </div>
        <div class="nc-person-des">
          <span>Rapid Prototyper</span>
        </div>
      </div>

    </div>

    <div id="namecard-bg">

    </div>
    
  </div>
</template>

<script>
import avatar from '../avatar'
export default {
  name: "namecard",
  components: {
    avatar
  },
  methods:{
    shareNC() {
      navigator.share({
        title: "JIANFENG's Portfolio",
        text: "Have a look on full-stack designer: JIANFENG's Portfolio",
        url: "https://isjeff.com"
      })
    }
  }

}
</script>

<style scoped>
a, span{
  text-decoration: none;
  color: #454C54;
}
#namecard{
  font-family: fblack;
  position: fixed;
  top: 70px;
  left: 50px;
  width: 423px;
  height: 694px;
  background: linear-gradient(195.65deg, #EFF2F3 0%, #FFFFFF 100%);
  border: 1px solid #D2D5E1;
  box-shadow: 0px 16px 24px rgba(69, 76, 84, 0.1);
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
}

#namecard-info-cont{
  height: 142px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: -50px;
}

#namecard-profile-motto{
  margin-top: -4px;
  font-family: fregular;
}

#namecard-profile-pic{
  width: 87px;
  height: 87px;
  border-radius: 100px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
}

#namecard-profile-pic-inner{
  background: #fff;
  width: inherit;
  height: inherit;
  overflow: hidden;
}

#namecard-profile-pic-inner img{
  object-fit: contain;
}

#namecard-action-area{
  width: 100%;
  margin-top: 16px;
}

#namecard-actions{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 18px;
}

#namecard-actions .na-btn{
  width: 36%;
  height: 60px;
  background: #FFFFFF;
  border: 0.5px solid #BCC3C8;
  box-shadow: 0px 4px 8px rgba(69, 76, 84, 0.05);
  border-radius: 8px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
}

#namecard-actions .na-btn:hover{
  box-shadow: 0px 12px 18px rgba(69, 76, 84, 0.24);
}

#namecard-actions .na-btn:active{
  background: #F6F6F6;
}

#namecard-person{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
  justify-content: center;
}

.na-btn-icon{
  height: 32px;
}

.nc-person-s{
  width: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
}

.nc-person-des{
  margin-top: -2px;
  margin-left: 2px;
}

.na-btn-label{
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}

.na-svg img{
  height: 40px;
  width: auto;
}

</style>