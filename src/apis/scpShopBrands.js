import Base from './base'

class ScpShopBrands extends Base {
    //扩展方法根据店铺id获取品牌数据
    async getShopBrandsByShopId (params = {}) {
        return this.ajax({
            url: this.makeUrl(params, 'ext/shopBrands'),
            method: 'get',
            headers: {
                ...params.headers
            }
        })
    }

    async isExitBrandId (data) {
        return this.ajax({
            url: this.makeUrl(null, 'ext/shopBrands/exit'),
            method: 'post',
            data
        })
    }
}

export default ScpShopBrands
