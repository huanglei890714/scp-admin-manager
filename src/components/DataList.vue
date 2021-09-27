<template>
    <div class="main-content">
        <el-row type="flex" class="mg-top-10 mg-bottom-10">
            <el-col :span="24"
                    class="text-align-left">
                左边
            </el-col>
            <el-col :span="24" class="text-align-right">
                <el-button type="primary" @click="create" v-if="showAdd">新增</el-button>
                &nbsp;&nbsp;
                <el-input
                    v-model.trim="searchText"
                    :placeholder="searchPlaceholder"
                    class="search-box"
                    @keyup.enter.native="search">
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="search"/>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="list" border style="width: 100%">
            <template v-for="(filed, index) in fileds">
                <el-table-column
                    v-if="filed.customer"
                    :key="index"
                    :prop="filed.name"
                    :label="filed.title"
                    :width="filed.width">
                    <template v-if="filed.type === 'img'" slot-scope="scope">
                        <img :src="server + scope.row[filed.name]" width="50" height="50"/>
                    </template>
                    <template v-if="filed.type === 'son'" slot-scope="scope">
                        <el-button type="text" @click="onView(scope.row)">
                            点击查看
                        </el-button>
                    </template>
                    <template v-else slot-scope>
                        {{ scope.row[filed.name] }}
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :key="index"
                    :fixed="filed.name === 'id'"
                    :prop="filed.name"
                    :label="filed.title"
                    :width="filed.width" />
            </template>
            <el-table-column fixed="right" label="操作" >
                <template slot-scope="scope">
                    <el-button @click="handleClick('edit', scope.row)" type="text" size="small">
                        编辑
                    </el-button>
                    <el-button @click="handleClick('del', scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex"
                justify="end"
                class="mg-top-10">
            <div>
                <el-pagination
                    :current-page="pagination.currentpage"
                    :total="pagination.total"
                    :page-sizes="pagination.limits"
                    :page-size="pagination.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="pageLimitChanged"
                    @current-change="paginate"/>
            </div>
        </el-row>
    </div>
</template>

<script>
import dateFormat from 'date-fns/format'
import isNumber from 'lodash/isNumber'

export default {
    props: {
        mod: {
            type: String,
            default: ''
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        fileds: {
            type: Array,
            default: () => {
                return []
            }
        },
        searchPlaceholder: {
            type: String,
            default: '请输入关键词'
        },
        searchKey: {
            type: String,
            default: ''
        },
        editRouter: {
            type: String,
            default: ''
        },
        afterFormat: {
            type: Function, // success(fileKey)
            default () {}
        },
        beforeDel: {
            type: Function, // success(fileKey)
            default () {}
        },
        beforePaginate: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            server: '',
            searchText: '',
            query: {},
            pagination: {
                limit: 10,
                limits: [10, 20, 40, 60, 80, 100],
                total: 0,
                currentpage: 1
            },
            list: []
        }
    },
    async mounted () {
        const res = await this.$apis('files').baseInfo()
        this.server = res.server
        this.paginate(1)
    },
    methods: {
        format (v) {
            if (v.created_at) {
                v._create_date = dateFormat(new Date(v.created_at), 'yyyy-MM-dd HH:mm:ss')
            }
            if (v.updated_at) {
                v._update_date = dateFormat(new Date(v.updated_at), 'yyyy-MM-dd HH:mm:ss')
            }
            this.afterFormat(v)
            return v
        },
        handleClick (type, row) { //子操作项
            switch (type) {
            case 'edit':
                this.$router.push({
                    name: this.editRouter,
                    query: {
                        id: row.id
                    }
                })
                break
            case 'del':
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if (typeof this.beforeDel === 'function') {
                        const allow = await this.beforeDel(row.id)
                        if (allow) {
                            await this.$apis[this.mod].delete(row.id)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }
                    }
                    this.paginate(1)
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
                break
            default:
                break
            }
        },
        create () {
            this.$router.push({
                name: this.editRouter
            })
        },
        onView (row) {
            console.log('查看子结果', row)
        },
        search () {
            const {
                searchText, query, searchKey
            } = this
            if (searchText) {
                if (searchKey) {
                    query[searchKey] = searchText
                }
            } else {
                query[searchKey] = undefined
                delete query[searchKey]
            }
            this.paginate(1)
            // console.log('搜索', query)
        },
        async paginate (index) {
            const { mod, beforePaginate } = this
            index = isNumber(index) && index > 0 ? index : this.pagination.currentpage
            if (this.pagination.currentpage !== index) {
                this.pagination.currentpage = index
            }
            const { limit, query } = this
            let res
            if (beforePaginate.length === 2) {
                res = await this.$apis[beforePaginate[0]][beforePaginate[1]]({
                    query,
                    page: index,
                    pageSize: limit
                })
                // console.log('before-@res', res)
            } else if (Object.keys(query).length > 0) {
                res = await this.$apis[mod].paginate({
                    query,
                    page: index,
                    pageSize: limit
                })
            } else {
                res = await this.$apis[mod].paginate({
                    page: index,
                    pageSize: limit
                })
            }

            if (res && res.code === 200 && res.data.total > 0) {
                this.pagination.total = res.data.total
                this.list = res.data.data.map(this.format)
            }
            // console.log('分页', res.data)
        },
        pageLimitChanged (limit) {
            if (
                typeof limit !== 'number'
                || limit > 100
                || limit < 10
                || !this.pagination.limits.includes(limit)
            ) {
                return false
            }

            this.pagination.limit = limit
            return this.paginate()
        }
    }
}
</script>
