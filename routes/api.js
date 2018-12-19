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
      const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null)

      if(stock) {
        if (stock.length === 1) {
          res.json(singleStockHandler(stock, ip, like))
        } else
        if (stock.length === 2) {
          res.json(doubleStockHandler(stock, ip, like))
        }
      } else {
        res.send('invalid request')
      }
    })
    
}
