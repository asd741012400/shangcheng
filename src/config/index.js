export const ENV = true


//根据变量替换打包URL
//API地址
export const API_URL = ENV == true ? 'http://quandouapi.qinzinianka.com' : 'http://yuouapi.shizuyx.com'
//图片地址
export const IMG_URL = ENV == true ? 'http://quandou.qinzinianka.com/upload' : 'http://quandou.qinzinianka.com/upload'
//商城端
export const HOME_URL = ENV == true ? 'http://quandou.qinzinianka.com' :  'http://yuou.shizuyx.com'

