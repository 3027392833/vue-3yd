<template>
  <div class="panel medical-forces">
    <h3 class="panel-title">
      <el-icon class="panel-icon"><OfficeBuilding /></el-icon>
      🏥 全域医疗力量
    </h3>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>项目</th>
            <th>数量</th>
            <th>可用率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🏥 建制卫勤力量</td>
            <td>{{ medicalForces.institutional }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '85%' }"></div>
                <span class="progress-text">85%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>🚑 机动卫勤力量</td>
            <td>{{ medicalForces.mobile }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '78%' }"></div>
                <span class="progress-text">78%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>🏕️ 野战医院</td>
            <td>{{ medicalForces.fieldHospital }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '92%' }"></div>
                <span class="progress-text">92%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>🏢 后方医院</td>
            <td>{{ medicalForces.rearHospital }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '88%' }"></div>
                <span class="progress-text">88%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>🏥 地方医院</td>
            <td>{{ medicalForces.localHospital }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '95%' }"></div>
                <span class="progress-text">95%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>⚠️ 医护人员伤亡</td>
            <td>{{ medicalForces.casualties }}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill warning" :style="{ width: '15%' }"></div>
                <span class="progress-text">15%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { OfficeBuilding } from '@element-plus/icons-vue'

defineProps({
  medicalForces: {
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

.medical-forces .panel-icon {
  color: #67c23a;
  text-shadow: 0 0 10px rgba(103, 194, 58, 0.5);
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
  background: rgba(42, 74, 107, 0.3);
  color: #ffffff;
  font-weight: 700;
  padding: 12px 8px;
  text-align: center;
  border-bottom: 2px solid #2a4a6b;
  font-size: 14px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #2a4a6b;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  font-weight: 600;
  text-align: center;
}

.data-table tr:hover {
  background: rgba(42, 74, 107, 0.2);
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

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  z-index: 1;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}
</style>
