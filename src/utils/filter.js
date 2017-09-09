import {
  format
} from 'Utils/date'

export default {
  formatDate(value, fmt = 'YYYY-MM-DD', lang = 'id') {
    if (!!value) {
      return format(value, fmt, lang)
    }
    return ''
  },
  week(value) {
    if (!!value) {
      return format(value, 'WW')
    }
    return ''
  }
}
