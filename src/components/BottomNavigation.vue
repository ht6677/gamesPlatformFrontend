<script setup lang="ts">
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant'
import navFrame from '@/assets/ui-kit-light/common/navigation/bottom-nav-frame-blank-2x.png'
import navTeam from '@/assets/ui-kit-light/common/navigation/icons/team-exact-3x.png'
import navTournament from '@/assets/ui-kit-light/common/navigation/icons/tournament-exact-3x.png'
import navActivities from '@/assets/ui-kit-light/common/navigation/icons/activities-exact-3x.png'
import navProfile from '@/assets/ui-kit-light/common/navigation/icons/profile-exact-3x.png'

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
  height: 8.55%;
  padding: 0.4% 1.2% 0.2%;
  overflow: hidden;
  border-radius: 999px;
  background-color: transparent;
  background-position: center;
  background-size: 100% 100%;
}

.bottom-navigation.is-overlay {
  opacity: 0;
  background-image: none !important;
}

.bottom-navigation :deep(.van-tabbar-item) {
  position: relative;
  color: #0a1e55;
  background: transparent;
}

.bottom-navigation :deep(.van-tabbar-item__icon) {
  width: clamp(42px, 12vw, 52px);
  height: clamp(36px, 10.2vw, 44px);
  margin: 0 auto -2px;
}

.bottom-navigation :deep(.van-tabbar-item__icon img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.bottom-navigation :deep(.van-tabbar-item__text) {
  font-size: clamp(11px, 3vw, 13px);
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.bottom-navigation :deep(.van-tabbar-item--active) {
  color: #132b78;
  background: radial-gradient(ellipse at 50% 58%, rgba(75, 132, 255, 0.22), transparent 68%);
}

.bottom-navigation :deep(.van-tabbar-item--active .van-tabbar-item__icon) {
  filter: brightness(1.08) saturate(1.16) drop-shadow(0 0 5px rgba(72, 119, 255, 0.55));
}
</style>
