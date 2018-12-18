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
      
      try{data = await dataFetch(stock)}
      catch(err) {console.error(err)}
      
      data = JSON.parse(data)
      
      const stockData = {
        stock: data.symbol,
        price: data.latestPrice,
        likes: 5
      }
      res.json({stockData})
    });
    
};
