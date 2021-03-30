const files = require.context('.', false, /\.js$/)
const types = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  types[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default types
