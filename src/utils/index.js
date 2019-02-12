/**
 * @author hq
 * @version 0.1
 * js 工具方法
 *
 */
export default {
  getDateTimeStamp: function(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, '/'))
  },
  getDateDiff: function(timespan, istimesTamp) { // 时间字符串
    var dateTime = new Date(timespan)
    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()
    var minute = dateTime.getMinutes()
    // var second = dateTime.getSeconds()
    var now = new Date()
    var now_new = now.getTime() // typescript转换写法
    var milliseconds = 0
    var timeSpanStr
    milliseconds = now_new - timespan
    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
    return timeSpanStr
  },
  // 验证对象类型
  validateObjcet: function(obj) {
    const type = Object.prototype.toString.call(obj)
    if (type === '[object Object]') {
      return 'Object'
    } else if (type === '[object Array]') {
      return 'Array'
    } else if (type === '[object String]') {
      return 'String'
    } else if (type === '[object Number]') {
      return 'Number'
    } else if (type === '[object Function]') {
      return 'Function'
    } else if (type === '[object Date]') {
      return 'Date'
    } else if (type === '[object Boolean]') {
      return 'Boolean'
    } else if (type === '[object Null]') {
      return 'Null'
    } else if (type === '[object Undefined]') {
      return 'Undefined'
    }
  },
  deepCopy: function(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  arrayToNumber: function(arr) { // 字符串转数组
    const tmp = []
    arr = arr.split(',')
    arr = arr.map((value) => {
      parseInt(value)
      tmp.push(value)
    })
    return tmp
  },
  percentData: function(value) {
    // 百分比转换
    return (value * 100) + '%'
  },
  randomString: function(L) {
    var s = ''
    var randomchar = function() {
      var n = Math.floor(Math.random() * 62)
      if (n < 10) return n // 1-10
      if (n < 36) return String.fromCharCode(n + 55) // A-Z
      return String.fromCharCode(n + 61) // a-z
    }
    while (s.length < L) s += randomchar()
    return s
  }
}
