import Mock from 'mockjs'

// 基本配置
Mock.setup({
  timeout: '500-1000'
})

// 拦截接口 /my/test
// 1.接口地址路径规划，需要匹配到他
// 2.请求方式
// 3。返回数据（函数返回数据）
Mock.mock(/\/my\/test/, 'get', () => {
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})
