const { MYSQL_CONF } = require("../conf/db")
const mysql = require('mysql')

const conn = mysql.createConnection(MYSQL_CONF)
conn.connect()
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        conn.query(sql,(err,result)=>{
            if(err){
                reject(err)
                result
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape:mysql.escape
}