<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import MedicalForces from './components/MedicalForces.vue'
import Supplies from './components/Supplies.vue'
import Efficiency from './components/Efficiency.vue'
import Transport from './components/Transport copy.vue'
import AlertBar from './components/AlertBar.vue'
import MapSection from './components/MapSection.vue'
import { 
  getMedicalForces, 
  getSupplies, 
  getEfficiency, 
  getTransport, 
  getAlertMessage,
  startRealTimeUpdates 
} from './services/dataService'

// 模拟数据
const medicalForces = reactive({
  institutional: 120,
  mobile: 80,
  fieldHospital: 6,
  rearHospital: 12,
  localHospital: 15,
  casualties: 23
})

const supplies = reactive({
  keyConsumption: 230,
  stockLevel: 85,
  consumptionRate: 12,
  replenishment: 1200
})

const efficiency = reactive({
  currentCasualties: 320,
  triageTime: 5,
  surgeryWait: 18,
  transportTime: 40
})

const transport = reactive({
  // 运输车数据
  vehicles: {
    total: 25,
    available: 20,
    inTransit: 3,
    damaged: 2
  },
  // 无人机数据
  drones: {
    total: 12,
    available: 8,
    inTransit: 2,
    damaged: 2
  },
  // 直升机数据
  helicopters: {
    total: 8,
    available: 6,
    inTransit: 1,
    damaged: 1
  },
  // 医护力量
  medicalStaff: {
    total: 260,
    available: 200,
    inTransit: 60,
    damaged: 0
  },
  // 总体可用率
  availability: 78,
  // 总体损耗率
  lossRate: 12,
  warning: '存在 5 起'
})

const alertMessage = ref('⚠️ 战救效率下降 15%')

// 数据加载和更新
const loadInitialData = async () => {
  try {
    const [medicalForcesData, suppliesData, efficiencyData, transportData, alertData] = await Promise.all([
      getMedicalForces(),
      getSupplies(),
      getEfficiency(),
      getTransport(),
      getAlertMessage()
    ])
    
    // 更新响应式数据
    Object.assign(medicalForces, medicalForcesData)
    Object.assign(supplies, suppliesData)
    Object.assign(efficiency, efficiencyData)
    Object.assign(transport, transportData)
    alertMessage.value = alertData
    
    console.log('初始数据加载完成')
  } catch (error) {
    console.error('数据加载失败:', error)
  }
}

// 实时数据更新
let stopRealTimeUpdates = null

onMounted(async () => {
  // 加载初始数据
  await loadInitialData()
  
  // 启动实时更新
  stopRealTimeUpdates = startRealTimeUpdates((data) => {
    Object.assign(medicalForces, data.medicalForces)
    Object.assign(supplies, data.supplies)
    Object.assign(efficiency, data.efficiency)
    Object.assign(transport, data.transport)
    alertMessage.value = data.alertMessage
    console.log('数据已更新')
  })
})

onUnmounted(() => {
  if (stopRealTimeUpdates) {
    stopRealTimeUpdates()
  }
})
</script>

<template>
  <div class="monitor-dashboard">
    <!-- 页面顶部标题 -->
    <div class="page-header">
      <h1 class="main-title">卫勤指挥态势感知驾驶舱</h1>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧模块 -->
      <div class="left-panel">
        <MedicalForces :medical-forces="medicalForces" />
        <Supplies :supplies="supplies" />
      </div>

      <!-- 中间模块：战场情况 -->
      <div class="center-panel">
        <AlertBar :alert-message="alertMessage" />
        <MapSection />
      </div>

      <!-- 右侧模块 -->
      <div class="right-panel">
        <Efficiency :efficiency="efficiency" />
        <Transport :transport="transport" />
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/global.css';
</style>