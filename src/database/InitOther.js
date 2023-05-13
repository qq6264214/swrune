/**
 * 用于初始化魔灵的胜率，bp率，ban率，一选率
 */
const fs = require('fs');
const { format } = require('path');
const path = require('path')
const dbname = require('./rtaConstant.js').rtaDbName
const dataVersion = require('./rtaConstant.js').dataVersion
let winBpTableName = `win_bp_${dataVersion}`
const tableName = `data_${dataVersion}`
const SqliteDB = require('./db.js').SqliteDB
var sqliteDB = new SqliteDB(dbname)

//type 0为胜利,1总选择，2为ban次数,3 一选率，4一选登场次数
var createWinrankTableSql = `CREATE TABLE  if not exists ${winBpTableName}(monster_id INTEGER,total INTEGER,pick_times INTEGER,ban_times INTEGER,first_pick_times INTEGER,win_times INTEGER,first_pick_win_times INTEGER,first_pick_not_ban_times INTEGER,primary key (monster_id) );`

sqliteDB.createTable(createWinrankTableSql)


const asyncSqlite = require("./asyncDb.js")


asyncSqlite.open(dbname)


const slotArr = ['pf1','pf2','pf3','pf4','pf5','ps1','ps2','ps3','ps4','ps5',]




let allSql = `SELECT COUNT(*) from ${tableName}`
let monsterIdSet = new Set()
async function initMonsterData(){
    
    for(let i of slotArr){
        const queryMonsterSql = `SELECT ${i} from ${tableName} GROUP BY ${i};`
        let res = await asyncSqlite.all(queryMonsterSql)
        let tarr = res.map(j=>{      
            return j[i]
        })
        monsterIdSet = new Set(Array.from(monsterIdSet).concat(tarr))
        
    }  
    for(let m of monsterIdSet){
        // console.info(m)
        getMonsterWinData(m)
    }
}

initMonsterData()


