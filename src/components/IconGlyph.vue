<script setup lang="ts">
defineProps<{
  name:
    | 'home'
    | 'rooms'
    | 'trophy'
    | 'wallet'
    | 'user'
    | 'bell'
    | 'search'
    | 'filter'
    | 'plus'
    | 'arrow'
    | 'users'
    | 'spark'
    | 'check'
    | 'message'
    | 'clock'
    | 'shield'
    | 'close'
    | 'refresh'
}>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path v-if="name === 'home'" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />
    <path v-else-if="name === 'rooms'" d="M4 5h16v14H4zM4 9h16M8 5v14M12 14h5M12 17h3" />
    <path
      v-else-if="name === 'trophy'"
      d="M8 4h8v4c0 4-1.8 6-4 6s-4-2-4-6V4ZM8 6H4v2c0 2 1.4 3 4 3m8-5h4v2c0 2-1.4 3-4 3M12 14v4m-4 3h8m-7-3h6"
    />
    <path
      v-else-if="name === 'wallet'"
      d="M3 6h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V6Zm0 0 12-3v3m2 5h4v4h-4a2 2 0 0 1 0-4Z"
    />
    <path
      v-else-if="name === 'user'"
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9c.4-4.2 3.1-6.5 8-6.5s7.6 2.3 8 6.5"
    />
    <path v-else-if="name === 'bell'" d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 8H3c0-1 3-1 3-8Zm3 11h6" />
    <path
      v-else-if="name === 'search'"
      d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
    />
    <path v-else-if="name === 'filter'" d="M4 6h16M7 12h10m-7 6h4M8 4v4m8 2v4m-4 2v4" />
    <path v-else-if="name === 'plus'" d="M12 5v14M5 12h14" />
    <path v-else-if="name === 'arrow'" d="m9 5 7 7-7 7" />
    <path
      v-else-if="name === 'users'"
      d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9c.3-4.1 2.7-6.4 7-6.4s6.7 2.3 7 6.4m0-9a3.5 3.5 0 1 0 0-7m1 10c3 .4 4.7 2.4 5 6"
    />
    <path
      v-else-if="name === 'spark'"
      d="m12 2 1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8L12 2Zm7 12 .8 2.7L22 18l-2.2 1.3L19 22l-.8-2.7L16 18l2.2-1.3L19 14Z"
    />
    <path v-else-if="name === 'check'" d="m5 12 4 4L19 6" />
    <path v-else-if="name === 'message'" d="M4 4h16v13H9l-5 4V4Z" />
    <path v-else-if="name === 'clock'" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2" />
    <path
      v-else-if="name === 'shield'"
      d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-11 2 2 4-4"
    />
    <path v-else-if="name === 'close'" d="m5 5 14 14M19 5 5 19" />
    <path
      v-else-if="name === 'refresh'"
      d="M20 7v5h-5M4 17v-5h5m9.5-3A7.5 7.5 0 0 0 6 6m-.5 9A7.5 7.5 0 0 0 18 18"
    />
  </svg>
</template>

<style scoped>
svg {
  width: 1em;
  height: 1em;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
