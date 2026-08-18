<script setup lang="ts">
import { computed, ref } from 'vue'
import BottomNavigation, { type PageKey } from '@/components/BottomNavigation.vue'
import pkMaster from '@/assets/tournament-center/tournament-pk-master.webp'
import eventMaster from '@/assets/tournament-center/tournament-event-master.webp'

type TournamentTab = 'pk' | 'event'

const activePage = defineModel<PageKey>('activePage', { required: true })
const activeTab = ref<TournamentTab>('pk')
const toast = ref('')
const master = computed(() => activeTab.value === 'pk' ? pkMaster : eventMaster)

function selectTab(tab: TournamentTab) {
  activeTab.value = tab
  toast.value = ''
}

function announce(message: string) {
  toast.value = message
  window.setTimeout(() => {
    if (toast.value === message) toast.value = ''
  }, 1600)
}
</script>

<template>
  <section class="tournament-center" :aria-label="activeTab === 'pk' ? 'PK赛' : '九鼎活动赛'">
    <img class="tournament-master" :src="master" :alt="activeTab === 'pk' ? '赛事中心 PK赛' : '赛事中心 九鼎活动赛'" />

    <button class="tab-hotspot tab-pk" :aria-pressed="activeTab === 'pk'" aria-label="查看PK赛" @click="selectTab('pk')"></button>
    <button class="tab-hotspot tab-event" :aria-pressed="activeTab === 'event'" aria-label="查看九鼎活动赛" @click="selectTab('event')"></button>

    <template v-for="row in 3" :key="row">
      <button class="card-hotspot signup" :class="`row-${row}`" :aria-label="`报名第${row}场赛事`" @click="announce('报名信息已记录')"></button>
      <button class="card-hotspot details" :class="`row-${row}`" :aria-label="`查看第${row}场赛事详情`" @click="announce('赛事详情即将开放')"></button>
    </template>

    <BottomNavigation v-model:active="activePage" overlay />
    <p v-if="toast" class="tournament-toast" role="status">{{ toast }}</p>
  </section>
</template>

<style scoped>
.tournament-center { position: absolute; inset: 0; }
.tournament-master { width: 100%; height: 100%; object-fit: fill; user-select: none; -webkit-user-drag: none; }
.tab-hotspot,.card-hotspot { position: absolute; z-index: 24; padding: 0; border: 0; background: transparent; cursor: pointer; }
.tab-hotspot:focus-visible,.card-hotspot:focus-visible { outline: 0; }
.tab-pk { top: 15.35%; left: 11.2%; width: 38.7%; height: 5.9%; }
.tab-event { top: 15.35%; left: 50%; width: 38.7%; height: 5.9%; }
.signup { left: 43.2%; width: 22.4%; height: 4.9%; }
.details { left: 70.2%; width: 21.7%; height: 4.9%; }
.row-1 { top: 36.7%; }
.row-2 { top: 60.15%; }
.row-3 { top: 82.7%; }
.tournament-toast { position: absolute; z-index: 40; top: 49%; left: 50%; transform: translateX(-50%); margin: 0; padding: 1.6% 4.5%; border: 1px solid rgba(132,178,242,.8); border-radius: 999px; color: #fff; background: rgba(24,65,126,.9); font-size: 2.8cqw; white-space: nowrap; box-shadow: 0 .8cqw 2.2cqw rgba(27,73,139,.24); }
</style>
