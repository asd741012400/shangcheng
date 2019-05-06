export const ENV = true


//根据变量替换打包URL
export const API_URL = ENV == true ? 'http://quandouapi.qinzinianka.com' : 'http://yuouapi.shizuyx.com'
export const IMG_URL = ENV == true ? 'http://quandouimg.qinzinianka.com/upload' : 'http://yuouimg.shizuyx.com'