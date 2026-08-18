<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavigation, { type PageKey } from '@/components/BottomNavigation.vue'
import teamScreen from '@/assets/ui-reference/team-light-master.png'
import tournamentScreen from '@/assets/ui-reference/tournament-light.png'
import profileScreen from '@/assets/ui-reference/profile-light.png'
import createRoomOverlay from '@/assets/ui-reference/create-room-overlay.png'
import iceBackground from '@/assets/ui-kit-light/common/background/ice-vortex-portrait.png'
import penguin from '@/assets/ui-kit-light/common/mascot/penguin-team-exact-3x.png'
import activitiesIcon from '@/assets/ui-kit-light/common/navigation/icons/activities-exact-3x.png'

type Score = 100 | 200 | 500
type RoomMode = '怪兽入侵' | '星神' | '英雄联盟传奇'
type Server = '国际服' | '国服'

const router = useRouter()
const activePage = ref<PageKey>('team')
const showCreateRoom = ref(false)
const roomNumber = ref('')
const score = ref<Score>(200)
const mode = ref<RoomMode>('怪兽入侵')
const server = ref<Server>('国服')
const scoreTouched = ref(false)
const modeTouched = ref(false)
const serverTouched = ref(false)
const formError = ref('')

const pageScreens: Partial<Record<PageKey, string>> = {
  team: teamScreen,
  tournament: tournamentScreen,
  profile: profileScreen,
}

const activeScreen = computed(() => pageScreens[activePage.value])

function joinRoom(id: string) {
  void router.push({ name: 'team-room', params: { roomId: id }, query: { created: '0' } })
}

function openCreateRoom() {
  roomNumber.value = ''
  score.value = 200
  mode.value = '怪兽入侵'
  server.value = '国服'
  scoreTouched.value = false
  modeTouched.value = false
  serverTouched.value = false
  formError.value = ''
  showCreateRoom.value = true
}

function closeCreateRoom() {
  showCreateRoom.value = false
  formError.value = ''
}

function createRoom() {
  const id = roomNumber.value.trim()
  if (!/^\d{6}$/.test(id)) {
    formError.value = '请输入6位数字房间号'
    return
  }
  showCreateRoom.value = false
  void router.push({
    name: 'team-room',
    params: { roomId: id },
    query: {
      created: '1',
      score: String(score.value),
      mode: mode.value,
      server: server.value,
    },
  })
}
</script>

