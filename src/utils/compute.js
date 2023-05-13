const constantMap = require('./constant.js')
const weight = require('./weight.js')
const monsterMap = constantMap['MONSTER']
const runeMap = constantMap['RUNE']
const artifactMap = constantMap['ARTIFACT']

const monsKey = 'unit_list'
const runesKey = 'runes'
const artifactsKey = 'artifacts'

const gradeNames = ['普通','魔法','稀有','英雄','传说']
const runeNames={
    'Energy':'祝福',
    'Guard':'守护',
    'Swift':'迅速',
    'Blade':'刀刃',
    'Rage':'激怒',
    'Focus':'集中',
    'Endure':'忍耐',
    'Fatal':'猛攻',
    'Despair':'绝望',
    'Vampire':'吸血', 
    'Violent':'暴走',
    'Nemesis':'应报',
    'Will':'意志',
    'Shield':'保护',
    'Revenge':'反击',
    'Destroy':'覆灭',
    'Fight':'斗志',
    'Determination':'决心',
    'Enhance':'发扬',
    'Accuracy':'命中',
    'Tolerance':'韧性',
    'Immemorial':'Immemorial',
}
const qualityNames = {
      1: '普通',
      2: '魔法',
      3: '稀有',
      4: '英雄',
      5: '传说',
      // ancient rune qualities
      11: '远古普通',
      12: '远古魔法',
      13: '远古稀有',
      14: '远古英雄',
      15: '远古传说'
    }

//计算分数时只考虑附属性和前缀
const scoreType= ['globalWizard','attckWizard','defAttackWizard','supportWizard','hpWizard']

export function getRuneResult(orginalJson,computeGrindFlag,tWeightMap){   
    let arr = getRunesAndMonNames(orginalJson,computeGrindFlag)
    let runeArray = arr[0]
    let monNameMap = arr[1]
    let result=[]
    for(let rune of runeArray){
        let r=  computeScore(rune,computeGrindFlag,tWeightMap)
        //TODO 判断初始阈值设置,这里与符文类别相关
        if(r.belongMonId){
            r.belongMonName = monNameMap[r.belongMonId]
        }
        testRuneQuality(rune)

        result.push(r)
    }
    return result
}


function getRunesAndMonNames(orginalJson,computeGrindFlag){
    const monsters = orginalJson[monsKey]
    //这里的应该是没有佩戴的符文
    const runes = orginalJson[runesKey]
    const artifacts = orginalJson[artifactsKey]


    let runeIdArray = []
    let runeArray = []
    //符文类别:{插槽位:[]}
    let runeTypeMap ={}
    let monArray =[]
    let monNameMap = {}
    for(let monJson of monsters){
        let m = parseSingleMonster(monJson)
        monArray.push(m)
        monNameMap[m.id] = m.name
        let arr = dealRunes(m.runes,runeArray,runeIdArray)
        runeArray = arr[0]
        runeIdArray = arr[1]
    }  
    let arr2 = dealRunes(runes,runeArray,runeIdArray)
    runeArray = arr2[0]
    runeIdArray = arr2[1]


    return [runeArray,monNameMap]
}

function addToRuneTypeMap(rune){
    let setId = rune.setId
    let map = runeTypeMap[setId]||{}
    let slot = rune.slot
    let arr = map[slot]||[]
    arr.push(rune)
    map[slot] = arr
    runeTypeMap[setId] = map
}




function dealRunes(trunes,runeArray,runeIdArray){
    
    for(let i in trunes){
         
        let r = parseSingeRune(trunes[i])
        if(r.id in runeIdArray){
            continue
        }
        runeArray.push(r)
        runeIdArray.push(r.id)
        
        // addToRuneTypeMap(r)
    }
    return [runeArray,runeIdArray]
}



