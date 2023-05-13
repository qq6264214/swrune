// #Adapted from https://github.com/Xzandro/sw-exporter/blob/master/app/mapping.js
const MONSTER =  {
    "attributes": {
      1: 'Water',
      2: 'Fire',
      3: 'Wind',
      4: 'Light',
      5: 'Dark'
    },
    "names": {
      101: 'Fairy',
      10111: 'Elucia',
      10112: 'Iselia',
      10113: 'Aeilene',
      10114: 'Neal',
      10115: 'Sorin',

      102: 'Imp',
      10211: 'Fynn',
      10212: 'Cogma',
      10213: 'Ralph',
      10214: 'Taru',
      10215: 'Garok',

      103: 'Pixie',
      10311: 'Kacey',
      10312: 'Tatu',
      10313: 'Shannon',
      10314: 'Cheryl',
      10315: 'Camaryn',

      104: 'Yeti',
      10411: 'Kunda',
      10412: 'Tantra',
      10413: 'Rakaja',
      10414: 'Arkajan',
      10415: 'Kumae',

      105: 'Harpy',
      10511: 'Ramira',
      10512: 'Lucasha',
      10513: 'Prilea',
      10514: 'Kabilla',
      10515: 'Hellea',

      106: 'Hellhound',
      10611: 'Tarq',
      10612: 'Sieq',
      10613: 'Gamir',
      10614: 'Shamar',
      10615: 'Shumar',

      107: 'Warbear',
      10711: 'Dagora',
      10712: 'Ursha',
      10713: 'Ramagos',
      10714: 'Lusha',
      10715: 'Gorgo',

      108: 'Elemental',
      10811: 'Daharenos',
      10812: 'Bremis',
      10813: 'Taharus',
      10814: 'Priz',
      10815: 'Camules',

      109: 'Garuda',
      10911: 'Konamiya',
      10912: 'Cahule',
      10913: 'Lindermen',
      10914: 'Teon',
      10915: 'Rizak',

      110: 'Inugami',
      11011: 'Icaru',
      11012: 'Raoq',
      11013: 'Ramahan',
      11014: 'Belladeon',
      11015: 'Kro',

      111: 'Salamander',
      11111: 'Kaimann',
      11112: 'Krakdon',
      11113: 'Lukan',
      11114: 'Sharman',
      11115: 'Decamaron',

      112: 'Nine-tailed Fox',
      11211: 'Soha',
      11212: 'Shihwa',
      11213: 'Arang',
      11214: 'Chamie',
      11215: 'Kamiya',

      113: 'Serpent',
      11311: 'Shailoq',
      11312: 'Fao',
      11313: 'Ermeda',
      11314: 'Elpuria',
      11315: 'Mantura',

      114: 'Golem',
      11411: 'Kuhn',
      11412: 'Kugo',
      11413: 'Ragion',
      11414: 'Groggo',
      11415: 'Maggi',

      115: 'Griffon',
      11511: 'Kahn',
      11512: 'Spectra',
      11513: 'Bernard',
      11514: 'Shamann',
      11515: 'Varus',

      116: 'Undine',
      11611: 'Mikene',
      11612: 'Atenai',
      11613: 'Delphoi',
      11614: 'Icasha',
      11615: 'Tilasha',

      117: 'Inferno',
      11711: 'Purian',
      11712: 'Tagaros',
      11713: 'Anduril',
      11714: 'Eludain',
      11715: 'Drogan',

      118: 'Sylph',
      11811: 'Tyron',
      11812: 'Baretta',
      11813: 'Shimitae',
      11814: 'Eredas',
      11815: 'Aschubel',

      119: 'Sylphid',
      11911: 'Lumirecia',
      11912: 'Fria',
      11913: 'Acasis',
      11914: 'Mihael',
      11915: 'Icares',

      120: 'High Elemental',
      12011: 'Ellena',
      12012: 'Kahli',
      12013: 'Moria',
      12014: 'Shren',
      12015: 'Jumaline',

      121: 'Harpu',
      12111: 'Sisroo',
      12112: 'Colleen',
      12113: 'Seal',
      12114: 'Sia',
      12115: 'Seren',

      122: 'Slime',
      12211: '',
      12212: '',
      12213: '',
      12214: '',
      12215: '',

      123: 'Forest Keeper',
      12311: '',
      12312: '',
      12313: '',
      12314: '',
      12315: '',

      124: 'Mushroom',
      12411: '',
      12412: '',
      12413: '',
      12414: '',
      12415: '',

      125: 'Maned Boar',
      12511: '',
      12512: '',
      12513: '',
      12514: '',
      12515: '',

      126: 'Monster Flower',
      12611: '',
      12612: '',
      12613: '',
      12614: '',
      12615: '',

      127: 'Ghost',
      12711: '',
      12712: '',
      12713: '',
      12714: '',
      12715: '',

      128: 'Low Elemental',
      12811: 'Tigresse',
      12812: 'Lamor',
      12813: 'Samour',
      12814: 'Varis',
      12815: 'Havana',

      129: 'Mimick',
      12911: '',
      12912: '',
      12913: '',
      12914: '',
      12915: '',

      130: 'Horned Frog',
      13011: '',
      13012: '',
      13013: '',
      13014: '',
      13015: '',

      131: 'Sandman',
      13111: '',
      13112: '',
      13113: '',
      13114: '',
      13115: '',

      132: 'Howl',
      13211: 'Lulu',
      13212: 'Lala',
      13213: 'Chichi',
      13214: 'Shushu',
      13215: 'Chacha',

      133: 'Succubus',
      13311: 'Izaria',
      13312: 'Akia',
      13313: 'Selena',
      13314: 'Aria',
      13315: 'Isael',

      134: 'Joker',
      13411: 'Sian',
      13412: 'Jojo',
      13413: 'Lushen',
      13414: 'Figaro',
      13415: 'Liebli',

      135: 'Ninja',
      13511: 'Susano',
      13512: 'Garo',
      13513: 'Orochi',
      13514: 'Gin',
      13515: 'Han',

      136: 'Surprise Box',
      13611: '',
      13612: '',
      13613: '',
      13614: '',
      13615: '',

      137: 'Bearman',
      13711: 'Gruda',
      13712: 'Kungen',
      13713: 'Dagorr',
      13714: 'Ahman',
      13715: 'Haken',

      138: 'Valkyrja',
      13811: 'Camilla',
      13812: 'Vanessa',
      13813: 'Katarina',
      13814: 'Akroma',
      13815: 'Trinity',

      139: 'Pierret',
      13911: 'Julie',
      13912: 'Clara',
      13913: 'Sophia',
      13914: 'Eva',
      13915: 'Luna',

      140: 'Werewolf',
      14011: 'Vigor',
      14012: 'Garoche',
      14013: 'Shakan',
      14014: 'Eshir',
      14015: 'Jultan',

      141: 'Phantom Thief',
      14111: 'Luer',
      14112: 'Jean',
      14113: 'Julien',
      14114: 'Louis',
      14115: 'Guillaume',

      142: 'Angelmon',
      14211: 'Blue Angelmon',
      14212: 'Red Angelmon',
      14213: 'Gold Angelmon',
      14214: 'White Angelmon',
      14215: 'Dark Angelmon',

      144: 'Dragon',
      14411: 'Verad',
      14412: 'Zaiross',
      14413: 'Jamire',
      14414: 'Zerath',
      14415: 'Grogen',

      145: 'Phoenix',
      14511: 'Sigmarus',
      14512: 'Perna',
      14513: 'Teshar',
      14514: 'Eludia',
      14515: 'Jaara',

      146: 'Chimera',
      14611: 'Taor',
      14612: 'Rakan',
      14613: 'Lagmaron',
      14614: 'Shan',
      14615: 'Zeratu',

      147: 'Vampire',
      14711: 'Liesel',
      14712: 'Verdehile',
      14713: 'Argen',
      14714: 'Julianne',
      14715: 'Cadiz',

      148: 'Viking',
      14811: 'Huga',
      14812: 'Geoffrey',
      14813: 'Walter',
      14814: 'Jansson',
      14815: 'Janssen',

      149: 'Amazon',
      14911: 'Ellin',
      14912: 'Ceres',
      14913: 'Hina',
      14914: 'Lyn',
      14915: 'Mara',

      150: 'Martial Cat',
      15011: 'Mina',
      15012: 'Mei',
      15013: 'Naomi',
      15014: 'Xiao Ling',
      15015: 'Miho',

      152: 'Vagabond',
      15211: 'Allen',
      15212: "Kai'en",
      15213: 'Roid',
      15214: 'Darion',
      15215: 'Jubelle',

      153: 'Epikion Priest',
      15311: 'Rina',
      15312: 'Chloe',
      15313: 'Michelle',
      15314: 'Iona',
      15315: 'Rasheed',

      154: 'Magical Archer',
      15411: 'Sharron',
      15412: 'Cassandra',
      15413: 'Ardella',
      15414: 'Chris',
      15415: 'Bethony',

      155: 'Rakshasa',
      15511: 'Su',
      15512: 'Hwa',
      15513: 'Yen',
      15514: 'Pang',
      15515: 'Ran',

      156: 'Bounty Hunter',
      15611: 'Wayne',
      15612: 'Randy',
      15613: 'Roger',
      15614: 'Walkers',
      15615: 'Jamie',

      157: 'Oracle',
      15711: 'Praha',
      15712: 'Juno',
      15713: 'Seara',
      15714: 'Laima',
      15715: 'Giana',

      158: 'Imp Champion',
      15811: 'Yaku',
      15812: 'Fairo',
      15813: 'Pigma',
      15814: 'Shaffron',
      15815: 'Loque',

      159: 'Mystic Witch',
      15911: 'Megan',
      15912: 'Rebecca',
      15913: 'Silia',
      15914: 'Linda',
      15915: 'Gina',

      160: 'Grim Reaper',
      16011: 'Hemos',
      16012: 'Sath',
      16013: 'Hiva',
      16014: 'Prom',
      16015: 'Thrain',

      161: 'Occult Girl',
      16111: 'Anavel',
      16112: 'Rica',
      16113: 'Charlotte',
      16114: 'Lora',
      16115: 'Nicki',

      162: 'Death Knight',
      16211: 'Fedora',
      16212: 'Arnold',
      16213: 'Briand',
      16214: 'Conrad',
      16215: 'Dias',

      163: 'Lich',
      16311: 'Rigel',
      16312: 'Antares',
      16313: 'Fuco',
      16314: 'Halphas',
      16315: 'Grego',

      164: 'Skull Soldier',
      16411: '',
      16412: '',
      16413: '',
      16414: '',
      16415: '',

      165: 'Living Armor',
      16511: 'Nickel',
      16512: 'Iron',
      16513: 'Copper',
      16514: 'Silver',
      16515: 'Zinc',

      166: 'Dragon Knight',
      16611: 'Chow',
      16612: 'Laika',
      16613: 'Leo',
      16614: 'Jager',
      16615: 'Ragdoll',

      167: 'Magical Archer Promo',
      16711: '',
      16712: '',
      16713: '',
      16714: 'Fami',
      16715: '',

      168: 'Monkey King',
      16811: 'Shi Hou',
      16812: 'Mei Hou Wang',
      16813: 'Xing Zhe',
      16814: 'Qitian Dasheng',
      16815: 'Son Zhang Lao',

      169: 'Samurai',
      16911: 'Kaz',
      16912: 'Jun',
      16913: 'Kaito',
      16914: 'Tosi',
      16915: 'Sige',

      170: 'Archangel',
      17011: 'Ariel',
      17012: 'Velajuel',
      17013: 'Eladriel',
      17014: 'Artamiel',
      17015: 'Fermion',

      172: 'Drunken Master',
      17211: 'Mao',
      17212: 'Xiao Chun',
      17213: 'Huan',
      17214: 'Tien Qin',
      17215: 'Wei Shin',

      173: 'Kung Fu Girl',
      17311: 'Xiao Lin',
      17312: 'Hong Hua',
      17313: 'Ling Ling',
      17314: 'Liu Mei',
      17315: 'Fei',

      174: 'Beast Monk',
      17411: 'Chandra',
      17412: 'Kumar',
      17413: 'Ritesh',
      17414: 'Shazam',
      17415: 'Rahul',

      175: 'Mischievous Bat',
      17511: '',
      17512: '',
      17513: '',
      17514: '',
      17515: '',

      176: 'Battle Scorpion',
      17611: '',
      17612: '',
      17613: '',
      17614: '',
      17615: '',

      177: 'Minotauros',
      17711: 'Urtau',
      17712: 'Burentau',
      17713: 'Eintau',
      17714: 'Grotau',
      17715: 'Kamatau',

      178: 'Lizardman',
      17811: 'Kernodon',
      17812: 'Igmanodon',
      17813: 'Velfinodon',
      17814: 'Glinodon',
      17815: 'Devinodon',

      179: 'Hell Lady',
      17911: 'Beth',
      17912: 'Raki',
      17913: 'Ethna',
      17914: 'Asima',
      17915: 'Craka',

      180: 'Brownie Magician',
      18011: 'Orion',
      18012: 'Draco',
      18013: 'Aquila',
      18014: 'Gemini',
      18015: 'Korona',

      181: 'Kobold Bomber',
      18111: 'Malaka',
      18112: 'Zibrolta',
      18113: 'Taurus',
      18114: 'Dover',
      18115: 'Bering',

      182: 'King Angelmon',
      18211: 'Blue King Angelmon',
      18212: 'Red King Angelmon',
      18213: 'Gold King Angelmon',
      18214: 'White King Angelmon',
      18215: 'Dark King Angelmon',

      183: 'Sky Dancer',
      18311: 'Mihyang',
      18312: 'Hwahee',
      18313: 'Chasun',
      18314: 'Yeonhong',
      18315: 'Wolyung',

      184: 'Taoist',
      18411: 'Gildong',
      18412: 'Gunpyeong',
      18413: 'Woochi',
      18414: 'Hwadam',
      18415: 'Woonhak',

      185: 'Beast Hunter',
      18511: 'Gangchun',
      18512: 'Nangrim',
      18513: 'Suri',
      18514: 'Baekdu',
      18515: 'Hannam',

      186: 'Pioneer',
      18611: 'Woosa',
      18612: 'Chiwu',
      18613: 'Pungbaek',
      18614: 'Nigong',
      18615: 'Woonsa',

      187: 'Penguin Knight',
      18711: 'Toma',
      18712: 'Naki',
      18713: 'Mav',
      18714: 'Dona',
      18715: 'Kuna',

      188: 'Barbaric King',
      18811: 'Aegir',
      18812: 'Surtr',
      18813: 'Hraesvelg',
      18814: 'Mimirr',
      18815: 'Hrungnir',

      189: 'Polar Queen',
      18911: 'Alicia',
      18912: 'Brandia',
      18913: 'Tiana',
      18914: 'Elenoa',
      18915: 'Lydia',

      190: 'Battle Mammoth',
      19011: 'Talc',
      19012: 'Granite',
      19013: 'Olivine',
      19014: 'Marble',
      19015: 'Basalt',

      191: 'Fairy Queen',
      19111: '',
      19112: '',
      19113: '',
      19114: 'Fran',
      19115: '',

      192: 'Ifrit',
      19211: 'Theomars',
      19212: 'Tesarion',
      19213: 'Akhamamir',
      19214: 'Elsharion',
      19215: 'Veromos',

      193: 'Cow Girl',
      19311: 'Sera',
      19312: 'Anne',
      19313: 'Hannah',
      19314: 'Loren',
      19315: 'Cassie',

      194: 'Pirate Captain',
      19411: 'Galleon',
      19412: 'Carrack',
      19413: 'Barque',
      19414: 'Brig',
      19415: 'Frigate',

      195: 'Charger Shark',
      19511: 'Aqcus',
      19512: 'Ignicus',
      19513: 'Zephicus',
      19514: 'Rumicus',
      19515: 'Calicus',

      196: 'Mermaid',
      19611: 'Tetra',
      19612: 'Platy',
      19613: 'Cichlid',
      19614: 'Molly',
      19615: 'Betta',

      197: 'Sea Emperor',
      19711: 'Poseidon',
      19712: 'Okeanos',
      19713: 'Triton',
      19714: 'Pontos',
      19715: 'Manannan',

      198: 'Magic Knight',
      19811: 'Lapis',
      19812: 'Astar',
      19813: 'Lupinus',
      19814: 'Iris',
      19815: 'Lanett',

      199: 'Assassin',
      19911: 'Stella',
      19912: 'Lexy',
      19913: 'Tanya',
      19914: 'Natalie',
      19915: 'Isabelle',

      200: 'Neostone Fighter',
      20011: 'Ryan',
      20012: 'Trevor',
      20013: 'Logan',
      20014: 'Lucas',
      20015: 'Karl',

      201: 'Neostone Agent',
      20111: 'Emma',
      20112: 'Lisa',
      20113: 'Olivia',
      20114: 'Illiana',
      20115: 'Sylvia',

      202: 'Martial Artist',
      20211: 'Luan',
      20212: 'Sin',
      20213: 'Lo',
      20214: 'Hiro',
      20215: 'Jackie',

      203: 'Mummy',
      20311: 'Nubia',
      20312: 'Sonora',
      20313: 'Namib',
      20314: 'Sahara',
      20315: 'Karakum',

      204: 'Anubis',
      20411: 'Avaris',
      20412: 'Khmun',
      20413: 'Iunu',
      20414: 'Amarna',
      20415: 'Thebae',

      205: 'Desert Queen',
      20511: 'Bastet',
      20512: 'Sekhmet',
      20513: 'Hathor',
      20514: 'Isis',
      20515: 'Nephthys',

      206: 'Horus',
      20611: 'Qebehsenuef',
      20612: 'Duamutef',
      20613: 'Imesety',
      20614: 'Wedjat',
      20615: 'Amduat',

      207: "Jack-o'-lantern",
      20711: 'Chilling',
      20712: 'Smokey',
      20713: 'Windy',
      20714: 'Misty',
      20715: 'Dusky',

      208: 'Frankenstein',
      20811: 'Tractor',
      20812: 'Bulldozer',
      20813: 'Crane',
      20814: 'Driller',
      20815: 'Crawler',

      209: 'Elven Ranger',
      20911: 'Eluin',
      20912: 'Adrian',
      20913: 'Erwin',
      20914: 'Lucien',
      20915: 'Isillen',

      210: 'Harg',
      21011: 'Remy',
      21012: 'Racuni',
      21013: 'Raviti',
      21014: 'Dova',
      21015: 'Kroa',

      211: 'Fairy King',
      21111: 'Psamathe',
      21112: 'Daphnis',
      21113: 'Ganymede',
      21114: 'Oberon',
      21115: 'Nyx',

      212: 'Panda Warrior',
      21211: 'Mo Long',
      21212: 'Xiong Fei',
      21213: 'Feng Yan',
      21214: 'Tian Lang',
      21215: 'Mi Ying',

      213: 'Dice Magician',
      21311: 'Reno',
      21312: 'Ludo',
      21313: 'Morris',
      21314: 'Tablo',
      21315: 'Monte',

      214: 'Harp Magician',
      21411: 'Sonnet',
      21412: 'Harmonia',
      21413: 'Triana',
      21414: 'Celia',
      21415: 'Vivachel',

      215: 'Unicorn',
      21511: 'Amelia',
      21512: 'Helena',
      21513: 'Diana',
      21514: 'Eleanor',
      21515: 'Alexandra',
      21611: 'Amelia',
      21612: 'Helena',
      21613: 'Diana',
      21614: 'Eleanor',
      21615: 'Alexandra',

      218: 'Paladin',
      21811: 'Josephine',
      21812: 'Ophilia',
      21813: 'Louise',
      21814: 'Jeanne',
      21815: 'Leona',

      219: 'Chakram Dancer',
      21911: 'Talia',
      21912: 'Shaina',
      21913: 'Melissa',
      21914: 'Deva',
      21915: 'Belita',

      220: 'Boomerang Warrior',
      22011: 'Sabrina',
      22012: 'Maruna',
      22013: 'Zenobia',
      22014: 'Bailey',
      22015: 'Martina',

      221: 'Dryad',
      22111: 'Herne',
      22112: 'Nisha',
      22113: 'Mellia',
      22114: 'Felleria',
      22115: 'Hyanes',

      222: 'Druid',
      22211: 'Abellio',
      22212: 'Bellenus',
      22213: 'Taranys',
      22214: 'Valantis',
      22215: 'Pater',
      22311: 'Abellio',
      22312: 'Bellenus',
      22313: 'Taranys',
      22314: 'Valantis',
      22315: 'Pater',

      224: 'Giant Warrior',
      22411: 'Bagir',
      22412: 'Vidurr',
      22413: 'Skogul',
      22414: 'Einheri',
      22415: 'Trasar',
      22513: 'Skogul',
      22515: 'Trasar',

      226: 'Lightning Emperor',
      22611: 'Bolverk',
      22612: 'Baleygr',
      22613: 'Odin',
      22614: 'Geldnir',
      22615: 'Herteit',

      227: 'Sniper Mk.I',
      22711: 'Covenant',
      22712: 'Carcano',
      22713: 'Carbine',
      22714: 'Magnum',
      22715: 'Dragunov',
      228: 'Sniper Mk.I',
      22812: 'Carcano',
      22813: 'Carbine',
      22815: 'Dragunov',

      229: 'Cannon Girl',
      22911: 'Abigail',
      22912: 'Scarlett',
      22913: 'Christina',
      22914: 'Emily',
      22915: 'Bella',

      15105: 'Devilmon',
      14314: 'Rainbowmon',

      1000111: 'Homunculus - Attack (Water)',
      1000112: 'Homunculus - Attack (Fire)',
      1000113: 'Homunculus - Attack (Wind)',

      1000214: 'Homunculus - Support (Light)',
      1000215: 'Homunculus - Support (Dark)'
    }
}

