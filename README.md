# Vue 电商后台管理系统后台 API 接口服务器

## 项目在线浏览地址: http://8.210.122.12:13455/#/login
### 登录信息
- 用户名: admin
- 密码: 123456

## 1. 技术栈

- Node.js
- Express
- MySQL
- vue.js全家桶 (2.6版本)
- webpack
- ElementUI

## 2. 项目整体文件说明

### 2.1 后台项目(shop_api)

- `config` 配置文件目录
  - `default.json` 默认配置文件（其中包含数据库配置，jwt配置）
- `dao` 数据访问层，存放对数据库的增删改查操作
  - `DAO.js` 提供的公共访问数据库的方法
- `models` 存放具体数据库 ORM 模型文件
- `modules` 当前项目模块
  - `authorization.js` API权限验证模块
  - `database.js` 数据库模块（数据库加载基于 nodejs-orm2 库加载）
  - `passport.js` 基于 passport 模块的登录搭建
  - `resextra.js` API 统一返回结果接口
- `node_modules` 项目依赖的第三方模块
- `routes` 统一路由
  - `api` 提供 api 接口
  - `mapp` 提供移动APP界面
  - `mweb` 提供移动web站点
- `services` 服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据
- `app.js` 主项目入口文件
- `package.json` 项目配置文件

### 2.2 前端项目(shop_admin_front)

- `build` webpack及vue-loader配置文件目录
- `config` 项目运行配置文件目录
- `dist` 打包编译后的文件目录
- `src`: 项目源代码目录
  - `assets`: 项目静态资源,包含全局css,图片 logo等
  - `components`: vue组件
  - `router`: vue-router文件,实现SPA应用的路由管理
  - `APP.vue` : 项目根组件,作为视图的主入口
  - `main.js` : 项目入口文件

## 3. 后台接口说明

### 接口说明

- 接口基准地址：`http://自己的域名/api/private/v1/`
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |

## 登录

### 登录验证接口

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名   | 参数说明    | 备注                   |
| -------- | ----------- | ---------------------- |
| id       | 用户 ID     |                        |
| rid      | 用户角色 ID |                        |
| username | 用户名      |                        |
| mobile   | 手机号      |                        |
| email    | 邮箱        |                        |
| token    | 令牌        | Bearer eyJhbGc ....... |

- 响应数据

```js
{
  "data"
:
  {
    "id"
  :
    500,
            "rid"
  :
    0,
            "username"
  :
    "admin",
            "mobile"
  :
    "123",
            "email"
  :
    "123@qq.com",
            "token"
  :
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I......"
  }
,
  "meta"
:
  {
    "msg"
  :
    "登录成功",
            "status"
  :
    200
  }
}
```

## 用户管理

### 用户数据列表

- 请求路径：users
- 请求方法：get
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数     | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

- 响应参数

| 参数名  | 参数说明     | 备注 |
| ------- | ------------ | ---- |
| total   | 总个数       |      |
| pagenum | 当前页码     |      |
| users   | 用户数据集合 |      |

- 响应数据

