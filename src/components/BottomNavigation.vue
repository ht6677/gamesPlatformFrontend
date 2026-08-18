<script setup lang="ts">
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant'
import navFrame from '@/assets/tournament-center/nav-frame.webp'
import navTeam from '@/assets/tournament-center/nav-team.webp'
import navTournament from '@/assets/tournament-center/nav-tournament.webp'
import navActivities from '@/assets/tournament-center/nav-activities.webp'
import navProfile from '@/assets/tournament-center/nav-profile.webp'

export type PageKey = 'team' | 'tournament' | 'activities' | 'profile'

withDefaults(defineProps<{ overlay?: boolean }>(), {
  overlay: false,
})

const active = defineModel<PageKey>('active', { required: true })

const items = [
  { key: 'team', label: '组队大厅', icon: navTeam },
  { key: 'tournament', label: '赛事中心', icon: navTournament },
  { key: 'activities', label: '活动资料', icon: navActivities },
  { key: 'profile', label: '个人中心', icon: navProfile },
] as const
</script>

<template>
  <VanTabbar
    v-model="active"
    class="bottom-navigation"
    :class="{ 'is-overlay': overlay }"
    :fixed="false"
    :border="false"
    :style="overlay ? undefined : { backgroundImage: `url(${navFrame})` }"
  >
    <VanTabbarItem v-for="item in items" :key="item.key" :name="item.key" :aria-label="item.label">
      <template #icon>
        <img :src="item.icon" alt="" />
      </template>
      {{ item.label }}
    </VanTabbarItem>
  </VanTabbar>
</template>

<style scoped>
.bottom-navigation {
  position: absolute;
  z-index: 20;
  right: 1.05%;
  bottom: 0.3%;
  left: 1.05%;
  width: auto;
  height: 8.45%;
  padding: 0.25% 1.2% 0.25%;
  overflow: hidden;
  border-radius: 999px;
  background-color: #f2f7ff;
  background-position: center;
  background-size: 100% 100%;
}

.bottom-navigation.is-overlay {
  opacity: 0;
  background-color: transparent;
  background-image: none !important;
}

.bottom-navigation :deep(.van-tabbar-item) {
  position: relative;
  color: #0a1e55;
  background: transparent;
}

.bottom-navigation :deep(.van-tabbar-item__icon) {
  width: clamp(45px, 12.8vw, 55px);
  height: clamp(39px, 11.2vw, 48px);
  margin: -2px auto -4px;
}

.bottom-navigation :deep(.van-tabbar-item__icon img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bottom-navigation :deep(.van-tabbar-item__text) {
  font-size: clamp(11px, 3.05vw, 13px);
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.bottom-navigation :deep(.van-tabbar-item--active) {
  color: #132b78;
  background: radial-gradient(ellipse at 50% 82%, rgba(45, 112, 255, 0.28), transparent 64%);
}

.bottom-navigation :deep(.van-tabbar-item--active::after) {
  content: '';
  position: absolute;
  right: 14%;
  bottom: -2%;
  left: 14%;
  height: 3px;
  background: radial-gradient(ellipse, #58c8ff 0, #347dff 42%, transparent 74%);
  filter: drop-shadow(0 0 3px #6edfff);
}

.bottom-navigation :deep(.van-tabbar-item--active .van-tabbar-item__icon) {
  filter: brightness(1.08) saturate(1.16) drop-shadow(0 0 5px rgba(72, 119, 255, 0.55));
}
</style>
