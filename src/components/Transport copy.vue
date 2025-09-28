<template>
  <div class="panel transport">
    <h3 class="panel-title">
      <el-icon class="panel-icon"><Van /></el-icon>
      🚚 医疗后送能力
    </h3>

    <div class="transport-list">
      <div class="transport-item">
        <div class="item-header">
          <span class="item-icon">🚚</span>
          <span class="item-title">运输车</span>
        </div>
        <div class="item-stats">
          <div class="stat">
            <span class="stat-label">总数</span>
            <span class="stat-value">{{ transport.vehicles.total }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">可用</span>
            <span class="stat-value">{{ transport.vehicles.available }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">在途</span>
            <span class="stat-value">{{ transport.vehicles.inTransit }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">损耗</span>
            <span class="stat-value">{{ transport.vehicles.damaged }}</span>
          </div>
        </div>
      </div>

      <div class="transport-item">
        <div class="item-header">
          <span class="item-icon">🛸</span>
          <span class="item-title">无人机</span>
        </div>
        <div class="item-stats">
          <div class="stat">
            <span class="stat-label">总数</span>
            <span class="stat-value">{{ transport.drones.total }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">可用</span>
            <span class="stat-value">{{ transport.drones.available }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">在途</span>
            <span class="stat-value">{{ transport.drones.inTransit }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">损耗</span>
            <span class="stat-value">{{ transport.drones.damaged }}</span>
          </div>
        </div>
      </div>

      <div class="transport-item">
        <div class="item-header">
          <span class="item-icon">🚁</span>
          <span class="item-title">直升机</span>
        </div>
        <div class="item-stats">
          <div class="stat">
            <span class="stat-label">总数</span>
            <span class="stat-value">{{ transport.helicopters.total }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">可用</span>
            <span class="stat-value">{{ transport.helicopters.available }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">在途</span>
            <span class="stat-value">{{ transport.helicopters.inTransit }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">损耗</span>
            <span class="stat-value">{{ transport.helicopters.damaged }}</span>
          </div>
        </div>
      </div>

      <div class="transport-item">
        <div class="item-header">
          <span class="item-icon">👨‍⚕️</span>
          <span class="item-title">医护力量</span>
        </div>
        <div class="item-stats">
          <div class="stat">
            <span class="stat-label">总数</span>
            <span class="stat-value">{{ transport.medicalStaff.total }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">可用</span>
            <span class="stat-value">{{ transport.medicalStaff.available }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">在途</span>
            <span class="stat-value">{{ transport.medicalStaff.inTransit }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">伤亡</span>
            <span class="stat-value">{{ transport.medicalStaff.damaged }}</span>
          </div>
        </div>
      </div>
    </div>
    
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
  font-size: 24px; /* 缩小标题字体 */
  font-weight: 600;
  text-align: center;
  margin: 0 0 12px 0; /* 减小下边距 */
  color: #ffffff;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.panel-icon {
  font-size: 26px;
}

.transport .panel-icon {
  color: #f56c6c;
  text-shadow: 0 0 10px rgba(245, 108, 108, 0.5);
}

/* 紧凑型运力列表样式 */
.transport-list {
  display: flex;
  flex-direction: column;
  gap: 8px; /* 减小项目之间的间距 */
}

.transport-item {
  background: rgba(42, 74, 107, 0.25);
  border: 1px solid #2a4a6b;
  border-radius: 6px;
  padding: 8px 12px; /* 减小内边距 */
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.3s;
}

.transport-item:hover {
  background: rgba(42, 74, 107, 0.4);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px; /* 设置最小宽度以对齐 */
  color: #ffffff;
}

.item-icon {
  font-size: 20px;
}

.item-title {
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap; /* 防止文字换行 */
}

.item-stats {
  flex-grow: 1; /* 占据剩余空间 */
  display: flex;
  justify-content: space-around; /* 分散对齐 */
  align-items: center;
  gap: 8px;
}

.stat {
  display: flex;
  align-items: baseline; /* 基线对齐，让文字和数字对齐更好看 */
  gap: 5px;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 8px; /* 减小内边距 */
  border-radius: 4px;
  flex: 1; /* 均分空间 */
  justify-content: center;
  white-space: nowrap;
}

.stat-label {
  font-size: 12px;
  color: #a9c2e3;
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}


/* 运输预警样式 */
.transport-warning {
  margin-top: 12px; /* 减小上边距 */
  padding: 10px 16px; /* 减小内边距 */
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
  font-size: 13px; /* 稍微缩小字体 */
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