# 九鼎电竞前端项目文档

## 2026-08-17 高保真重建分步实施

### 步骤 1：设计画布锁定（已完成）

- **[修改]** `src/views/HomeView.vue`、`src/views/TeamRoomView.vue` - 将大厅与房间画布统一锁定为 `941 / 1672` 设计比例，宽度使用 `min(100vw, 430px, 56.28dvh)`，页面只做等比例缩放并在视口居中，移除会强制拉伸的独立 `100dvh` 高度和 `640px` 最小高度。
- **[验证]** 390 × 844 视口得到 390 × 692.95 画布，1440 × 900 视口得到 430 × 764.03 画布，两者宽高比均为 0.5628，与参考图 941 × 1672 一致；生产构建通过。

### 步骤 2：房间空白美术母版（已完成）

- **[新增]** `src/assets/ui-kit-light/room/room-blank-master.png` - 使用图像编辑技能从用户房间参考图生成 941 × 1672 空白动态母版，保留顶部品牌、操作入口、房间框、八座位、中央冰晶、聊天三栏、准备面板和底栏，清除动态房间号、玩家、消息及按钮文字。
- **[验证]** 与原参考图对比，顶部静态区域相似度 98.21%，底部导航 97.97%，包含动态内容移除范围的房间卡片区域 92.54%，均高于 91% 验收门槛。

### 步骤 3：动态房间数据接入母版（已完成）

- **[修改]** `src/views/TeamRoomView.vue` - 用空白美术母版替换原参考图加白色遮罩的实现，移除重复绘制的卡片边框、座位圆环、中央徽章、聊天面板和准备按钮背景；房间号、选项、房主、空席位、元数据、消息、快捷回复与准备状态按 941 × 1672 坐标覆盖。
- **[修改]** `src/views/TeamRoomView.vue` - 为房间画布加入 `container-type: inline-size`，动态文字和控件使用画布 `cqw` 比例，避免宽屏视口影响内部尺寸；原路由数据、空房间逻辑、聊天和操作行为未改变。

### 步骤 4：创建房间弹窗母版（已完成）

- **[新增]** `src/assets/ui-kit-light/modal/create-room-blank-master.png` - 使用图像编辑技能制作 941 × 1672 无文字、全控件未选中的创建房间母版，保留弹窗冰晶金线框、顶部水晶、关闭入口、输入框、8个选项框和蓝色创建按钮；动态文字与状态留给 HTML 覆盖。
- **[验证]** 弹窗顶部、左侧、右侧和底部框架相似度分别为 96.06%、97.29%、96.39% 和 95.75%，整个弹窗区域相似度 94.16%，高于 91% 门槛；第一次含错误图片文字的版本未采用。

### 步骤 5：创建房间弹窗动态接入（已完成）

- **[修改]** `src/views/HomeView.vue` - 使用弹窗母版的精确裁切区域覆盖实时大厅遮罩，移除 CSS 仿制的弹窗框、水晶、输入框和按钮外观；标题、标签、房间号、选项文字、错误提示和创建按钮文字按母版坐标动态覆盖。
- **[修改]** `src/views/HomeView.vue` - 保留原表单状态和校验，打开弹窗时全部选项为未选择，点击积分、模式和服务器后仅对应按钮显示蓝色与勾选状态，房间号和路由创建逻辑不变。

### 步骤 6：全流程功能复测（已完成）

- **[修改]** `src/views/TeamRoomView.vue` - 补齐创建房间和快速加入两类房间数据：创建房间为房主加7个空席位、人数1/8；快速加入为房主加3名示例队员及4个空席位、人数4/8，视觉仍使用同一空白母版。
- **[验证]** 创建房间路由参数、房间号、积分、模式、服务器、7个空席位、连续消息、回车发送、快捷消息、准备状态、复制房间号、离开返回与快速加入均通过；控制台无错误或警告。

## 2026-08-17 房间视觉恢复与尺寸优化

- **[修改]** `src/views/TeamRoomView.vue` - 恢复用户参考图中的组队房间顶部品牌区、三个操作按钮和底部导航视觉，以原房间定稿图作为固定视觉骨架，动态房间资料、空席位与聊天内容作为分层覆盖。
- **[修复]** `src/views/TeamRoomView.vue` - 移除房间页对 `PageHeroHeader` 的 `cqw` 尺寸依赖，消除宽屏浏览器中标题按视口放大并与房间内容重叠的问题；房间画布稳定限制为 430px。
- **[优化]** `src/views/TeamRoomView.vue` - 房间号卡片、房间资料按钮及中间匹配席位按原设计小幅缩小；成员席位恢复参考图的环形分布，新建房间仍仅显示房主和 7 个空席位。
- **[优化]** `src/views/TeamRoomView.vue` - 聊天区恢复“聊天记录 / 快捷消息 / 准备开始”三栏结构并适度加长，保持原按钮风格，同时继续支持消息数组、回车发送、快捷消息、自动滚动及准备状态。
- **[优化]** `src/views/HomeView.vue` - 小幅收窄创建房间弹窗和选项控件，使比例更接近参考图；未改变表单校验、点击后蓝色选中及路由数据逻辑。
- **[验证]** 已验证 390 × 844 手机视口和普通宽屏尺寸、创建动态房间、空席位及聊天发送，控制台无错误；本轮仅本地修改，未上传 GitHub。

