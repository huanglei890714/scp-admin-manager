import apis from '@/apis'

apis.initialize()

const bar = {
    install (vue) {
        vue.prototype.$apis = function (modname) {
            modname = modname || this.modname
            if (!modname || !apis.models[modname]) {
                const msg = 'modname 不存在!'
                throw new Error(msg)
            }
            return apis.models[modname]
        }

        for (const modname of Object.keys(apis.models)) {
            vue.prototype.$apis[modname] = apis.models[modname]
        }
    }
}

export default bar
