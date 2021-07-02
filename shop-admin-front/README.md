# shop-admin-front项目

## 1. 项目简介

- 该项目为电商管理平台前端项目

> A Vue.js project

## 2. 部署电商管理项目后台api

**后台项目名称: `shop-api``**

### 2.1 创建数据库

1. 找到shop-api根目录下`shop-admin.sql`文件
2. navicat中新建数据库,默认名称为`shop-admin`
3. 执行`shop-admin.sql`脚本文件

### 2.2 修改配置文件

1. 修改`config/default.json`中的数据库连接配置

2. 修改`app.js`中 PORT启动端口号

### 2.3 项目目录上传的Linux服务器

### 2.4 运行该项目

1. 上传完成后,进入到项目根目录
2. 执行`npm run start` 启动后台api服务

## 3. 运行该项目(前台)

``` bash
npm run dev
```

