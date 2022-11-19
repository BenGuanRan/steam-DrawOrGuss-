# Draw-Guss

## 介绍
### 游戏作者
编码：贲冠然
UI设计：曹珑
### 游戏功能
steam大火游戏draw&&guss网页版，支持原版游戏的大部分功能，包括但不限于创建房间，加入游戏，房间设置，你画我猜接龙，加入房间等。
### 制作初衷
出于对接龙模式你画我猜游戏的兴趣，边学习边制作的一款游戏。
### 游戏流程
#### 游戏前
房主创建游戏房间，设定游戏人数、词库、等信息后，房间将自动生成房间号，玩家可凭房间号加入游戏，待所有玩家均准备成功后，房主可开启游戏。在此期间，若玩家迟迟不进行准备操作，房主可踢出该玩家。
#### 游戏中
游戏开始，每个玩家以接龙的方式进行绘画与猜词，绘画和猜词可以理解为流水线模式并行进行的，待所有玩家均完成游戏所提示的所有操作后，将进入展示环节。
#### 游戏结束的展示环节
展示环节是本游戏的亮点，由于作画是以猜->画->猜->画->猜->画的方式接龙进行的，因此最终的展示环节可能会让人匪夷所思。
## 软件架构
### 项目技术栈介绍
前端部分：Vue3.0、ElementUI、HTML、CSS、JS、WebSocket、Canvas
后端部分：Koa、socket.io、Node.js
网页风格设计：本人朋友UI设计师——曹珑
### 前端部分架构
前端部分的思想是以事件驱动的思想，即每次玩家进行操作，都会触发一定事件，将这些通过ws协议告知给服务端，由服务端告知前端事件触发后的一些逻辑走向。玩家的临时数据信息将会存放在浏览器SessionStorage中。
### 后端部分架构
后端部分拥有很多状态监听函数，用来监听前端事件改变，以此对事件状态机进行修改，从而进行游戏流程。
### 其他
更详细介绍详见根目录下docx文件。
## 安装运行教程
运行该项目首先要安装前后端所需依赖
### 安装前端依赖
进入根目录frontend文件夹
```
npm install
```
### 运行前端代码
```
npm run serve
```
### 安装后端依赖
进入根目录backend文件夹
```
npm install
```
### 运行后端代码
进入webapi目录
```
node app.js
```
## 说明
本作品只供交流学习使用！无任何盈利目的！！！