function parseSingleMonster(mj){

    
    let mon = {}
    mon.id = mj['unit_id']
    mon.number = mj['unit_master_id']
    mon.isAwaking = false
    if(mj['homunculus'] == 0){
        //表示已经觉醒
        if((mon.number)[-2] == '1'){
            mon.isAwaking = true
            //不使用真名,使用属性+原名
            // mon.name = monsterMap['names'][mon.number]
        }
        mon.name = monsterMap['attributes'][mon.number[-1]]+monsterMap['names'][mon.number.toString().substring(0,3)]
    }
    else{
        //人造人不知道是否已经觉醒
        mon.name = mj['homunculus_name']
    }
    //等级
    mon.level = mj['unit_level']
    //星级
    mon.star_level = mj['class']
    //属性,风火光暗
    mon.attribute = mj['attribute']

    //以下所有属性均位该魔灵的原始数据
    //体力,原始数据除以了15
    mon.hp = mj['con']*15
    //攻击力
    mon.atk = mj['atk']
    //防御力
    mon.df = mj['def']
    //速度
    mon.spd = mj['spd']
    //效果抵抗
    mon.res = mj['resist']
    //效果命中
    mon.acc = mj['accuracy']
    //爆率
    mon.cr = mj['critical_rate']
    //爆伤
    mon.cd = mj['critical_damage']

    mon.create_time = mj['create_time']
    mon.skills = mj['skills']
    mon.runes = mj['runes']
    mon.artifacts = mj['artifacts']
    
    return mon
}


function parseSingeRune(rj){
    
    let self = {}
    self.id = rj['rune_id']
    
    //表示是否已经佩戴，0表示没有，否则该值为魔灵id
    self.belongMonId = rj['occupied_id']
    //插槽位置
    self.slot = rj['slot_no']
    //星级
    self.stars = rj['class']
    //品质 白色 绿色 1到5
    self.grade = rj['rank']
    self.orginRank = rj['extra']
    self.gradeName = qualityNames[rj['rank']]
    //符文类型
    self.setId = rj['set_id']
    
    self.setName = runeNames[runeMap["sets"][rj['set_id']]]
    //当前等级
    self.level = rj['upgrade_curr']
    //符文是否锁定
    self.lock = false
    // self.sell_value = rj['sell_value']
    //主属性类别
    self.mainStat = rj['pri_eff'][0]
    //主属性值
    self.mainValue = rj['pri_eff'][1]
    //主属性最大值,远古符文可能会报错
    self.mainMaxValue = runeMap['mainstat'][self.mainStat]['max'][self.grade]
    self.mainName = runeMap['effectTypes'][rj['pri_eff'][0]][1]

    //前缀类别
    self.innateStat = rj['prefix_eff'][0]
    //前缀值
    self.innateValue = rj['prefix_eff'][1]
    if(self.innateStat){
        self.innateKey = runeMap['effectTypes'][rj['prefix_eff'][0]][0]
        self.innatName = runeMap['effectTypes'][rj['prefix_eff'][0]][1]
    }  
   
    self.subs = []
    for(let subj of rj['sec_eff']){
        let sub = {}
        sub['stat'] = subj[0]
        sub['value'] = subj[1]
        //是否附魔 不确定 猜一个是添加 一个是转换
        sub['enchant'] = Boolean(subj[2])
        sub['grind'] = subj[3]
        sub['statkey'] = runeMap['effectTypes'][subj[0]][0]
        sub['statName'] = runeMap['effectTypes'][subj[0]][1]
        self.subs.push(sub)
    }  
    
    return self
}

//属性增伤计算到输出中，属性减伤计算到减伤中
export function paresAllArts(orginalJson,noAttrweights,attrWeights){
    const monsters = orginalJson[monsKey]
    
    let arts = []
    let rids= new Set()
    for(let i of monsters){
        if(i.artifacts && i.artifacts.length>0){
            for(let k of i.artifacts){
                let singleArtifact = parseSingleArtifact(k) 
                singleArtifact.scoresMap = computeArtScore(singleArtifact,noAttrweights,attrWeights)


                singleArtifact.isBelong = true
                arts.push(singleArtifact)
                rids.add(k.rid)
            }
        }
    }

    const artifactJson= orginalJson['artifacts']
    
    
    for(let i of artifactJson){
        if(!rids.has(i.rid)){
            let singleArtifact = parseSingleArtifact(i) 
            singleArtifact.scoresMap = computeArtScore(singleArtifact,noAttrweights,attrWeights)
            singleArtifact.isBelong = false
            
            arts.push(singleArtifact)
            rids.add(i.rid)
        }            
        
    }
    return arts

}

