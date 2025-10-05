// 测试API连接脚本
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000
})

async function testApiConnection() {
  console.log('🔍 开始测试API连接...')
  
  const endpoints = [
    '/medical-forces',
    '/supplies', 
    '/efficiency',
    '/transport',
    '/alert-message',
    '/map-markers',
    '/transport-routes',
    '/all-data'
  ]
  
  for (const endpoint of endpoints) {
    try {
      console.log(`📡 测试 ${endpoint}...`)
      const response = await api.get(endpoint)
      
      if (response.data.success) {
        console.log(`✅ ${endpoint} - 成功`)
        console.log(`   数据: ${JSON.stringify(response.data.data).substring(0, 100)}...`)
      } else {
        console.log(`❌ ${endpoint} - API返回失败: ${response.data.message}`)
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`❌ ${endpoint} - 连接被拒绝，请确保后端服务已启动`)
      } else if (error.response) {
        console.log(`❌ ${endpoint} - HTTP错误: ${error.response.status}`)
      } else {
        console.log(`❌ ${endpoint} - 网络错误: ${error.message}`)
      }
    }
  }
  
  console.log('🏁 API连接测试完成')
}

testApiConnection().catch(console.error)
