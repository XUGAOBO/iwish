export const format = (date, fmt = 'YYYY-MM-DD', lang = 'id') => {
  if (!date) {
    date = new Date()
  } else if (Object.prototype.toString.call(date) === '[object String]') {
    date = new Date(date)
  }

  if (!(date instanceof Date)) {
    return ''
  }
  // 月、日，小时（12/24小时制），分钟，秒，季度，毫秒
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }

  // 星期格式
  const weekLang = {
    'zh': ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'],
    'id': {
      '1': ['Mi', 'Se', 'Se', 'Ra', 'Ka', 'Ju', 'Sa'],
      '2': ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] // 星期日 -- 星期六
    }
  }

  // 中文格式化，星期前缀
  const weekPrefix = {
    'zh': ['', '\u5468', '\u661f\u671f'] // 中文， zh = ['', ' 周', '星期']
  }

  // 月份格式
  const monthLang = {
    'id': ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // 如果是月份
      switch (lang) {
        case 'id': {
          if (k === 'M+') {
            console.log('monthLang', date.getMonth(), monthLang['id'][date.getMonth()])
            fmt = fmt.replace(RegExp.$1, monthLang['id'][date.getMonth()])
          } else {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
          break
        }
        case 'zh': {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          break
        }
        default: {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
    }
  }

  // FIX 月份中没有Y和W字符， 最后替换年：Y+ 和 W+ 避免英文冲突，会被替换掉；如：Jumat -> Ju20at
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(W+)/.test(fmt)) {
    switch (lang) {
      case 'id': {
        console.log('weekLang', date.getDay(), weekLang['id']['2'][date.getDay()])
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1) ? weekLang['id']['2'][date.getDay()] : weekLang['id']['1'][date.getDay()])
        break
      }
      case 'zh': {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? weekPrefix.zh[2] : weekPrefix.zh[1]) : weekPrefix.zh[0]) + weekLang['zh'][date.getDay()])
        break
      }
      default: {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? weekPrefix.zh[2] : weekPrefix.zh[1]) : weekPrefix.zh[0]) + weekLang['zh'][date.getDay()])
      }
    }
  }
  return fmt
}

export const rangeDay = (start, end) => {
  if (!start || !end) {
    return null
  }

  const diff = new Date(end).getTime() - new Date(start).getTime()

  return Math.ceil(diff / 1000 / 60 / 60 / 24)
}

/*
 *   功能:实现日期相加的功能.
 *   参数:identifier,字符串用于识别是年月日时分秒.
 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
 *   参数:date,时间对象.
 *   返回:新的时间对象.
 *   var now = new Date();
 *   var newDate = dateAdd( "d", 5, now);
 *---------------   dateAdd(identifier,number,date)   -----------------
 */
export const dateAdd = (identifier, number, date = new Date()) => {
  switch (identifier) {
    case 'Y': {
      date.setFullYear(date.getFullYear() + number)
      return date
    }
    // 每季度
    case 'Q': {
      date.setMonth(date.getMonth() + number * 3)
      return date
    }
    case 'M': {
      date.setMonth(date.getMonth() + number)
      return date
    }
    // 每周
    case 'W': {
      date.setDate(date.getDate() + number * 7)
      return date
    }
    case 'D': {
      date.setDate(date.getDate() + number)
      return date
    }
    case 'h': {
      date.setHours(date.getHours() + number)
      return date
    }
    case 'm': {
      date.setMinutes(date.getMinutes() + number)
      return date
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number)
      return date
    }
    default: {
      date.setDate(date.getDate() + number)
      return date
    }
  }
}
