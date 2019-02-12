const Mock = require('mockjs')
import brand from './brand'
export default Mock.mock({
  'body': [
    {
      'id|+1': 1,
      'name': '@cname',
      'roleName|1': ['普通会员', '超级管理员', '平台管理员', '数据库管理员'],
      'email': '@email',
      'ip': '@ip',
      'display': '@boolean',
      'createTime': '@date("yyyy-MM-dd HH:mm:ss")',
      'sort': '@integer(1, 99)',
      'moneny': 10000.00,
      'float': 0.1,
      'object': {
        'foo|1-3': '@name',
        'teset': {
          'name|2': '@title'
        }
      },
      'image|1': brand.image,
      'brandName|1': brand.name,
      'desc': '@paragraph(2,10)',
      'letter': '@character("upper")'
    }
  ]
})