const RUNE = {
    // "effectTypes": {
    //   0: '',
    //   1: 'HP+',
    //   2: 'HP%',
    //   3: 'ATK+',
    //   4: 'ATK%',
    //   5: 'DEF+',
    //   6: 'DEF%',
    //   8: 'SPD',
    //   9: 'CR',
    //   10: 'CD',
    //   11: 'RES',
    //   12: 'ACC'
    // },
    "effectTypes": {
        0: ['null','未知'],
        1: ['hpFlat','体力+'],
        2: ['hp','体力%'],
        3: ['atkFlat','攻击力+'],
        4: ['atk','攻击力%'],
        5: ['defFlat','防御力+'],
        6: ['def','防御力%'],
        8: ['speed','速度'],
        9: ['crate','暴击率'],
        10: ['cdmg','暴击伤害'],
        11: ['res','效果抵抗'],
        12: ['acc','效果命中']
    },
    "sets": {
      1: 'Energy',
      2: 'Guard',
      3: 'Swift',
      4: 'Blade',
      5: 'Rage',
      6: 'Focus',
      7: 'Endure',
      8: 'Fatal',
      10: 'Despair',
      11: 'Vampire',
      13: 'Violent',
      14: 'Nemesis',
      15: 'Will',
      16: 'Shield',
      17: 'Revenge',
      18: 'Destroy',
      19: 'Fight',
      20: 'Determination',
      21: 'Enhance',
      22: 'Accuracy',
      23: 'Tolerance',
      99: 'Immemorial'
    },
    "class": {
      0: 'Common',
      1: 'Magic',
      2: 'Rare',
      3: 'Hero',
      4: 'Legendary'
    },
    "quality": {
      1: 'Common',
      2: 'Magic',
      3: 'Rare',
      4: 'Hero',
      5: 'Legend',
      // ancient rune qualities
      11: 'Common',
      12: 'Magic',
      13: 'Rare',
      14: 'Hero',
      15: 'Legend'
    },
    "mainstat": {
      1: {
        "max": {
          1: 804,
          2: 1092,
          3: 1380,
          4: 1704,
          5: 2088,
          6: 2448
        }
      },
      2: {
        "max": {
          1: 18,
          2: 20,
          3: 38,
          4: 43,
          5: 51,
          6: 63
        }
      },
      3: {
        "max": {
          1: 54,
          2: 74,
          3: 93,
          4: 113,
          5: 135,
          6: 160
        }
      },
      4: {
        "max": {
          1: 18,
          2: 20,
          3: 38,
          4: 43,
          5: 51,
          6: 63
        }
      },
      5: {
        "max": {
          1: 54,
          2: 74,
          3: 93,
          4: 113,
          5: 135,
          6: 160
        }
      },
      6: {
        "max": {
          1: 18,
          2: 20,
          3: 38,
          4: 43,
          5: 51,
          6: 63
        }
      },
      8: {
        "max": {
          1: 18,
          2: 19,
          3: 25,
          4: 30,
          5: 39,
          6: 42
        }
      },
      9: {
        "max": {
          1: 18,
          2: 20,
          3: 37,
          4: 41,
          5: 47,
          6: 58
        }
      },
      10: {
        "max": {
          1: 20,
          2: 37,
          3: 43,
          4: 58,
          5: 65,
          6: 80
        }
      },
      11: {
        "max": {
          1: 18,
          2: 20,
          3: 38,
          4: 44,
          5: 51,
          6: 64
        }
      },
      12: {
        "max": {
          1: 18,
          2: 20,
          3: 38,
          4: 44,
          5: 51,
          6: 64
        }
      }
    },
    "substat": {
      1: {
        "max": {
          1: 300,
          2: 525,
          3: 825,
          4: 1125,
          5: 1500,
          6: 1875
        }
      },
      2: {
        "max": {
          1: 10,
          2: 15,
          3: 25,
          4: 30,
          5: 35,
          6: 40
        }
      },
      3: {
        "max": {
          1: 20,
          2: 25,
          3: 40,
          4: 50,
          5: 75,
          6: 100
        }
      },
      4: {
        "max": {
          1: 10,
          2: 15,
          3: 25,
          4: 30,
          5: 35,
          6: 40
        }
      },
      5: {
        "max": {
          1: 20,
          2: 25,
          3: 40,
          4: 50,
          5: 75,
          6: 100
        }
      },
      6: {
        "max": {
          1: 10,
          2: 15,
          3: 25,
          4: 30,
          5: 35,
          6: 40
        }
      },
      8: {
        "max": {
          1: 5,
          2: 10,
          3: 15,
          4: 20,
          5: 25,
          6: 30
        }
      },
      9: {
        "max": {
          1: 5,
          2: 10,
          3: 15,
          4: 20,
          5: 25,
          6: 30
        }
      },
      10: {
        "max": {
          1: 10,
          2: 15,
          3: 20,
          4: 25,
          5: 25,
          6: 35
        }
      },
      11: {
        "max": {
          1: 10,
          2: 15,
          3: 20,
          4: 25,
          5: 35,
          6: 40
        }
      },
      12: {
        "max": {
          1: 10,
          2: 15,
          3: 20,
          4: 25,
          5: 35,
          6: 40
        }
      }
    }
  }

