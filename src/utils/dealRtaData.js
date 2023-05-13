

export default function getAllMonsters(db,bpDataTableName){
        //选择率超过1%
    let sql = `SELECT * from ${this.bpDataTableName} WHERE total/pick_times<100 ORDER BY pick_times DESC,win_times DESC`
    db.queryData(sql,res=>{
        debugger
        console.info(res)
    })
}