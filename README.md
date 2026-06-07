# The Archive of Li Li

李莉的数字档案馆。  
这是一个 React + Vite + Tailwind 项目，不能直接用 `file:///.../index.html` 打开。

## 本地运行

```bash
cd /Users/apple/Documents/mywebsite/archive-of-li-li
npm install
npm run dev
```

然后打开终端里显示的地址，通常是：

```text
http://localhost:5173
```

## 修改内容

所有主要文字与图片路径集中在：

- `src/data/aiProducts.js`
- `src/data/researchProjects.js`
- `src/data/professionalCases.js`
- `src/data/lifeArchive.js`
- `src/data/cv.js`

## 替换图片

把真实图片放到：

- `public/images/projects/`
- `public/images/research/`
- `public/images/professional/`
- `public/images/life/`
- `public/images/drawings/`

然后在对应的 `src/data/*.js` 文件里替换 `image` 或 `src` 路径。

## 发布到 GitHub Pages

这个仓库已经包含 GitHub Actions 配置：

- `.github/workflows/deploy.yml`

推荐流程：

```bash
cd /Users/apple/Documents/mywebsite/archive-of-li-li
git add .
git commit -m "Prepare portfolio website for publishing"
git push origin main
```

然后在 GitHub 仓库里打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

以后更新网页时，只需要修改本地内容并再次提交、push：

```bash
cd /Users/apple/Documents/mywebsite/archive-of-li-li
git add .
git commit -m "Update portfolio content"
git push
```

当前远端仓库是：

```text
https://github.com/Leeli911/archive-of-li-li.git
```

按当前仓库名，发布地址通常是：

```text
https://leeli911.github.io/archive-of-li-li/
```

## 发布前状态

`生活札记` 已设置为公开发布时的待维护状态。原始照片数据仍保留在 `src/data/lifeArchive.js`，后续整理好照片后可以恢复照片墙展示。