//计算单个神器得分
const artWeightNames = ['globalArtWeights','treatmentArtWeights','tankArtWeights','attactArtWeights','controlArtWeights','onlyAddDamageArtWeights']
function computeArtScore(art,noAttrweights,attrWeights){
    
    let scoreArr = []
    let currtAttrWeights = []
    let artMax = weight['artMax']
    if(art.type == 1){
        currtAttrWeights = attrWeights[art.realStyle]
    }
    
    for(let i of artWeightNames){
        
        let score = 0
        for(let sub of art.subs){
            if(Number(sub['type'])>=305 && Number(sub['type']<=309)){//减伤
                if(i == 'globalArtWeights' || i == 'tankArtWeights'){
                    score += (currtAttrWeights[sub['type']] || 0 ) * (sub['value']/artMax[sub['type']])
                }
                

            }else if(Number(sub['type'])>=300 && Number(sub['type']<=304)  ){//增伤
                if(i == 'globalArtWeights' || i == 'attactArtWeights'){
                    score += (currtAttrWeights[sub['type']] || 0 ) * (sub['value']/artMax[sub['type']])
                }
                
            }else{
                score += (noAttrweights[i][sub['type']] || 0 ) * (sub['value']/artMax[sub['type']])
            }        
        }
        score = Number(score.toFixed(2))
        scoreArr.push(score)

    }

    return {
        'global': scoreArr[0],
        'treatment': scoreArr[1],
        'tank': scoreArr[2],
        'attact': scoreArr[3],
        'control': scoreArr[4],
        'onlyAddDamage': scoreArr[5],
    }
}


export function parseSingleArtifact(aj){
    // debugger
    
    let self={}
    self.rid = aj['rid']
    //当前等级
    self.level = aj['level']
    self.type = aj['type'] // 1: 'Attribute',2: 'Archetype',
    
    self.attribute = aj['attribute'] //猜测是属性神器的属性类型
    self.unitStyle = aj['unit_style'] //猜测是类型神器的类型
    self.naturalRank = aj['natural_rank'] //原生品质
    //品质 白色 绿色 1到5
    self.rank = aj['rank']
    //属性类型
    self.realStyle = aj['attribute'] || aj['unit_style']+10

    let priEffect = aj['pri_effect']
    //主属性值
    self.priType  = priEffect[0]
    // self.priName = artifactMap[]
    self.priValue =priEffect[1]
    self.priName = artifactMap['effectTypes']['main_lang'][priEffect[0]]

    let secEffects = aj['sec_effects']//类型，值，强化次数

    let subs = []
    for(let i of secEffects){
        let sub ={}
        sub.type = i[0]
        sub.value = i[1]
        sub.name = artifactMap['effectTypes']['sub_return'][i[0]]
        sub.times = i[2] //强化次数
        subs.push(sub)
    }
    self.subs= subs

    // //属性1的类型
    // self.secEffect1Type = secEffects[0]?secEffects[0][0]:''
    // //属性1的值
    // self.secEffect1Value = secEffects[0]?secEffects[0][1]:''
    // self.secEffect1Name = secEffects[0]?artifactMap['effectTypes']['sub_return'][self.secEffect1Type]:''


    // self.secEffect2Type =  secEffects[1]?secEffects[1][0]:''
    // self.secEffect2Value = secEffects[1]?secEffects[1][1]:''
    // self.secEffect2Name = secEffects[1]?artifactMap['effectTypes']['sub_return'][self.secEffect2Type]:''

    // self.secEffect3Type =  secEffects[2]?secEffects[2][0]:''
    // self.secEffect3Value =  secEffects[2]?secEffects[2][1]:''
    // self.secEffect3Name = secEffects[2]?artifactMap['effectTypes']['sub_return'][self.secEffect3Type]:''

    // self.secEffect4Type =  secEffects[3]?secEffects[3][0]:''
    // self.secEffect4Value =  secEffects[3]?secEffects[3][1]:''
    // self.secEffect4Name = secEffects[3]?artifactMap['effectTypes']['sub_return'][self.secEffect4Type]:''


    return self



}

function getArtifactEffect(eff, mainStat = true) {
    const type = eff[0];
    const value = eff[1];

    if (mainStat) {
      const mainStatEffectTypeStrings = {
        100: `HP +${value}`,
        101: `ATK +${value}`,
        102: `DEF +${value}`,
      };

      return mainStatEffectTypeStrings[type];
    } else {
      return this.artifact.effectTypes.sub[type](value);
    }
}


export function getWeightsMap(){
    let WeightsMap = {}
    for(let k of scoreType){
        let currentWeightMap = {}
        for(let key of weight[k]){
            //Todo,修改了设置之后需要重新读值
            let curweight = weight.globalWeights[key]
            if(k=='defAttackWizard' && key in weight.defAttackWeights){
                curweight = weight.defAttackWeights[key]
            }
            currentWeightMap[key] = curweight
        }
        WeightsMap[k] = currentWeightMap
    }
    return WeightsMap
}


