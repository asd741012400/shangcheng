import dayjs from 'dayjs'

/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}

/**
 * [calcTime 已购买商品卡片有效期计算]
 * @param  {[type]} type   [1日期 2有效天数]
 * @param  {[type]} pay_time    [购买日期]
 * @param  {[type]} day    [天数]
 * @param  {[type]} t1     [开始日期]
 * @param  {[type]} t2     [结束日期]
 * @param  {[type]} status [展示方式 1原样展示 2过期计算 3只展示到期时间]
 */
export function calcTime(type, pay_time, day, t1, t2, status = 2) {
    let now = dayjs().unix()
    if (type == 1) {
        if (status == 2) {
            if (now > dayjs(t2).unix()) {
                return false
            } else {
                return '有效期' + t1 + '至' + t2
            }
        } else if (status == 3) {
            return t2 + '到期'
        } else {
            return '有效期' + t1 + '至' + t2
        }
    } else {
        let day1 = dayjs.unix(pay_time).format('YYYY-MM-DD HH:mm:ss')
        let day2 = dayjs().add(day, 'day').format('YYYY-MM-DD HH:mm:ss')
        if (status == 2) {
            if (now > dayjs(day2).unix()) {
                return false
            } else {
                return '有效期' + day1 + '至' + day2
            }
        } else if (status == 3) {
            return day2 + '到期'
        } else {
            return '有效期' + day1 + '至' + day2
        }
    }
}

/**
 * [calcTime2 未购买、未激活有效期计算]
 * @param  {[type]} type   [1日期 2有效天数]
 * @param  {[type]} day    [天数]
 * @param  {[type]} t1     [开始日期]
 * @param  {[type]} t2     [结束日期]
 * @param  {[type]} status [展示方式 1原样展示 2过期计算 3只展示到期时间]
 */
export function calcTime2(type, day, t1, t2, status = 2) {
    let now = dayjs().unix()
    if (type == 1) {
        if (status == 2) {
            if (now > dayjs(t2).unix()) {
                return false
            } else {
                return '有效期' + t1 + '至' + t2
            }
        } else {
            return '有效期' + t1 + '至' + t2
        }
    } else {
        return '有效期' + day + '天'        
    }
}

