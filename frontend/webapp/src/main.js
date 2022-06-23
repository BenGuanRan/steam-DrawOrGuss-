import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/global.css' // 全局样式
import SocketIO from './plugins/io' // 使用socketio

createApp(App).use(store).use(router).use(ElementPlus).use(SocketIO, {
    connection: 'ws://localhost:3001',
}).mount('#app')
