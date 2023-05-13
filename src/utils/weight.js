const globalWeights={
    speed:1.5,
    crate:1.55,
    cdmg:1.2,
    res:1,
    acc:1,
    atk:1,
    def:1,
    hp:1,
    atkFlat:0.1,
    defFlat:0.1,
    hpFlat:0.01
}

const globalAvgStones = {
    speed: 3,
    atk: 6,
    def: 6,
    hp: 6
}




const globalWizard = ['speed','crate','cdmg','res','acc','atk','def','hp','atkFlat','defFlat','hpFlat']

const attckWizard=['speed','crate','cdmg','atk','atkFlat']

const defAttackWizard=['speed','crate','cdmg','atk','def','defFlat']

const supportWizard=['speed','acc','res','hp','def','defFlat','hpFlat']

const hpWizard = ['speed','res','hp','hpFlat']

const defAttackWeights={
    atk:0.5
}

const singleThresholds={
    speed:21,
    crate:21,
    cdmg:22,
    acc:25,
    res:25,
    atk:24,
    def:25,
    hp:25
}

const scoreThresholds={
    globalWizard:70,
    originWizard:55,
    attckWizard:9999,
    defAttackWizard:9999,
    supportWizard:9999,
    hpWizard:9999
}

const scroeStrictRunes=[1,2,6,7,8,10,11,14,16,17,18,19,20,21,22,23]

const speedStrictRunes = [1,2,6,7,14,16,20,21,22,23]

const globalArtWeights={
    200: 10,
    201: 10,
    202: 10,
    203: 0,
    204: 5,
    205: 5,
    206: 5,
    207: 0,
    208: 20,
    209: 20,
    210: 20,
    211: 0,
    212: 0,
    213: 0,
    214: 0,
    215: 20,
    216: 5,
    217: 5,
    218: 90,
    219: 90,
    220: 90,
    221: 100,
    222: 50,
    223: 50,
    224: 50,
    // //
    // 300:'增加给火属性造成的伤害',
    // 301:'增加给水属性造成的伤害',
    // 302:'增加给风属性造成的伤害',
    // 303:'增加给光属性造成的伤害',
    // 304:'增加给黑暗属性造成的伤害',
    // 305:'减少从火属性受到的伤害',
    // 306:'减少从水属性受到的伤害',
    // 307:'减少从风属性受到的伤害',
    // 308:'减少从光属性受到的伤害',
    // 309:'减少从黑暗属性受到的伤害',
    //
    400: 70,
    401: 80,
    402: 80,
    403: 0,
    404: 60,
    405: 80,
    406: 80,
    407: 70,
    408: 80,
    409: 80,
}

const treatmentArtWeights={
    202: 70,
    206: 50,
    215: 80,
    404: 90,
    405: 90,
    406: 90,

}

const tankArtWeights={
    201: 70,
    202: 70,
    205: 50,
    206: 50,
    214: 20
}

const attactArtWeights={
    200: 70,
    202: 70,
    204: 70,
    206: 70,
    208: 50,
    209: 50,
    210: 50,
    215: 50,
    222: 80,
    223: 70,
    224: 70,
    400: 80,
    401: 90,
    402: 90,
    403: 20
}

const controlArtWeights={
    202: 90,
    206: 90,
    407: 80,
    408: 90,
    409: 90,
}

const onlyAddDamageArtWeights={
    218: 90,
    219: 90,
    220: 90,
    221: 100,
}


const attributeDamageArtWeights={
    1:{
        301: 70,
        300: 90,
        302: 60,
        303: 70,
        304: 70,
        306: 80,
        305: 60,
        307: 90,
        308: 80,
        309: 80
    },
    2:{
        301: 60,
        300: 70,
        302: 90,
        303: 70,
        304: 70,
        306: 90,
        305: 60,
        307: 80,
        308: 80,
        309: 80
    },
    3:{
        301: 90,
        300: 60,
        302: 70,
        303: 70,
        304: 70,
        306: 80,
        305: 90,
        307: 80,
        308: 80,
        309: 80
    },
    4:{
        301: 70,
        300: 70,
        302: 70,
        303: 90,
        304: 70,
        306: 80,
        305: 80,
        307: 80,
        308: 80,
        309: 90
    },
    5:{
        301: 70,
        300: 70,
        302: 70,
        303: 70,
        304: 90,
        306: 80,
        305: 80,
        307: 80,
        308: 90,
        309: 80
    }
}

const artScoreThresholds={
    'global': 100,
    'treatment': 45,
    'tank': 40,
    'attact': 65,
    'control': 40,
    'onlyAddDamage': 48,
}

const artMax={
    200: 70,
    201: 70,
    202: 70,
    203: 30,
    204: 25,
    205: 20,
    206: 30,
    207: 30,//不知道
    208: 20,
    209: 20,
    210: 20,
    211: 30,//不知道
    212: 30,//不知道
    213: 30,//不知道
    214: 20,
    215: 40,
    216: 30,
    217: 30,
    218: 1.5,
    219: 20,
    220: 20,
    221: 200,
    222: 30,
    223: 60,
    224: 20,
    //
    300: 25,
    301: 25,
    302: 25,
    303: 25,
    304: 25,
    305: 30,
    306: 30,
    307: 30,
    308: 30,
    309: 30,
    //
    400: 30,
    401: 30,
    402: 30,
    403: 30,
    404: 30,
    405: 30,
    406: 30,
    407: 30,
    408: 30,
    409: 30,


}








module.exports = {globalWeights,globalWizard,attckWizard,defAttackWizard,supportWizard,hpWizard,defAttackWeights,singleThresholds,scoreThresholds,scroeStrictRunes,speedStrictRunes,globalAvgStones,globalArtWeights,
    treatmentArtWeights,tankArtWeights,attactArtWeights,controlArtWeights,onlyAddDamageArtWeights,attributeDamageArtWeights,artScoreThresholds,artMax}