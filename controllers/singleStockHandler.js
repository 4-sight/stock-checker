
const dataFetch = require('../controllers/dataFetch.js')
const StocksDB = require('../models/stocks')
const UsersDB = require('../models/users')


module.exports = async (stock, ip, like) => {

  const data = await dataFetch(stock)

  if (like) {
    let user, likes
    try { user = await UsersDB.findOne({ userIP: ip })
      .then((user) => {
        if(user) {
          return user._doc
        }
      })}

    catch(err) {throw (err)}

    if (user) {
      // check for existing like
      let liked = false
      user.likedStocks.forEach(likedStock => {
        if (likedStock === data.symbol) { liked = true }
      })
      if (liked) {
        // Get likes from db
        try { likes = await StocksDB.getLikesAndReturn(data) }
        catch(err) {console.error(err)}
        
      } else {
        // Add stock to user's liked stocks
        UsersDB.addLikedStock(ip, data.symbol)
        // Update and return likes
        likes = await StocksDB.addLikeAndReturn(data.symbol)
      }

      return {
        stockData: {
          stock: data.symbol,
          price: data.latestPrice,
          likes: likes
        }
      }

    } else 
    if(!user) {
      // Create new user
      UsersDB.createUser(ip, data.symbol)

      likes = await StocksDB.addLikeAndReturn(data.symbol)

      return {
        stockData: {
          stock: data.symbol,
          price: data.latestPrice,
          likes: likes
        }
      }
    }

  } else {
    // Get likes from db
    let likes = await StocksDB.getLikesAndReturn(data)
    return {
      stockData: {
        stock: data.symbol,
        price: data.latestPrice,
        likes: likes
      }
    }
  }
}