## 2026-08-17 创建房间与动态聊天完善

- **[重构]** `src/views/HomeView.vue` - 将创建房间从带固定选中状态的整图热区重构为真实表单弹窗；积分、模式和服务器默认均不选中，仅点击对应按钮后显示蓝色选中状态，并加入 6 位房间号及必选项校验。
- **[重构]** `src/views/TeamRoomView.vue` - 改为路由参数驱动的动态房间页面，真实显示创建时填写的房间号、积分、模式和服务器；新建房间仅保留房主，其余 7 个席位为空，并将聊天区扩大为页面主体下方 27% 高度。
- **[完善]** `src/views/TeamRoomView.vue` - 聊天消息改为数组驱动，支持输入框回车、发送按钮和快捷消息连续发送、自动滚动与可见历史消息；保留固定顶部品牌区和底部导航，并补充准备、复制、邀请及离开交互。
- **[验证]** 完成 390 × 844 移动视口的创建校验、选中状态、动态路由、空房间席位、多条聊天消息及本地生产构建验证；本轮未提交或上传到 GitHub。

## 2026-08-17 组队房间与创建房间交互

- **[修改]** `src/views/HomeView.vue` - 为组队大厅的直达、精选房间、普通房间、快速开始与创建房间区域补充真实点击交互；创建房间以参考图全屏弹层展示，并支持房间号、积分、模式、服务器选择及确认创建。
- **[新增]** `src/views/TeamRoomView.vue` - 新增组队房间页面，按参考图还原房间号、成员席位、聊天区与底部导航，并提供复制房间号、发送消息、准备及离开房间交互。
- **[修改]** `src/router/index.ts` - 新增 `/room/:roomId` 组队房间路由，使快速加入和创建房间均能完成网页跳转。
- **[新增]** `src/assets/ui-reference/create-room-overlay.png`、`src/assets/ui-reference/team-room.png` - 保存用户提供的创建房间与组队房间高保真视觉参考，作为交互页面像素级底图。
- **[说明]** 本轮只进行本地实现和验证，未提交、推送或上传到 GitHub。

## 2026-08-17 页面接入与 GitHub Pages 发布

- **[修改]** `src/views/HomeView.vue` - 接入组队大厅、赛事中心、个人中心三张高清定稿图，以 iPhone 14 的 `390 × 844` 视口完整展示；新增活动资料“正在开发当中”页面并统一四栏切换状态。
- **[新增]** `src/components/BottomNavigation.vue` - 使用 Vant Tabbar 实现组队大厅、赛事中心、活动资料、个人中心四栏导航；定稿页采用透明交互覆盖层，保证视觉仍与参考图一致。
- **[新增]** `src/components/PageHeroHeader.vue` - 使用浅色企鹅与冰雪背景素材建立可复用的品牌页头组件。
- **[修改]** `src/assets/base.css` - 移除 Vue 模板默认主题，补充移动端全局盒模型、浅色背景、字体平滑及图片基础规则。
- **[修改]** `src/assets/main.css` - 移除桌面端双栏、宽度与内边距限制，使应用按移动端画布宽度显示。
- **[修改]** `src/main.ts` - 引入 Vant 官方基础样式，确保 Tabbar 按组件库规范渲染。
- **[修改]** `src/App.vue` - 移除 Vue 初始示例页头，仅保留 RouterView 作为页面出口。
- **[修改]** `src/assets/ui-kit-light/README.md` - 将素材状态更新为已接入页面与 Vant 导航。
- **[新增]** `src/assets/ui-kit-light/` - 纳入浅色冰雪主题背景、企鹅、导航、按钮、卡片、段位及赛事素材；素材体系以组队大厅定稿为统一基准。
- **[新增]** `src/assets/ui-reference/` - 纳入组队大厅、赛事中心、个人中心三张高清定稿视觉基准图。
- **[修改]** `vite.config.ts` - 设置 GitHub 项目站点基础路径 `/gamesPlatformFrontend/`；这是发布到仓库子路径必须修改的 `src/` 外配置例外，仅影响生产资源 URL。
- **[修改]** `index.html` - 将站点图标切换为 Vite 的 `%BASE_URL%` 路径，避免 GitHub Pages 子目录部署后请求到域名根目录而产生 404；这是发布所需的 `src/` 外文件例外。
- **[修改]** `package.json` - 固定已在本地构建通过的 TypeScript 6.0.3、`vue-tsc` 3.3.9 与当前开发工具版本，避免 GitHub Actions 使用 TypeScript 7 时触发 `ERR_PACKAGE_PATH_NOT_EXPORTED`；这是保证远端构建一致性的基础文件例外。
- **[修改]** `yarn.lock` - 同步 `package.json` 的已验证依赖解析，保证 GitHub Actions 的 `yarn install --immutable` 可复现本地构建结果；这是部署所需的基础文件例外。
- **[新增]** `.github/workflows/deploy-pages.yml` - 新增 GitHub Pages 自动构建与发布工作流；这是实现用户要求的 GitHub 域名发布所必需的 `src/` 外文件例外。
- **[修正]** `.github/workflows/deploy-pages.yml` - 移除 `setup-node` 在 Corepack 启用前调用系统 Yarn 1 的缓存探测，确保工作流先启用 Corepack、再使用项目指定的 Yarn 4.18.0 安装依赖。
- **[修改]** `docs.md` - 记录本次所有页面、素材及发布配置变更，并继续明确“日常开发优先只修改 `src/`，其他基础文件尽量不动”的最高优先级规则。

