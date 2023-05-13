<template>
  <div>
      <el-row :gutter="20">
          <h3 style="margin-top:0">总场次:{{total}}</h3>
          <h4>数据时间:{{startDate}}——{{addDate}}</h4>
          <el-col :span="12" :offset="0"></el-col>
      </el-row>
      
      <el-row >     
          <el-col :span="20" :offset="2">           
              <el-table
                :data="rtaMonsterData"
                height="450"
                style="width: 100%">
                
                <el-table-column
                label="魔灵"
                width="180">
                <template slot-scope="scope">
                    <el-image
                    style="width: 35px; height: 35px"
                    :src="scope.row.monsterImg"
                    ></el-image>
                    
                </template>
                </el-table-column>

                <el-table-column
                    prop="pick_times"
                    label="被选次数"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="pickRate"
                    label="选择率"
                    sortable
                    width="180"
                    :formatter="rateformatter"
                    >
                </el-table-column>
                <el-table-column
                    prop="banRate"
                    label="ban率"
                    sortable
                    :formatter="rateformatter"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="winRate"
                    label="胜率"
                    sortable
                    :formatter="rateformatter"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="firstPickRate"
                    label="一选率"
                    sortable
                    :formatter="rateformatter"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="firstPickWinRate"
                    label="一选胜率"
                    sortable
                    :formatter="rateformatter"
                    width="180">
                </el-table-column>
                
                </el-table>


          </el-col>
          
        </el-row>
        <el-row >
          <el-col :span="4" :offset="0">
              <h5>我的魔灵池</h5>
          </el-col>
          <el-col :span="6" :offset="0">

              <el-button style="margin-top:20px" type="primary" icon="el-icon-plus" :loading="rtaMonsterData.length==0" @click="specialMonsterShowVisible=true">光暗魔灵</el-button>
              <el-button style="margin-top:20px" type="primary" icon="el-icon-plus" :loading="rtaMonsterData.length==0" @click="normalMonsterShowVisible=true">三系魔灵</el-button>
          </el-col>
        </el-row>
        <el-row >
            <el-col :span="20" :offset="2" style="">            
                <el-image
                    v-for="m in checkedSpecialMonsters.concat(checkedNormalMonsters)"  :key="imgMap[m]"
                   
                    style="width: 35px; height: 35px;margin:5px;float: left;"
                    :src="imgMap[m]"
                >
                <div slot="placeholder" class="image-slot">
                    <!-- 加载中<span class="dot">...</span> -->
                    <i class="el-icon-loading"></i>
                </div>
                </el-image>
            </el-col>
        </el-row>
        
        
        <el-row >
            <el-col :span="4" :offset="0">
                <h5>大数据选人</h5>
            </el-col>
            <el-col :span="12" :offset="0" style="padding-top:10px">
                <el-tooltip class="item" effect="dark" content="勾选即当我方一选时，推荐我方魔灵池中一选率最高的魔灵；不勾选，则当我方一选时，自己手动选择魔灵" placement="top-start">
                    <el-checkbox v-model="aiFirstPick">大数据一选</el-checkbox> 
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="当前选人，我方是否为一选" placement="top-start">
                    <el-checkbox v-model="isIFirstPick">我方一选</el-checkbox> 
                </el-tooltip>
                <el-button style="margin-left:10px" type="primary" icon="el-icon-video-play" @click="startBp()">开始选人</el-button>
                <span v-show="isStartBp">
                    <i class="el-icon-loading"></i>
                    正在选人
                </span>
                <el-button style="margin-left:10px" type="danger" icon="el-icon-video-pause" @click="stopBp()">停止选人</el-button>
            </el-col>
            
        </el-row>
        <el-row >
            <el-col :span="22" :offset="2" >
                <h5 style="float:left;color:red;">{{bpTips}}</h5>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="1" v-for="(o, index) in 5" :key="index" :offset="index == 0 ? 2 : 0">
                <el-card style="height:45px;width:45px;" :body-style="{ padding: '0px' }">
                <div v-show="myPickcheckedMonsters.length<=index" style="margin-left:0px;margin-top:10px">
                    <el-button type="primary" :disabled="!isStartBp||aiFirstPick || !isIFirstPick" icon="el-icon-plus" size="mini" circle @click="pickMyMonsterShowVisible=true"></el-button>
                    </div>    
                
                <el-image
                    style="width: 35px; height: 35px"
                    v-show="myPickcheckedMonsters.length>index"
                    :src="myPickcheckedMonsters.length>index?imgMap[myPickcheckedMonsters[index]]:''"
                    ></el-image>
                </el-card>
                
            </el-col>
            <el-col :span="1">
                <h5>VS</h5>
            </el-col>
            <el-col :span="1" v-for="(o, index2) in 5" :key="index2+10" >
                <el-card style="height:45px;width:45px;" :body-style="{ padding: '0px' }" >
                <div v-show="opponentPicks.length<=index2" style="margin-left:0px;margin-top:10px" >
                    <el-button type="primary" :disabled="!isStartBp" icon="el-icon-plus" size="mini"  @click="pickMonsterShowVisible=true" circle></el-button></div>
                <el-image
                    style="width: 35px; height: 35px"
                    v-show="opponentPicks.length>index2"
                    :style="needBan && opponentPicks.indexOf(needBan)==index2?'filter: grayscale(100%);':''"
                    :src="opponentPicks.length>index2?imgMap[opponentPicks[index2]]:''"
                    ></el-image>
                
                <!-- <div style="padding: 14px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                    
                    </div>
                </div> -->
                </el-card>
                
            </el-col>
            
        </el-row>
        
        
        

        <el-dialog title="光暗魔灵" :visible.sync="specialMonsterShowVisible">
          <el-checkbox-group v-model="checkedSpecialMonsters" >
            <el-checkbox v-for="m in specialMonsters" :label="m.monster_id" :key="m.monster_id"> <el-image
                    style="width: 35px; height: 35px"
                    :src="m.monsterImg"
                    ></el-image></el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
    <el-button @click="specialMonsterShowVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveCheckedSpecialMonsters()">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="三系魔灵" :visible.sync="normalMonsterShowVisible">
          <el-checkbox-group v-model="checkedNormalMonsters" >
            <el-checkbox v-for="m in normalMonsters" :label="m.monster_id" :key="m.monster_id"> <el-image
                    style="width: 35px; height: 35px"
                    :src="m.monsterImg"
                    ></el-image></el-checkbox>
            </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
        <el-button @click="normalMonsterShowVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCheckedNormalMonsters()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="挑选对方魔灵"
          :visible.sync="pickMonsterShowVisible"
          >

          <el-tabs v-model="activeName">
            <el-tab-pane label="光暗魔灵" name="special">
                <el-checkbox-group v-model="pickCheckedSpecialMonsters" >
                <el-checkbox v-for="m in allMonsters" :label="m.monsterId" :key="m.monsterId" v-if="['4','5'].includes((m.monsterId+'')[(m.monsterId+'').length-1])"> <el-image
                    style="width: 35px; height: 35px"
                    :src="m.monsterImg"
                    ></el-image></el-checkbox>
            </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="三系魔灵" name="normal">
            
            <el-checkbox-group v-model="pickCheckedNormalMonsters" >
            <el-checkbox v-for="m in allMonsters" :label="m.monsterId" :key="m.monsterId" v-if="!['4','5'].includes((m.monsterId+'')[(m.monsterId+'').length-1])"> <el-image
                style="width: 35px; height: 35px"
                :src="m.monsterImg"
                ></el-image></el-checkbox>
            </el-checkbox-group>

            </el-tab-pane>
            
        </el-tabs>
          <span slot="footer">
              <el-button type="primary" @click="confimOppPick()">确定</el-button>
          </span>
      </el-dialog>
      <el-dialog
          title="挑选我方魔灵"
          :visible.sync="pickMyMonsterShowVisible"
          >       
        <el-checkbox-group v-model="myPickcheckedMonsters" >
        <el-checkbox v-for="m in checkedSpecialMonsters.concat(checkedNormalMonsters)" :label="m" :key="m"> <el-image
            style="width: 35px; height: 35px"
            :src="imgMap[m]"
            ></el-image>
           
            </el-checkbox>
        </el-checkbox-group>

          <span slot="footer">
              <el-button type="primary" @click="confimMyPick()">确定</el-button>
          </span>
      </el-dialog>
      
      
  </div>


