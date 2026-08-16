<script setup lang="ts">
import heroPenguin from '@/assets/ui-kit-light/common/mascot/penguin-team-exact-3x.png'
import heroVortex from '@/assets/ui-kit-light/common/background/ice-vortex-portrait.png'

defineProps<{ title: string }>()
</script>

<template>
  <header class="page-hero">
    <img class="hero-vortex" :src="heroVortex" alt="" />
    <img class="hero-penguin" :src="heroPenguin" alt="九鼎电竞皇冠企鹅" />
    <div class="hero-copy">
      <h1>{{ title }}</h1>
      <p><i></i><span>九鼎电竞</span><i></i></p>
    </div>
  </header>
</template>

<style scoped>
.page-hero {
  position: relative;
  height: 20cqw;
  overflow: hidden;
  background: #f5f9ff;
}

.hero-vortex {
  position: absolute;
  inset: 0 0 auto auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-penguin {
  position: absolute;
  left: 2.5%;
  top: 1%;
  width: 24%;
  mix-blend-mode: multiply;
}

.hero-copy {
  position: absolute;
  top: 15%;
  left: 25%;
  width: 36%;
  color: #0b2459;
  text-align: center;
}

.hero-copy h1 {
  margin: 0;
  font-size: 7.7cqw;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  text-shadow: 0 2px 0 #fff, 0 3px 4px rgba(16, 50, 102, 0.24);
}

.hero-copy p {
  margin: 7% 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3cqw;
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
