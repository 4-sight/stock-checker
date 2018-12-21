
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userIP: String,
  likedStocks: [String]
})

const UserDB = mongoose.model('StockPrice-user', userSchema)

// methods
UserDB.createUser = function (user, stock) {

  this.create({
    userIP: user,
    likedStocks: [ stock ]
  }, 
  (err) => {
    if(err) {console.log(err)}
  })
}

UserDB.addLikedStock = function (user, stock) {

  this.findOneAndUpdate(
    { userIP: user },
    { $push: {likedStocks: stock} },
    (err, doc) => {
      if(err) {console.error('failed to add stock to liked', err)}
      else
      if(!doc) {console.error('no corresponding doc found/ created')}
    }
  )
}

UserDB.removeLikedStock = function (user, stock) {

  this.findOneAndUpdate(
    { userIP: user },
    { $pull: {likedStocks: stock} },
    (err, doc) => {
      if(err) {console.error('failed to add stock to liked', err)}
      else
      if(!doc) {console.error('no corresponding doc found/ created')}
    }
  )
}


module.exports = UserDB