
const mongoose = require('mongoose')

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true }
)
  .then(
    () => {
      console.log('mongoose is connected to db')
    },
    (err) => {console.log('mongoose connection error', err)}
  )