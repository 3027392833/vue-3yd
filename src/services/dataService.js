// 战救指挥可视化监控大屏数据服务
// 真实后端API接口

import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json'
  }
})

// 统一错误处理
const handleApiError = (error) => {
  console.error('API调用失败:', error)
  if (error.response) {
    throw new Error(`API错误: ${error.response.status} - ${error.response.data.message || '未知错误'}`)
  } else if (error.request) {
    throw new Error('网络连接失败，请检查后端服务是否启动')
  } else {
    throw new Error(`请求配置错误: ${error.message}`)
  }
}

// 全域医疗力量数据
export const getMedicalForces = async () => {
  try {
    const response = await api.get('/medical-forces')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取医疗力量数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 卫勤物资情况数据
export const getSupplies = async () => {
  try {
    const response = await api.get('/supplies')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取卫勤物资数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 战救效率统计数据
export const getEfficiency = async () => {
  try {
    const response = await api.get('/efficiency')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取战救效率数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 医疗后送能力数据
export const getTransport = async () => {
  try {
    const response = await api.get('/transport')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取医疗后送数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 警示信息数据
export const getAlertMessage = async () => {
  try {
    const response = await api.get('/alert-message')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取警示信息失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 地图标记点数据
export const getMapMarkers = async () => {
  try {
    const response = await api.get('/map-markers')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取地图标记点数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 后送路径数据
export const getTransportRoutes = async () => {
  try {
    const response = await api.get('/transport-routes')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取后送路径数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 获取所有数据的综合接口
export const getAllData = async () => {
  try {
    const response = await api.get('/all-data')
    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || '获取综合数据失败')
    }
  } catch (error) {
    handleApiError(error)
  }
}

// 实时数据更新（使用综合接口或分别调用）
export const startRealTimeUpdates = (callback) => {
  const interval = setInterval(async () => {
    try {
      // 优先使用综合接口，如果失败则分别调用各个接口
      try {
        const allData = await getAllData()
        callback(allData)
      } catch (error) {
        console.warn('综合接口调用失败，使用分别调用:', error.message)
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
      }
    } catch (error) {
      console.error('数据更新失败:', error)
    }
  }, 30000) // 每30秒更新一次

  return () => clearInterval(interval)
}
