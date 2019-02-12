import Vue from 'vue'
import mask from './mask'

const MaskConstructor = Vue.extend(mask)

var instance

var myMask = function(el) {
  instance = new MaskConstructor({})
  instance.$mount()
  el.target.appendChild(instance.$el)
  return instance
}

export default myMask