## 强制开发规则（最高优先级）

1. 每次新增、修改、移动或删除项目文件，都必须同步记录到根目录 `docs.md`。
2. 项目基础结构除 `src/` 外，其他基础文件尽量不要改动；页面、组件、样式和素材开发优先仅在 `src/` 内完成。
3. `docs.md` 是记录变更所必需的例外。只有需求无法在 `src/` 内完成时，才允许修改其他基础文件，并必须记录原因和影响。
4. 不得覆盖或清理与当前任务无关的用户改动。

## 2026-08-16 浅色共享素材重建

### 阶段 4、5、6：统一底栏、组队大厅、赛事中心

- **[新增]** `src/assets/ui-kit-light/common/navigation/states/team-active-reference-2x.png` - 保存组队大厅底栏选中态精确参考。
- **[新增]** `src/assets/ui-kit-light/common/navigation/states/tournament-active-reference-2x.png` - 保存赛事中心底栏选中态精确参考。
- **[新增]** `src/assets/ui-kit-light/common/navigation/states/profile-active-reference-2x.png` - 保存个人中心底栏选中态精确参考，用于统一高亮强度。
- **[新增]** `src/assets/ui-kit-light/common/controls/filter-score-master-reference-3x.png` - 保存大积分筛选按钮定稿参考。
- **[新增]** `src/assets/ui-kit-light/common/controls/filter-mode-master-reference-3x.png` - 保存小模式筛选按钮定稿参考。
- **[新增]** `src/assets/ui-kit-light/common/controls/button-gold-master-reference-3x.png` - 保存浅金主操作按钮定稿参考。
- **[新增]** `src/assets/ui-kit-light/common/controls/button-blue-master-reference-3x.png` - 保存冰蓝次操作按钮定稿参考。
- **[新增]** `src/assets/ui-kit-light/team/art/featured-rank-exact-3x.png` - 精确提取精选房间中央段位场景切片。
- **[新增]** `src/assets/ui-kit-light/team/art/host-avatar-exact-3x.png` - 精确提取精选房间房主头像。
- **[新增]** `src/assets/ui-kit-light/team/art/rank-773311-exact-3x.png` - 精确提取房间 773311 段位图。
- **[新增]** `src/assets/ui-kit-light/team/art/rank-552198-exact-3x.png` - 精确提取房间 552198 段位图。
- **[新增]** `src/assets/ui-kit-light/team/art/rank-229876-exact-3x.png` - 精确提取房间 229876 段位图。
- **[新增]** `src/assets/ui-kit-light/team/panels/featured-room-blank-2x.png` - 生成保留边框、飘带和冰漩涡的精选房间无文字底板。
- **[新增]** `src/assets/ui-kit-light/team/panels/room-card-blank-2x.png` - 生成普通房间列表无文字复用底板。
- **[新增]** `src/assets/ui-kit-light/team/references/search-master-2x.png` - 保存房号搜索条完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/featured-room-master-2x.png` - 保存精选房间完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/score-filter-row-2x.png` - 保存积分筛选行完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/mode-filter-row-2x.png` - 保存模式筛选行完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/room-card-773311-2x.png` - 保存房间 773311 完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/room-card-552198-2x.png` - 保存房间 552198 完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/room-card-229876-2x.png` - 保存房间 229876 完整精确参考。
- **[新增]** `src/assets/ui-kit-light/team/references/quick-start-master-2x.png` - 保存快速开始主操作完整参考。
- **[新增]** `src/assets/ui-kit-light/team/references/create-room-master-2x.png` - 保存创建房间主操作完整参考。
- **[新增]** `src/assets/ui-kit-light/tournament/art/weekend-trophy-exact-3x.png` - 精确提取周末赛奖杯场景切片。
- **[新增]** `src/assets/ui-kit-light/tournament/art/daily-spatula-exact-3x.png` - 精确提取每日赛金铲场景切片。
- **[新增]** `src/assets/ui-kit-light/tournament/panels/tabs-blank-2x.png` - 生成赛事双页签无文字底板。
- **[新增]** `src/assets/ui-kit-light/tournament/panels/weekend-card-blank-2x.png` - 生成周末赛无文字复用底板。
- **[新增]** `src/assets/ui-kit-light/tournament/panels/daily-card-blank-2x.png` - 生成每日赛无文字复用底板。
- **[新增]** `src/assets/ui-kit-light/tournament/references/tabs-master-2x.png` - 保存赛事页签完整精确参考。
- **[新增]** `src/assets/ui-kit-light/tournament/references/weekend-card-master-2x.png` - 保存周末赛完整精确参考。
- **[新增]** `src/assets/ui-kit-light/tournament/references/daily-card-master-2x.png` - 保存每日赛完整精确参考。
- **[新增]** `src/assets/ui-kit-light/qa/stages-4-6-visual-review.md` - 记录阶段 4、5、6 的逐项对照、SSIM、通过稿及淘汰稿。
- **[修改]** `src/assets/ui-kit-light/README.md` - 增加阶段 4、5、6 的素材目录、用途和接入约束。
- **[修改]** `src/assets/ui-kit-light/asset-manifest.json` - 登记阶段完成状态、目录路由和 SSIM 区间。
- **[修改]** `docs.md` - 逐项登记阶段 4、5、6 的全部新增与修改文件；除本规则文档外，本轮改动仍只位于 `src/assets/`。

