import axios from './fetch'

export default {
  $get: function(url, data) {
    return axios({
      url: url,
      method: 'get',
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  $post(url, data, headers) {
    return axios({
      url: url,
      method: 'post',
      data: data,
      headers: headers
    })
  },

  $delete(url, data, config) {
    return axios({
      url: url,
      method: 'delete',
      data: data
    })
  }
}