const GRINDSTONE = {
    1: {
      "range": {
        1: { "min": 80, "max": 120 },
        2: { "min": 100, "max": 200 },
        3: { "min": 180, "max": 250 },
        4: { "min": 230, "max": 450 },
        5: { "min": 430, "max": 550 }
      }
    },
    2: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 5 },
        3: { "min": 3, "max": 6 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    },
    3: {
      "range": {
        1: { "min": 4, "max": 8 },
        2: { "min": 6, "max": 12 },
        3: { "min": 10, "max": 18 },
        4: { "min": 12, "max": 22 },
        5: { "min": 18, "max": 30 }
      }
    },
    4: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 5 },
        3: { "min": 3, "max": 6 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    },
    5: {
      "range": {
        1: { "min": 4, "max": 8 },
        2: { "min": 6, "max": 12 },
        3: { "min": 10, "max": 18 },
        4: { "min": 12, "max": 22 },
        5: { "min": 18, "max": 30 }
      }
    },
    6: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 5 },
        3: { "min": 3, "max": 6 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    },
    8: {
      "range": {
        1: { "min": 1, "max": 2 },
        2: { "min": 1, "max": 2 },
        3: { "min": 2, "max": 3 },
        4: { "min": 3, "max": 4 },
        5: { "min": 4, "max": 5 }
      }
    },
    9: {
      "range": {
        1: { "min": 1, "max": 2 },
        2: { "min": 1, "max": 3 },
        3: { "min": 2, "max": 4 },
        4: { "min": 3, "max": 5 },
        5: { "min": 4, "max": 6 }
      }
    },
    10: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 4 },
        3: { "min": 2, "max": 5 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    },
    11: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 4 },
        3: { "min": 2, "max": 5 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    },
    12: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 4 },
        3: { "min": 2, "max": 5 },
        4: { "min": 4, "max": 7 },
        5: { "min": 5, "max": 10 }
      }
    }
  }

