<script setup>
import { ref, onMounted, nextTick, reactive, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { 
  Warning, 
  User
} from '@element-plus/icons-vue'
import { 
  getMedicalForces, 
  getSupplies, 
  getEfficiency, 
  getTransport, 
  getAlertMessage,
  getMapMarkers,
  getTransportRoutes,
  startRealTimeUpdates 
} from './services/dataService'

// 高德安全码配置（必须全局）
window._AMapSecurityConfig = {
  securityJsCode: "31059103bf8f449077f06c4f9a1a0e51"
}

// 响应式变量
const map = ref(null)
const mapLoading = ref(true)
const mapError = ref(null)

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
  vehicles: 45,
  medicalStaff: 260,
  availability: 78,
  lossRate: 12,
  warning: '存在 5 起'
})

const alertMessage = ref('⚠️ 战救效率下降 15%')

// 当前时间
const currentTime = ref('')

// 地图初始化
onMounted(() => {
  nextTick(() => {
    AMapLoader.load({
      key: "5546f86d4cccb3f3bfd2eae6af3b8430",
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.Marker", "AMap.Polyline"]
    }).then(async (AMap) => {
      // 创建地图实例
      map.value = new AMap.Map("map-container", {
        viewMode: "3D",
        zoom: 11,
        center: [120.10, 30.22],
        mapStyle: 'amap://styles/normal' // 正常颜色主题
      })

      // 添加比例尺和工具条控件
      map.value.addControl(new AMap.Scale())
      map.value.addControl(new AMap.ToolBar())

      // // 从数据服务获取标记点和路径数据
      // const [hospitals, routes] = await Promise.all([
      //   getMapMarkers(),
      //   getTransportRoutes()
      // ])

      // // 添加医院标记点
      // hospitals.forEach(hospital => {
      //   const marker = new AMap.Marker({
      //     position: hospital.position,
      //     title: hospital.name,
      //     icon: hospital.type === 'field' ? '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png' : 
      //           hospital.type === 'rear' ? '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png' :
      //           '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-blue.png'
      //   })
      //   map.value.add(marker)
      // })

      // // 添加后送路径
      // const polyline = new AMap.Polyline({
      //   path: routes,
      //   strokeColor: '#00ff00',
      //   strokeWeight: 4,
      //   strokeOpacity: 0.8
      // })
      // map.value.add(polyline)

      mapLoading.value = false
    }).catch(e => {
      console.error("地图初始化失败：", e)
      mapError.value = e.message || "未知错误"
      mapLoading.value = false
    })
  })
})

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

// 更新时间函数
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(async () => {
  // 更新当前时间
  updateTime()
  setInterval(updateTime, 1000) // 每秒更新时间
  
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
      <h1 class="main-title">卫勤指挥模块</h1>
      <div class="header-info">
        <span class="current-time">{{ currentTime }}</span>
        <span class="system-status">系统运行正常</span>
      </div>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧模块 -->
      <div class="left-panel">
      <!-- 全域医疗力量 -->
      <div class="panel medical-forces">
        <h3 class="panel-title">全域医疗力量</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>数量</th>
                <th>可用率</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>建制卫勤力量</td>
                <td>{{ medicalForces.institutional }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '85%' }"></div>
                    <span class="progress-text">85%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>机动卫勤力量</td>
                <td>{{ medicalForces.mobile }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '78%' }"></div>
                    <span class="progress-text">78%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>野战医院</td>
                <td>{{ medicalForces.fieldHospital }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '92%' }"></div>
                    <span class="progress-text">92%</span>
                  </div>
                </td>
                <td><span class="status excellent">优秀</span></td>
              </tr>
              <tr>
                <td>后方医院</td>
                <td>{{ medicalForces.rearHospital }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '88%' }"></div>
                    <span class="progress-text">88%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>地方医院</td>
                <td>{{ medicalForces.localHospital }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '95%' }"></div>
                    <span class="progress-text">95%</span>
                  </div>
                </td>
                <td><span class="status excellent">优秀</span></td>
              </tr>
              <tr>
                <td>医护人员伤亡</td>
                <td>{{ medicalForces.casualties }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill warning" :style="{ width: '15%' }"></div>
                    <span class="progress-text">15%</span>
                  </div>
                </td>
                <td><span class="status warning">需关注</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 卫勤物资情况 -->
      <div class="panel supplies">
        <h3 class="panel-title">卫勤物资情况</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>物资类型</th>
                <th>数值</th>
                <th>库存率</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="highlight-row">
                <td>关键物资消耗量</td>
                <td>{{ supplies.keyConsumption }} 吨</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill warning" :style="{ width: '65%' }"></div>
                    <span class="progress-text">65%</span>
                  </div>
                </td>
                <td><span class="status warning">需补充</span></td>
              </tr>
              <tr>
                <td>各层级物资存耗</td>
                <td>{{ supplies.stockLevel }}%</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: supplies.stockLevel + '%' }"></div>
                    <span class="progress-text">{{ supplies.stockLevel }}%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>关键物资消耗速率</td>
                <td>{{ supplies.consumptionRate }} 吨/小时</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '72%' }"></div>
                    <span class="progress-text">72%</span>
                  </div>
                </td>
                <td><span class="status good">正常</span></td>
              </tr>
              <tr>
                <td>各层级需补充品量</td>
                <td>{{ supplies.replenishment }} 件</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '45%' }"></div>
                    <span class="progress-text">45%</span>
                  </div>
                </td>
                <td><span class="status warning">待补充</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 中间模块：战场情况 -->
    <div class="center-panel">
      <!-- 警示栏 -->
      <div class="alert-bar">
        <el-icon class="alert-icon"><Warning /></el-icon>
        <span class="alert-text">{{ alertMessage }}</span>
      </div>

      <!-- 地图区域 -->
      <div class="map-section">
        <div id="map-container" :class="{ loading: mapLoading }"></div>
        <div v-if="mapError" class="map-error">
          地图加载失败: {{ mapError }}
        </div>
        <div class="map-label">后送路径</div>
      </div>
    </div>

    <!-- 右侧模块 -->
    <div class="right-panel">
      <!-- 战救效率统计 -->
      <div class="panel efficiency">
        <h3 class="panel-title">战救效率统计</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>指标项目</th>
                <th>数值</th>
                <th>效率率</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="highlight-row">
                <td>当前伤员数量</td>
                <td>{{ efficiency.currentCasualties }} 人</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill warning" :style="{ width: '68%' }"></div>
                    <span class="progress-text">68%</span>
                  </div>
                </td>
                <td><span class="status warning">需关注</span></td>
              </tr>
              <tr>
                <td>平均检伤分类时间</td>
                <td>{{ efficiency.triageTime }} 分钟</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '90%' }"></div>
                    <span class="progress-text">90%</span>
                  </div>
                </td>
                <td><span class="status excellent">优秀</span></td>
              </tr>
              <tr>
                <td>平均手术等待时间</td>
                <td>{{ efficiency.surgeryWait }} 分钟</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '75%' }"></div>
                    <span class="progress-text">75%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>平均后送周转时间</td>
                <td>{{ efficiency.transportTime }} 分钟</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '82%' }"></div>
                    <span class="progress-text">82%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 医疗后送能力 -->
      <div class="panel transport">
        <h3 class="panel-title">医疗后送能力</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>能力项目</th>
                <th>数值</th>
                <th>可用率</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>运力数量</td>
                <td>{{ transport.vehicles }} 辆</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '88%' }"></div>
                    <span class="progress-text">88%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>医护力量</td>
                <td>{{ transport.medicalStaff }} 人</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '92%' }"></div>
                    <span class="progress-text">92%</span>
                  </div>
                </td>
                <td><span class="status excellent">优秀</span></td>
              </tr>
              <tr>
                <td>运力实时状态</td>
                <td>{{ transport.availability }}% 可用</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: transport.availability + '%' }"></div>
                    <span class="progress-text">{{ transport.availability }}%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr>
                <td>损耗情况</td>
                <td>{{ transport.lossRate }}%</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill warning" :style="{ width: (100 - transport.lossRate) + '%' }"></div>
                    <span class="progress-text">{{ 100 - transport.lossRate }}%</span>
                  </div>
                </td>
                <td><span class="status good">良好</span></td>
              </tr>
              <tr class="highlight-row warning-row">
                <td>不具备后送条件预警</td>
                <td>{{ transport.warning }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill danger" :style="{ width: '25%' }"></div>
                    <span class="progress-text">25%</span>
                  </div>
                </td>
                <td><span class="status danger">紧急</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.monitor-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ffffff;
  font-family: 'Source Han Sans CN', 'Arial', sans-serif;
  color: #333333;
}

