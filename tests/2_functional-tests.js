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
      
    test('1 stock', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData.stock, 'GOOG')
          assert.isNumber(res.body.stockData.price)
          assert.isNumber(res.body.stockData.likes)
          done()
        })
    })
      
    test('1 stock with like', function(done) {
      
      removeLike(localIPv4, 'SQ')
        .then(
          getLikes('SQ')
            .then(
              initLikes => {
                chai.request(server)
                  .get('/api/stock-prices')
                  .query({
                    stock: 'sq',
                    like: true
                  })
                  .end(function(err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, 'SQ')
                    assert.isNumber(res.body.stockData.price)
                    assert.equal(res.body.stockData.likes, initLikes + 1)
                    done()
                  })
              }))
      
    })
      
    test('1 stock with like again (ensure likes aren\'t double counted)', function(done) {
    
      done()
    })
      
    test('2 stocks', function(done) {
        
      done()
    })
      
    test('2 stocks with like', function(done) {
      
      done()
    })
      
  })

})
