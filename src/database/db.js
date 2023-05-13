
// var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
 
var DB = DB || {};
 
DB.SqliteDB = function(file){
    DB.db = new sqlite3.Database(file);
 
    // DB.exist = fs.existsSync(file);
    // if(!DB.exist){
    //     console.log("Creating db file!");
    //     fs.openSync(file, 'w');
    // };
};
 
DB.printErrorInfo = function(err){
    console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
};
 
DB.SqliteDB.prototype.createTable = function(sql){
    DB.db.serialize(function(){
        DB.db.run(sql, function(err){
            if(null != err){
                DB.printErrorInfo(err);
                return;
            }
        });
    });
};
 
/// tilesData format; [[level, column, row, content], [level, column, row, content]]
DB.SqliteDB.prototype.insertData = function(sql, objects){
    DB.db.serialize(function(){
        DB.db.run('BEGIN TRANSACTION;');
        var stmt = DB.db.prepare(sql);
        for(var i = 0; i < objects.length; ++i){
            stmt.run(objects[i]);
        }
    
        stmt.finalize();
        DB.db.run('COMMIT TRANSACTION;');
    });
};
 
DB.SqliteDB.prototype.queryData = function(sql, callback){
    DB.db.all(sql, function(err, rows){
        if(null != err){
            DB.printErrorInfo(err);
            return;
        }
 
        /// deal query data.
        if(callback){
            callback(rows);
        }
    });
};
DB.SqliteDB.prototype.queryOne = function(sql, params,callback){
    DB.db.get(sql, params, function(err, row)  {
        if(null != err){
            DB.printErrorInfo(err);
            return;
        }
        if(callback){
            callback(row);
        }
    })
}


 
DB.SqliteDB.prototype.executeSql = function(sql){
    DB.db.run(sql, function(err){
        if(null != err){
            DB.printErrorInfo(err);
        }
    });
};
 
DB.SqliteDB.prototype.close = function(){
    DB.db.close();
};
 


DB.SqliteDB.prototype.asyncEach=function(query, params, action) {
    return new Promise(function(resolve, reject) {
        var db = DB.db
        db.serialize(function() {
            db.each(query, params, function(err, row)  {
                if(err) reject("Read error: " + err.message)
                else {
                    if(row) {
                        action(row)
                    }    
                }
            })
            db.get("", function(err, row)  {
                resolve(true)
            })            
        })
    }) 
}

// set of rows read
DB.SqliteDB.prototype.asyncAll=function(query, params) {
    return new Promise(function(resolve, reject) {
        if(params == undefined) params=[]

        DB.db.all(query, params, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    }) 
}


DB.SqliteDB.prototype.asyncInsert=function(sql, objects){
    return new Promise(function(resolve, reject) {
        var db = DB.db
        db.serialize(function() {
            db.run('BEGIN TRANSACTION;');
            var stmt = db.prepare(sql);
            for(var i = 0; i < objects.length; ++i){
                stmt.run(objects[i]);
            }
        
            stmt.finalize();
            db.run('COMMIT TRANSACTION;');
            resolve(true)           
        })
    }) 
    
};

// any query: insert/delete/update
DB.SqliteDB.prototype.asyncRun=function(query) {
    return new Promise(function(resolve, reject) {
        DB.db.run(query, 
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })    
}

// first row read
DB.SqliteDB.prototype.asyncGet=function(query, params) {
    return new Promise(function(resolve, reject) {
        DB.db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    }) 
}


/// export SqliteDB.
// const SqliteDB = DB.SqliteDB

exports.SqliteDB = DB.SqliteDB
// module.exports={SqliteDB}
    
 