<template>
  <div class="monitor-dashboard">
    <!-- 页面顶部标题 -->
    <div class="page-header">
      <h1 class="main-title">战术后方态势感知驾驶舱</h1>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">正在加载数据...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="hasError" class="error-overlay">
      <div class="error-content">
        <h2>⚠️ 数据加载失败</h2>
        <p>{{ errorMessage }}</p>
        <button @click="loadInitialData" class="retry-button">重试</button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div v-else class="main-content">
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

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import MedicalForces from '../components/MedicalForces.vue'
import Supplies from '../components/Supplies copy.vue'
import Efficiency from '../components/Efficiency.vue'
import Transport from '../components/Transport copy.vue'
import AlertBar from '../components/AlertBar.vue'
import MapSection from '../components/MapSection.vue'
import { 
  getMedicalForces, 
  getSupplies, 
  getEfficiency, 
  getTransport, 
  getAlertMessage,
  getAllData,
  startRealTimeUpdates 
} from '../services/dataService'

// 响应式数据容器（初始为空，等待API数据填充）
const medicalForces = reactive({})
const supplies = reactive([])
const efficiency = reactive({})
const transport = reactive({})
const alertMessage = ref('')

// 加载状态
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// 数据加载和更新
const loadInitialData = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''
    
    // 优先使用综合接口，提高加载效率
    try {
      const allData = await getAllData()
      
      // 更新响应式数据
      Object.assign(medicalForces, allData.medicalForces)
      supplies.splice(0, supplies.length, ...allData.supplies) // 更新数组数据
      Object.assign(efficiency, allData.efficiency)
      Object.assign(transport, allData.transport)
      alertMessage.value = allData.alertMessage
      
      console.log('战术后方数据加载完成（使用综合接口）')
    } catch (error) {
      console.warn('综合接口调用失败，使用分别调用:', error.message)
      
      // 如果综合接口失败，则分别调用各个接口
      const [medicalForcesData, suppliesData, efficiencyData, transportData, alertData] = await Promise.all([
        getMedicalForces(),
        getSupplies(),
        getEfficiency(),
        getTransport(),
        getAlertMessage()
      ])
      
      // 更新响应式数据
      Object.assign(medicalForces, medicalForcesData)
      supplies.splice(0, supplies.length, ...suppliesData) // 更新数组数据
      Object.assign(efficiency, efficiencyData)
      Object.assign(transport, transportData)
      alertMessage.value = alertData
      
      console.log('战术后方数据加载完成（使用分别调用）')
    }
  } catch (error) {
    console.error('数据加载失败:', error)
    hasError.value = true
    errorMessage.value = error.message || '数据加载失败，请检查后端服务是否启动'
  } finally {
    isLoading.value = false
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
    supplies.splice(0, supplies.length, ...data.supplies) // 更新数组数据
    Object.assign(efficiency, data.efficiency)
    Object.assign(transport, data.transport)
    alertMessage.value = data.alertMessage
    console.log('战术后方数据已更新')
  })
})

onUnmounted(() => {
  if (stopRealTimeUpdates) {
    stopRealTimeUpdates()
  }
})
</script>

<style>
@import '../assets/global.css';

/* 加载状态样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #2a4a6b;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.error-content {
  text-align: center;
  color: #ffffff;
  padding: 40px;
  background: rgba(26, 26, 46, 0.8);
  border-radius: 20px;
  border: 1px solid #2a4a6b;
  max-width: 500px;
}

.error-content h2 {
  color: #f56c6c;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

.error-content p {
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.5;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

.retry-button {
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

.retry-button:hover {
  background: linear-gradient(135deg, #66b1ff, #409eff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}
</style>
