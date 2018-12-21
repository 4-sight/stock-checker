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
      const ip = req.headers['x-forwarded-for']
      
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
