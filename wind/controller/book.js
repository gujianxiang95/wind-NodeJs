const {exec} = require('../db/mysql');
const xss = require('xss');

const getDetail = async (id)=>{
    const sql = 'select * from book where id = ' + id
    console.log(sql)
    return exec(sql)
}

const getLikeStatus = async (id)=>{
    const sql = 'select like_status,fav_nums from book where id = ' + id
    console.log(sql)
    return exec(sql)
}

const getComments = async (id)=>{
    const sql = 'select *  from `comment`  where book_id = ' + id +'  order by nums desc'
    console.log(sql)
    return exec(sql)
}

module.exports = {
    getDetail,getLikeStatus,getComments
}