<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import roomMaster from '@/assets/ui-reference/team-room.png'
import roomBlankMaster from '@/assets/ui-kit-light/room/room-blank-master.png'
import penguin from '@/assets/ui-kit-light/common/mascot/penguin-team-exact-3x.png'

interface ChatMessage {
  id: number
  author: string
  text: string
  time: string
}

const route = useRoute()
const router = useRouter()
const toast = ref('')
const message = ref('')
const roomId = computed(() => String(route.params.roomId || '886421'))
const score = computed(() => String(route.query.score || '100'))
const mode = computed(() => String(route.query.mode || '怪兽入侵'))
const server = computed(() => String(route.query.server || '国际服'))
const hostName = '桃子爱吃糖糖（房主）'
const now = () => new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
let messageId = 1
const chatMessages = ref<ChatMessage[]>(
  route.query.created === '1'
    ? [{
        id: messageId,
        author: hostName,
        text: '大家好，请大家尽快进入上面房间，点击准备按钮，人齐我们就开始',
        time: now(),
      }]
    : [],
)

function showToast(text: string) {
  toast.value = text
  window.setTimeout(() => {
    if (toast.value === text) toast.value = ''
  }, 1600)
}

async function copyRoomNumber() {
  try {
    await navigator.clipboard.writeText(roomId.value)
  } catch {
    // Clipboard availability varies between local preview environments.
  }
  showToast(`房间号 ${roomId.value} 已复制`)
}

async function sendMessage(text = message.value) {
  const value = text.trim()
  if (!value) {
    showToast('请输入聊天内容')
    return
  }
  chatMessages.value.push({ id: ++messageId, author: hostName, text: value, time: now() })
  message.value = ''
  await nextTick()
  showToast('消息发送成功')
}
</script>

<template>
  <main class="room-shell">
    <section class="room-canvas" :aria-label="`组队房间 ${roomId}`">
      <img class="room-master" :src="roomMaster" :alt="`组队房间，房间号 ${roomId}`" />
      <img class="chat-blank-layer" :src="roomBlankMaster" alt="" />

      <div v-if="roomId !== '886421'" class="dynamic-room-number">#{{ roomId }}</div>
      <div v-if="server !== '国际服'" class="dynamic-server">◇ 金铲铲{{ server }}房间号 ◇</div>
      <div v-if="score !== '100'" class="dynamic-tag dynamic-score">{{ score }}分房</div>
      <div v-if="mode !== '怪兽入侵'" class="dynamic-tag dynamic-mode">{{ mode }}</div>

      <button class="hotspot settings" aria-label="房间设置" @click="showToast('房间设置功能准备中')"></button>
      <button class="hotspot invite" aria-label="邀请好友" @click="showToast('邀请链接已生成')"></button>
      <button class="hotspot leave" aria-label="离开房间" @click="router.push('/')"></button>
      <button class="hotspot copy" aria-label="复制房间号" @click="copyRoomNumber"></button>

      <button v-for="seat in [5, 6, 7, 8]" :key="seat" class="hotspot seat" :class="`seat-${seat}`" aria-label="邀请好友加入空位" @click="showToast('已打开好友邀请')"></button>

      <div class="chat-message-list" aria-live="polite">
        <article v-for="item in chatMessages" :key="item.id" class="chat-message-row">
          <img :src="penguin" alt="" />
          <div>
            <p class="chat-author">{{ item.author }} <time>{{ item.time }}</time></p>
            <p class="chat-bubble">{{ item.text }}</p>
          </div>
        </article>
      </div>
      <input v-model="message" class="chat-input" :class="{ filled: message }" placeholder=" " maxlength="80" aria-label="聊天内容" @keyup.enter="sendMessage()" />
      <button class="hotspot quick-one" aria-label="快捷消息：等人齐了就开始" @click="sendMessage('等人齐了就开始！')"></button>
      <button class="hotspot quick-two" aria-label="快捷消息：请大家准备一下" @click="sendMessage('请大家准备一下～')"></button>
      <button class="hotspot quick-three" aria-label="快捷消息：可以开始了" @click="sendMessage('可以开始了！')"></button>
      <button class="hotspot quick-four" aria-label="快捷消息：加油冲冲冲" @click="sendMessage('加油，冲冲冲！')"></button>
      <button class="hotspot send" aria-label="发送消息" @click="sendMessage()"></button>
      <button class="hotspot ready" aria-label="准备开始" @click="showToast('已准备，等待其他玩家')"></button>

      <button class="hotspot nav-team" aria-label="组队大厅"></button>
      <button class="hotspot nav-tournament" aria-label="赛事中心" @click="router.push('/')"></button>
      <button class="hotspot nav-activities" aria-label="活动资料" @click="router.push('/')"></button>
      <button class="hotspot nav-profile" aria-label="个人中心" @click="router.push('/')"></button>

      <div v-if="toast" class="room-toast" role="status">{{ toast }}</div>
    </section>
  </main>
</template>

