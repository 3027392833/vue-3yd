<template>
  <div class="panel efficiency">
    <h3 class="panel-title">
      <el-icon class="panel-icon"><TrendCharts /></el-icon>
      📊 战救效率统计
    </h3>
    <div class="efficiency-cards">
      <div class="efficiency-card">
        <div class="card-content">
          <div class="card-label">当前伤员数量</div>
          <div class="card-value">{{ efficiency.currentCasualties }} 人</div>
        </div>
      </div>
      <div class="efficiency-card">
        <div class="card-content">
          <div class="card-label">平均检伤分类时间</div>
          <div class="card-value">{{ efficiency.triageTime }} 分钟</div>
        </div>
      </div>
      <div class="efficiency-card">
        <div class="card-content">
          <div class="card-label">平均手术等待时间</div>
          <div class="card-value">{{ efficiency.surgeryWait }} 分钟</div>
        </div>
      </div>
      <div class="efficiency-card">
        <div class="card-content">
          <div class="card-label">平均后送周转时间</div>
          <div class="card-value">{{ efficiency.transportTime }} 分钟</div>
        </div>
      </div>
    </div>
    
    <!-- 实时伤员结构柱状图 -->
    <div class="casualty-chart">
      <h4 class="chart-title">🤕 实时伤员结构</h4>
      <div class="chart-container">
        <div class="chart-bars">
          <div class="chart-bar">
            <div class="bar-label">轻伤</div>
            <div class="bar-container">
              <div class="bar-fill light" style="width: 45%"></div>
              <div class="bar-value">145 人</div>
            </div>
          </div>
          <div class="chart-bar">
            <div class="bar-label">中伤</div>
            <div class="bar-container">
              <div class="bar-fill medium" style="width: 30%"></div>
              <div class="bar-value">98 人</div>
            </div>
          </div>
          <div class="chart-bar">
            <div class="bar-label">重伤</div>
            <div class="bar-container">
              <div class="bar-fill severe" style="width: 20%"></div>
              <div class="bar-value">65 人</div>
            </div>
          </div>
          <div class="chart-bar">
            <div class="bar-label">危重</div>
            <div class="bar-container">
              <div class="bar-fill critical" style="width: 5%"></div>
              <div class="bar-value">12 人</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendCharts } from '@element-plus/icons-vue'

defineProps({
  efficiency: {
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

.efficiency .panel-icon {
  color: #409eff;
  text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

/* 战救效率统计卡片样式 */
.efficiency-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
}

.efficiency-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: rgba(26, 26, 46, 0.4);
  border: 1px solid #2a4a6b;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-align: center;
}

.efficiency-card:hover {
  background: rgba(42, 74, 107, 0.3);
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.card-label {
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  opacity: 0.9;
}

.card-value {
  font-size: 16px;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

/* 实时伤员结构柱状图样式 */
.casualty-chart {
  margin-top: 20px;
  padding: 16px;
  background: rgba(26, 26, 46, 0.3);
  border: 1px solid #2a4a6b;
  border-radius: 8px;
}

.chart-title {
  font-size: 18px;
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 16px 0;
  text-align: center;
}

.chart-container {
  width: 100%;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chart-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  width: 60px;
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  text-align: left;
}

.bar-container {
  flex: 1;
  position: relative;
  height: 24px;
  background: rgba(42, 74, 107, 0.3);
  border-radius: 12px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.8s ease;
  position: relative;
}

.bar-fill.light {
  background: linear-gradient(90deg, #67c23a, #85ce61);
}

.bar-fill.medium {
  background: linear-gradient(90deg, #e6a23c, #f0c78a);
}

.bar-fill.severe {
  background: linear-gradient(90deg, #f56c6c, #f89898);
}

.bar-fill.critical {
  background: linear-gradient(90deg, #ff4444, #ff6666);
}

.bar-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  z-index: 1;
}
</style>
