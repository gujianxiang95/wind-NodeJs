const env = process.env.NODE_ENV

let MYSQL_CONF = {}
let REDIS_CONF = {}

if(env === "development"){
    MYSQL_CONF = {
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"wind",
    }
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}
if(env === 'production'){

}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}