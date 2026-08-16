# 九鼎电竞浅色 UI 素材库

本目录只保存以 `src/assets/ui-reference/team-light-master.png` 为统一基准的新浅色素材。旧版暗色素材已清空，不得混用。

## 验收基准

- 主验收设备：iPhone 14，CSS 视口 `390 × 844`。
- 设计参考图：`941 × 1672`。页面实现时按宽度等比映射；短屏允许纵向滚动，禁止横向溢出。
- 统一来源：企鹅、标题字形、底部导航框、四个导航图标全部以组队大厅参考图为准。
- 文字策略：页面标题和导航文字应使用真实 DOM 文本；本目录标题图片只用于字形、尺寸和位置比对。

## 正式素材

- `common/background/ice-vortex-portrait.png`：无文字、无控件的浅色冰雪漩涡背景。
- `common/mascot/penguin-team-exact-3x.png`：组队大厅企鹅精确裁切 3 倍版。
- `common/title/team-title-style-reference-3x.png`：主标题/副标题字形参考，不直接代替 DOM 文本。
- `common/title/team-header-master-reference-2x.png`：完整头部视觉比对切片。
- `common/navigation/bottom-nav-frame-blank-2x.png`：空白四栏导航框，可叠加真实图标和文字。
- `common/navigation/bottom-nav-master-reference-2x.png`：完整底栏比对切片。
- `common/navigation/icons/*-exact-3x.png`：四个导航图标精确裁切 3 倍版。

## 生成与淘汰规则

冰雪背景和空白导航框使用内置图像生成/编辑能力制作；企鹅及四个图标的 AI 高清重绘因轮廓、装备或几何结构漂移，均未达到 90% 还原门槛，因此没有进入正式素材目录。正式角色和图标改用参考图精确裁切与 Lanczos 比例放大，优先保证外观一致。

详见 `qa/visual-review.md` 与 `asset-manifest.json`。

## 当前接入状态

素材库已接入 `src/views/HomeView.vue`、`src/components/BottomNavigation.vue` 与 `src/components/PageHeroHeader.vue`。组队大厅、赛事中心和个人中心使用高清定稿图作为视觉基准层，底部覆盖真实 Vant Tabbar 交互；活动资料页使用本目录的冰雪背景、企鹅与导航素材构建。旧版 `ui-art` / `ui-extracted` 路径不再被运行时代码引用。

## 阶段 4、5、6 目录

- `common/navigation/states/`：三个已有页面的底栏选中态精确参考。
- `common/controls/`：筛选与金/蓝按钮的定稿精确参考。文字清除稿未通过，因此后续使用 CSS/Vant 生成空白控件。
- `team/art/`：精选徽章、房主头像与三枚普通房间段位图。
- `team/panels/`：精选房间和普通房间无文字复用底板。
- `team/references/`：搜索、筛选、三张房卡与双主操作精确参考。
- `tournament/art/`：周末赛奖杯与每日赛金铲精确场景切片。
- `tournament/panels/`：页签、周末赛与每日赛无文字复用底板。
- `tournament/references/`：赛事页签及两张赛事整卡精确参考。

阶段 4、5、6 的逐项验收见 `qa/stages-4-6-visual-review.md`。
