const {exec} = require('../db/mysql');
const xss = require('xss');

const getLatest = async ()=>{
    let sql = 'select * from magazine '
    sql+= 'order by pubdate desc LIMIT 1;'
    console.log(sql)
    return exec(sql)
}

const getPre = async (index)=>{
    if(index>1){
        index = Number(index)  - 1
    }
    let sql = 'select * from magazine where `index` = '+index; 
    console.log('执行到了'+sql)
    return exec(sql)
}

const getNext = async (index)=>{
    
    index = Number(index) + 1
  
    let sql = 'select * from magazine where `index` = '+index; 
    console.log('执行到了'+sql)
    return exec(sql)
}

const getFavor = async (id)=>{
    let sql = 'select * from magazine where id =  '+id
    console.log(sql)
    return exec(sql)
}

module.exports = {
    getLatest,getPre,getNext,getFavor
}