- **[删除]** `src/assets/ui-art/` - 按用户要求清空上一版暗色运行素材目录，避免新旧主题混用。
- **[删除并迁移]** `src/assets/ui-extracted/` - 清空上一版暗色拆分素材；新素材统一迁移到 `src/assets/ui-kit-light/`。
- **[删除并重建]** `src/assets/ui-reference/` - 清空旧定稿参考，写入三张最新浅色界面参考图。
- **[新增]** `src/assets/ui-reference/team-light-master.png` - 保存组队大厅浅色界面，作为企鹅、标题体系和底栏的唯一统一基准。
- **[新增]** `src/assets/ui-reference/tournament-light.png` - 保存赛事中心浅色界面参考图。
- **[新增]** `src/assets/ui-reference/profile-light.png` - 保存个人中心浅色界面参考图。
- **[新增]** `src/assets/ui-kit-light/common/background/ice-vortex-portrait.png` - 生成无文字、无角色和无控件的浅色冰雪漩涡共享背景。
- **[新增]** `src/assets/ui-kit-light/common/mascot/penguin-team-exact-3x.png` - 从组队大厅基准图精确裁切并等比放大统一企鹅素材。
- **[新增]** `src/assets/ui-kit-light/common/title/team-title-style-reference-3x.png` - 保存组队大厅主副标题字形、间距和颜色参考。
- **[新增]** `src/assets/ui-kit-light/common/title/team-header-master-reference-2x.png` - 保存完整统一头部比对切片。
- **[新增]** `src/assets/ui-kit-light/common/navigation/bottom-nav-frame-blank-2x.png` - 生成移除图标和文字后的四栏浅色底部导航框。
- **[新增]** `src/assets/ui-kit-light/common/navigation/bottom-nav-master-reference-2x.png` - 保存完整统一底栏比对切片。
- **[新增]** `src/assets/ui-kit-light/common/navigation/icons/team-exact-3x.png` - 新增组队大厅精确底栏图标。
- **[新增]** `src/assets/ui-kit-light/common/navigation/icons/tournament-exact-3x.png` - 新增赛事中心精确底栏图标。
- **[新增]** `src/assets/ui-kit-light/common/navigation/icons/activities-exact-3x.png` - 新增活动资料精确底栏图标。
- **[新增]** `src/assets/ui-kit-light/common/navigation/icons/profile-exact-3x.png` - 新增个人中心精确底栏图标。
- **[新增]** `src/assets/ui-kit-light/README.md` - 记录 iPhone 14 验收基准、目录用途和正式素材使用规则。
- **[新增]** `src/assets/ui-kit-light/asset-manifest.json` - 记录素材尺寸、来源、处理方式与验收状态。
- **[新增]** `src/assets/ui-kit-light/qa/visual-review.md` - 记录逐项视觉对照、通过结果及未达 90% 的淘汰生成稿。
- **[说明]** 当前页面仍引用已清空的旧版 `ui-art` / `ui-extracted` 路径；本轮按“只制作素材”边界未修改 UI，下一轮接入新素材时必须同步替换这些引用并恢复构建验证。
- **[修改]** `docs.md` - 以可读中文重申“所有改动必须登记、除 `src/` 外基础文件尽量不动”的项目规则，并登记本轮素材重建；该文件是项目规则要求的必要文档例外。

# 历史项目文档

## 项目概述
这是一个游戏平台前端项目，基于Vue 3 + TypeScript + Vite构建，使用Vant UI组件库。

## 开发规则

### ⚠️ 重要规则
1. **每次新增、修改、移动或删除项目文件，都必须同步记录到根目录 `docs.md` 的“变更记录”中。**记录至少包含日期、操作类型、文件路径和改动目的；同一任务涉及多个文件时逐项列出，不得只写笼统描述。
2. **项目基础结构除了 `src/` 目录外，其他基础文件尽量不要改动。**日常页面、组件、样式、状态和业务逻辑开发应优先且尽可能只在 `src/` 内完成。
3. `docs.md` 是上述规则的必要例外：发生文件改动时允许并要求更新它。
4. 只有在需求无法通过 `src/` 内改动完成时，才可修改根目录配置、依赖清单、构建脚本、`public/`、`e2e/` 等基础结构；修改前应确认必要性，并在变更记录中写明原因和影响。
5. 不得为了顺手格式化、清理或统一风格而改动任务无关的基础文件；已有且与当前任务无关的改动应保留。

包括但不限于：
- 配置文件：`vite.config.ts`、`tsconfig.*.json`、`eslint.config.ts`、`playwright.config.ts`、`vitest.config.ts`
- 包管理文件：`package.json`、`yarn.lock`
- 其他配置：`.oxlintrc.json`、`.oxfmtrc.json` 等

