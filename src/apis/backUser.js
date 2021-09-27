import Base from './base'
import error from './error'

/**
 * 判断费否存在必须的参数值
 * @param {*} data
 * @param {*} keys
 */
const has = function (data, keys) {
    // verify JSON data
    // keys is string
    if (typeof keys === 'string') {
        return typeof data[keys] !== 'undefined'
    }

    // keys is array
    for (const key of keys) {
        if (typeof data[key] === 'undefined') {
            return false
        }
    }
    return true
}

class User extends Base {
    async login (data = {}) {
        if (!has(data, ['email', 'password'])) {
            return Promise.reject(error(206))
        }

        return this.ajax({
            url: this.makeUrl(null, 'login'),
            method: 'post',
            data
        })
    }

    async loginOut () {
        return this.ajax({
            url: this.makeUrl(null, 'back/scpAdminUsers/loginOut'),
            method: 'get'
        })
    }
}

export default User
