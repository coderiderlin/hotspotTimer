const CATEGORIES = [
  { id: 'beef_mutton', name: '牛羊肉类', icon: '🥩' },
  { id: 'offal', name: '脆爽内脏', icon: '🍲' },
  { id: 'seafood', name: '海鲜水产', icon: '🦐' },
  { id: 'meatballs', name: '丸滑豆面', icon: '🍡' },
  { id: 'veggies', name: '新鲜蔬菜', icon: '🥬' },
  { id: 'mushrooms', name: '菌菇根茎', icon: '🍄' }
];

const FOOD_ITEMS = [
  // 1. 牛羊肉类
  {
    id: 'beef_slice',
    name: '精品肥牛',
    category: 'beef_mutton',
    duration: 15,
    icon: '🥩',
    tip: '变色即捞，鲜嫩多汁',
    color: '#FF6B6B'
  },
  {
    id: 'mutton_roll',
    name: '精选羔羊肉',
    category: 'beef_mutton',
    duration: 15,
    icon: '🍖',
    tip: '不宜久煮，10~15秒极佳',
    color: '#FF7675'
  },
  {
    id: 'beef_hanging',
    name: '潮汕吊龙/嫩肉',
    category: 'beef_mutton',
    duration: 10,
    icon: '🥩',
    tip: '三起三落，粉嫩刚好',
    color: '#E17055'
  },
  {
    id: 'beef_tongue',
    name: '香嫩牛舌',
    category: 'beef_mutton',
    duration: 25,
    icon: '👅',
    tip: '薄切弹牙，20-30秒',
    color: '#D63031'
  },
  {
    id: 'pork_tenderloin',
    name: '梅花肉片',
    category: 'beef_mutton',
    duration: 30,
    icon: '🥓',
    tip: '熟透更安心，30秒香嫩',
    color: '#FD79A8'
  },
  {
    id: 'lunch_meat',
    name: '午餐肉',
    category: 'beef_mutton',
    duration: 120,
    icon: '🥫',
    tip: '煮透入味，软糯微咸',
    color: '#E84393'
  },
  {
    id: 'pork_ribs',
    name: '秘制排骨',
    category: 'beef_mutton',
    duration: 600,
    icon: '🍖',
    tip: '久煮入味，10分钟骨肉脱骨',
    color: '#A29BFE'
  },

  // 2. 脆爽内脏类
  {
    id: 'tripe',
    name: '鲜毛肚/千层肚',
    category: 'offal',
    duration: 10,
    icon: '🥢',
    tip: '七上八下，10秒脆爽',
    color: '#FFA502'
  },
  {
    id: 'duck_intestine',
    name: '鲜鸭肠/鹅肠',
    category: 'offal',
    duration: 12,
    icon: '🥢',
    tip: '微卷起锅，八上八下',
    color: '#E67E22'
  },
  {
    id: 'yellow_throat',
    name: '爽脆黄喉',
    category: 'offal',
    duration: 30,
    icon: '✨',
    tip: '脆嫩弹牙，约30秒',
    color: '#F39C12'
  },
  {
    id: 'duck_blood',
    name: '鲜鸭血',
    category: 'offal',
    duration: 300,
    icon: '🩸',
    tip: '小火慢煨，浮起即熟超嫩',
    color: '#C0392B'
  },
  {
    id: 'brain',
    name: '鲜脑花',
    category: 'offal',
    duration: 600,
    icon: '🧠',
    tip: '需煮透入味，约10-15分钟',
    color: '#B53471'
  },
  {
    id: 'duck_gizzard',
    name: '菊花鸭胗',
    category: 'offal',
    duration: 180,
    icon: '🌸',
    tip: '刀花完全绽开，约3分钟',
    color: '#8854D0'
  },

  // 3. 海鲜水产
  {
    id: 'fresh_shrimp',
    name: '基围虾/活虾',
    category: 'seafood',
    duration: 180,
    icon: '🦐',
    tip: '通体变红弯曲即可',
    color: '#FF7F50'
  },
  {
    id: 'squid',
    name: '鲜鱿鱼圈/须',
    category: 'seafood',
    duration: 60,
    icon: '🦑',
    tip: '卷曲变白即熟，老了变硬',
    color: '#FF6348'
  },
  {
    id: 'sea_snail',
    name: '鲜活花螺',
    category: 'seafood',
    duration: 240,
    icon: '🐚',
    tip: '煮透杀菌，螺肉易挑出',
    color: '#2ED573'
  },
  {
    id: 'fish_fillet',
    name: '黑鱼片/巴沙鱼',
    category: 'seafood',
    duration: 45,
    icon: '🐟',
    tip: '鱼片发白浮起，鲜嫩爽滑',
    color: '#1E90FF'
  },
  {
    id: 'baby_octopus',
    name: '八爪鱼/小墨鱼',
    category: 'seafood',
    duration: 90,
    icon: '🐙',
    tip: '爪子紧缩变紧致即可',
    color: '#3742FA'
  },
  {
    id: 'scallop',
    name: '鲜扇贝/生蚝',
    category: 'seafood',
    duration: 120,
    icon: '🦪',
    tip: '肉质饱满微收缩，2分钟鲜甜',
    color: '#70A1FF'
  },
  {
    id: 'catfish',
    name: '耗儿鱼',
    category: 'seafood',
    duration: 480,
    icon: '🐡',
    tip: '刺少肉厚，需煮8分钟透熟',
    color: '#5352ED'
  },
  {
    id: 'crab_stick',
    name: '蟹柳棒',
    category: 'seafood',
    duration: 90,
    icon: '🦀',
    tip: '浮起变软，不宜散架',
    color: '#FF4757'
  },

  // 4. 丸滑豆面类
  {
    id: 'shrimp_paste',
    name: '手打虾滑',
    category: 'meatballs',
    duration: 180,
    icon: '🍤',
    tip: '漂浮起来变粉红再煮30秒',
    color: '#FFA502'
  },
  {
    id: 'beef_ball',
    name: '潮汕手打牛肉丸',
    category: 'meatballs',
    duration: 300,
    icon: '🧆',
    tip: '久煮弹牙爆汁，约5分钟',
    color: '#8C7AE6'
  },
  {
    id: 'fish_ball',
    name: '包心鱼丸/鱼豆腐',
    category: 'meatballs',
    duration: 240,
    icon: '🥟',
    tip: '膨胀浮起即熟',
    color: '#FBC531'
  },
  {
    id: 'crispy_pork',
    name: '现炸小酥肉',
    category: 'meatballs',
    duration: 60,
    icon: '🥓',
    tip: '直接吃酥脆，涮1分钟吸汁软糯',
    color: '#E1B12C'
  },
  {
    id: 'fried_tofu_skin',
    name: '炸响铃/炸腐竹',
    category: 'meatballs',
    duration: 6,
    icon: '🥢',
    tip: '三秒吸满汤汁，绝妙滋味',
    color: '#F5CD79'
  },
  {
    id: 'frozen_tofu',
    name: '冻豆腐',
    category: 'meatballs',
    duration: 180,
    icon: '🧊',
    tip: '气孔吸满浓汤，小心烫嘴',
    color: '#F7D794'
  },
  {
    id: 'wide_vermicelli',
    name: '火锅川粉/宽粉',
    category: 'meatballs',
    duration: 300,
    icon: '🍜',
    tip: '晶莹剔透变软糯即可',
    color: '#E77F67'
  },
  {
    id: 'rice_cake',
    name: '芝士年糕',
    category: 'meatballs',
    duration: 180,
    icon: '🧀',
    tip: '浮起变软拉丝',
    color: '#EA8685'
  },

  // 5. 新鲜蔬菜
  {
    id: 'lettuce',
    name: '生菜/油麦菜',
    category: 'veggies',
    duration: 10,
    icon: '🥬',
    tip: '稍烫微蔫即可，保持清脆',
    color: '#26DE81'
  },
  {
    id: 'spinach',
    name: '菠菜',
    category: 'veggies',
    duration: 15,
    icon: '🥗',
    tip: '烫熟即捞，避免吸油太重',
    color: '#20BF6B'
  },
  {
    id: 'cabbage',
    name: '大白菜/娃娃菜',
    category: 'veggies',
    duration: 90,
    icon: '🥬',
    tip: '叶子先软，梆部多煮片刻',
    color: '#2ED573'
  },
  {
    id: 'bamboo_shoot',
    name: '爽脆鲜笋片',
    category: 'veggies',
    duration: 120,
    icon: '🎋',
    tip: '脆嫩无渣，约2分钟',
    color: '#7BED9F'
  },
  {
    id: 'seaweed',
    name: '海带结/海带芽',
    category: 'veggies',
    duration: 300,
    icon: '🌿',
    tip: '多煮煮才软糯入味',
    color: '#10AC84'
  },
  {
    id: 'corn',
    name: '甜玉米段',
    category: 'veggies',
    duration: 480,
    icon: '🌽',
    tip: '久煮汤底更清甜，8分钟以上',
    color: '#FED330'
  },

  // 6. 菌菇根茎类
  {
    id: 'enoki',
    name: '金针菇',
    category: 'mushrooms',
    duration: 180,
    icon: '🍄',
    tip: '必须彻底煮熟，建议3分钟以上',
    color: '#FA8231'
  },
  {
    id: 'shiitake',
    name: '香菇/平菇',
    category: 'mushrooms',
    duration: 240,
    icon: '🍄',
    tip: '菌菇务必熟透，软嫩鲜香',
    color: '#EB3B5A'
  },
  {
    id: 'lotus_root',
    name: '藕片',
    category: 'mushrooms',
    duration: 120,
    icon: '🍥',
    tip: '想脆烫2分钟，想面煮5分钟',
    color: '#FC5C65'
  },
  {
    id: 'potato',
    name: '土豆片',
    category: 'mushrooms',
    duration: 180,
    icon: '🥔',
    tip: '薄片易熟，小心煮化沉底',
    color: '#FD9644'
  },
  {
    id: 'winter_melon',
    name: '冬瓜片',
    category: 'mushrooms',
    duration: 150,
    icon: '🍈',
    tip: '煮至半透明即可捞出',
    color: '#45AAF2'
  }
];

module.exports = { CATEGORIES, FOOD_ITEMS };
