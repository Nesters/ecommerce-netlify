import Vue from "vue"

Vue.filter("resize", function(value, { width, height }) {
  return `${value.split('.jpg')[0]}_${width ? width : ''}x${height ? height : ''}.jpg`
})
