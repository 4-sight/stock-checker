
const request = require('request')

module.exports = async(stock) => {

  let data = await new Promise((resolve, reject) => {
    request.get(
      `https://api.iextrading.com/1.0/stock/${stock}/quote`,
      (err, res) => {
        if(err) {
          reject(err)
        } else
        if(res.statusCode !== 200) {
          reject(res.statusCode)
        } else {
          resolve(JSON.parse(res.body))
        }
      })
  })
    .catch(err => {console.error(err)})

  return data
}