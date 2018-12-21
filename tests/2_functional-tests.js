/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http')
var chai = require('chai')
var assert = chai.assert
var server = require('../server')
const StocksDB = require('../models/stocks.js')
const UsersDB = require('../models/users.js')
const localIPv4 = require('./localIPHelper')

const getLikes = async function (stock) {
  let response = await StocksDB.getLikesAndReturn(stock)
  return response
}

const removeLike = async function (user, stock) {
  let response = await UsersDB.removeLikedStock(user, stock)
  return response
}

chai.use(chaiHttp)

suite('Functional Tests', function() {
    
  suite('GET /api/stock-prices => stockData object', function() {
      
    test('1 stock', async () => {
      let response = await chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        
      assert.equal(response.status, 200)
      assert.equal(response.body.stockData.stock, 'GOOG')
      assert.isNumber(response.body.stockData.price)
      assert.isNumber(response.body.stockData.likes)

    })
      
    test('1 stock with like', async () => {
       
      
      let [ initLikes ] = 
      await Promise.all(
        [
          getLikes('SQ'),
          removeLike(localIPv4, 'SQ')
        ]
      )
      
      let response = await chai.request(server)
        .get('/api/stock-prices')
        .query({
          stock: 'sq',
          like: true
        })
      
      assert.equal(response.status, 200)
      assert.equal(response.body.stockData.stock, 'SQ')
      assert.isNumber(response.body.stockData.price)
      assert.equal(response.body.stockData.likes, initLikes + 1)
    })
      
    test('1 stock with like again (ensure likes aren\'t double counted)',async () => {
    
      await removeLike(localIPv4, 'AMZN')

      let [initLikes, response] = 
      await Promise.all([
        getLikes('AMZN'),
        chai.request(server)
          .get('/api/stock-prices')
          .query({
            stock: 'amzn',
            like: true
          })
      ])

      assert.equal(response.status, 200)
      assert.equal(response.body.stockData.stock, 'AMZN')
      assert.isNumber(response.body.stockData.price)
      assert.equal(response.body.stockData.likes, initLikes + 1)
      
      let [currentLikes, response2] =
        await Promise.all([
          getLikes('AMZN'),
          chai.request(server)
            .get('/api/stock-prices')
            .query({
              stock: 'AMZN',
              like: true
            })
        ])

      assert.equal(response2.status, 200)
      assert.equal(response2.body.stockData.stock, 'AMZN')
      assert.isNumber(response2.body.stockData.price)
      assert.equal(response2.body.stockData.likes, currentLikes)
    })



    test('2 stocks', async() => {
      
      let response = await chai.request(server)
        .get('/api/stock-prices')
        .query({
          stock: ['amzn', 'goog']
        })
      
      const [stockA, stockB] = response.body.stockData

      assert.equal(response.status, 200)

      assert.equal(stockA.stock, 'AMZN')
      assert.isNumber(stockA.price)
      assert.isNumber(stockA.likes)

      assert.equal(stockB.stock, 'GOOG')
      assert.isNumber(stockB.price)
      assert.isNumber(stockB.likes)
    })
      

    test('2 stocks with like', async() => {
      
      let [ response, likesA, likesB ] =
      await Promise.all([
        chai.request(server)
          .get('/api/stock-prices')
          .query({
            stock: ['amzn', 'goog'],
            like: true
          }),
        getLikes('AMZN'),
        getLikes('GOOG')
      ])
      
      const rel_likesA = likesA - likesB
      const rel_likesB = likesB - likesA
      const [stockA, stockB] = response.body.stockData

      assert.equal(response.status, 200)

      assert.equal(stockA.stock, 'AMZN')
      assert.isNumber(stockA.price)
      assert.isNumber(stockA.rel_likes)
      assert.equal(stockA.rel_likes, rel_likesA)

      assert.equal(stockB.stock, 'GOOG')
      assert.isNumber(stockB.price)
      assert.isNumber(stockB.rel_likes)
      assert.equal(stockB.rel_likes, rel_likesB)
    })
      
  })

})
