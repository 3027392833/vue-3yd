<template>
  <div class="alert-bar">
    <el-icon class="alert-icon"><Warning /></el-icon>
    <div class="alert-content">
      <div class="alert-text">{{ alertMessage }}</div>
      <div class="alert-text">⚠️ 医疗后送饱和，运力不足</div>
      <div class="alert-text">⚠️ 关键物资库存告急，需紧急补充</div>
    </div>
  </div>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue'

defineProps({
  alertMessage: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
/* 警示栏样式 */
.alert-bar {
  background: linear-gradient(135deg, #2d1b1b 0%, #4a1a1a 50%, #6b1a1a 100%);
  color: #ff6b6b;
  padding: 20px 24px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  letter-spacing: 0.5px;
  border: 1px solid #ff4444;
  min-height: 80px;
}

.alert-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.alert-text {
  line-height: 1.4;
  margin: 0;
  text-shadow: 0 0 8px rgba(255, 107, 107, 0.5);
}

.alert-icon {
  font-size: 24px;
  color: #ff6b6b;
  margin-top: 4px;
  flex-shrink: 0;
}
</style>
