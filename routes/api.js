/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const dataFetch = require('../controllers/dataFetch.js')


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      let stock = req.query.stock
      let data

      const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null)
      
      console.log(ip)
      data = dataFetch(stock)
      
      const stockData = {
        stock: data.symbol,
        price: data.latestPrice,
        likes: 5
      }
      res.json({stockData})
    });
    
};
