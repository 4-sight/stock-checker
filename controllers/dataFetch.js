
const request = require('request')

module.exports = (stock) => {

  return new Promise((resolve, reject) => {
    request.get(
      `https://api.iextrading.com/1.0/stock/${stock}/price`,
      (err, res) => {
        if(err) {
          reject(err)
        } else
        if(res.statusCode !== 200) {
          reject(res.statusCode)
        } else {
          resolve(res.body)
        }
    })
  })
}