```
{
    "data": {
        "total": 5,
        "pagenum": 4,
        "users": [
            {
                "id": 25,
                "username": "tige117",
                "mobile": "18616358651",
                "type": 1,
                "openid": "",
                "email": "tige112@163.com",
                "create_time": "2017-11-09T20:36:26.000Z",
                "modify_time": null,
                "is_delete": false,
                "is_active": false
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 添加用户

- 请求路径：users
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名称 | 不能为空 |
| password | 用户密码 | 不能为空 |
| email    | 邮箱     | 可以为空 |
| mobile   | 手机号   | 可以为空 |

- 响应参数

| 参数名      | 参数说明    | 备注      |
| ----------- | ----------- | --------- |
| id          | 用户 ID     |           |
| role_id     | 用户角色 ID | 默认 : -1 |
| username    | 用户名      |           |
| mobile      | 手机号      |           |
| email       | 邮箱        |           |
| create_time | 创建时间    |           |

- 响应数据

```
{
    "data": {
        "id": 28,
        "username": "tige1200",
        "mobile": "test",
        "role_id": -1,
        "openid": "",
        "email": "test@test.com",
        "create_time": "1553526029",
    },
    "meta": {
        "msg": "用户创建成功",
        "status": 201
    }
}
```

### 修改用户状态

- 请求路径：users/:uId/state/:type
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注                                        |
| ------ | -------- | ------------------------------------------- |
| uId    | 用户 ID  | 不能为空`携带在url中`                       |
| type   | 用户状态 | 不能为空`携带在url中`，值为 true 或者 false |

- 响应数据

```
{
  "data": {
    "id": 566,
    "rid": 30,
    "username": "admin",
    "mobile": "123456",
    "email": "bb@itcast.com",
    "mg_state": 0
  },
  "meta": {
    "msg": "设置状态成功",
    "status": 200
  }
}
```

### 根据 ID 查询用户信息

- 请求路径：users/:id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| role_id | 角色 ID  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

- 响应数据

```
{
    "data": {
        "id": 503,
        "username": "admin3",
        "role_id": 0,
        "mobile": "00000",
        "email": "new@new.com"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 编辑用户提交

- 请求路径：users/:id
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注                        |
| ------ | -------- | --------------------------- |
| id     | 用户 id  | 不能为空 `参数是url参数:id` |
| email  | 邮箱     | 可以为空                    |
| mobile | 手机号   | 可以为空                    |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| role_id | 角色 ID  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

- 响应数据

```
/* 200表示成功，500表示失败 */
{
    "data": {
        "id": 503,
        "username": "admin3",
        "role_id": 0,
        "mobile": "111",
        "email": "123@123.com"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 删除单个用户

- 请求路径：users/:id
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 id  | 不能为空`参数是url参数:id` |

- 响应参数
- 响应数据

```
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

### 分配用户角色

- 请求路径：users/:id/role
- 请求方法：put
- 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 ID  | 不能为空`参数是url参数:id` |
| rid    | 角色 id  | 不能为空`参数body参数`     |

- 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | 用户 ID  |      |
| role_id | 角色 ID  |      |
| mobile  | 手机号   |      |
| email   | 邮箱     |      |

- 响应数据

```
{
    "data": {
        "id": 508,
        "rid": "30",
        "username": "asdf1",
        "mobile": "123123",
        "email": "adfsa@qq.com"
    },
    "meta": {
        "msg": "设置角色成功",
        "status": 200
    }
}
```

## 权限管理

### 所有权限列表

- 请求路径：rights/:type
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                                                                         |
| ------ | -------- | ---------------------------------------------------------------------------- |
| type   | 类型     | 值: list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type` |

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| id       | 权限 ID      |      |
| authName | 权限说明     |      |
| level    | 权限层级     |      |
| pid      | 权限父 ID    |      |
| path     | 对应访问路径 |      |

- 响应数据 type=list

```
  {
    "data": [
        {
            "id": 101,
            "authName": "商品管理",
            "level": "0",
            "pid": 0,
            "path": null
        },
        {
            "id": 102,
            "authName": "订单管理",
            "level": "0",
            "pid": 0,
            "path": null
        }
    ],
    "meta": {
        "msg": "获取权限列表成功",
        "status": 200
    }
}
```

type=tree

```
;[
  {
    data: [
      {
        id: 101,
        authName: '商品管理',
        path: null,
        pid: 0,
        children: [
          {
            id: 104,
            authName: '商品列表',
            path: null,
            pid: 101,
            children: [
              {
                id: 105,
                authName: '添加商品',
                path: null,
                pid: '104,101'
              }
            ]
          }
        ]
      }
    ],
    meta: {
      msg: '获取权限列表成功',
      status: 200
    }
  }
]
```

### 左侧菜单权限

- 请求路径：menus
- 请求方法：get
- 响应数据

```
{
    "data":
        {
            "id": 101,
            "authName": "商品管理",
            "path": null,
            "children": [
                {
                    "id": 104,
                    "authName": "商品列表",
                    "path": null,
                    "children": []
                }
            ]
        }
    "meta": {
        "msg": "获取菜单列表成功",
        "status": 200
    }
}
```

## 角色管理

### 角色列表

- 请求路径：roles
- 请求方法：get
- 响应数据说明
  - 第一层为角色信息
  - 第二层开始为权限说明，权限一共有 3 层权限
- 响应数据

```
{
    "data": [
        {
            "id": 30,
            "roleName": "主管",
            "roleDesc": "技术负责人",
            "children": [
                {
                    "id": 101,
                    "authName": "商品管理",
                    "path": null,
                    "children": [
                        {
                            "id": 104,
                            "authName": "商品列表",
                            "path": null,
                            "children": [
                                {
                                    "id": 105,
                                    "authName": "添加商品",
                                    "path": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 添加角色

- 请求路径：roles
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| roleName | 角色名称 | 不能为空 |
| roleDesc | 角色描述 | 可以为空 |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| roleId   | 角色 ID  |      |
| roleName | 角色名称 |      |
| roleDesc | 角色描述 |      |

- 响应数据

```
{
    "data": {
        "roleId": 40,
        "roleName": "admin2",
        "roleDesc": "admin2Desc"
    },
    "meta": {
        "msg": "创建成功",
        "status": 201
    }
}
```

### 根据 ID 查询角色

- 请求路径：roles/:id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 角色 ID  | 不能为空`携带在url中` |

- 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| roleId   | 角色 ID  |      |
| roleName | 角色名称 |      |
| roleDesc | 角色描述 |      |

- 响应数据

```
{
    "data": {
        "roleId": 31,
        "roleName": "测试角色",
        "roleDesc": "测试负责人"
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 编辑提交角色

- 请求路径：roles/:id
- 请求方法：put
- 请求参数

| 参数名   | 参数说明 | 备注                  |
| -------- | -------- | --------------------- |
| :id      | 角色 ID  | 不能为空`携带在url中` |
| roleName | 角色名称 | 不能为空              |
| roleDesc | 角色描述 | 可以为空              |

- 响应数据

```
{
    "data": {
        "roleId": 31,
        "roleName": "测试角色",
        "roleDesc": "测试角色描述"
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 删除角色

- 请求路径：roles/:id
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 角色 ID  | 不能为空`携带在url中` |

- 响应数据

```
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

### 角色授权

- 请求路径：roles/:roleId/rights
- 请求方法：post
- 请求参数

| 参数名  | 参数说明     | 备注                      |
| ------- | ------------ | ------------------------- |
| :roleId | 角色 ID      | 不能为空`携带在url中`     |
| rids    | 权限 ID 列表 | 以 `,` 分割的权限 ID 列表 |

- 响应数据

```
{
    "data": null,
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

## 商品分类管理

### 商品数据列表

- 请求路径：categories
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                                         |
| ------ | -------- | -------------------------------------------- |
| type   | [1,2,3]  | 值：1，2，3 分别表示显示一层二层三层分类列表 |

- 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| cat_id    | 分类 ID      |      |
| cat_name  | 分类名称     |      |
| cat_pid   | 分类父 ID    |      |
| cat_level | 分类当前层级 |      |

- 响应数据

```
{
    "data": [
        {
            "cat_id": 1,
            "cat_name": "手机相机",
            "cat_pid": 0,
            "cat_level": 0
        },
        {
            "cat_id": 2,
            "cat_name": "电脑办公",
            "cat_pid": 0,
            "cat_level": 0
        }
    ],
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 添加分类

- 请求路径：categories
- 请求方法：post
- 请求参数

| 参数名    | 参数说明  | 备注     |
| --------- | --------- | -------- |
| cat_pid   | 分类父 ID | 不能为空 |
| cat_name  | 分类名称  | 不能为空 |
| cat_level | 分类层级  | 不能为空 |

- 响应数据

```
{
    "data": {
        "cat_id": 62,
        "cat_name": "相框",
        "cat_pid": "1",
        "cat_level": "1"
    },
    "meta": {
        "msg": "创建成功",
        "status": 201
    }
}
```

### 根据 id 查询分类

- 请求路径：categories/:id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 分类 ID  | 不能为空`携带在url中` |

- 响应数据

```
{
    "data": {
        "cat_id": 3,
        "cat_name": "厨卫电器",
        "cat_pid": 0,
        "cat_level": 0
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 编辑提交分类

- 请求路径：categories/:id
- 请求方法：put
- 请求参数

| 参数名   | 参数说明 | 备注                  |
| -------- | -------- | --------------------- |
| :id      | 分类 ID  | 不能为空`携带在url中` |
| cat_name | 分类名称 | 不能为空              |

- 响应数据

```
{
    "data": {
        "cat_id": 22,
        "cat_name": "自拍杆",
        "cat_pid": 7,
        "cat_level": 2
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 删除分类

- 请求路径：categories/:id
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 分类 ID  | 不能为空`携带在url中` |

- 响应数据

```
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

## 商品管理

### 商品列表数据

- 请求路径：goods
- 请求方法：get
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数     | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

- 响应参数

| 参数名       | 参数说明     | 备注                                   |
| ------------ | ------------ | -------------------------------------- |
| total        | 总共商品条数 |                                        |
| pagenum      | 当前商品页数 |                                        |
| goods_id     | 商品 ID      |                                        |
| goods_name   | 商品名称     |                                        |
| goods_price  | 价格         |                                        |
| goods_number | 数量         |                                        |
| goods_weight | 重量         | 不能为空                               |
| goods_state  | 商品状态     | 商品状态 0: 未通过 1: 审核中 2: 已审核 |
| add_time     | 添加时间     |                                        |
| upd_time     | 更新时间     |                                        |
| hot_mumber   | 热销品数量   |                                        |
| is_promote   | 是否是热销品 |                                        |

- 响应数据

```
{
    "data": {
        "total": 50,
        "pagenum": "1",
        "goods": [
            {
                "goods_id": 144,
                "goods_name": "asfdsd",
                "goods_price": 1,
                "goods_number": 1,
                "goods_weight": 1,
                "goods_state": null,
                "add_time": 1512954923,
                "upd_time": 1512954923,
                "hot_mumber": 0,
                "is_promote": false
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 添加商品

- 请求路径：goods
- 请求方法：post
- 请求参数

| 参数名          | 参数说明                       | 备注     |
| --------------- | ------------------------------ | -------- |
| goods_name      | 商品名称                       | 不能为空 |
| goods_cat       | 以为','分割的分类列表 (字符串) | 不能为空 |
| goods_price     | 价格                           | 不能为空 |
| goods_number    | 数量                           | 不能为空 |
| goods_weight    | 重量                           | 不能为空 |
| goods_introduce | 介绍                           | 可以为空 |
| pics            | 上传的图片临时路径（对象）     | 可以为空 |

- 请求数据

```
{
  "goods_name":"test_goods_name2",
  "goods_price":20,
  "goods_number":30,
  "goods_weight":40,
  "goods_introduce":"abc",
  "pics":[
    {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
    ],
  "attrs":[
    {
      "attr_id":15,
      "attr_value":"ddd"
    },
    {
      "attr_id":15,
      "attr_value":"eee"
    }
    ]
}
```

- 响应参数

| 参数名       | 参数说明                   | 备注                                                                                                                  |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| total        | 总共商品条数               |                                                                                                                       |
| pagenum      | 当前商品页数               |                                                                                                                       |
| goods_id     | 商品 ID                    |                                                                                                                       |
| goods_cat    | 以为','分割的分类列表      |                                                                                                                       |
| goods_name   | 商品名称                   |                                                                                                                       |
| goods_price  | 价格                       |                                                                                                                       |
| goods_number | 数量                       |                                                                                                                       |
| goods_weight | 重量                       | 不能为空                                                                                                              |
| goods_state  | 商品状态                   | 商品状态 0: 未通过 1: 审核中 2: 已审核                                                                                |
| add_time     | 添加时间                   |                                                                                                                       |
| upd_time     | 更新时间                   |                                                                                                                       |
| hot_mumber   | 热销品数量                 |                                                                                                                       |
| is_promote   | 是否是热销品               |                                                                                                                       |
| pics         | 上传的图片临时路径（对象） | pics_id:图片 ID,goods_id:商品 ID,pics_big:大图,pics_mid:中图,pics_sma:小图                                            |
| attrs        | 商品的参数（数组）         | goods_id:商品 ID,attr_value:当前商品的参数值,add_price:浮动价格,attr_vals:预定义的参数值,attr_sel:手动输入，还是单选, |

- 响应数据

```
{
    "data": {
        "goods_id": 145,
        "goods_name": "test_goods_name2",
        "goods_price": 20,
        "cat_id": 1,
        "goods_number": 30,
        "goods_weight": 40,
        "goods_introduce": "abc",
        "goods_big_logo": "",
        "goods_small_logo": "",
        "goods_state": 1,
        "add_time": 1512962370,
        "upd_time": 1512962370,
        "hot_mumber": 0,
        "is_promote": false,
        "pics": [
            {
                "pics_id": 397,
                "goods_id": 145,
                "pics_big": "uploads/goodspics/big_30f08d52c551ecb447277eae232304b8",
                "pics_mid": "uploads/goodspics/mid_30f08d52c551ecb447277eae232304b8",
                "pics_sma": "uploads/goodspics/sma_30f08d52c551ecb447277eae232304b8"
            }
        ],
        "attrs": [
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "ddd",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            },
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "eee",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            }
        ]
    },
    "meta": {
        "msg": "创建商品成功",
        "status": 201
    }
}
```

### 根据 ID 查询商品

- 请求路径：goods/:id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 商品 ID  | 不能为空`携带在url中` |

- 响应参数

| 参数名       | 参数说明                   | 备注                                                                                                                  |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| total        | 总共商品条数               |                                                                                                                       |
| pagenum      | 当前商品页数               |                                                                                                                       |
| goods_id     | 商品 ID                    |                                                                                                                       |
| goods_name   | 商品名称                   |                                                                                                                       |
| goods_price  | 价格                       |                                                                                                                       |
| goods_number | 数量                       |                                                                                                                       |
| goods_weight | 重量                       | 不能为空                                                                                                              |
| goods_state  | 商品状态                   | 商品状态 0: 未通过 1: 审核中 2: 已审核                                                                                |
| add_time     | 添加时间                   |                                                                                                                       |
| upd_time     | 更新时间                   |                                                                                                                       |
| hot_mumber   | 热销品数量                 |                                                                                                                       |
| is_promote   | 是否是热销品               |                                                                                                                       |
| pics         | 上传的图片临时路径（对象） | pics_id:图片 ID,goods_id:商品 ID,pics_big:大图,pics_mid:中图,pics_sma:小图                                            |
| attrs        | 商品的参数（数组）         | goods_id:商品 ID,attr_value:当前商品的参数值,add_price:浮动价格,attr_vals:预定义的参数值,attr_sel:手动输入，还是单选, |

- 响应数据

```
{
    "data": {
        "goods_id": 145,
        "goods_name": "test_goods_name2",
        "goods_price": 20,
        "goods_number": 30,
        "goods_weight": 40,
        "goods_introduce": "abc",
        "goods_big_logo": "",
        "goods_small_logo": "",
        "goods_state": 1,
        "add_time": 1512962370,
        "upd_time": 1512962370,
        "hot_mumber": 0,
        "is_promote": false,
        "pics": [
            {
                "pics_id": 397,
                "goods_id": 145,
                "pics_big": "uploads/goodspics/big_30f08d52c551ecb447277eae232304b8",
                "pics_mid": "uploads/goodspics/mid_30f08d52c551ecb447277eae232304b8",
                "pics_sma": "uploads/goodspics/sma_30f08d52c551ecb447277eae232304b8"
            }
        ],
        "attrs": [
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "ddd",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            },
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "eee",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            }
        ]
    },
    "meta": {
        "msg": "创建商品成功",
        "status": 201
    }
}
```

### 编辑提交商品

- 请求路径：goods/:id
- 请求方法：put
- 请求参数

| 参数名          | 参数说明                   | 备注                  |
| --------------- | -------------------------- | --------------------- |
| id              | 商品 ID                    | 不能为空`携带在url中` |
| goods_name      | 商品名称                   | 不能为空              |
| goods_price     | 价格                       | 不能为空              |
| goods_number    | 数量                       | 不能为空              |
| goods_weight    | 重量                       | 不能为空              |
| goods_introduce | 介绍                       | 可以为空              |
| pics            | 上传的图片临时路径（对象） | 可以为空              |
| attrs           | 商品的参数（数组）         | 可以为空              |

- 请求数据

```
{
  "goods_name":"test_goods_name2",
  "goods_price":20,
  "goods_number":30,
  "goods_weight":40,
  "goods_introduce":"abc",
  "pics":[
    {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
    ],
  "attrs":[
    {
      "attr_id":15,
      "attr_value":"ddd"
    },
    {
      "attr_id":15,
      "attr_value":"eee"
    }
    ]
}
```

- 响应参数

| 参数名       | 参数说明                   | 备注                                                                                                                  |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| total        | 总共商品条数               |                                                                                                                       |
| pagenum      | 当前商品页数               |                                                                                                                       |
| goods_id     | 商品 ID                    |                                                                                                                       |
| goods_name   | 商品名称                   |                                                                                                                       |
| goods_price  | 价格                       |                                                                                                                       |
| goods_number | 数量                       |                                                                                                                       |
| goods_weight | 重量                       | 不能为空                                                                                                              |
| goods_state  | 商品状态                   | 商品状态 0: 未通过 1: 审核中 2: 已审核                                                                                |
| add_time     | 添加时间                   |                                                                                                                       |
| upd_time     | 更新时间                   |                                                                                                                       |
| hot_mumber   | 热销品数量                 |                                                                                                                       |
| is_promote   | 是否是热销品               |                                                                                                                       |
| pics         | 上传的图片临时路径（对象） | pics_id:图片 ID,goods_id:商品 ID,pics_big:大图,pics_mid:中图,pics_sma:小图                                            |
| attrs        | 商品的参数（数组）         | goods_id:商品 ID,attr_value:当前商品的参数值,add_price:浮动价格,attr_vals:预定义的参数值,attr_sel:手动输入，还是单选, |

- 响应数据

```
{
    "data": {
        "goods_id": 145,
        "goods_name": "test_goods_name2",
        "goods_price": 20,
        "goods_number": 30,
        "goods_weight": 40,
        "goods_introduce": "abc",
        "goods_big_logo": "",
        "goods_small_logo": "",
        "goods_state": 1,
        "add_time": 1512962370,
        "upd_time": 1512962370,
        "hot_mumber": 0,
        "is_promote": false,
        "pics": [
            {
                "pics_id": 397,
                "goods_id": 145,
                "pics_big": "uploads/goodspics/big_30f08d52c551ecb447277eae232304b8",
                "pics_mid": "uploads/goodspics/mid_30f08d52c551ecb447277eae232304b8",
                "pics_sma": "uploads/goodspics/sma_30f08d52c551ecb447277eae232304b8"
            }
        ],
        "attrs": [
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "ddd",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            },
            {
                "goods_id": 145,
                "attr_id": 15,
                "attr_value": "eee",
                "add_price": null,
                "attr_name": "fffffff",
                "attr_sel": "many",
                "attr_write": "list",
                "attr_vals": ""
            }
        ]
    },
    "meta": {
        "msg": "创建商品成功",
        "status": 201
    }
}
```

## 图片上传

- 请求路径：upload
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| file   | 上传文件 |      |

- 响应数据

```
{
    "data": {
        "tmp_path": "tmp_uploads/ccfc5179a914e94506bcbb7377e8985f.png",
        "url": "http://127.0.0.1:8888tmp_uploads/ccfc5179a914e94506bcbb7377e8985f.png"
    },
    "meta": {
        "msg": "上传成功",
        "status": 200
    }
}
```

## 4. 项目运行

### 4.1 第一步:部署运行后台项目

#### 4.1.1 创建数据库

1. 找到shop-api根目录下`shop-admin.sql`文件
2. navicat中新建数据库,默认名称为`shop-admin`
3. 执行`shop-admin.sql`脚本文件

### 4.1.2 修改配置文件

1. 修改`config/default.json`中的数据库连接配置

2. 修改`app.js`中 PORT启动端口号

### 4.1.3 项目目录上传的Linux服务器

### 4.1.4 运行该项目

1. 上传完成后,进入到项目根目录
2. 执行`npm run start` 启动后台api服务

### 4.2 第二步: 运行前端项目

1. `npm i` 安装项目所需依赖
2. `npm run dev`启动项目
