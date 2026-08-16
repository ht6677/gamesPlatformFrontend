<script setup lang="ts">
import { computed, ref } from 'vue'
import BottomNavigation, { type PageKey } from '@/components/BottomNavigation.vue'
import teamScreen from '@/assets/ui-reference/team-light-master.png'
import tournamentScreen from '@/assets/ui-reference/tournament-light.png'
import profileScreen from '@/assets/ui-reference/profile-light.png'
import iceBackground from '@/assets/ui-kit-light/common/background/ice-vortex-portrait.png'
import penguin from '@/assets/ui-kit-light/common/mascot/penguin-team-exact-3x.png'
import activitiesIcon from '@/assets/ui-kit-light/common/navigation/icons/activities-exact-3x.png'

const activePage = ref<PageKey>('team')

const pageScreens: Partial<Record<PageKey, string>> = {
  team: teamScreen,
  tournament: tournamentScreen,
  profile: profileScreen,
}

const activeScreen = computed(() => pageScreens[activePage.value])
</script>

<template>
  <main class="app-shell">
    <section class="mobile-canvas" :class="{ 'activities-canvas': activePage === 'activities' }">
      <template v-if="activeScreen">
        <img
          class="reference-screen"
          :src="activeScreen"
          :alt="`${activePage} 页面`"
          width="941"
          height="1672"
        />
        <BottomNavigation v-model:active="activePage" overlay />
      </template>

      <template v-else>
        <img class="activities-background" :src="iceBackground" alt="" />
        <header class="activities-header">
          <img :src="penguin" alt="九鼎电竞皇冠企鹅" />
          <div>
            <h1>活动资料</h1>
            <p><i></i><span>九鼎电竞</span><i></i></p>
          </div>
        </header>

        <section class="coming-panel">
          <img :src="activitiesIcon" alt="活动资料" />
          <span>COMING SOON</span>
          <h2>正在开发当中</h2>
          <p>活动资料与赛事图鉴即将开放</p>
        </section>

        <BottomNavigation v-model:active="activePage" />
      </template>
    </section>
  </main>
</template>

<style scoped>
:global(html),
:global(body),
:global(#app) {
  min-height: 100%;
  margin: 0;
}

:global(html) {
  background: #eef5ff;
}

:global(body) {
  min-width: 320px;
  overflow-x: hidden;
  background: #eef5ff;
  font-family: 'PingFang SC', 'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  min-height: 100dvh;
  overflow-x: hidden;
  background: linear-gradient(90deg, #e9f1fb, #f8fbff 50%, #e9f1fb);
}

.mobile-canvas {
  position: relative;
  width: min(100%, 430px);
  height: 100dvh;
  min-height: 640px;
  margin: 0 auto;
  overflow: hidden;
  background: #f7fbff;
  box-shadow: 0 0 42px rgba(41, 75, 128, 0.14);
}

.reference-screen {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  user-select: none;
  -webkit-user-drag: none;
}

.activities-canvas {
  min-height: 640px;
  isolation: isolate;
}

.activities-background {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activities-canvas::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(231, 241, 255, 0.35));
}

.activities-header {
  height: 16.3%;
  display: flex;
  align-items: flex-start;
  padding: 1.2% 4% 0 2.5%;
}

.activities-header > img {
  width: 24%;
  height: auto;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.activities-header > div {
  width: 42%;
  margin: 4% 0 0 1.5%;
  text-align: center;
}

.activities-header h1 {
  margin: 0;
  color: #0a2459;
  font-size: clamp(30px, 8.1vw, 35px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-shadow: 0 2px 0 #fff, 0 3px 4px rgba(16, 50, 102, 0.25);
}

.activities-header p {
  margin: 8% 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #122b72;
  font-size: clamp(15px, 4vw, 18px);
  letter-spacing: 0.17em;
  white-space: nowrap;
}

.activities-header p i {
  width: 13%;
  height: 1px;
  margin: 0 4%;
  background: #264a99;
}

.coming-panel {
  width: 88%;
  min-height: 47%;
  margin: 17% auto 0;
  padding: 8% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(129, 166, 221, 0.62);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 0 28px rgba(112, 164, 232, 0.18), 0 12px 32px rgba(50, 82, 130, 0.12);
  text-align: center;
  backdrop-filter: blur(5px);
}

.coming-panel > img {
  width: 34%;
  margin-bottom: 5%;
  mix-blend-mode: multiply;
}

.coming-panel > span {
  color: #5c7fbd;
  font-size: 11px;
  letter-spacing: 0.34em;
}

.coming-panel h2 {
  margin: 4% 0 2%;
  color: #0b285f;
  font-size: clamp(27px, 7vw, 31px);
}

.coming-panel p {
  margin: 0;
  color: #61728d;
  font-size: clamp(13px, 3.5vw, 16px);
}

@media (min-width: 431px) {
  .activities-header h1 {
    font-size: 35px;
  }
}
</style>
