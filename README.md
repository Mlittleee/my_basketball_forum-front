# my_basketball_forum-front
#### 几天做的一个简单的篮球论坛前端项目，由于时间较紧，只实现基本功能，还有些小bug，后续有时间会进行完善
***前端主要有主界面，个人中心和后台管理系统三部分***

# 扑虎篮球论坛

这是一个专注于篮球领域，美观、功能齐全的篮球评论论坛，包括前端和后端两个独立的项目。提供了美观的界面和丰富的功能，让篮球爱好者可以进行交流、发表观点、分享信息。

![首页截图](https://github.com/Mlittleee/my_basketball_forum-front/blob/master/src/assets/ReadMeImage/img.png)

## 前端项目 [![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/Mlittleee/my_basketball_forum-front)

- [前端地址](https://github.com/Mlittleee/my_basketball_forum-front)

## 后端项目 [![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/Mlittleee/mybasketballforum)

- [后端地址](https://github.com/Mlittleee/mybasketballforum)

## 项目功能：

1. 用户登录，若是新用户则自动注册，登陆后会自动跳转到首页
2. 首页分为四个部分，头部导航栏，轮播图的展示，分页展示所有帖子，可以根据帖子标题进行搜索，最后侧边还有发表帖子入口和每日一句。
3. 其他板块下只会展示归属于该板块下的帖子，侧边同样也有发表帖子入口和每日一句。
4. 发表帖子使用 markdown 编辑器，支持自定义标签，帖子列表上显示有标签，浏览量，点赞数，发帖人和发帖时间。点击帖子标题即可查看帖子内容详情
5. 社区暂时只有显示所有活跃用户的功能，后续会添加私信，关注，粉丝等功能
6. 个人中心有用户信息的展示和编辑，发帖功能，展示点赞过的帖子功能，还可以管理自己所发的帖子，可以删除自己的帖子，也可以修改帖子的标签，标题和内容
7. 后台管理系统中可以管理用户，评论，帖子，标签，每日一句。

## 特点

- 界面美观：经过精心设计的用户界面，提供了良好的使用体验。
- 功能齐全：具备发表帖子、浏览帖子、评论、点赞等功能，满足用户的交流需求。
- 三大板块：主界面、用户中心和后台管理界面，方便用户进行浏览、操作和管理。
  ![用户中心截图](https://github.com/Mlittleee/my_basketball_forum-front/blob/master/src/assets/ReadMeImage/img2.png)

  ![管理员后台截图](https://github.com/Mlittleee/my_basketball_forum-front/blob/master/src/assets/ReadMeImage/img3.png)

- 分类浏览：用户可以根据自己的兴趣选择不同板块来浏览特定分类下的帖子。
- 自定义标签：用户在发帖时可以添加自定义标签，方便其他用户更好地了解帖子内容。
- 后台管理：管理员可以对用户、帖子、评论、篮球名言和板块简介进行管理，还可查看可视化统计信息。

## 技术栈

![Vue](https://img.shields.io/badge/Vue-2.x-brightgreen) ![axios](https://img.shields.io/badge/axios-Latest-blue) ![ElementUI](https://img.shields.io/badge/ElementUI-Latest-orange) ![Vuex](https://img.shields.io/badge/Vuex-Latest-green) ![Vue Router](https://img.shields.io/badge/Vue%20Router-Latest-yellow) ![Mavon Editor](https://img.shields.io/badge/Mavon%20Editor-Latest-lightgrey)

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.x-blue) ![MyBatis Plus](https://img.shields.io/badge/MyBatis%20Plus-Latest-green) ![Redis](https://img.shields.io/badge/Redis-Latest-red)

- 前端：Vue2 框架、axios、ElementUI、Vuex、Vue Router、Mavon Editor
- 后端：Spring Boot 框架、MyBatis Plus、Redis

## 项目使用到的技术及插件
* vue-cli
* element-ui
* vuex
* vue-router
* axios
* mavon-editor
* dayjs,buefy,bulma
* vue-partical
* font-awesome

## 快速开始

1. 克隆项目到本地：

```
git clone https://github.com/Mlittleee/mybasketballforum.git

git clone https://github.com/Mlittleee/my_basketball_forum-front.git
```

2. 安装前端依赖并运行：

```
cd my_basketball_forum-front
npm install
npm run serve
```

3. 启动后端服务：
  ......

4.访问应用：

在浏览器中打开 `http://localhost:8080` 即可访问应用。

## 贡献

感谢以下贡献者对项目的贡献：

- 前端部分
  [![Contributors](https://contrib.rocks/image?repo=Mlittleee/my_basketball_forum-front)](https://contrib.rocks/image?repo=Mlittleee/my_basketball_forum-front)

- 后端部分
  [![Contributors](https://contrib.rocks/image?repo=Mlittleee/mybasketballforum)](https://contrib.rocks/image?repo=Mlittleee/mybasketballforum)

欢迎对项目进行贡献和提供反馈意见(但我们不一定会修改 LOL）。

## 许可证

该项目基于 MIT 许可证。更多信息请参阅 [LICENSE](../LICENSE) 文件。
