const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")

const users = require('./routes/users')

const app = express()
const port = 3200

app.use(
  morgan('combined', { skip: (req, res) => res.statusCode < 400 })
)
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', users)

app.get('/', (req, res) => {
  console.log('required on /')
  res.send('main endpoint ready! at /')
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