async function getMonsterWinData(monsterId){
    let allTotal = (await  asyncSqlite.all(allSql))[0]['COUNT(*)']
    let results=[]
    let insertSql = `INSERT or ignore INTO ${winBpTableName} VALUES (?,?,?,?,?,?,?,?);`
    
    //总的选择率包括被ban
    let queryTotalSql = `SELECT COUNT(*) from ${tableName} WHERE `
    for(let i in slotArr){
        if(i==0){
            queryTotalSql += ` ${slotArr[i]}=${monsterId} `
        }else{
            queryTotalSql += ` or ${slotArr[i]}=${monsterId} `
        }
    }
    queryTotalSql+=';'
    // console.info(queryTotalSql)
    let pickTotal = (await  asyncSqlite.all(queryTotalSql))[0]['COUNT(*)']
    // console.info(pickTotal)
    
    // slice(0,5)
    // results.push([monsterId,1,(pickTotal/allTotal).toFixed(4),allTotal,pickTotal])
    
    //ban率
    let banTotalSql = `SELECT COUNT(*) from ${tableName} WHERE  bf1=${monsterId}  or bs1=${monsterId};  ` 
    let banTotal = (await  asyncSqlite.all(banTotalSql))[0]['COUNT(*)']
    // results.push([monsterId,2,(banTotal/pickTotal).toFixed(4),pickTotal,banTotal])

    //胜率

    //首选,不知道是不是要移除被ban的情况,
    // let fNotBanTotolSql =  `SELECT COUNT(*) from ${tableName} WHERE bf1 != ${monsterId} and (`
    let fNotBanTotolSql =  `SELECT COUNT(*) from ${tableName} WHERE 1=1 and (`
    let pfArr = slotArr.slice(0,5)
    for(let i in pfArr){      
        if(i==0){
            fNotBanTotolSql += ` ${pfArr[i]}=${monsterId} `
        }else{
            fNotBanTotolSql += ` or ${pfArr[i]}=${monsterId} `
        }
        
    }
    fNotBanTotolSql += ')'
    let fNotbanTotal = (await  asyncSqlite.all(fNotBanTotolSql))[0]['COUNT(*)']
    // console.info(fNotbanTotal)
    let fWinTotalSql = fNotBanTotolSql+' and win=1'
    let fwinTotal = (await  asyncSqlite.all(fWinTotalSql))[0]['COUNT(*)']



    //次选
    // let sNotBanTotolSql =  `SELECT COUNT(*) from ${tableName} WHERE bs1 != ${monsterId} and (`
    let sNotBanTotolSql =  `SELECT COUNT(*) from ${tableName} WHERE 1=1 and (`
    let psArr = slotArr.slice(5,10)
    for(let i in psArr){      
        if(i==0){
            sNotBanTotolSql += ` ${psArr[i]}=${monsterId} `
        }else{
            sNotBanTotolSql += ` or ${psArr[i]}=${monsterId} `
        }
        
    }
    sNotBanTotolSql += ')'
    let sNotbanTotal = (await  asyncSqlite.all(sNotBanTotolSql))[0]['COUNT(*)']
    // console.info(sNotBanTotolSql)
    let sWinTotalSql = sNotBanTotolSql+' and win=2'
    // console.info(sWinTotalSql)
    let swinTotal = (await  asyncSqlite.all(sWinTotalSql))[0]['COUNT(*)']
    
    let percent = 0
    if(fNotbanTotal+sNotbanTotal>0){
        percent = ((fwinTotal+swinTotal)/(fNotbanTotal+sNotbanTotal)).toFixed(4)
    }
    // results.push([monsterId,0,percent ,fNotbanTotal+sNotbanTotal,fwinTotal+swinTotal])

    //1选率
    let firstPickSql =  `SELECT COUNT(*) from ${tableName} WHERE pf1 == ${monsterId} `
    let firstPick = (await  asyncSqlite.all(firstPickSql))[0]['COUNT(*)']
    // results.push([monsterId,3,(firstPick/allTotal).toFixed(4) ,allTotal,firstPick])

    //1选胜场
    // let firstPickWinSql = `SELECT COUNT(*) from ${tableName} where pf1= ${monsterId} and win=1 and bf1!= ${monsterId} `
    let firstPickWinSql = `SELECT COUNT(*) from ${tableName} where pf1= ${monsterId} and win=1 `
    let firstPickWin = (await  asyncSqlite.all(firstPickWinSql))[0]['COUNT(*)']

    //1选不被ban
    // let firstPickNOtBanSql = `SELECT COUNT(*) from ${tableName} where pf1= ${monsterId} and bf1!= ${monsterId} `
    let firstPickNOtBanSql = `SELECT COUNT(*) from ${tableName} where pf1= ${monsterId}  `
    let firstPickNOtBan = (await  asyncSqlite.all(firstPickNOtBanSql))[0]['COUNT(*)']


    //monster_id INTEGER,total INTEGER,pick_times INTEGER,ban_times INTEGER,first_pick_times INTEGER,win_times INTEGER
    results.push([monsterId,allTotal,pickTotal,banTotal,firstPick,fwinTotal+swinTotal,firstPickWin,firstPickNOtBan])
    asyncSqlite.insert(insertSql,results)

}
// getMonsterWinData(17913)

async function generateAllRtaMonsters(){
    

    const sql = `SELECT monster_id,pick_times  FROM ${winBpTableName} ORDER BY pick_times DESC,monster_id`
    let results =await  asyncSqlite.all(sql)  
    let allmons = results.map(i=>{
        return {'monsterId':i.monster_id,'monsterImg':`/monster/${i.monster_id}.png`}
    })
    let monsImg = {}
    for(let i of results){
        monsImg[i.monster_id]=`/monster/${i.monster_id}.png`
    }

    fs.writeFileSync(path.join(__dirname, '../json/allMonsters.json'), JSON.stringify({'monsters':allmons,'imgMap':monsImg}), 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });

}

// generateAllRtaMonsters()
