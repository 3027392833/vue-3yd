<template>
  <div class="map-section">
    <div id="map-container" :class="{ loading: mapLoading }"></div>
    <div v-if="mapError" class="map-error">
      地图加载失败: {{ mapError }}
    </div>
    <div class="map-label">后送路径</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { getTransportRoutes } from '../services/dataService'

// 高德安全码配置（必须全局）
window._AMapSecurityConfig = {
  securityJsCode: "31059103bf8f449077f06c4f9a1a0e51"
}

// 响应式变量
const map = ref(null)
const mapLoading = ref(true)
const mapError = ref(null)

// 地图路径相关数据
const routeData = reactive({
  startPoint: [120.08, 30.20], // 起点坐标（默认值）
  endPoint: [120.12, 30.24],   // 终点坐标（默认值）
  waypoints: [],               // 途经点
  routePolyline: null,        // 路径线对象
  startMarker: null,           // 起点标记
  endMarker: null              // 终点标记
})

// 绘制地图路径的方法
const drawRoute = (AMap) => {
  if (!map.value) return
  
  // 清除之前的路径和标记
  if (routeData.routePolyline) {
    map.value.remove(routeData.routePolyline)
  }
  if (routeData.startMarker) {
    map.value.remove(routeData.startMarker)
  }
  if (routeData.endMarker) {
    map.value.remove(routeData.endMarker)
  }
  
  // 创建起点标记
  routeData.startMarker = new AMap.Marker({
    position: routeData.startPoint,
    title: '起点',
    icon: new AMap.Icon({
      size: new AMap.Size(32, 32),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/start.png'
    })
  })
  
  // 创建终点标记
  routeData.endMarker = new AMap.Marker({
    position: routeData.endPoint,
    title: '终点',
    icon: new AMap.Icon({
      size: new AMap.Size(32, 32),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/end.png'
    })
  })
  
  // 添加标记到地图
  map.value.add(routeData.startMarker)
  map.value.add(routeData.endMarker)
  
  // 使用高德地图路径规划服务
  AMap.plugin('AMap.Driving', () => {
    const driving = new AMap.Driving({
      map: map.value,
      showTraffic: false,
      hideMarkers: true
    })
    
    // 规划路径
    driving.search(routeData.startPoint, routeData.endPoint, (status, result) => {
      if (status === 'complete') {
        console.log('路径规划成功')
        // 获取路径数据
        const routes = result.routes
        if (routes && routes.length > 0) {
          const path = routes[0].steps.map(step => step.path).flat()
          
          // 创建路径线
          routeData.routePolyline = new AMap.Polyline({
            path: path,
            strokeColor: '#00ff00',
            strokeWeight: 4,
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
          })
          
          // 添加路径线到地图
          map.value.add(routeData.routePolyline)
          
          // 调整地图视野以显示完整路径
          map.value.setFitView([routeData.routePolyline])
        }
      } else {
        console.error('路径规划失败:', result)
      }
    })
  })
}

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

      // 从数据服务获取路径数据
      const routeInfo = await getTransportRoutes()
      
      // 更新路径数据
      routeData.startPoint = routeInfo.startPoint
      routeData.endPoint = routeInfo.endPoint
      routeData.waypoints = routeInfo.waypoints || []

      // 绘制路径
      drawRoute(AMap)

      mapLoading.value = false
    }).catch(e => {
      console.error("地图初始化失败：", e)
      mapError.value = e.message || "未知错误"
      mapLoading.value = false
    })
  })
})
</script>

<style scoped>
/* 地图区域样式 */
.map-section {
  flex: 0.9;
  position: relative;
  background: rgba(26, 26, 46, 0.3);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #2a4a6b;
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
</style>