const ENCHANTED_GEM = {
    1: {
      "range": {
        1: { "min": 100, "max": 150 },
        2: { "min": 130, "max": 220 },
        3: { "min": 200, "max": 310 },
        4: { "min": 290, "max": 420 },
        5: { "min": 400, "max": 580 }
      }
    },
    2: {
      "range": {
        1: { "min": 2, "max": 4 },
        2: { "min": 3, "max": 7 },
        3: { "min": 5, "max": 9 },
        4: { "min": 7, "max": 11 },
        5: { "min": 9, "max": 13 }
      }
    },
    3: {
      "range": {
        1: { "min": 8, "max": 12 },
        2: { "min": 10, "max": 16 },
        3: { "min": 15, "max": 23 },
        4: { "min": 20, "max": 30 },
        5: { "min": 28, "max": 40 }
      }
    },
    4: {
      "range": {
        1: { "min": 2, "max": 4 },
        2: { "min": 3, "max": 7 },
        3: { "min": 5, "max": 9 },
        4: { "min": 7, "max": 11 },
        5: { "min": 9, "max": 13 }
      }
    },
    5: {
      "range": {
        1: { "min": 8, "max": 12 },
        2: { "min": 10, "max": 16 },
        3: { "min": 15, "max": 23 },
        4: { "min": 20, "max": 30 },
        5: { "min": 28, "max": 40 }
      }
    },
    6: {
      "range": {
        1: { "min": 2, "max": 4 },
        2: { "min": 3, "max": 7 },
        3: { "min": 5, "max": 9 },
        4: { "min": 7, "max": 11 },
        5: { "min": 9, "max": 13 }
      }
    },
    8: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 4 },
        3: { "min": 3, "max": 6 },
        4: { "min": 5, "max": 8 },
        5: { "min": 7, "max": 10 }
      }
    },
    9: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 2, "max": 4 },
        3: { "min": 3, "max": 5 },
        4: { "min": 4, "max": 7 },
        5: { "min": 6, "max": 9 }
      }
    },
    10: {
      "range": {
        1: { "min": 1, "max": 3 },
        2: { "min": 3, "max": 5 },
        3: { "min": 4, "max": 6 },
        4: { "min": 5, "max": 8 },
        5: { "min": 7, "max": 10 }
      }
    },
    11: {
      "range": {
        1: { "min": 2, "max": 4 },
        2: { "min": 3, "max": 6 },
        3: { "min": 5, "max": 8 },
        4: { "min": 6, "max": 9 },
        5: { "min": 8, "max": 11 }
      }
    },
    12: {
      "range": {
        1: { "min": 2, "max": 4 },
        2: { "min": 3, "max": 6 },
        3: { "min": 5, "max": 8 },
        4: { "min": 6, "max": 9 },
        5: { "min": 8, "max": 11 }
      }
    }
  }

