const Users = require("../../model/User")
const bcrypt = require("bcrypt")
const keygen = require("../../utils/keygen")

exports.getAllUser = async (req ,res) => {
  Users.findAll(async (result) => {
    try {
      res.json(result)
    } catch (err) {
      throw err
    }
  })
}

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const data = {
    username: req.body.username,
    password: hash,
    token: Number(keygen())
  }
  Users.create(data, async (result) => {
    try {
      res.send(result)
    } catch (err) {
      throw err
    }
  })
}

exports.login = async(req, res) => {
  const newToken = keygen()
  const reqData = { 
    id: req.headers.id,
    token: req.headers.token
  }
  const newData = {
    id: req.headers.id,
    newToken
  }
  const data = {
    username: req.body.username,
    password: req.body.password,
  }
  Users.compare(data, async (result) => {
    try {
      res.status(200)
      res.json(result)
    } catch (err) {
      res.status(400)
      console.log(err)
    }
  })
  Users.findOneById(reqData, (result) => {
    try {
      if (reqData.token == result.token){
        Users.tokenChange(newData, (errChange, changed) => {
          if(errChange) {
            console.log(errChange)
          }
          if(changed.affectedRows){
            res.send({updated: 'OK'})
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  })
}
