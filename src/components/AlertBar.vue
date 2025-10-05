<template>
  <div class="alert-bar">
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
  /* 1. 背景：使用面板的半透明深色背景 */
  background: rgba(26, 26, 46, 0.3);
  
  /* 2. 边框：使用面板的蓝色边框 */
  border: 1px solid #2a4a6b;
  
  /* 3. 字体颜色：保留柔和的红色 */
  color: hsl(0, 100%, 71%); 
  
  /* 4. 磨砂玻璃效果：使用面板的背景模糊 */
  backdrop-filter: blur(10px);
  
  /* 其他样式保持不变或继承面板样式 */
  border-radius: 16px; /* 保留你原本的圆角 */
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  
  /* 5. 阴影：使用面板的柔和阴影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); 
  
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  letter-spacing: 0.5px;
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