<template>
  <main class="app-shell">
    <section class="mobile-canvas" :class="{ 'activities-canvas': activePage === 'activities' }">
      <template v-if="activeScreen">
        <img class="reference-screen" :src="activeScreen" :alt="`${activePage} 页面`" />

        <template v-if="activePage === 'team'">
          <button class="hotspot direct-hotspot" aria-label="直达房间" @click="joinRoom('886421')"></button>
          <button class="hotspot featured-hotspot" aria-label="加入精选房间" @click="joinRoom('886421')"></button>
          <button class="hotspot room-one-hotspot" aria-label="加入房间 773311" @click="joinRoom('773311')"></button>
          <button class="hotspot room-two-hotspot" aria-label="加入房间 552198" @click="joinRoom('552198')"></button>
          <button class="hotspot room-three-hotspot" aria-label="加入房间 229876" @click="joinRoom('229876')"></button>
          <button class="hotspot quick-hotspot" aria-label="快速开始" @click="joinRoom('886421')"></button>
          <button class="hotspot create-hotspot" aria-label="创建房间" @click="openCreateRoom"></button>
        </template>

        <BottomNavigation v-model:active="activePage" overlay />
      </template>

      <template v-else>
        <img class="activities-background" :src="iceBackground" alt="" />
        <header class="activities-header">
          <img :src="penguin" alt="九鼎电竞企鹅" />
          <div><h1>活动资料</h1><p><i></i><span>九鼎电竞</span><i></i></p></div>
        </header>
        <section class="coming-panel">
          <img :src="activitiesIcon" alt="" /><span>COMING SOON</span><h2>正在开发当中</h2><p>活动资料与赛事图鉴即将开放</p>
        </section>
        <BottomNavigation v-model:active="activePage" />
      </template>

      <div v-if="showCreateRoom" class="create-room-layer" role="dialog" aria-modal="true" aria-label="创建房间" @click.self="closeCreateRoom">
        <img class="create-room-master" :src="createRoomOverlay" alt="创建房间：200分、怪兽入侵、国服" />
        <button class="modal-hotspot modal-close" aria-label="关闭创建房间" @click="closeCreateRoom"></button>
        <input v-model="roomNumber" class="room-number-input" :class="{ filled: roomNumber }" inputmode="numeric" maxlength="6" aria-label="输入房间号" @input="formError = ''" @keyup.enter="createRoom" />
        <button class="modal-hotspot option score-100" :class="{ dynamic: scoreTouched, selected: score === 100 }" :aria-pressed="score === 100" aria-label="选择100积分" @click="score = 100; scoreTouched = true; formError = ''"><span>100</span></button>
        <button class="modal-hotspot option score-200" :class="{ dynamic: scoreTouched, selected: score === 200 }" :aria-pressed="score === 200" aria-label="选择200积分" @click="score = 200; scoreTouched = true; formError = ''"><span>200</span></button>
        <button class="modal-hotspot option score-500" :class="{ dynamic: scoreTouched, selected: score === 500 }" :aria-pressed="score === 500" aria-label="选择500积分" @click="score = 500; scoreTouched = true; formError = ''"><span>500</span></button>
        <button class="modal-hotspot option mode-monster" :class="{ dynamic: modeTouched, selected: mode === '怪兽入侵' }" :aria-pressed="mode === '怪兽入侵'" aria-label="选择怪兽入侵" @click="mode = '怪兽入侵'; modeTouched = true; formError = ''"><span>👾 怪兽入侵</span></button>
        <button class="modal-hotspot option mode-star" :class="{ dynamic: modeTouched, selected: mode === '星神' }" :aria-pressed="mode === '星神'" aria-label="选择星神" @click="mode = '星神'; modeTouched = true; formError = ''"><span>🌀 星神</span></button>
        <button class="modal-hotspot option mode-lol" :class="{ dynamic: modeTouched, selected: mode === '英雄联盟传奇' }" :aria-pressed="mode === '英雄联盟传奇'" aria-label="选择英雄联盟传奇" @click="mode = '英雄联盟传奇'; modeTouched = true; formError = ''"><span>◉ 英雄联盟传奇</span></button>
        <button class="modal-hotspot option server-global" :class="{ dynamic: serverTouched, selected: server === '国际服' }" :aria-pressed="server === '国际服'" aria-label="选择国际服" @click="server = '国际服'; serverTouched = true; formError = ''"><span>国际服</span></button>
        <button class="modal-hotspot option server-cn" :class="{ dynamic: serverTouched, selected: server === '国服' }" :aria-pressed="server === '国服'" aria-label="选择国服" @click="server = '国服'; serverTouched = true; formError = ''"><span>国服</span></button>
        <button class="modal-hotspot create-confirm" aria-label="创建房间" @click="createRoom"></button>
        <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(html), :global(body), :global(#app) { min-height: 100%; margin: 0; }
:global(html), :global(body) { background: #eef5ff; }
:global(body) { min-width: 320px; overflow-x: hidden; font-family: 'PingFang SC','Microsoft YaHei UI','Microsoft YaHei',sans-serif; -webkit-font-smoothing: antialiased; }
.app-shell { min-height: 100dvh; display: grid; place-items: center; overflow: hidden; background: linear-gradient(90deg,#e9f1fb,#f8fbff 50%,#e9f1fb); }
.mobile-canvas { position: relative; container-type: inline-size; width: min(100vw,430px,56.28dvh); height: auto; min-height: 0; aspect-ratio: 941 / 1672; margin: 0 auto; overflow: hidden; background: #f7fbff; box-shadow: 0 0 42px rgba(41,75,128,.14); }
.reference-screen { width: 100%; height: 100%; object-fit: fill; user-select: none; -webkit-user-drag: none; }
.hotspot { position: absolute; z-index: 25; padding: 0; border: 0; cursor: pointer; background: transparent; }
.hotspot:focus-visible { outline: 2px solid #256fff; outline-offset: -2px; }
.direct-hotspot { top: 12%; left: 44%; width: 14%; height: 4%; }
.featured-hotspot { top: 34.5%; right: 5%; width: 28%; height: 6.5%; }
.room-one-hotspot { top: 57.5%; right: 5%; width: 26%; height: 5.2%; }
.room-two-hotspot { top: 66.6%; right: 5%; width: 26%; height: 5.2%; }
.room-three-hotspot { top: 75.2%; right: 5%; width: 26%; height: 5.2%; }
.quick-hotspot { left: 2.4%; bottom: 9.1%; width: 47%; height: 8%; }
.create-hotspot { right: 2.4%; bottom: 9.1%; width: 47%; height: 8%; }
.create-room-layer { position: absolute; z-index: 50; inset: 0; }
.create-room-master { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; user-select: none; -webkit-user-drag: none; }
.modal-hotspot { position: absolute; z-index: 2; padding: 0; border: 0; outline-offset: -2px; background: transparent; cursor: pointer; }
.modal-hotspot:focus-visible { outline: 2px solid #2b72e8; }
.modal-close { top: 24.1%; left: 73.4%; width: 7%; height: 4.7%; }
.room-number-input { position: absolute; z-index: 3; top: 32.55%; left: 23%; width: 53.4%; height: 4.25%; box-sizing: border-box; padding: 0 3%; border: 0; border-radius: 1cqw; outline: 0; color: transparent; caret-color: #244f91; background: transparent; font-size: 3.1cqw; }
.room-number-input:focus,.room-number-input.filled { color: #667a9e; background: rgba(252,253,255,.98); box-shadow: inset 0 0 0 .3cqw rgba(113,158,221,.26); }
.score-100,.score-200,.score-500 { top: 41.5%; width: 16.5%; height: 4.4%; }
.score-100 { left: 23.2%; } .score-200 { left: 41.7%; } .score-500 { left: 60.2%; }
.mode-monster,.mode-star,.mode-lol { top: 49.6%; height: 4.5%; }
.mode-monster { left: 22.7%; width: 18.2%; } .mode-star { left: 41.7%; width: 16.6%; } .mode-lol { left: 59.8%; width: 17.1%; }
.server-global,.server-cn { top: 58.2%; width: 25%; height: 4.4%; }
.server-global { left: 23%; } .server-cn { left: 51.2%; }
.create-confirm { top: 64.1%; left: 35%; width: 30%; height: 5.5%; }
.option span { visibility: hidden; }
.option.dynamic { display: grid; place-items: center; color: #142542; background: linear-gradient(180deg,#fff,#f7faff); border: .16cqw solid rgba(183,202,228,.9); box-shadow: 0 .35cqw .7cqw rgba(39,75,126,.18); clip-path: polygon(7% 0,93% 0,100% 16%,100% 84%,93% 100%,7% 100%,0 84%,0 16%); font-size: 2.7cqw; font-weight: 700; white-space: nowrap; }
.option.dynamic span { visibility: visible; }
.option.dynamic.selected { color: #fff; background: linear-gradient(180deg,#78b6ff,#3479e1); border-color: #d9ecff; text-shadow: 0 .2cqw .5cqw rgba(18,64,131,.55); box-shadow: inset 0 0 0 .35cqw rgba(237,248,255,.7),0 0 1.4cqw rgba(55,130,242,.55); }
.mode-monster.dynamic,.mode-star.dynamic,.mode-lol.dynamic { font-size: 2.15cqw; }
.form-error { position: absolute; z-index: 4; top: 69%; left: 25%; width: 50%; margin: 0; padding: .65% 1%; border-radius: 999px; color: #fff; background: rgba(172,54,42,.9); text-align: center; font-size: 2.3cqw; }
.activities-canvas { min-height: 0; isolation: isolate; }
.activities-background { position: absolute; z-index: -2; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.activities-canvas::after { content: ''; position: absolute; z-index: -1; inset: 0; background: linear-gradient(180deg,rgba(255,255,255,.02),rgba(231,241,255,.35)); }
.activities-header { height: 16.3%; display: flex; align-items: flex-start; padding: 1.2% 4% 0 2.5%; }
.activities-header > img { width: 24%; object-fit: contain; mix-blend-mode: multiply; }
.activities-header > div { width: 42%; margin: 4% 0 0 1.5%; text-align: center; }
.activities-header h1 { margin: 0; color: #0a2459; font-size: clamp(30px,8.1vw,35px); font-weight: 900; line-height: 1.08; letter-spacing: .08em; white-space: nowrap; text-shadow: 0 2px 0 #fff,0 3px 4px rgba(16,50,102,.25); }
.activities-header p { margin: 8% 0 0; display: flex; align-items: center; justify-content: center; color: #122b72; font-size: clamp(15px,4vw,18px); letter-spacing: .17em; white-space: nowrap; }
.activities-header p i { width: 13%; height: 1px; margin: 0 4%; background: #264a99; }
.coming-panel { width: 88%; min-height: 47%; margin: 17% auto 0; padding: 8% 5%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid rgba(129,166,221,.62); border-radius: 18px; background: rgba(255,255,255,.65); box-shadow: inset 0 0 28px rgba(112,164,232,.18),0 12px 32px rgba(50,82,130,.12); text-align: center; backdrop-filter: blur(5px); }
.coming-panel > img { width: 34%; margin-bottom: 5%; mix-blend-mode: multiply; }
.coming-panel > span { color: #5c7fbd; font-size: 11px; letter-spacing: .34em; }
.coming-panel h2 { margin: 4% 0 2%; color: #0b285f; font-size: clamp(27px,7vw,31px); }
.coming-panel p { margin: 0; color: #61728d; font-size: clamp(13px,3.5vw,16px); }
</style>
