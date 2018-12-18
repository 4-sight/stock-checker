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
      let data = await dataFetch(stock)

      const stockData = {
        stock: stock,
        price: data,
        likes: 5
      }
      res.json({stockData})
    });
    
};
