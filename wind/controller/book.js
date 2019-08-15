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
const postComment = async (id,content,nums)=>{
    const selectSql = 'select book_id from `comment` where content = "'+ content + '"'
    const result = await exec(selectSql)
    let sql 
    if(result.length === 0){
        sql = 'insert into `comment` (book_id,content,nums) values ('+ id +',"'+ content +'",'+ 0 +')';
    
    }else{
        sql = 'update `comment` set nums = nums +1 where content = "'+ content + '"'
    }
    console.log(sql)
    return exec(sql)
}
const getHot = async (id,content,nums)=>{
    const sql = 'select word from keywords'
    return exec(sql)
}

const getSearch = async (title,start)=>{
    const sql = 'select * from book where title like "' + title+ '%" limit ' +start + ',5'
    console.log(sql)
    return exec(sql)
}

const getMyBookCount = async (title,start)=>{
    //未涉及多用户，所以……
    const sql = 'select count(*) as count from book '
    console.log(sql)
    return exec(sql)
}

module.exports = {
    getDetail,getLikeStatus,getComments,postComment,getHot,getSearch,getMyBookCount
}