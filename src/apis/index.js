import Service from './service'
import BackUser from './backUser'
import Files from './files'
import ExtScpShopBrands from './scpShopBrands'
import ExtScpShopProducts from './scpShopProducts'
import ExtScpShopOrders from './scpShopOrders'

const def = [
    'scpProducts',
    'scpBrands',
    'scpUsers',
    'scpShops',
    'scpShopBrands',
    'scpAdminUsers',
    'scpCategoryTypes',
    'scpCategories',
    'scpAdminLogs'
]

const ext = {
    backUser: BackUser,
    files: Files,
    extScpShopBrands: ExtScpShopBrands,
    extScpProducts: ExtScpShopProducts,
    extScpOrders: ExtScpShopOrders
}

export const models = {}

export const initialize = function () {
    def.forEach((item) => {
        models[item] = new Service(item)
    })

    for (const item of Object.keys(ext)) {
        models[item] = new ext[item]()
    }
}

export default {
    models,
    initialize
}
