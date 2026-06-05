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
