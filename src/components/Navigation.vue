<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>卫勤指挥系统</h2>
      </div>
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link 
            to="/medical-command" 
            class="nav-link"
            :class="{ active: $route.name === 'MedicalCommand' }"
          >
            <span class="nav-icon">🏥</span>
            <span class="nav-text">卫勤指挥</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/tactical-rear" 
            class="nav-link"
            :class="{ active: $route.name === 'TacticalRear' }"
          >
            <span class="nav-icon">⚔️</span>
            <span class="nav-text">战术后方</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/campaign-rear" 
            class="nav-link"
            :class="{ active: $route.name === 'CampaignRear' }"
          >
            <span class="nav-icon">🎯</span>
            <span class="nav-text">战役后方</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// 导航组件逻辑
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #2a4a6b;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.nav-brand h2 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  background: rgba(42, 74, 107, 0.3);
  color: #409eff;
  transform: translateY(-1px);
}

.nav-link.active {
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #409eff;
  border-radius: 1px;
}

.nav-icon {
  font-size: 18px;
  line-height: 1;
}

.nav-text {
  font-size: 14px;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
    height: 50px;
  }
  
  .nav-brand h2 {
    font-size: 16px;
  }
  
  .nav-menu {
    gap: 10px;
  }
  
  .nav-link {
    padding: 8px 12px;
    gap: 6px;
  }
  
  .nav-icon {
    font-size: 16px;
  }
  
  .nav-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .nav-text {
    display: none;
  }
  
  .nav-link {
    padding: 8px;
    justify-content: center;
  }
}
</style>