export function getArtNoAttrWeightsMap(){
    let artWeightMap={}
    let artScoreTypes = ['globalArtWeights','treatmentArtWeights','tankArtWeights','attactArtWeights','controlArtWeights','onlyAddDamageArtWeights']
    for(let k of artScoreTypes){
        artWeightMap[k] = weight[k]
    }
    return artWeightMap
}

export function getArtAttrWeightsMap(){

    return weight['attributeDamageArtWeights']

}

export function getArtScoreThresholds(){
    return weight['artScoreThresholds']
}

export function getOriginThresholds(maxpercent){
    maxpercent= maxpercent || 0.8
    let scoreThresholds = getArtScoreThresholds() //总评的阈值
    let singelThresolds= {}
    let tp = artifactMap['effectTypes']['sub_lang']
    for(let i in tp){
        if(weight.artMax[i].toString().indexOf('.')>0){
            singelThresolds[i]= Number((weight['artMax'][i] * maxpercent).toFixed(1))
        }else{
            singelThresolds[i]= Math.round(weight.artMax[i] * maxpercent)
        }
    }
    return {
    'score':scoreThresholds,
    'single':singelThresolds
    }
}


function computeScore(rune,comupteGrindFlag,tWeightMap){
    let scoresMap = {}  
    let WeightsMap = tWeightMap
    //得分分开算，初始值，当前加成值，最大加成值
    for(let k of scoreType){     
        //总评时候部分属实要做互斥处理
        let mutexScoreArr= []
        let mutexKey = ['cdmg','acc','res']
        let cScore = 0  
        let currentGrindScore = 0
        let maxGrindScore = 0
        let currentWeightMap = WeightsMap[k]  
        
        if(rune.innateStat){
            let innateKey = rune.innateKey
            if(currentWeightMap[innateKey]){
                if(mutexKey.includes(innateKey)){
                    mutexScoreArr.push(rune.innateValue * currentWeightMap[innateKey])
                }else{
                    cScore += rune.innateValue * currentWeightMap[innateKey]
                }
               
            }
        }
        for(let sub of rune.subs){       
            if(currentWeightMap[sub['statkey']]){
                // let teScore = 0


                // if(comupteGrindFlag){
                    
                //     if(weight.globalAvgStones[sub['statkey']] && sub.grind<weight.globalAvgStones[sub['statkey']]){
                //         teScore = (sub.value+weight.globalAvgStones[sub['statkey']]) * currentWeightMap[sub['statkey']]
                //     }else{
                //         teScore = (sub.value+sub.grind) * currentWeightMap[sub['statkey']]
                //     }

                    
                // }else{
                //     teScore = sub.value * currentWeightMap[sub['statkey']]
                // }
                let teScore = sub.value * currentWeightMap[sub['statkey']]
                let curGScore= sub.grind * currentWeightMap[sub['statkey']]
                let a = weight.globalAvgStones[sub['statkey']] || 0
                let maxGScore = a * currentWeightMap[sub['statkey']]


                if(mutexKey.includes(sub['statkey'])){
                    mutexScoreArr.push(teScore)
                }else{
                    cScore += teScore
                    currentGrindScore  += curGScore
                    maxGrindScore += maxGScore
                }
           
            }
        }
        if(k == 'globalWizard' && mutexScoreArr.length>0){
            cScore +=  Math.max.apply(null, mutexScoreArr)
        }else if(mutexScoreArr.length>0){
            cScore += mutexScoreArr.reduce(function(prev, next, index, mutexScoreArr) {
                return prev + next;
            })
        }
        cScore=Math.round(cScore*100)/100
        scoresMap[k]={'score':cScore,'currentGrindScore':Number(currentGrindScore.toFixed(1)),'maxGrindScore':Number(maxGrindScore.toFixed(1))}
    }
    rune.scoresMap = scoresMap
    return rune
}

import{singleThresholds} from './weight'
function testRuneQuality(rune){
    if(rune.level<9){
        return  false
    }
    debugger
    //速度检测
    let speedObj = rune.subs.find(obj => obj.statkey === 'speed')
    if(speedObj){
        let v = speedObj.value
        if(v>=singleThresholds['speed']){
            return `速度合格`
        }
        else if(rune.orginRank==5 && rune.level<12 && v+6>=singleThresholds['speed']){
            return `速度未来可期`
        }
    }
    //暴击率检测
    let crateObj = rune.subs.find(obj => obj.statkey === 'crate')
    if(crateObj && [4,5,8,10,11,13,15,17,18,19].includes(crateObj.setId)){//只检测部分符文
        
    }
    
}



