
const errorCode = {
    cn: {
        100: '本地网络不可用',
        101: '内部错误',
        102: '没有资源',
        103: '不允许的 HTTP 方法',
        104: '资源不可用',
        105: '远程服务不可用',
        105.1: '远程数据服务不可用',
        105.2: '远程缓存服务不可用',
        105.3: '远程文件服务不可用',
        105.4: '远程消息服务不可用',
        105.5: '远程 SMS 服务不可用',
        105.6: '远程 Email 服务不可用',
        105.7: '远程 Wechat 服务不可用',
        105.8: '远程推送服务不可用',

        121: '未经授权或身份验证失败',
        122: '无效或已过期的 Session',
        123: '无效或已过期的 Token',
        124: '不支持的签名方法',
        125: '签名不正确',
        126: '无效的时间戳',
        127: '无效的用户名或密码',
        128: '重复的用户账号',

        160: '需要登录',
        161: '没有访问权限',
        162: '帐户不允许访问此功能',
        163: '帐户被暂停使用',
        164: '账户被禁用',
        165: '服务已到期',
        166: '请求过于频繁',
        167: '超出资源配额',
        168: '超出请求(次数)限制',
        169: '没有数据操作权限, 或部分字段为只读',
        170: '超出单次操作数据条数限额',

        201: '错误的请求',
        202: '未指定所需的 HTTP 标头',
        203: '为 HTTP 标头之一提供的值格式不正确',
        204: 'Json 数据格式不正确',
        205: 'Raw 数据格式不正确',
        206: '缺少/无效的参数',
        207: '包含敏感词',
        208: '请求的范围无法满足',
        209: '失败的依赖项',

        301: '数据库读/写失败',
        302: '无效或不完整的数据',
        303: '重复的数据创建请求',
        304: '违反数据唯一性',
        305: '未提交有效的数据',
        306: '数据不存在',
        307: '无效的 id/_id',
        308: '资源已被使用',
        309: '错误的分页请求',
        310: '无效的分页条数',

        401: '上传文件失败',
        402: '不支持的文件类型',
        403: '文件超出大小限制',
        404: '资源不存在',
        500: '未知错误'
    },
    en: {
        100: 'Network Error',
        101: 'Internal Server Error',
        102: 'Not Found',
        103: 'Method Not Allowed',
        104: 'Gone',
        105: 'Remote Service Unavailable',
        105.1: 'Remote Database Service Unavailable',
        105.2: 'Remote Cache Service Unavailable',
        105.3: 'Remote File Service Unavailable',
        105.4: 'Remote Message Service Unavailable',
        105.5: 'Remote SMS Service Unavailable',
        105.6: 'Remote Email Service Unavailable',
        105.7: 'Remote Wechat Service Unavailable',
        105.8: 'Remote Push Service Unavailable',

        121: 'Unauthorized/Authentication failure',
        122: 'Invalid or expired session',
        123: 'Invalid or expired token',
        124: 'Unsupported signature mothod',
        125: 'Incorrect signature',
        126: 'Invalid/Used timestamp',
        127: 'Invalid username or password',
        128: 'Duplicate user account',

        160: 'Need sign in',
        161: 'Forbidden',
        162: 'Your account is is not permitted to access this feature',
        163: 'Your account is suspended',
        164: 'Your account is disabled',
        165: 'Purchase service has expired',
        166: 'Enhance your calm',
        167: 'Exceed quota',
        168: 'Rate limit exceeded',
        169: 'No data manipulation privileges, or part of the fields are read-only',
        170: 'Single operation records limit exceeded',

        201: 'Bad Request',
        202: 'Missing required header',
        203: 'Invalid header value',
        204: 'Malformed json',
        205: 'Malformed raw',
        206: 'Missing/Invalid parameter',
        207: 'Contains forbid world',
        208: 'Requested Range Not Satisfiable',
        209: 'Failed Dependency',

        301: 'Database read/write failure',
        302: 'Invalid/Incomplete data',
        303: 'Repetitive data creation request',
        304: 'Expected to be unique',
        305: 'Did not submit valid data',
        306: 'Record(s) does not exist',
        307: 'Invalid record id',
        308: 'Has been used',
        309: 'Bad request in pagination',
        310: 'Invalid limit of pagination',

        401: 'Upload file failed',
        402: 'Unsupported file type',
        403: 'File size too large',
        404: 'Resource does not exist',
        500: 'unknown mistake'
    }
}

export default function (state, coding = 'cn') {
    const info = errorCode[coding][state] || errorCode[coding][500]
    return info
}