/* 页面头部样式 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.current-time {
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.system-status {
  font-size: 14px;
  color: #67c23a;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
}

.system-status::before {
  content: '●';
  color: #67c23a;
  font-size: 12px;
}

/* 主要内容区域 */
.main-content {
  display: flex;
  flex: 1;
  height: calc(100vh - 100px);
}

/* 左侧面板 */
.left-panel {
  width: 25%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 右侧面板 */
.right-panel {
  width: 25%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 中间面板 */
.center-panel {
  width: 50%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 通用面板样式 */
.panel {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 16px 0;
  color: #333333;
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th {
  background: #f8f9fa;
  color: #333333;
  font-weight: bold;
  padding: 12px 8px;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  font-size: 13px;
}

.data-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #e9ecef;
  color: #333333;
  font-size: 13px;
}

.data-table tr:hover {
  background: #f8f9fa;
}

.highlight-row {
  background: rgba(64, 158, 255, 0.05) !important;
  border-left: 3px solid #409eff;
}

.warning-row {
  background: rgba(255, 68, 68, 0.05) !important;
  border-left: 3px solid #ff4444;
}

/* 进度条样式 */
.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #67c23a, #85ce61);
  border-radius: 10px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill.warning {
  background: linear-gradient(90deg, #e6a23c, #f0c78a);
}

.progress-fill.danger {
  background: linear-gradient(90deg, #f56c6c, #f89898);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 11px;
  font-weight: bold;
  color: #333333;
  z-index: 1;
}

/* 状态标签 */
.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  min-width: 50px;
}

.status.excellent {
  background: #f0f9ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status.good {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status.warning {
  background: #fffbe6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.status.danger {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

/* 卫勤物资情况样式 - 已使用表格样式 */

/* 警示栏样式 */
.alert-bar {
  background: #ffffff;
  color: #ff4444;
  padding: 12px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
}

.alert-icon {
  font-size: 20px;
}

/* 地图区域样式 */
.map-section {
  flex: 0.9;
  position: relative;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

#map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.map-label {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #000000;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
}

.map-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff4444;
  font-size: 16px;
  text-align: center;
}

/* 战救效率统计和医疗后送能力样式 - 已使用表格样式 */

/* 响应式设计 */
@media (max-width: 1920px) {
  .monitor-dashboard {
    transform: scale(0.8);
    transform-origin: top left;
  }
}

@media (max-width: 1600px) {
  .monitor-dashboard {
    transform: scale(0.7);
  }
}

@media (max-width: 1366px) {
  .monitor-dashboard {
    transform: scale(0.6);
  }
}
</style>
