const db = require("../../config/db")
const bcrypt = require("bcrypt")
const keygen = require("../../utils/keygen")

exports.findAll = (result) => {
  const sqlQuery = `SELECT * FROM users`
  db.query(sqlQuery, (err, row) => {
    if(err){
      console.log(err)
    }
    result(row, null)
  })
}

exports.findOneById = (reqData, result) => {
  const sqlQuery = `SELECT * FROM users WHERE id = '${reqData.id}'`
  db.query(sqlQuery, (err, row) => {
    if(err) console.log(err)
    result(row[0], null)
  })
}

exports.create = (data, result) => {
  const sqlQuery = `INSERT INTO users SET username = '${data.username}', password = '${data.password}', token = '${data.token}'`
  try {
  const sqlQuery1 = `INSERT INTO users SET id = '${row.insertId}', username = '${data.username}', password = '${data.password}', token = '${data.token}'`
    db.query(sqlQuery1, (row) => result(null, row[0]))
  } catch (err) {
    db.query(sqlQuery, (err) => result(err, null))
  }
}

exports.compare = (data, result) => {
  const sqlQuery = `SELECT * FROM users WHERE username = '${data.username}'`
  db.query(sqlQuery, (err, row) => {
    if (bcrypt.compareSync(data.password, row[0].password)) {
      console.log('password matched')
      const data = {
        id: row[0].id,
        username: row[0].username,
        token: row[0].token,
      };
      result(data)
    } else {
      console.log('password not matched')
      result({ error: 'password invalid' }, null)
      result(err)
    }
  })
}

exports.tokenChange = (newData, result) => {
  const sqlQuery = `UPDATE users SET token = '${newData.newToken}' WHERE users.id = '${newData.id}'`
  db.query(sqlQuery, (err, row) => {
    if(err) {
      return result(err, null)
    }
    if(row.length) {
      return result(row, null)
    }
  })
}
