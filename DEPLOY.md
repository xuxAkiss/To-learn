# 部署到 kixuxs.vip/learn

## GitHub Pages

仓库的 `main` 分支推送后，`.github/workflows/deploy-pages.yml` 会自动发布。项目页预期地址是：

`https://xuxakiss.github.io/To-learn/`

GitHub Pages 的项目路径由仓库名决定，所以 `To-learn` 不会自动映射为 `/learn/`。要得到精确的 `https://kixuxs.vip/learn/`，可选择：

1. 如果 `kixuxs.vip` 本身已是 `xuxAkiss.github.io` 用户站，将此仓库改名为 `learn`。
2. 在现有主站仓库的 `learn/` 目录内发布这个构建产物。
3. 使用 Cloudflare Worker / 反向代理将 `/learn/*` 转发到 GitHub Pages 项目站。

## 通用静态托管

1. 运行 `pnpm build`。
2. 将 `dist/` 目录内的所有内容上传到站点根目录的 `learn/` 子目录。
3. 确认 `https://kixuxs.vip/learn/` 能返回 `learn/index.html`。
4. 若 CDN 开启了强缓存，首次发布后刷新 `/learn/index.html` 与 `/learn/sw.js` 缓存。

## Nginx 示例

```nginx
location = /learn {
    return 301 /learn/;
}

location /learn/ {
    try_files $uri $uri/ /learn/index.html;
}
```

将 `dist/` 内容复制到 Nginx 站点根目录下的 `learn/`。示例：若站点根目录是 `/var/www/kixuxs.vip`，则最终应存在 `/var/www/kixuxs.vip/learn/index.html`。

## Cloudflare Pages / Netlify 等平台

- Build command: `pnpm build`
- Output directory: `dist`
- 当主域名已绑定到另一个项目时，不要把这个应用单独绑到同一主域名；应将构建产物合并进现有站点的 `/learn/` 路径，或使用平台的路径重写 / Worker 代理。

## 数据边界

当前是无账号的 local-first 版本：手机和电脑各自保存数据，不会自动同步。若需要多设备同步，下一版需增加登录与后端数据库，这与静态上线是两个独立步骤。
