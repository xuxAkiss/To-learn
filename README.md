# KIXU LEARN

一个部署在 `kixuxs.vip/learn` 的个人职业成长与每日打卡应用。它不是单一技术课程表，而是把工程能力、作品与实习、方向实验、学业选择和关键决策点放在同一条路线上。

## 功能

- 按阶段自动生成每日任务，支持勾选、新增、删除和每日笔记
- 15 / 25 / 45 / 60 分钟专注计时，记入周投入
- 2026.08—2028.06 的职业路线图和四个证据决策点
- 游戏客户端、后端 / AI 应用、AI Infra / CANN、科研读研、公务员现实调查五类限时实验
- 周复盘、JSON 导入导出、离线访问和手机端布局

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:5173/learn/`。生产构建：

```bash
pnpm build
pnpm preview
```

应用数据默认保存在当前浏览器 `localStorage` 中。上线后建议每周在「周复盘」页导出一次 JSON 备份。

## 部署

见 [DEPLOY.md](./DEPLOY.md)。构建产物位于 `dist/`。

推送到 `main` 后，GitHub Actions 会自动构建并发布到 GitHub Pages。GitHub 项目页构建使用 `/To-learn/`，本地或独立域名构建默认使用 `/learn/`。
