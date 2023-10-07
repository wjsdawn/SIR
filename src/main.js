import { createApp } from 'vue'
import router from './router'
import store from './store'
import './assets/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.config.warnHandler = () => null;
app.use(ElementPlus)
app.use(store).use(router).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
