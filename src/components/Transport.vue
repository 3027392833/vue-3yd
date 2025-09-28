<template>
  <div class="panel transport">
    <h3 class="panel-title">
      <el-icon class="panel-icon"><Van /></el-icon>
      🚚 医疗后送能力
    </h3>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>运力类型</th>
            <th>总数</th>
            <th>可用</th>
            <th>在途</th>
            <th>损耗</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🚚 运输车</td>
            <td>{{ transport.vehicles.total }} 辆</td>
            <td>{{ transport.vehicles.available }} 辆</td>
            <td>{{ transport.vehicles.inTransit }} 辆</td>
            <td>{{ transport.vehicles.damaged }} 辆</td>
          </tr>
          <tr>
            <td>🛸 无人机</td>
            <td>{{ transport.drones.total }} 架</td>
            <td>{{ transport.drones.available }} 架</td>
            <td>{{ transport.drones.inTransit }} 架</td>
            <td>{{ transport.drones.damaged }} 架</td>
          </tr>
          <tr>
            <td>🚁 直升机</td>
            <td>{{ transport.helicopters.total }} 架</td>
            <td>{{ transport.helicopters.available }} 架</td>
            <td>{{ transport.helicopters.inTransit }} 架</td>
            <td>{{ transport.helicopters.damaged }} 架</td>
          </tr>
          <tr>
            <td>👨‍⚕️ 医护力量</td>
            <td>{{ transport.medicalStaff.total }} 人</td>
            <td>{{ transport.medicalStaff.available }} 人</td>
            <td>{{ transport.medicalStaff.inTransit }} 人</td>
            <td>{{ transport.medicalStaff.damaged }} 人</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 不具备后送条件预警 -->
    <div class="transport-warning">
      <div class="warning-icon">⚠️</div>
      <div class="warning-content">
        不具备后送条件预警：存在 {{ transport.warning }} 不具备后送条件，运力损耗率 {{ transport.lossRate }}%，总体可用率 {{ transport.availability }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { Van } from '@element-plus/icons-vue'

defineProps({
  transport: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* 面板样式 */
.panel {
  background: rgba(26, 26, 46, 0.3);
  border: 1px solid #2a4a6b;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.panel-title {
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 16px 0;
  color: #ffffff;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.panel-icon {
  font-size: 28px;
  text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

.transport .panel-icon {
  color: #f56c6c;
  text-shadow: 0 0 10px rgba(245, 108, 108, 0.5);
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th {
  background: rgba(42, 74, 107, 0.4);
  color: #ffffff;
  font-weight: 700;
  padding: 8px 4px;
  text-align: center;
  border-bottom: 2px solid #2a4a6b;
  font-size: 14px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.data-table td {
  padding: 8px 4px;
  border-bottom: 1px solid #2a4a6b;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.data-table tr:hover {
  background: rgba(42, 74, 107, 0.2);
}

.data-table td:first-child {
  text-align: center;
  font-weight: 600;
  color: #ffffff;
}

/* 运输预警样式 */
.transport-warning {
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #2d1b1b 0%, #4a1a1a 50%, #6b1a1a 100%);
  border: 1px solid #ff4444;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.warning-icon {
  font-size: 20px;
  color: #ff6b6b;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

.warning-content {
  flex: 1;
  font-size: 14px;
  color: #ff9999;
  line-height: 1.4;
  margin: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
