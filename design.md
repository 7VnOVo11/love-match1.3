# 项目设计文档

## 项目架构

这是一个全栈应用项目,采用前后端分离架构:
- 前端: React + TypeScript
- 后端: Express + TypeScript 
- 数据库: 待定

## 技术栈

### 前端
- React 18
- TypeScript
- Create React App
- CSS Modules
- Jest + Testing Library
- Web Vitals

### 后端
- Express
- TypeScript
- Cors
- Dotenv

## 目录结构

```
project-root/
├── client/                 # 前端项目目录
│   ├── public/            # 静态资源
│   ├── src/              # 源代码
│   ├── package.json      # 前端依赖配置
│   └── tsconfig.json     # TypeScript 配置
│
├── server/                # 后端项目目录
│   ├── src/              # 源代码
│   ├── package.json      # 后端依赖配置
│   └── tsconfig.json     # TypeScript 配置
│
└── design.md             # 项目设计文档
```

## 开发环境配置

### 前端开发服务器
- 默认端口: 3000
- 启动命令: `npm start`
- 构建命令: `npm run build`

### 后端开发服务器
- 默认端口: 3001
- 启动命令: `npm run dev`
- 构建命令: `npm run build`

## 关键配置说明

### 前端配置
- 支持 TypeScript
- 配置了基础的 ESLint 规则
- 支持 CSS Modules
- 配置了基础的测试环境

### 后端配置
- 启用了 CORS
- 使用 dotenv 管理环境变量
- TypeScript 严格模式
- 支持热重载开发

## 开发流程

1. 克隆项目后,分别在 client 和 server 目录下运行:
```bash
npm install
```

2. 开发模式启动:
- 前端: `cd client && npm start`
- 后端: `cd server && npm run dev`

3. 生产环境构建:
- 前端: `cd client && npm run build`
- 后端: `cd server && npm run build`

## 注意事项

1. 前端开发时需要确保后端服务正常运行
2. API 请求需要在前端配置正确的后端地址
3. 环境变量需要在 .env 文件中正确配置
4. 提交代码前需要确保测试通过