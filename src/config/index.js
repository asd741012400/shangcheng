export const ENV = true


//根据变量替换打包URL
//API地址
export const API_URL = ENV == true ? 'http://quandouapi.qinzinianka.com' : 'http://yuouapi.shizuyx.com'
//图片地址
export const IMG_URL = ENV == true ? 'http://quandouimg.qinzinianka.com/upload' : 'http://yuouimg.shizuyx.com'
//商城端
export const HOME_URL = ENV == true ? 'http://quandou.qinzinianka.com' : ''