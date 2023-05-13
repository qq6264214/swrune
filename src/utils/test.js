//收集了一些高胜率队伍，用于去掉重复来配队
var all = ['水熊猫 光人鱼 火奥','水熊猫 水方舟 风德','水熊猫 火牛 风方舟','火枪 光人鱼 风鬼','暗狼人 水人鱼 风鬼','暗狼人 水人鱼 光小猫',
            '暗狼人 水熊 光小猫','火枪 风狂 水狼人','火枪 风方舟 水姨夫','火枪 水南瓜 风琴','火枪 水萝莉 风野兽','水狼人 风鬼 风琴','水狼人 风鬼 光人鱼','光卡 暗猫 风琴',
            '火狗头 水狼人 风琴','火狗头 火奥 风野兽','光仙女王 光卡 火鬼','火奥 风野兽 水沙漠','火鬼 风野兽 水沙漠',
            '光帕 风方舟 水姨夫','水狼人 火鬼 风琴','火狗头 水皮球 火鬼','火枪 水鬼 风琴','水熊猫 光人鱼 风野兽','火奥 水法 风野兽','火枪 风德 水奥','火姨夫 风马桶 水姨夫',
            '火姨夫 水奥 风德','火姨夫 风马桶 风德','火枪 光狼人 风琴','水熊猫 火牛 光人鱼','火奥 水方舟 风德']
var a2 = ['光仙女王 光卡 光小刀','水忍者 水皮球 光小刀',]

var monsters = new Set()
for(let i of all){
    let monsArr = i.split(' ')
    monsters.add(monsArr[0].trim())
    monsters.add(monsArr[1].trim())
    monsters.add(monsArr[2].trim())
}           
// console.info(monsters)
var teamLength = 0

function getAvailableTeam(mSet){
    for(let i of all){
        let monsArr = i.split(' ')      
        if(!mSet.has(monsArr[0].trim()) && !mSet.has(monsArr[1].trim()) && !mSet.has(monsArr[2].trim())){
            return monsArr
        }


    } 
    return 
}



let maxTeamLength = -1
let maxTeams = []


for(let j of all){
    let tMonSet = new Set()
    let currtTemas = []

    let monsArr = j.split(' ')
    
    tMonSet.add(monsArr[0].trim())
    tMonSet.add(monsArr[1].trim())
    tMonSet.add(monsArr[2].trim())
    while(true){
        let availableTeam  = getAvailableTeam(tMonSet)
        if(!availableTeam){
            break
        }
        for(let m of availableTeam){
            tMonSet.add(m)
        }
        availableTeam.sort()
        currtTemas.push(availableTeam)
    }
    currtTemas.sort()
    if(currtTemas.length>maxTeamLength){
        maxTeamLength=currtTemas.length       
        maxTeams=[]
        maxTeams.push(currtTemas)
        
    }else if(currtTemas.length==maxTeamLength){  
        let flag = true
        for(let o of maxTeams){
            if(o.toString() == currtTemas.toString()){
                flag = false
                break
            }
        }
        if(flag){
            maxTeams.push(currtTemas)
        }
        
    }
}

for(let k of maxTeams){
    console.info("最大组数:"+maxTeamLength)
    console.info(k)
    console.info('--------------------------------------------------')
}