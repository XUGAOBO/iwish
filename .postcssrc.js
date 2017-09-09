// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {},
    // fix @import
    'postcss-import': {},
    // cssnext contains autoprefixer
    // browser option
    'postcss-cssnext': {
      'browsers': [
        'iOS >= 8',
        'Chrome >= 45',
        'Android >= 4',
        'IE > 10'
      ]
    },
    'postcss-bem': {
      style: 'suit',
      separators: {
        descendent: '__',
        modifier: '--'
      },
      // 简写
      shortcuts: {
        utility: 'util'
      }
    }
  }
}
