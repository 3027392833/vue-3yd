// 战救指挥可视化监控大屏数据服务
// 模拟后端API接口

// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 全域医疗力量数据
export const getMedicalForces = async () => {
  await delay(500) // 模拟网络延迟
  return {
    institutional: 120,
    mobile: 80,
    fieldHospital: 6,
    rearHospital: 12,
    localHospital: 15,
    casualties: 23
  }
}

// 卫勤物资情况数据
export const getSupplies = async () => {
  await delay(500)
  return {
    keyConsumption: 230,
    stockLevel: 85,
    consumptionRate: 12,
    replenishment: 1200
  }
}

// 战救效率统计数据
export const getEfficiency = async () => {
  await delay(500)
  return {
    currentCasualties: 320,
    triageTime: 5,
    surgeryWait: 18,
    transportTime: 40
  }
}

// 医疗后送能力数据
export const getTransport = async () => {
  await delay(500)
  return {
    vehicles: 45,
    medicalStaff: 260,
    availability: 78,
    lossRate: 12,
    warning: '存在 5 起'
  }
}

// 警示信息数据
export const getAlertMessage = async () => {
  await delay(500)
  const alerts = [
    '⚠️ 战救效率下降 15%',
    '⚠️ 医疗后送饱和',
    '⚠️ 关键物资库存不足',
    '⚠️ 医护人员伤亡增加'
  ]
  return alerts[Math.floor(Math.random() * alerts.length)]
}

// 地图标记点数据
export const getMapMarkers = async () => {
  await delay(500)
  return [
    { position: [120.08, 30.20], name: '野战医院A', type: 'field' },
    { position: [120.12, 30.24], name: '后方医院B', type: 'rear' },
    { position: [120.06, 30.26], name: '地方医院C', type: 'local' },
    { position: [120.14, 30.18], name: '救治点D', type: 'aid' }
  ]
}

// 后送路径数据
export const getTransportRoutes = async () => {
  await delay(500)
  return [
    [120.08, 30.20],
    [120.10, 30.22],
    [120.12, 30.24]
  ]
}

// 实时数据更新（模拟WebSocket或定时轮询）
export const startRealTimeUpdates = (callback) => {
  const interval = setInterval(async () => {
    try {
      const [medicalForces, supplies, efficiency, transport, alertMessage] = await Promise.all([
        getMedicalForces(),
        getSupplies(),
        getEfficiency(),
        getTransport(),
        getAlertMessage()
      ])
      
      callback({
        medicalForces,
        supplies,
        efficiency,
        transport,
        alertMessage
      })
    } catch (error) {
      console.error('数据更新失败:', error)
    }
  }, 30000) // 每30秒更新一次

  return () => clearInterval(interval)
}