</template>

<script>
import {dataVersion} from '@/database/rtaConstant'
import {monsters,imgMap} from '@/json/allMonsters.json'


export default {
    data(){
        const dataTableName = `data_${dataVersion}`//针对版本取不同的数据表
        const bpDataTableName = `win_bp_${dataVersion}`
        const sqliteDB = this.$eleRemote.getGlobal('sqliteDB')
        return {
            loadingInstance:'',
            total:0,
            rtaMonsterData:[],
            startDate:'2022-05-30',
            addDate:'2022-06-07',
            tableName:dataTableName,
            imgMap:imgMap,
            bpDataTableName:bpDataTableName,
            sqliteDB:sqliteDB,
            specialMonsterShowVisible:false,
            normalMonsterShowVisible:false,
            checkedSpecialMonsters:[],
            checkedNormalMonsters:[],
            specialMonsters:[],
            normalMonsters:[],
            aiFirstPick:true,
            isIFirstPick:true,
            myPicks:[],
            bpTips:'',
            isStartBp:false,
            activeName:'special',
            pickMonsterShowVisible:false,
            pickCheckedSpecialMonsters:[],
            pickCheckedNormalMonsters:[],
            allMonsters:monsters,
            pickMyMonsterShowVisible:false,
            myPickcheckedMonsters:[],
            needBan:'',
            
        }
    },
    methods:{
        getAllMonsters(){
            //选择率超过1%
            let sql = `SELECT * from ${this.bpDataTableName} where total<pick_times*100 ORDER BY pick_times DESC,win_times DESC`
            this.sqliteDB.queryData(sql,res=>{
                this.rtaMonsterData = res.map(i=>{                
                    this.total=i.total
                    try{
                        // i.monsterImg=require(`@/assets/monster/${i.monster_id}.png`)
                        i.monsterImg=`/monster/${i.monster_id}.png`
                        
                    }catch(err){
                        console.info(err)
                    }
                    
                    i.pickRate = (i.pick_times/i.total).toFixed(4) //被选择的概率
                    i.pickNotBanRate = ((i.pick_times-i.ban_times)/i.total).toFixed(4) //登场率

                    if(!i.ban_times){
                        i.banRate= 0
                    }else{
                        i.banRate = (i.ban_times/i.pick_times).toFixed(4) //被ban概率
                    }
                    
                    if(!i.win_times){
                        i.winRate = 0
                    }else{
                        
                        i.winRate = (i.win_times/(i.pick_times)).toFixed(4) //胜率
                    }

                    if(!i.first_pick_times){
                        i.firstPickRate=0
                    }else{
                        i.firstPickRate = (i.first_pick_times/i.total).toFixed(4) //一选率
                    }
                    
                    if(!i.first_pick_win_times){
                        i.firstPickWinRate = 0
                    }else{
                        i.firstPickWinRate = (i.first_pick_win_times/i.first_pick_not_ban_times).toFixed(4) //一选胜率
                    }               
                    return i
                })

                this.rtaMonsterData.map(i=>{                   
                    //区分光暗
                    if(i.monster_id){
                        let monsterIdStr = i.monster_id+''
                        if(['4','5'].includes(monsterIdStr[monsterIdStr.length-1])){
                            this.specialMonsters.push(i)
                        }else{
                            this.normalMonsters.push(i) 
                        }
                    }
                    return i
                })              
                //关闭遮罩
                this.loadingInstance.close()           
            })
        },
        rateformatter(row,column){           
            return (Number(row[column.property])*100).toFixed(2)+'%'
        },
        saveCheckedSpecialMonsters(){          
            localStorage.setItem('checkedSpecialMonsters',JSON.stringify(this.checkedSpecialMonsters))
            this.specialMonsterShowVisible = false
        },
        saveCheckedNormalMonsters(){          
            localStorage.setItem('checkedNormalMonsters',JSON.stringify(this.checkedNormalMonsters))
            this.normalMonsterShowVisible = false
        },
        startBp(){
            //重置所有bp
            this.myPickcheckedMonsters=[]
            this.pickCheckedSpecialMonsters=[]
            this.pickCheckedNormalMonsters=[]
            this.needBan=''
            //勾选AI一选直接选择魔灵池中登场率最高的魔灵
            if(this.aiFirstPick && this.isIFirstPick){
                for(let i of this.allMonsters){
                    let monsterId = i['monsterId']
                    if(this.checkedSpecialMonsters.includes(monsterId) || this.checkedNormalMonsters.includes(monsterId) ){
                        this.myPickcheckedMonsters.push(monsterId)
                        break
                    }
                }
            }


            this.isStartBp = true
        },
        stopBp(){
            //重置所有bp
            this.myPickcheckedMonsters=[]
            this.pickCheckedSpecialMonsters=[]
            this.pickCheckedNormalMonsters=[]
            this.needBan=''
            this.isStartBp = false
        },
        confimMyPick(){
            //pickCheckedSpecialMonsters:[],
            //pickCheckedNormalMonsters:[],
            //myPickcheckedMonsters
            //
            if(this.opponentPicks.length.length>0){
                this.pickCheckedSpecialMonsters=[]
                this.pickCheckedNormalMonsters=[]
            }
            if(this.myPickcheckedMonsters.length>1){
                this.$message({
                    message: '首选只能选择一个魔灵',
                    type: 'warning'
                });
                return
            }
            this.pickMyMonsterShowVisible=false
        },
        confimOppPick(){
            if(this.opponentPicks.length>5){
                this.$message({
                    message: '只能选择5个魔灵',
                    type: 'warning'
                });
                return
            }
            if(this.myPickcheckedMonsters.length==0 && this.opponentPicks.length>1){
                this.$message({
                    message: '只能选择一个魔灵',
                    type: 'warning'
                    });
                return
            }
            else if(this.myPickcheckedMonsters.length>0 && this.myPickcheckedMonsters.length<5 && this.opponentPicks.length!=this.myPickcheckedMonsters.length+1){
                this.$message({
                        message: '每次只能选择2个魔灵',
                        type: 'warning'
                    });
                return
            }
            this.pickMonsterShowVisible = false
            this.aiPick()
        },
        aiPick(){
            const tableName = `data_${dataVersion}`//针对版本取不同的数据表
            let myMonsStr = `(${this.myMonsers.join(',')})`
            let opponentPicksStr = `(${this.opponentPicks.join(',')})`
            let myPickMonsStr = `(${this.myPickcheckedMonsters.join(',')})`
            //我方一选
            if(this.isIFirstPick){
                //我方选择2-3位，选择count最多的
                if(this.myPickcheckedMonsters.length==1 && this.opponentPicks.length==2){
                    let myFirstPick = this.myPickcheckedMonsters[0]
                    
                    let sql = `SELECT COUNT(*),pf1,pf2,pf3,sum(case when win = 1 then 1 else 0 end) as win_total,sum(case when win = 1 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM ${tableName} where 1=1
                            and (pf1=${myFirstPick} or pf2=${myFirstPick} or pf3=${myFirstPick}) 
                            and pf1 in ${myMonsStr} and pf2 in ${myMonsStr} and pf3 in ${myMonsStr}
                            and ps1 in ${opponentPicksStr} and ps2 in ${opponentPicksStr} GROUP BY pf1+pf2+pf3,pf1*pf1+pf2*pf2+pf3*pf3,pf1*pf1*pf1+pf2*pf2*pf2+pf3*pf3*pf3 ORDER BY COUNT(*) DESC,win_rate DESC`
                    // console.info(sql)
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                        if(!res){
                            this.$message({
                                message: '大数据没有找到相似对局，请自己选人',
                                type: 'error'
                            });
                            this.stopBp()
                            return
                        }
                        let myPickSet = new Set(this.myPickcheckedMonsters)
                        myPickSet.add(res.pf1)
                        myPickSet.add(res.pf2)
                        myPickSet.add(res.pf3)
                        this.myPickcheckedMonsters = [...myPickSet]                
                    })            
                }//我方选择4-5位，选择胜率最高的
                else if(this.myPickcheckedMonsters.length==3 && this.opponentPicks.length==4){
                    let sql=`SELECT COUNT(*),pf1,pf2,pf3,pf4,pf5,sum(case when win = 1 then 1 else 0 end) as win_total,sum(case when win = 1 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM
                            (SELECT * from (SELECT * FROM (SELECT * FROM ${tableName} where pf1=${this.myPickcheckedMonsters[0]} or pf2=${this.myPickcheckedMonsters[0]} or pf3=${this.myPickcheckedMonsters[0]} or pf4=${this.myPickcheckedMonsters[0]}  
                             or pf5=${this.myPickcheckedMonsters[0]}) a WHERE 
                            pf1=${this.myPickcheckedMonsters[1]} or pf2=${this.myPickcheckedMonsters[1]} or pf3=${this.myPickcheckedMonsters[1]} or pf4=${this.myPickcheckedMonsters[1]} or pf5=${this.myPickcheckedMonsters[1]}) b 
                            WHERE pf1=${this.myPickcheckedMonsters[2]} or pf2=${this.myPickcheckedMonsters[2]} or pf3=${this.myPickcheckedMonsters[2]} or pf4=${this.myPickcheckedMonsters[2]} or pf5=${this.myPickcheckedMonsters[2]}) c
                            WHERE pf1 in ${myMonsStr} and pf2 in ${myMonsStr} and pf3 in ${myMonsStr} and pf4 in ${myMonsStr} and pf5 in ${myMonsStr}
                            and ps1 in ${opponentPicksStr} and ps2 in ${opponentPicksStr} and ps3 in ${opponentPicksStr}
                            and ps4 in ${opponentPicksStr}
                            GROUP BY pf1+pf2+pf3+pf4+pf5,pf1*pf1+pf2*pf2+pf3*pf3+pf4*pf4+pf5*pf5,pf1*pf1*pf1+pf2*pf2*pf2+pf3*pf3*pf3+pf4*pf4*pf4+pf5*pf5*pf5 ORDER BY win_rate DESC,COUNT(*) DESC`
                    console.info(sql)
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                        if(!res){
                            this.$message({
                                message: '大数据没有找到相似对局，请自己选人',
                                type: 'error'
                            });
                            this.stopBp()
                            return
                        }
                        let myPickSet = new Set(this.myPickcheckedMonsters)
                        myPickSet.add(res.pf1)
                        myPickSet.add(res.pf2)
                        myPickSet.add(res.pf3)
                        myPickSet.add(res.pf4)
                        myPickSet.add(res.pf5)
                        this.myPickcheckedMonsters = [...myPickSet]                
                    })  

                }
                
                
            }
            //我方后选
            else{
                //我方选择1和2
                if(this.myPickcheckedMonsters.length==0 && this.opponentPicks.length==1){
                    let sql = `SELECT COUNT(*),ps1,ps2,sum(case when win = 2 then 1 else 0 end) as win_total,sum(case when win = 2 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM ${tableName}  where pf1=${this.opponentPicks[0]}
                            and ps1 in ${myMonsStr}  and ps2 in ${myMonsStr} 
                            GROUP BY ps1+ps2,ps1*ps1+ps2*ps2,ps1*ps1*ps1+ps2*ps2*ps2 ORDER BY COUNT(*) DESC,win_rate DESC`
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                        if(!res){
                            this.$message({
                                message: '大数据没有找到相似对局，请自己选人',
                                type: 'error'
                            });
                            this.stopBp()
                            return
                        }
                        // console.info(sql)
                        let myPickSet = new Set(this.myPickcheckedMonsters)
                        myPickSet.add(res.ps1)
                        myPickSet.add(res.ps2)                       
                        this.myPickcheckedMonsters = [...myPickSet]                
                    }) 
                           
                }
                else if(this.myPickcheckedMonsters.length==2 && this.opponentPicks.length==3){
                    let sql = `SELECT COUNT(*),pf1,pf2,pf3,ps1,ps2,ps3,ps4,sum(case when win = 2 then 1 else 0 end) as win_total,sum(case when win = 2 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM
                            (SELECT * FROM (SELECT * FROM ${tableName} where ps1=${this.myPickcheckedMonsters[0]} or ps2=${this.myPickcheckedMonsters[0]} or ps3=${this.myPickcheckedMonsters[0]} or ps4=${this.myPickcheckedMonsters[0]}) a WHERE 
                            ps1=${this.myPickcheckedMonsters[1]} or ps2=${this.myPickcheckedMonsters[1]} or ps3=${this.myPickcheckedMonsters[1]} or ps4=${this.myPickcheckedMonsters[1]} ) b                          
                            WHERE ps1 in ${myMonsStr} and ps2 in ${myMonsStr} and ps3 in ${myMonsStr} and ps4 in ${myMonsStr}
                            and pf1 in ${opponentPicksStr} and pf2 in ${opponentPicksStr} and pf3 in ${opponentPicksStr}                          
                            GROUP BY ps1+ps2+ps3+ps4,ps1*ps1+ps2*ps2+ps3*ps3+ps4*ps4,ps1*ps1*ps1+ps2*ps2*ps2+ps3*ps3*ps3+ps4*ps4*ps4 ORDER BY COUNT(*) DESC,win_rate DESC `
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                        if(!res){
                            this.$message({
                                message: '大数据没有找到相似对局，请自己选人',
                                type: 'error'
                            });
                            this.stopBp()
                            return
                        }
                        // console.info(sql)
                        let myPickSet = new Set(this.myPickcheckedMonsters)
                        myPickSet.add(res.ps1)
                        myPickSet.add(res.ps2)
                        myPickSet.add(res.ps3)  
                        myPickSet.add(res.ps4)                             
                        this.myPickcheckedMonsters = [...myPickSet]                
                    }) 

                }
                else if(this.myPickcheckedMonsters.length==4 && this.opponentPicks.length==5){
                    let sql = `SELECT COUNT(*),pf1,pf2,pf3,pf4,pf5,ps1,ps2,ps3,ps4,ps5,sum(case when win = 2 then 1 else 0 end) as win_total,sum(case when win = 2 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM
                            (SELECT * FROM  (SELECT * FROM  (SELECT * FROM (SELECT * FROM ${tableName} where ps1=${this.myPickcheckedMonsters[0]} or ps2=${this.myPickcheckedMonsters[0]} or ps3=${this.myPickcheckedMonsters[0]} 
                            or ps4=${this.myPickcheckedMonsters[0]} or ps5=${this.myPickcheckedMonsters[0]}) a WHERE 
                            ps1=${this.myPickcheckedMonsters[1]} or ps2=${this.myPickcheckedMonsters[1]} or ps3=${this.myPickcheckedMonsters[1]} or ps4=${this.myPickcheckedMonsters[1]} or ps5=${this.myPickcheckedMonsters[1]}) b  
                            where ps1=${this.myPickcheckedMonsters[2]} or ps2=${this.myPickcheckedMonsters[2]} or ps3=${this.myPickcheckedMonsters[2]} or ps4=${this.myPickcheckedMonsters[2]} or ps5=${this.myPickcheckedMonsters[2]})c 
                            where ps1=${this.myPickcheckedMonsters[3]} or ps2=${this.myPickcheckedMonsters[3]} or ps3=${this.myPickcheckedMonsters[3]} or ps4=${this.myPickcheckedMonsters[3]}	or ps5=${this.myPickcheckedMonsters[3]} )d                    
                            WHERE ps1 in ${myMonsStr} and ps2 in ${myMonsStr} and ps3 in ${myMonsStr} and ps4 in ${myMonsStr} and ps5 in ${myMonsStr}
                            and pf1 in ${opponentPicksStr}  and pf2 in ${opponentPicksStr}  and pf3 in ${opponentPicksStr}  and pf4 in ${opponentPicksStr}  and pf5 in ${opponentPicksStr}                  
                            GROUP BY ps1+ps2+ps3+ps4+ps5,ps1*ps1+ps2*ps2+ps3*ps3+ps4*ps4+ps5*ps5,ps1*ps1*ps1+ps2*ps2*ps2+ps3*ps3*ps3+ps4*ps4*ps4+ps5*ps5*ps5 ORDER BY win_rate DESC,COUNT(*) DESC `
                    // console.info(sql)
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                        if(!res){
                            this.$message({
                                message: '大数据没有找到相似对局，请自己选人',
                                type: 'error'
                            });
                            this.stopBp()
                            return
                        }
                       
                        let myPickSet = new Set(this.myPickcheckedMonsters)
                        myPickSet.add(res.ps1)
                        myPickSet.add(res.ps2)
                        myPickSet.add(res.ps3)  
                        myPickSet.add(res.ps4)    
                        myPickSet.add(res.ps5)                           
                        this.myPickcheckedMonsters = [...myPickSet]                
                    })         
                }


            }
            
            if(this.myPickcheckedMonsters.length==5 && this.opponentPicks.length==5){
                opponentPicksStr = `(${this.opponentPicks.join(',')})`
                myPickMonsStr = `(${this.myPickcheckedMonsters.join(',')})`
                //首选
                if(this.isIFirstPick){
                    let sql =`SELECT COUNT(*),pf1,pf2,pf3,pf4,pf5,ps1,ps2,ps3,ps4,ps5,bf1,bs1,sum(case when win = 1 then 1 else 0 end) as win_total,sum(case when win = 1 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM ${tableName}
                        WHERE pf1 in ${myPickMonsStr} and  pf2 in ${myPickMonsStr} and pf3 in ${myPickMonsStr} and
                        pf4 in ${myPickMonsStr} and pf5 in ${myPickMonsStr} and
                        ps1 in ${opponentPicksStr} and ps2 in ${opponentPicksStr} and ps3 in ${opponentPicksStr} and 
                        ps4 in ${opponentPicksStr} and ps5 in ${opponentPicksStr}  `
                    console.info(sql)
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                    if(!res){
                        this.$message({
                            message: '大数据没有找到相似对局，请自己禁用',
                            type: 'error'
                        });
                        this.stopBp()
                        return
                    }
                    
                    this.needBan = res.bs1
                    
                    
                    
                    })  
                }else{
                    let sql =`SELECT COUNT(*),pf1,pf2,pf3,pf4,pf5,ps1,ps2,ps3,ps4,ps5,bf1,bs1,sum(case when win = 2 then 1 else 0 end) as win_total,sum(case when win = 2 then 1 else 0 end)*1.0/ COUNT(*) as win_rate FROM ${tableName}
                        WHERE ps1 in ${myPickMonsStr} and  ps2 in ${myPickMonsStr} and ps3 in ${myPickMonsStr} and
                        ps4 in ${myPickMonsStr} and ps5 in ${myPickMonsStr} and
                        pf1 in ${opponentPicksStr} and pf2 in ${opponentPicksStr} and pf3 in ${opponentPicksStr} and 
                        pf4 in ${opponentPicksStr} and pf5 in ${opponentPicksStr}  `
                    console.info(sql)
                    this.sqliteDB.queryOne(sql,{},res=>{                        
                    if(!res){
                        this.$message({
                            message: '大数据没有找到相似对局，请自己禁用',
                            type: 'error'
                        });
                        this.stopBp()
                        return
                    }
                    
                    this.needBan = res.bf1            
                    }) 
                }
                
            }


        }

    },
    computed:{
        opponentPicks(){
            return this.pickCheckedSpecialMonsters.concat(this.pickCheckedNormalMonsters)
        },
        myMonsers(){
            return this.checkedSpecialMonsters.concat(this.checkedNormalMonsters)
        }
    },
    watch:{
        // pickCheckedSpecialMonsters(nv,ov){
            
        // },
        // pickCheckedNormalMonsters(nv,ov){

        // }

    },
    mounted(){
        
        this.loadingInstance = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.getAllMonsters()
        if(localStorage.getItem('checkedSpecialMonsters')){
            this.checkedSpecialMonsters = JSON.parse(localStorage.getItem('checkedSpecialMonsters')) 
        }
        if(localStorage.getItem('checkedNormalMonsters')){
            this.checkedNormalMonsters = JSON.parse(localStorage.getItem('checkedNormalMonsters'))
        }
         
    }
    
}
</script>

<style>

</style>