默认开发范围：`src/`；默认禁止触碰范围：与需求无关的项目基础文件。

### 变更记录格式

```md
### YYYY-MM-DD
- **[新增/修改/移动/删除]** `文件路径` - 改动目的；如位于 `src/` 外，补充必要原因和影响
```

## 技术栈

### 核心技术
- **Vue 3.5.40** - 渐进式JavaScript框架
- **TypeScript 6.0.3** - 类型安全的JavaScript超集
- **Vite 8.1.5** - 新一代前端构建工具
- **Vue Router 5.2.0** - Vue官方路由管理器
- **Pinia 4.0.2** - Vue官方状态管理库

### UI组件库
- **Vant 4.10.0** - 已安装的移动端 Vue 组件库（当前入口未做全局注册）

### 开发工具
- **Vitest 4.1.10** - 单元测试框架
- **Playwright 1.61.1** - E2E测试框架
- **ESLint 10.7.0** - 代码质量检查
- **Oxlint 1.78.0** - 快速代码检查工具
- **Oxfmt 0.63.0** - 代码格式化工具

## 项目结构

```
gamesPlatformFrontend/
├── src/                        # 源代码目录（主要开发区域）
│   ├── assets/                # 静态资源
│   │   ├── base.css          # 基础样式
│   │   ├── main.css          # 主样式
│   │   └── logo.svg          # Logo图标
│   ├── components/            # 公共组件
│   │   ├── icons/            # 图标组件
│   │   ├── HelloWorld.vue    # 示例组件
│   │   ├── TheWelcome.vue    # 欢迎组件
│   │   ├── WelcomeItem.vue   # 欢迎项组件
│   │   └── __tests__/        # 组件测试
│   ├── router/                # 路由配置
│   │   └── index.ts          # 路由定义
│   ├── stores/                # 状态管理
│   │   └── counter.ts        # 计数器store示例
│   ├── views/                 # 页面视图
│   │   ├── HomeView.vue      # 首页
│   │   └── AboutView.vue     # 关于页
│   ├── App.vue                # 根组件
│   └── main.ts                # 应用入口
├── e2e/                       # E2E测试
├── public/                    # 公共静态资源
├── .vscode/                   # VSCode配置
├── node_modules/              # 依赖包
├── package.json               # 项目配置（⚠️ 不要动）
├── vite.config.ts            # Vite配置（⚠️ 不要动）
├── tsconfig.*.json           # TypeScript配置（⚠️ 不要动）
├── eslint.config.ts          # ESLint配置（⚠️ 不要动）
└── README.md                  # 项目说明
```

## 当前应用架构

- **启动链路**：`index.html` → `src/main.ts` → `src/App.vue` → `src/router/index.ts` → 页面视图。
- **应用入口**：`src/main.ts` 创建 Vue 应用，注册 Pinia 与 Vue Router，并挂载到 `#app`。
- **根组件**：`src/App.vue` 仅负责渲染 `RouterView`，页面内容由路由控制。
- **路由层**：`src/router/index.ts` 使用 HTML5 History；`/` 加载首页，`/about` 懒加载关于页。
- **页面层**：`src/views/HomeView.vue` 是当前核心页面，集中承载组队大厅、赛事中心、活动资料占位页、个人中心、统一底部导航及页面级样式；四个展示页使用本地响应式状态切换，不改变浏览器路由。
- **组件层**：`src/components/PageHeroHeader.vue` 统一三页顶部品牌区；`src/components/BottomNavigation.vue` 统一四栏底部导航；`src/components/IconGlyph.vue` 为旧版保留组件，其余组件和测试主要保留 Vue 初始模板结构。
- **状态层**：Pinia 已接入，`src/stores/counter.ts` 仍为示例 Store；当前首页状态主要使用 Vue Composition API 的本地响应式状态。
- **样式层**：`src/assets/main.css` 为全局样式入口，`src/assets/base.css` 提供基础样式；首页的大部分专属样式位于 `HomeView.vue`。
- **静态资源**：应用通过 `/tft-assets/...` 使用 `public/tft-assets/` 中的 TFT 图片；`CommunityDragon_TFT素材/`、`jcc/` 与 `design-output/` 属于素材或设计参考，不是运行时代码。
- **测试层**：`src/components/__tests__/` 放置 Vitest 组件测试，`e2e/` 放置 Playwright 端到端测试。

## 功能需求（根据UI设计图）

### 主页面功能模块
1. **顶部Header**
   - Logo: "GAMEON"
   - 未读消息通知
   - 分类选择下拉菜单（未来添加）

2. **在线玩家统计**
   - 显示当前在线玩家数量（如：1,286 名玩家正在线）

3. **标语区域**
   - "今晚，找到你的最佳队友。"

4. **搜索功能**
   - 搜索房间号、房主或标签

5. **房间操作按钮**
   - "创建房间"按钮
   - "去创建自己线"按钮

6. **赛事卡片（WEEKEND CUP）**
   - 赛事名称：金铲铲周末杯
   - 参赛名额：128
   - 奖金池：50,000
   - 报名时间：平周六 20:00 开赛
   - "立即报名"按钮（右上角有"最火"标签）

