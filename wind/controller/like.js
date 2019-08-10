const {exec} = require('../db/mysql');
const xss = require('xss');

const isLike = async (id, like_status)=>{
    let sql = 'update  magazine set like_status = ' +like_status
    if(like_status){
        sql = sql + ',fav_nums = fav_nums + 1 '
    }else{
        sql = sql + ',fav_nums = fav_nums - 1 '
    }
    sql = sql + 'where id = ' + id
    console.log(sql)
    return exec(sql)
}



module.exports = {
    isLike
}