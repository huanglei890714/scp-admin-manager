const setCookie = function (name, value) {
    const Days = 30
    const exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000) //过期时间30天
    document.cookie = `${ name }=${ escape(value) };expires=${ exp.toGMTString() }`
}

const getCookie = function (cname) {
    const name = `${ cname }=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

const delCookie = function (name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = getCookie(name)
    if (cval != null) {
        document.cookie = `${ name }=${ cval };expires=${ exp.toGMTString() }`
    }
}

export default {
    setCookie,
    getCookie,
    delCookie
}
