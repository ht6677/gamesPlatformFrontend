<script setup lang="ts">
import heroMascot from '@/assets/tournament-center/hero-mascot.webp'
import heroMountains from '@/assets/tournament-center/hero-mountains.webp'
import heroRings from '@/assets/tournament-center/hero-rings.webp'
import heroIceTexture from '@/assets/tournament-center/hero-ice-texture.webp'

defineProps<{ title: string }>()
</script>

<template>
  <header class="page-hero">
    <img class="hero-mountains" :src="heroMountains" alt="" />
    <img class="hero-rings" :src="heroRings" alt="" />
    <img class="hero-ice-texture" :src="heroIceTexture" alt="" />
    <img class="hero-mascot" :src="heroMascot" alt="九鼎电竞猫头鹰" />
    <div class="hero-copy">
      <h1>{{ title }}</h1>
      <p><i></i><span>九鼎电竞</span><i></i></p>
    </div>
  </header>
</template>

<style scoped>
.page-hero {
  position: absolute;
  z-index: 15;
  top: 0;
  right: 0;
  left: 0;
  height: 27.2cqw;
  overflow: hidden;
  background: #f5f9ff;
}

.hero-mountains {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% 48%;
}

.hero-rings {
  position: absolute;
  top: -31%;
  right: 0;
  width: 58%;
  opacity: .55;
}

.hero-ice-texture {
  position: absolute;
  top: -72%;
  left: -16%;
  width: 55%;
  opacity: .3;
}

.hero-mascot {
  position: absolute;
  left: 2.6%;
  top: 0;
  width: 24.5%;
  height: 25cqw;
  object-fit: contain;
}

.hero-copy {
  position: absolute;
  top: 17%;
  left: 27.2%;
  width: 31%;
  color: #0b2459;
  text-align: center;
}

.hero-copy h1 {
  margin: 0;
  font-size: 6.85cqw;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  text-shadow: 0 2px 0 #fff, 0 3px 4px rgba(16, 50, 102, 0.24);
}

.hero-copy p {
  margin: 9% 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.15cqw;
  letter-spacing: 0.16em;
  white-space: nowrap;
}

.hero-copy p i {
  width: 13%;
  height: 1px;
  margin: 0 4%;
  background: #264a99;
}
</style>