<style scoped>
:global(html), :global(body), :global(#app) { min-height: 100%; margin: 0; }
:global(body) { min-width: 320px; overflow-x: hidden; background: #edf5ff; font-family: 'PingFang SC','Microsoft YaHei UI','Microsoft YaHei',sans-serif; }
.room-shell { min-height: 100dvh; display: grid; place-items: center; overflow: hidden; background: linear-gradient(90deg,#e7f0fb,#fff 50%,#e7f0fb); }
.room-canvas { position: relative; width: min(100vw,430px,56.28dvh); aspect-ratio: 941 / 1672; overflow: hidden; background: #f5faff; box-shadow: 0 0 42px rgba(41,75,128,.16); }
.room-master { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; user-select: none; -webkit-user-drag: none; }
.chat-blank-layer { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; object-fit: fill; clip-path: inset(70.45% 50.5% 15.05% 3.05%); pointer-events: none; }
.dynamic-room-number { position: absolute; z-index: 3; top: 16.4%; left: 22%; width: 56%; height: 6.5%; display: grid; place-items: center; color: #0a265e; background: rgba(247,251,255,.97); font-size: 9.8cqw; font-weight: 800; letter-spacing: .035em; text-shadow: 0 .3cqw 0 #fff,0 .5cqw .8cqw rgba(28,61,112,.2); }
.dynamic-server { position: absolute; z-index: 3; top: 13.1%; left: 27%; width: 46%; height: 2.8%; display: grid; place-items: center; color: #0a214e; background: rgba(249,252,255,.92); font-size: 3cqw; font-weight: 700; }
.dynamic-tag { position: absolute; z-index: 3; top: 23.25%; height: 2.5%; display: grid; place-items: center; color: #17316c; background: rgba(247,250,255,.98); border: .1cqw solid #bab7f3; border-radius: .45cqw; font-size: 2.35cqw; }
.dynamic-score { left: 28.1%; width: 16.7%; }
.dynamic-mode { left: 47.4%; width: 18.1%; }
.hotspot { position: absolute; z-index: 5; padding: 0; border: 0; outline-offset: -2px; background: transparent; cursor: pointer; }
.hotspot:focus-visible { outline: 2px solid #2b72e8; }
.settings { top: 2.3%; left: 67.3%; width: 8.2%; height: 6.2%; }
.invite { top: 2.3%; left: 77.2%; width: 8.7%; height: 6.2%; }
.leave { top: 2.3%; left: 87.2%; width: 8.3%; height: 6.2%; }
.copy { top: 23.1%; left: 69.1%; width: 20.9%; height: 3.4%; }
.seat { width: 15%; height: 10%; border-radius: 50%; }
.seat-5 { top: 45.2%; left: 80.5%; }
.seat-6 { top: 55.9%; left: 18.6%; }
.seat-7 { top: 55.9%; left: 41.5%; }
.seat-8 { top: 55.9%; left: 62.1%; }
.quick-one,.quick-two,.quick-three,.quick-four { left: 50.1%; width: 19.6%; height: 2.65%; }
.quick-one { top: 73.6%; } .quick-two { top: 76.3%; } .quick-three { top: 79%; } .quick-four { top: 81.7%; }
.chat-input { position: absolute; z-index: 7; top: 85.2%; left: 6.6%; width: 35.5%; height: 3.25%; box-sizing: border-box; padding: 0 1.5%; border: 0; border-radius: .8cqw; outline: 0; color: transparent; caret-color: #2f68bd; background: transparent; font-size: 2.35cqw; }
.chat-input:focus,.chat-input.filled { color: #19335d; background: rgba(250,252,255,.97); box-shadow: inset 0 0 0 .25cqw rgba(94,143,211,.22); }
.chat-message-list { position: absolute; z-index: 6; top: 71.2%; left: 4.6%; width: 43.5%; height: 13.2%; overflow-y: auto; padding: .4% .5%; box-sizing: border-box; scrollbar-width: thin; }
.chat-message-row { display: flex; align-items: flex-start; gap: 1cqw; margin-bottom: 1cqw; }
.chat-message-row > img { flex: 0 0 auto; width: 5.3cqw; height: 5.3cqw; border-radius: 50%; object-fit: cover; background: #edf6ff; }
.chat-message-row > div { min-width: 0; text-align: left; }
.chat-author { margin: 0 0 .35cqw; overflow: hidden; color: #1d3357; font-size: 1.85cqw; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
.chat-author time { margin-left: .6cqw; color: #77869b; font-size: .82em; }
.chat-bubble { display: inline-block; max-width: 100%; margin: 0; padding: .65cqw 1cqw; border-radius: .45cqw 1.1cqw 1.1cqw; color: #263d5f; background: rgba(234,240,248,.98); font-size: 1.9cqw; line-height: 1.35; text-align: left; word-break: break-word; box-shadow: 0 .15cqw .4cqw rgba(49,84,133,.12); }
.send { top: 85.4%; left: 55.8%; width: 13.5%; height: 3.4%; }
.ready { top: 70.9%; left: 72.4%; width: 23.4%; height: 17.2%; }
.nav-team,.nav-tournament,.nav-activities,.nav-profile { bottom: .6%; width: 23%; height: 8%; }
.nav-team { left: 2%; } .nav-tournament { left: 26%; } .nav-activities { left: 50.5%; } .nav-profile { left: 75%; }
.room-toast { position: absolute; z-index: 20; top: 47%; left: 50%; transform: translateX(-50%); padding: 2.2% 5%; border: 1px solid rgba(106,157,235,.75); border-radius: 999px; color: #fff; background: rgba(21,61,121,.9); font-size: clamp(11px,3vw,14px); white-space: nowrap; box-shadow: 0 5px 18px rgba(24,68,133,.25); }
@media (max-aspect-ratio: 941 / 1672) {
  .room-shell { place-items: start center; min-height: auto; }
  .room-canvas { width: 100vw; }
}
</style>
