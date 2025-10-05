<template>
  <div class="panel supplies">
    <h3 class="panel-title">
      <el-icon class="panel-icon"><Box /></el-icon>
       卫勤物资态势
    </h3>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>物资</th>
            <th>消耗量</th>
            <th>各级物资存耗</th>
            <th>消耗速率</th>
            <th>需补充品量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in supplies" :key="item.type">
            <td>{{ item.type }}</td>
            <td>{{ item.consumption }} {{ item.unit }}</td>
            <td>
              <div class="progress-bar">
                <div 
                  :class="['progress-fill', getAlertClass(item.stockLevel)]"
                  :style="{ width: item.stockLevel + '%' }"
                ></div>
                <span class="progress-text">{{ item.stockLevel }}%</span>
              </div>
            </td>
            <td>{{ item.consumptionRate }} {{ item.unit }}/小时</td>
            <td>
              <div class="replenishment-info">
                <div class="replenishment-amount">{{ item.replenishmentAmount }} {{ item.unit }}</div>
                <span :class="['alert-text', item.replenishmentAlert]">
                  {{ getReplenishmentText(item.replenishmentAlert) }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Box } from '@element-plus/icons-vue'

/**
 * 注意：props 的数据结构已从 Object 变更为 Array
 * 父组件需要传入一个包含多个物资对象的数组
 * * 示例数据结构:
 * [
 * { 
 * type: '🩸 血制品', 
 * consumption: 120, 
 * unit: '袋',
 * stockLevel: 80, // 库存水准百分比
 * consumptionRate: 15,
 * replenishmentAmount: 0,
 * replenishmentAlert: 'normal' // 'normal', 'low', 'critical'
 * },
 * { 
 * type: '💊 药品', 
 * consumption: 500, 
 * unit: '盒',
 * stockLevel: 65,
 * consumptionRate: 60,
 * replenishmentAmount: 200,
 * replenishmentAlert: 'low'
 * },
 * { 
 * type: '🩹 耗材', 
 * consumption: 2500,
 * unit: '件', 
 * stockLevel: 40,
 * consumptionRate: 300,
 * replenishmentAmount: 1500,
 * replenishmentAlert: 'low'
 * },
 * { 
 * type: '🩺 设备', 
 * consumption: 5,
 * unit: '台',
 * stockLevel: 25,
 * consumptionRate: 1,
 * replenishmentAmount: 10,
 * replenishmentAlert: 'critical'
 * }
 * ]
 */
const props = defineProps({
  supplies: {
    type: Array,
    required: true
  }
})

/**
 * 根据百分比数值判断警戒等级，用于动态设置进度条颜色
 * @param {number} value - 库存或时长百分比 (0-100)
 * @returns {string} 颜色类名：'success', 'warning', 'danger'
 */
const getAlertClass = (value) => {
  if (value >= 70) {
    return 'success' // 充足/安全
  } else if (value >= 30) {
    return 'warning' // 预警/需关注
  } else {
    return 'danger'  // 危急/不足
  }
}

/**
 * 根据补充品量的警戒级别返回对应的中文状态描述
 * @param {string} alertKey - 警戒级别键名
 * @returns {string} 状态描述
 */
const getReplenishmentText = (alertKey) => {
  const map = {
    normal: '无需调拨',
    low: '需关注',
    critical: '紧急调拨'
  }
  return map[alertKey] || '数据异常';
}
</script>

<style scoped>
/* ---------------------------------------------------- */
/* 面板与表格样式（无变动）                               */
/* ---------------------------------------------------- */
.panel {
  background: rgba(26, 26, 46, 0.3);
  border: 1px solid #2a4a6b;
  border-radius: 20px;
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

.supplies .panel-icon {
  color: #e6a23c;
  text-shadow: 0 0 10px rgba(230, 162, 60, 0.5);
}

.table-container {
  overflow-x: visible; /* 移除横向滚动 */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: auto; /* 自动表格布局 */
}

.data-table th {
  background: rgba(42, 74, 107, 0.3);
  color: #ffffff;
  font-weight: 700;
  padding: 8px 6px; /* 减少内边距 */
  text-align: center;
  border-bottom: 2px solid #2a4a6b;
  font-size: 13px; /* 稍微减小字体 */
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 8px 6px; /* 减少内边距 */
  border-bottom: 1px solid #2a4a6b;
  color: #ffffff;
  font-size: 13px; /* 稍微减小字体 */
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  font-weight: 600;
  text-align: center;
  vertical-align: middle; /* 垂直居中 */
  white-space: nowrap; /* 防止文字换行 */
}

.data-table tr:hover {
  background: rgba(42, 74, 107, 0.2);
}

/* ---------------------------------------------------- */
/* 进度条与状态文本样式（无变动）                       */
/* ---------------------------------------------------- */

.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  background: #2a4a6b;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
  position: relative;
}

/* 颜色类名定义 */
.progress-fill.success {
  background: linear-gradient(90deg, #67c23a, #85ce61); /* 绿色：安全 */
}

.progress-fill.warning {
  background: linear-gradient(90deg, #e6a23c, #f0c78a); /* 橙色：预警 */
}

.progress-fill.danger {
  background: linear-gradient(90deg, #f56c6c, #ff9a9a); /* 红色：危急 */
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

/* 补充品量信息容器 */
.replenishment-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.replenishment-amount {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}

/* 警戒文字样式 */
.alert-text {
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  font-size: 12px;
}
.alert-text.normal {
    color: #67c23a; /* 绿色 */
    background: rgba(103, 194, 58, 0.1);
    border: 1px solid rgba(103, 194, 58, 0.5);
}
.alert-text.low {
    color: #e6a23c; /* 橙色 */
    background: rgba(230, 162, 60, 0.1);
    border: 1px solid rgba(230, 162, 60, 0.5);
}
.alert-text.critical {
    color: #f56c6c; /* 红色 */
    background: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.5);
}
</style>