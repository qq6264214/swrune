const axios = require('axios')
const fs = require('fs')
const path = require('path')

const monsterUrl = 'https://swarfarm.com/api/v2/monsters/'

let imgUrl = 'https://swarfarm.com/static/herders/images/monsters/'

let imgMap={
    //com2usId:{swarfarmId:'',imgUrl}
}
async function getMonsters(pageNum){
    
    return await axios.get(monsterUrl+`?page=${pageNum}`)
  
}

async function initImgMap(){
    let firstData=''
    await axios.get(monsterUrl+`?page=${1}`).then(res=>{
        firstData = res.data
    })
    
    if(!firstData){
        return 
    }
    
    let count = firstData.count
    if(firstData.results){
        for(let j of firstData.results){
            imgMap[j.com2us_id]= {'swarfarmId': j.id,'imgUrl': j.image_filename}
            
        }
    }
    let num = Math.ceil(count/100)
    for(let m=2;m<=num;m++){
        let data = ''
        await axios.get(monsterUrl+`?page=${m}`).then(res=>{
            data = res.data
        })          
        console.info(m)
        if(data && data.results){
            for(let j of data.results){
                imgMap[j.com2us_id]= {'swarfarmId': j.id,'imgUrl': j.image_filename}
                
                
            }
        }         
        
    }
    console.info(imgMap)
    fs.writeFileSync(path.join(__dirname, '../json/monsterImgMap.json'), JSON.stringify(imgMap), 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });
}

// initImgMap()


    

function downloadImg(imgName,com2usId){  
    let imgPath = path.join(__dirname,`../assets/monster/${com2usId}.png`)
    if(!fs.existsSync(imgPath)){
        console.info(com2usId+'_'+imgName)
        axios({
            method: 'get',
            url: `https://swarfarm.com/static/herders/images/monsters/${imgName}`,
            responseType: 'stream',
            
        }).then(function (response) {                     
            response.data.pipe(fs.createWriteStream(imgPath)).on('error',err=>{
                console.info(err)              
            })
            
        }).catch(err=>{
            // console.info(err)
        })
    }
    
}


function downloadAll(){
    const json = require('./monsterImgMap.json')
    for(let i in json){
        let imgName = json[i]['imgUrl']
        let com2usId = i
        downloadImg(imgName,com2usId)
    }
}

// downloadImg('unit_icon_0000_0_0.png',10101)
downloadAll()




