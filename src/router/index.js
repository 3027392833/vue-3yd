import { createRouter, createWebHistory } from 'vue-router'
import MedicalCommand from '../views/MedicalCommand.vue'
import TacticalRear from '../views/TacticalRear.vue'
import CampaignRear from '../views/CampaignRear.vue'

const routes = [
  {
    path: '/',
    redirect: '/medical-command' // 默认重定向到卫勤指挥页面
  },
  {
    path: '/medical-command',
    name: 'MedicalCommand',
    component: MedicalCommand,
    meta: {
      title: '卫勤指挥态势感知驾驶舱'
    }
  },
  {
    path: '/tactical-rear',
    name: 'TacticalRear',
    component: TacticalRear,
    meta: {
      title: '战术后方态势感知驾驶舱'
    }
  },
  {
    path: '/campaign-rear',
    name: 'CampaignRear',
    component: CampaignRear,
    meta: {
      title: '战役后方态势感知驾驶舱'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
