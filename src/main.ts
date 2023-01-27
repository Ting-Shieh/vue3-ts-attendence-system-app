import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhTw from 'element-plus/es/locale/lang/zh-tw'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus, 
    {
      locale: zhTw,
    }
  )
  .use(store, key)
  .use(router)
  .mount('#app')
