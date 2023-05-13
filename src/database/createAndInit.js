/**
 * 用于初始化rta战斗数据
 */
const dbname = require('./rtaConstant.js').rtaDbName
const dataVersion = require('./rtaConstant.js').dataVersion
const tableName = `data_${dataVersion}`//针对版本取不同的数据表
const SqliteDB = require('./db.js').SqliteDB
const fs = require('fs')
const path = require('path')
const storage= require('electron-localStorage')
storage.setStoragePath(path.join(__dirname, 'rtaData.json'))
 
var sqliteDB = new SqliteDB(dbname)

var createTileTableSql = `CREATE TABLE  if not exists ${tableName}( rid INTEGER PRIMARY KEY,  pf1 INTEGER NOT NULL, pf2 INTEGER NOT NULL,pf3 INTEGER NOT NULL,pf4 INTEGER NOT NULL,pf5 INTEGER NOT NULL,ps1 INTEGER NOT NULL,ps2 INTEGER NOT NULL,ps3 INTEGER NOT NULL,ps4 INTEGER NOT NULL,ps5 INTEGER NOT NULL,bf1 INTEGER NOT NULL,bs1 INTEGER NOT NULL,add_date DATE,win INTEGER );`
sqliteDB.createTable(createTileTableSql)

const insertDataSql = `INSERT or ignore INTO ${tableName} VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,? );`

let rankList = JSON.parse(storage.getItem('rankList'))
console.info(`当前数组长度:${rankList.length}`)
let ridArr = []
let realRankList = []
let insertArr= []
for(let i of rankList){
    // console.info(i)
    if(i && i.rid && ridArr.indexOf(i.rid)<0){
        ridArr.push(i.rid)
        realRankList.push(i)
        let rid = i.rid
        let add_date = i.date_add
        let user1 = i.user_list[1]
        let user2 = i.user_list[2]
        let pfArr = []
        let psArr = []
        let bf1 =''
        let bs1 = ''
        let win = 0
        user1.pick_info.unit_list.sort((x,y)=>{
            return x.pick_slot_id - y.pick_slot_id
        })
        user2.pick_info.unit_list.sort((x,y)=>{
            return x.pick_slot_id - y.pick_slot_id
        })
        //首选
        if(user1.is_first_pick>0){ 
            pfArr = user1.pick_info.unit_list.map(j=> j.unit_master_id)
            
            
            psArr = user2.pick_info.unit_list.map(j=> j.unit_master_id)
            //被ban
            bf1 = pfArr[user1.pick_info.banned_slot_ids[0]-1]//12345



            bs1 = psArr[user2.pick_info.banned_slot_ids[0]-1]
            //胜利这个不确定，是否表示第几个玩家胜利
            win = i.win_lose
        }else{
            psArr = user1.pick_info.unit_list.map(j=> j.unit_master_id)
            
            pfArr = user2.pick_info.unit_list.map(j=> j.unit_master_id)
            bs1 = psArr[user1.pick_info.banned_slot_ids[0]-1]
            bf1 = pfArr[user2.pick_info.banned_slot_ids[0]-1]
            if(i.win_lose==1){
                win=2
            }else{
                win=1
            }
        }
        let insertdataArr = []
        insertdataArr.push(rid)
        insertdataArr = insertdataArr.concat(pfArr)
        insertdataArr = insertdataArr.concat(psArr)
        insertdataArr.push(bf1)
        insertdataArr.push(bs1)
        insertdataArr.push(add_date)
        insertdataArr.push(win)
        insertArr.push(insertdataArr)

    }else if(i && i.rid){
        console.info(`重复id:${i.rid}`)
    }
}
// console.info(`最终数组长度:${realRankList.length}`)
// console.info(realRankList[0])
sqliteDB.insertData(insertDataSql,insertArr)
sqliteDB.close()