7. **游戏分类图标**
   - JCC
   - 英雄联盟
   - 斗地主

8. **组队大厅（TEAM LOBBY）**
   - 标题：JCC 组队大厅
   - 金额筛选按钮：全部、100、200、300、500

9. **底部导航栏（以个人中心定稿图为统一基准）**
   - 组队大厅
   - 赛事中心
   - 活动资料（当前显示“正在开发当中”）
   - 个人中心

## Git信息
- **当前分支**: main
- **Git用户**: 970528daan-droid
- **最近提交**: b3d8526 初始化

## 变更记录

### 2026-08-16
- **[创建]** `docs.md` - 创建项目文档，记录项目架构和开发规则
- **[修改]** `docs.md` - 补充当前应用架构；明确所有文件改动必须同步登记，并将“除 `src/` 外的基础文件尽量不改动”设为项目级开发规则。本文件是记录规则所要求的必要文档例外，不影响运行时代码。
- **[修改]** `src/main.ts` - 引入 Vant 全量基础样式，使页面中的 Vant Tabbar、Button、Field、Tabs、Tag、Cell、Grid 等组件按组件库规范显示。
- **[重构]** `src/views/HomeView.vue` - 根据“组队大厅、赛事中心、个人中心”三张定稿图搭建移动端展示界面；以个人中心定稿的四栏底部导航为统一基准，加入“活动资料”开发中占位页，并使用 Vant 组件完成页面结构与本地界面切换。所有运行时代码改动均位于 `src/` 内。
- **[修改]** `docs.md` - 按项目规则登记本次 UI 开发涉及的全部源文件；本文件为变更记录的必要例外。
- **[新增]** `src/components/PageHeroHeader.vue` - 新增三页共用顶部品牌组件，统一企鹅、宇宙漩涡、金色主标题和“九鼎电竞”副标题，仅通过 `title` 参数切换页面名称。
- **[新增]** `src/components/BottomNavigation.vue` - 新增四页共用 Vant Tabbar 导航，固定“组队大厅 / 赛事中心 / 活动资料 / 个人中心”顺序、图标与高亮规则。
- **[重构]** `src/views/HomeView.vue` - 按三张最终定稿图重新实现真实 DOM/Vant 页面，保留房间、赛事、账户与菜单数据结构；增加 9:16 等比例响应式规则和活动资料开发中占位页。
- **[新增]** `src/assets/ui-reference/team-final.png` - 保存组队大厅最终定稿图，作为视觉比对与装饰素材拆取来源；原文件真实尺寸为 1882×3344，未直接作为整页网页显示。
- **[新增]** `src/assets/ui-reference/tournament-final.png` - 保存赛事中心最终定稿图，作为视觉比对与装饰素材拆取来源，未直接作为整页网页显示。
- **[新增]** `src/assets/ui-reference/profile-final.png` - 保存个人中心最终定稿图，作为视觉比对与装饰素材拆取来源，未直接作为整页网页显示。
- **[新增]** `src/assets/ui-art/hero-penguin.png` - 从定稿图拆取公共顶部皇冠企鹅装饰素材。
- **[新增]** `src/assets/ui-art/hero-vortex.png` - 从定稿图拆取公共顶部宇宙漩涡背景素材。
- **[新增]** `src/assets/ui-art/featured-rank.png` - 从定稿图拆取精选房间紫金段位徽章素材。
- **[新增]** `src/assets/ui-art/room-rank-1.png` - 从定稿图拆取普通房间第一枚段位徽章素材。
- **[新增]** `src/assets/ui-art/room-rank-2.png` - 从定稿图拆取普通房间第二枚段位徽章素材。
- **[新增]** `src/assets/ui-art/room-rank-3.png` - 从定稿图拆取普通房间第三枚段位徽章素材。
- **[新增]** `src/assets/ui-art/event-trophy.png` - 从定稿图拆取九鼎周末夜赛紫金奖杯素材。
- **[新增]** `src/assets/ui-art/event-spatula.png` - 从定稿图拆取九鼎每日夜赛金色铲子素材。
- **[新增]** `src/assets/ui-art/profile-avatar.png` - 从定稿图拆取个人资料卡皇冠企鹅头像素材。
- **[新增]** `src/assets/ui-art/wallet-spatula.png` - 从定稿图拆取“我的铲子”装饰素材。
- **[新增]** `src/assets/ui-art/member-badge.png` - 从定稿图拆取九鼎会员紫金徽章素材。
- **[新增]** `src/assets/ui-art/nav-team.png` - 从定稿图拆取底栏组队大厅统一图标。
- **[新增]** `src/assets/ui-art/nav-tournament.png` - 从定稿图拆取底栏赛事中心统一图标。
- **[新增]** `src/assets/ui-art/nav-activities.png` - 从定稿图拆取底栏活动资料统一图标。
- **[新增]** `src/assets/ui-art/nav-profile.png` - 从定稿图拆取底栏个人中心统一图标。
- **[新增]** `src/assets/ui-art/menu-archive.png` - 从定稿图拆取游戏档案图标。
- **[新增]** `src/assets/ui-art/menu-performance.png` - 从定稿图拆取我的战绩图标。
- **[新增]** `src/assets/ui-art/menu-record.png` - 从定稿图拆取比赛记录图标。
- **[新增]** `src/assets/ui-art/menu-credit.png` - 从定稿图拆取信誉记录图标。
- **[新增]** `src/assets/ui-art/menu-friends.png` - 从定稿图拆取好友关注图标。
- **[新增]** `src/assets/ui-art/menu-notice.png` - 从定稿图拆取通知中心图标。
- **[新增]** `src/assets/ui-art/menu-prize.png` - 从定稿图拆取我的奖品图标。
- **[新增]** `src/assets/ui-art/menu-appeal.png` - 从定稿图拆取申诉记录图标。
- **[新增]** `src/assets/ui-art/menu-help.png` - 从定稿图拆取帮助中心图标。
- **[新增]** `src/assets/ui-art/menu-settings.png` - 从定稿图拆取设置图标。
- **[修改]** `docs.md` - 更新公共组件架构并逐项登记本轮像素级定稿还原涉及的组件、页面和装饰素材；所有运行时代码与资源仍位于 `src/`。
- **[新增]** `src/assets/ui-extracted/README.md` - 新增定稿图无损拆分素材说明，明确共享头部与底栏统一采用组队大厅定稿图，并声明本轮未接入 UI。
- **[新增]** `src/assets/ui-extracted/common/header/header-master.png` - 从组队大厅定稿图无损提取完整统一头部参考切片。
- **[新增]** `src/assets/ui-extracted/common/header/penguin-master.png` - 从组队大厅定稿图无损提取统一企鹅区域。
- **[新增]** `src/assets/ui-extracted/common/header/title-team-master.png` - 从组队大厅定稿图无损提取统一主标题字体区域。
- **[新增]** `src/assets/ui-extracted/common/header/subtitle-master.png` - 从组队大厅定稿图无损提取“九鼎电竞”副标题区域。
- **[新增]** `src/assets/ui-extracted/common/header/vortex-master.png` - 从组队大厅定稿图无损提取统一顶部漩涡背景区域。
- **[新增]** `src/assets/ui-extracted/common/navigation/bottom-navigation-master.png` - 从组队大厅定稿图无损提取完整统一底部导航栏。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-team-item.png` - 从统一底栏提取组队大厅栏位参考切片。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-tournament-item.png` - 从统一底栏提取赛事中心栏位参考切片。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-activities-item.png` - 从统一底栏提取活动资料栏位参考切片。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-profile-item.png` - 从统一底栏提取个人中心栏位参考切片。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-team-icon.png` - 从统一底栏提取组队大厅图标区域。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-tournament-icon.png` - 从统一底栏提取赛事中心图标区域。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-activities-icon.png` - 从统一底栏提取活动资料图标区域。
- **[新增]** `src/assets/ui-extracted/common/navigation/nav-profile-icon.png` - 从统一底栏提取个人中心图标区域。
- **[新增]** `src/assets/ui-extracted/common/controls/button-gold-large.png` - 提取大型金色按钮参考切片。
- **[新增]** `src/assets/ui-extracted/common/controls/button-blue-small.png` - 提取小型蓝色按钮参考切片。
- **[新增]** `src/assets/ui-extracted/common/controls/button-purple-action.png` - 提取大型紫色操作按钮参考切片。
- **[新增]** `src/assets/ui-extracted/common/controls/button-gold-action.png` - 提取大型金色操作按钮参考切片。
- **[新增]** `src/assets/ui-extracted/common/controls/button-purple-large.png` - 从赛事定稿图提取紫色赛事按钮参考切片。
- **[新增]** `src/assets/ui-extracted/common/controls/button-gold-event.png` - 从赛事定稿图提取金色赛事按钮参考切片。
- **[新增]** `src/assets/ui-extracted/team/search-bar-master.png` - 提取组队大厅搜索栏参考切片。
- **[新增]** `src/assets/ui-extracted/team/search-direct-button.png` - 提取组队大厅搜索直达按钮。
- **[新增]** `src/assets/ui-extracted/team/featured-room-master.png` - 提取精选房间完整参考切片。
- **[新增]** `src/assets/ui-extracted/team/featured-room-ribbon.png` - 提取精选房间标题飘带。
- **[新增]** `src/assets/ui-extracted/team/featured-rank-emblem.png` - 提取精选房间中央段位徽章区域。
- **[新增]** `src/assets/ui-extracted/team/featured-host-avatar.png` - 提取精选房间房主头像区域。
- **[新增]** `src/assets/ui-extracted/team/score-filter-row.png` - 提取组队大厅积分筛选行。
- **[新增]** `src/assets/ui-extracted/team/mode-filter-row.png` - 提取组队大厅模式筛选行。
- **[新增]** `src/assets/ui-extracted/team/room-card-773311.png` - 提取 773311 房间完整卡片。
- **[新增]** `src/assets/ui-extracted/team/room-card-552198.png` - 提取 552198 房间完整卡片。
- **[新增]** `src/assets/ui-extracted/team/room-card-229876.png` - 提取 229876 房间完整卡片。
- **[新增]** `src/assets/ui-extracted/team/room-rank-773311.png` - 提取 773311 房间段位图标区域。
- **[新增]** `src/assets/ui-extracted/team/room-rank-552198.png` - 提取 552198 房间段位图标区域。
- **[新增]** `src/assets/ui-extracted/team/room-rank-229876.png` - 提取 229876 房间段位图标区域。
- **[新增]** `src/assets/ui-extracted/team/quick-start-master.png` - 提取快速开始操作区。
- **[新增]** `src/assets/ui-extracted/team/create-room-master.png` - 提取创建房间操作区。
- **[新增]** `src/assets/ui-extracted/tournament/tabs-master.png` - 提取赛事中心双页签参考切片。
- **[新增]** `src/assets/ui-extracted/tournament/weekend-card-master.png` - 提取九鼎周末夜赛完整卡片。
- **[新增]** `src/assets/ui-extracted/tournament/weekend-trophy.png` - 提取周末夜赛奖杯区域。
- **[新增]** `src/assets/ui-extracted/tournament/weekend-register-button.png` - 提取周末夜赛报名按钮。
- **[新增]** `src/assets/ui-extracted/tournament/weekend-detail-button.png` - 提取周末夜赛详情按钮。
- **[新增]** `src/assets/ui-extracted/tournament/daily-card-master.png` - 提取九鼎每日夜赛完整卡片。
- **[新增]** `src/assets/ui-extracted/tournament/daily-spatula.png` - 提取每日夜赛金色铲子区域。
- **[新增]** `src/assets/ui-extracted/tournament/daily-register-button.png` - 提取每日夜赛报名按钮。
- **[新增]** `src/assets/ui-extracted/tournament/daily-detail-button.png` - 提取每日夜赛详情按钮。
- **[新增]** `src/assets/ui-extracted/profile/profile-card-master.png` - 提取个人资料完整卡片。
- **[新增]** `src/assets/ui-extracted/profile/profile-avatar.png` - 提取个人中心皇冠企鹅头像区域。
- **[新增]** `src/assets/ui-extracted/profile/rank-tag.png` - 提取个人中心段位标签。
- **[新增]** `src/assets/ui-extracted/profile/credit-tag.png` - 提取个人中心信用标签。
- **[新增]** `src/assets/ui-extracted/profile/edit-profile-button.png` - 提取编辑资料按钮。
- **[新增]** `src/assets/ui-extracted/profile/wallet-panel-master.png` - 提取“我的铲子”完整面板。
- **[新增]** `src/assets/ui-extracted/profile/wallet-spatula.png` - 提取钱包金色铲子区域。
- **[新增]** `src/assets/ui-extracted/profile/recharge-button.png` - 提取充值按钮。
- **[新增]** `src/assets/ui-extracted/profile/points-detail-button.png` - 提取积分明细按钮。
- **[新增]** `src/assets/ui-extracted/profile/member-panel-master.png` - 提取九鼎会员完整面板。
- **[新增]** `src/assets/ui-extracted/profile/member-badge.png` - 提取九鼎会员徽章区域。
- **[新增]** `src/assets/ui-extracted/profile/membership-button.png` - 提取开通会员按钮。
- **[新增]** `src/assets/ui-extracted/profile/menu-card-left-master.png` - 提取个人中心左侧菜单卡片参考切片。
- **[新增]** `src/assets/ui-extracted/profile/menu-card-right-master.png` - 提取个人中心右侧菜单卡片参考切片。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/archive.png` - 提取游戏档案图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/performance.png` - 提取我的战绩图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/match-record.png` - 提取比赛记录图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/credit-record.png` - 提取信誉记录图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/friends.png` - 提取好友关注图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/notice.png` - 提取通知中心图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/prize.png` - 提取我的奖品图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/appeal.png` - 提取申诉记录图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/help.png` - 提取帮助中心图标区域。
- **[新增]** `src/assets/ui-extracted/profile/menu-icons/settings.png` - 提取设置图标区域。
- **[修改]** `docs.md` - 按项目规则逐项登记本轮 69 个无损拆分 PNG 与素材说明文件；除本记录外，本轮改动全部位于 `src/assets/`，未修改 UI 源码及其他基础文件。
- **[修改]** `src/views/HomeView.vue` - 将移动端画布改为以 iPhone 14 的 390×844 为验收基准，按定稿图坐标重新标定组队大厅全部模块高度、间距与纵向顺序；改用高清拆分徽章素材，消除主体与底栏之间的空白，并隐藏占宽滚动条以保证短屏仅纵向滚动、无横向溢出。
- **[修改]** `src/components/PageHeroHeader.vue` - 统一使用组队大厅定稿图拆分的高清企鹅与宇宙漩涡素材，按 iPhone 14 基准调整头部高度、企鹅、标题及副标题位置，并改为随移动画布等比缩放。
- **[修改]** `src/components/BottomNavigation.vue` - 统一使用组队大厅定稿图拆分的四个高清底栏图标，按 iPhone 14 基准调整底栏高度、图标尺寸与文字比例，并保持公共 Vant Tabbar 的真实点击切换。
- **[修改]** `docs.md` - 登记本轮 iPhone 14 像素验收基准、高清素材接入、组队大厅坐标重排及多尺寸滚动兼容改动；未修改 `src/` 外的其他项目基础文件。
