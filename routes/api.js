/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'


const singleStockHandler = require('../controllers/singleStockHandler.js')
const doubleStockHandler = require('../controllers/doubleStockHandler.js')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      
      const stock = req.query.stock
      const like = req.query.like
      
      let ip = (
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null)
      ).split(',')[0]

      if(ip == '::ffff:127.0.0.1') {
        ip = '127.0.0.1'
      }

      if(stock) {
        if (typeof stock === 'string') {
          let stockData = await singleStockHandler(stock, ip, like)
          res.json(stockData)
        } else
        if (typeof stock === 'object') {
          let stockData = await doubleStockHandler(stock, ip, like)
          res.json(stockData)
        }
      } else {
        res.send('invalid request')
      }
    })
    
}
