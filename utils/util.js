const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//去左右空格;
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 导出方法列表 
 * 配合 // const utils = require("util.js") 使用
 */
module.exports = {
  formatTime: formatTime,
  trim: trim
}

/**
 * 导出方法
 * 配合 // import { formatNumber } from "util.js"
 */
export { formatNumber }