const SCEMARIO = {
    1: 'Garen Forest',
    2: 'Mt. Siz',
    3: 'Kabir Ruins',
    4: 'Mt. White Ragon',
    5: 'Telain Forest',
    6: 'Hydeni Ruins',
    7: 'Tamor Desert',
    8: 'Vrofagus Ruins',
    9: 'Faimon Volcano',
    10: 'Aiden Forest',
    11: 'Ferun Castle',
    12: 'Mt Runar',
    13: 'Chiruka Remains'
}
  
const DUNGEON = {
    1001: 'Hall of Dark',
    2001: 'Hall of Fire',
    3001: 'Hall of Water',
    4001: 'Hall of Wind',
    5001: 'Hall of Magic',
    6001: 'Necropolis',
    7001: 'Hall of Light',
    8001: "Giant's Keep",
    9001: "Dragon's Lair"
}

const elemental_rift_dungeon = {
    1001: 'Rift Dungeon - Ice Beast',
    2001: 'Rift Dungeon - Fire Beast',
    3001: 'Rift Dungeon - Wind Beast',
    4001: 'Rift Dungeon - Light Beast',
    5001: 'Rift Dungeon - Dark Beast'
}
  
const raid_rift_dungeon = {
    1: 'Rift of Worlds- level 1',
    2: 'Rift of Worlds- level 2',
    3: 'Rift of Worlds- level 3',
    4: 'Rift of Worlds- level 4',
    5: 'Rift of Worlds- level 5'
}

