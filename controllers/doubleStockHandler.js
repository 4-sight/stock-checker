
const dataFetch = require('../controllers/dataFetch.js')
const StocksDB = require('../models/stocks')

module.exports = async (stocks, ip, like) => {

  const [ stockA, stockB ] = 
  await Promise.all(
    [dataFetch(stocks[0]), dataFetch(stocks[1])]
  )
  const [ likesA, likesB ] = 
    await Promise.all(
      [
        StocksDB.getLikesAndReturn(stockA.symbol),
        StocksDB.getLikesAndReturn(stockB.symbol)
      ]
    )


  if (like) {
    
    return { stockData: [
      {
        stock: stockA.symbol,
        price: stockA.latestPrice,
        rel_likes: likesA - likesB
      },
      {
        stock: stockB.symbol,
        price: stockB.latestPrice,
        rel_likes: likesB - likesA
      }
    ]}

  } else {
    
    return { stockData: [
      {
        stock: stockA.symbol,
        price: stockA.latestPrice,
        likes: likesA
      },
      {
        stock: stockB.symbol,
        price: stockB.latestPrice,
        likes: likesB
      }
    ]}
  }
}