const DIFFICULTY = {
    1: 'Normal',
    2: 'Hard',
    3: 'Hell'
}

const ESSENCE = {
    "attribute": {
      1: 'Water',
      2: 'Fire',
      3: 'Wind',
      4: 'Light',
      5: 'Dark',
      6: 'Magic'
    },
    "grade": {
      1: 'Low',
      2: 'Mid',
      3: 'High'
    }
}

const craftMaterial = {
    1001: 'Hard Wood',
    1002: 'Tough Leather',
    1003: 'Solid Rock',
    1004: 'Solid Iron Ore',
    1005: 'Shining Mithril',
    1006: 'Thick Cloth',
    2001: 'Rune Piece',
    3001: 'Magic Dust',
    4001: 'Symbol of Harmony',
    4002: 'Symbol of Transcendence',
    4003: 'Symbol of Chaos',
    5001: 'Frozen Water Crystal',
    5002: 'Flaming Fire Crystal',
    5003: 'Whirling Wind Crystal',
    5004: 'Shiny Light Crystal',
    5005: 'Pitch-black Dark Crystal',
    6001: 'Condensed Magic Crystal',
    7001: 'Pure Magic Crystal'
}

const ARTIFACT={
  effectTypes: {
    main: {
      100: 'HP flat',
      101: 'ATK flat',
      102: 'DEF flat',
    },
    main_lang: {
      100: '体力+',
      101: '攻击力+',
      102: '防御力+'
    },
    sub: {
      200:  `ATK Increased Proportional to Lost HP up to`,
      201:  `DEF Increased Proportional to Lost HP up to `,
      202:  `SPD Increased Proportional to Lost HP up to `,
      203:  `SPD Under Inability Effects `,
      204:  `ATK Increasing Effect +`,
      205:  `DEF Increasing Effect +`,
      206:  `SPD Increasing Effect +`,
      207:  `Crit Rate Increasing Effect +`,
      208:  `Damage Dealt by Counterattack +`,
      209:  `Damage Dealt by Attacking Together +`,
      210:  `Bomb Damage +`,
      211:  `Damage Dealt by Reflected DMG `,
      212:  `Crushing Hit DMG +`,
      213:  `Damage Received Under Inability Effect -`,
      214:  `Received Crit DMG -`,
      215:  `Life Drain +`,
      216:  `HP when Revived `,
      217:  `Attack Bar when Revived +`,
      218:  `Additional Damage by of HP`,
      219:  `Additional Damage by of ATK`,
      220:  `Additional Damage by of DEF`,
      221:  `Additional Damage by of SPD`,
      222:  `CRIT DMG+ up to  as the enemy's HP condition is good`,
      223:  `CRIT DMG+ up to as the enemy's HP condition is bad`,
      224:  `Single-target skill CRIT DMG  on your turn`,
      300:  `Damage Dealt on Fire +`,
      301:  `Damage Dealt on Water +`,
      302:  `Damage Dealt on Wind +`,
      303:  `Damage Dealt on Light +`,
      304:  `Damage Dealt on Dark +`,
      305:  `Damage Received from Fire -`,
      306:  `Damage Received from Water -`,
      307:  `Damage Received from Wind -`,
      308:  `Damage Received from Light -`,
      309:  `Damage Received from Dark -`,
      400:  `Skill 1 CRIT DMG +`,
      401:  `Skill 2 CRIT DMG +`,
      402:  `Skill 3 CRIT DMG +`,
      403:  `Skill 4 CRIT DMG +`,
      404:  `Skill 1 Recovery +`,
      405:  `Skill 2 Recovery +`,
      406:  `Skill 3 Recovery +`,
      407:  `Skill 1 Accuracy +`,
      408:   `Skill 2 Accuracy +`,
      409:  `Skill 3 Accuracy +`,
    },
    sub_lang:{
      200:'以失去的体力为比例，增加攻击力',
      201:'以失去的体力为比例，增加防御力',
      202:'以失去的体力为比例，增加攻击速度',
      203:'受控加速',
      204:'增加攻击强化效果',
      205:'增加防御强化效果',
      206:'增加攻击速度强化效果',
      207:'增加暴击率强化效果',
      208:'增加反击造成的伤害',
      209:'增加围剿造成的伤害',
      210:'增加炸弹伤害',
      211:'伤害反射',
      212:'强击增伤',
      213:'受控减伤',
      214:'减少被暴击伤害',
      215:'增加吸血量',
      216:'增加复活时的体力',
      217:'增加复活时的攻击条',
      218:'以体力为比例追加伤害',
      219:'以攻击力为比例追加伤害',
      220:'以防御力为比例追加伤害',
      221:'以攻击速度为比例追加伤害',
      222:'敌人体力状况越好，暴击伤害越高',
      223:'敌人体力状况越差，暴击伤害越高',
      224:'自身回合单个技能暴击伤害增加',
      //
      300:'增加给火属性造成的伤害',
      301:'增加给水属性造成的伤害',
      302:'增加给风属性造成的伤害',
      303:'增加给光属性造成的伤害',
      304:'增加给黑暗属性造成的伤害',
      305:'减少从火属性受到的伤害',
      306:'减少从水属性受到的伤害',
      307:'减少从风属性受到的伤害',
      308:'减少从光属性受到的伤害',
      309:'减少从黑暗属性受到的伤害',
      //
      400:'[1号技能]暴击伤害增加',
      401:'[2号技能]暴击伤害增加',
      402:'[3号技能]暴击伤害增加',
      403:'[4号技能]暴击伤害增加',
      404:'[1号技能]恢复量增加',
      405:'[2号技能]恢复量增加',
      406:'[3号技能]恢复量增加',
      407:'[1号技能]效果命中增加',
      408:'[2号技能]效果命中增加',
      409:'[3号技能]效果命中增加',

    },
    sub_return:{
      200:'以失去的体力为比例，攻击力最多+?%',
      201:'以失去的体力为比例，防御力最多+?%',
      202:'以失去的体力为比例，攻击速度最多+?%',
      203:'受控加速+?%',
      204:'攻击强化效果+?%',
      205:'防御强化效果+?%',
      206:'攻击速度增加效果+?%',
      207:'暴击率强化效果+?%',
      208:'反击造成的伤害+?%',
      209:'围剿造成的伤害+?%',
      210:'炸弹伤害+?%',
      211:'伤害反射+?%',
      212:'强击增伤+?%',
      213:'受控减伤-?%',
      214:'被暴击伤害-?%',
      215:'吸血量+?%',
      216:'复活时的体力+?%',
      217:'复活时的攻击条+?%',
      218:'相当于?%体力的追加伤害',
      219:'相当于?%攻击力的追加伤害',
      220:'相当于?%防御力的追加伤害',
      221:'相当于?%攻击速度的追加伤害',
      222:'敌人体力状况越好，暴击伤害最多+?%',
      223:'敌人体力状况越差，暴击伤害最多+?%',
      224:'自身回合单个技能暴击伤害+?%',
      //
      300:'给火属性造成的伤害+?%',
      301:'给水属性造成的伤害+?%',
      302:'给风属性造成的伤害+?%',
      303:'给光属性造成的伤害+?%',
      304:'给黑暗属性造成的伤害+?%',
      305:'从火属性受到的伤害-?%',
      306:'从水属性受到的伤害-?%',
      307:'从风属性受到的伤害-?%',
      308:'从光属性受到的伤害-?%',
      309:'从黑暗属性受到的伤害-?%',
      //
      400:'[1号技能]暴击伤害+?%',
      401:'[2号技能]暴击伤害+?%',
      402:'[3号技能]暴击伤害+?%',
      403:'[4号技能]暴击伤害+?%',
      404:'[1号技能]恢复量+?%',
      405:'[2号技能]恢复量+?%',
      406:'[3号技能]恢复量+?%',
      407:'[1号技能]效果命中+?%',
      408:'[2号技能]效果命中+?%',
      409:'[3号技能]效果命中+?%',
    },

    // sub: {
    //   200: (value) => `ATK Increased Proportional to Lost HP up to ${value}%`,
    //   201: (value) => `DEF Increased Proportional to Lost HP up to ${value}%`,
    //   202: (value) => `SPD Increased Proportional to Lost HP up to ${value}%`,
    //   203: (value) => `SPD Under Inability Effects +${value}%`,
    //   204: (value) => `ATK Increasing Effect +${value}%`,
    //   205: (value) => `DEF Increasing Effect +${value}%`,
    //   206: (value) => `SPD Increasing Effect +${value}%`,
    //   207: (value) => `Crit Rate Increasing Effect +${value}%`,
    //   208: (value) => `Damage Dealt by Counterattack +${value}%`,
    //   209: (value) => `Damage Dealt by Attacking Together +${value}%`,
    //   210: (value) => `Bomb Damage +${value}%`,
    //   211: (value) => `Damage Dealt by Reflected DMG +${value}%`,
    //   212: (value) => `Crushing Hit DMG +${value}%`,
    //   213: (value) => `Damage Received Under Inability Effect -${value}%`,
    //   214: (value) => `Received Crit DMG -${value}%`,
    //   215: (value) => `Life Drain +${value}%`,
    //   216: (value) => `HP when Revived +${value}%`,
    //   217: (value) => `Attack Bar when Revived +${value}%`,
    //   218: (value) => `Additional Damage by ${value}% of HP`,
    //   219: (value) => `Additional Damage by ${value}% of ATK`,
    //   220: (value) => `Additional Damage by ${value}% of DEF`,
    //   221: (value) => `Additional Damage by ${value}% of SPD`,
    //   222: (value) => `CRIT DMG+ up to ${value}% as the enemy's HP condition is good`,
    //   223: (value) => `CRIT DMG+ up to ${value}% as the enemy's HP condition is bad`,
    //   224: (value) => `Single-target skill CRIT DMG ${value}% on your turn`,
    //   300: (value) => `Damage Dealt on Fire +${value}%`,
    //   301: (value) => `Damage Dealt on Water +${value}%`,
    //   302: (value) => `Damage Dealt on Wind +${value}%`,
    //   303: (value) => `Damage Dealt on Light +${value}%`,
    //   304: (value) => `Damage Dealt on Dark +${value}%`,
    //   305: (value) => `Damage Received from Fire -${value}%`,
    //   306: (value) => `Damage Received from Water -${value}%`,
    //   307: (value) => `Damage Received from Wind -${value}%`,
    //   308: (value) => `Damage Received from Light -${value}%`,
    //   309: (value) => `Damage Received from Dark -${value}%`,
    //   400: (value) => `Skill 1 CRIT DMG +${value}%`,
    //   401: (value) => `Skill 2 CRIT DMG +${value}%`,
    //   402: (value) => `Skill 3 CRIT DMG +${value}%`,
    //   403: (value) => `Skill 4 CRIT DMG +${value}%`,
    //   404: (value) => `Skill 1 Recovery +${value}%`,
    //   405: (value) => `Skill 2 Recovery +${value}%`,
    //   406: (value) => `Skill 3 Recovery +${value}%`,
    //   407: (value) => `Skill 1 Accuracy +${value}%`,
    //   408: (value) => `Skill 2 Accuracy +${value}%`,
    //   409: (value) => `Skill 3 Accuracy +${value}%`,
    // },
  },
  slot_location:{
    1:'左',
    2:'右'
  },
  attribute_types:{
    1:'水属性',
    2:'火属性',
    3:'风属性',
    4:'光属性',
    5:'暗属性'
  },
  arche_types:{
    1:'攻击型',
    2:'防御型',
    3:'体力型',
    4:'辅助型'
  },
  types: {
    1: 'Attribute',
    2: 'Archetype',
  },
  rank: {
    1: 'Common',
    2: 'Magic',
    3: 'Rare',
    4: 'Hero',
    5: 'Legendary',
  },
}

module.exports = {MONSTER,RUNE,ARTIFACT}
