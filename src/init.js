


export let baseUrl = ''
export let preMethod = []
export let defaultParams = {credentials: 'include' }
export let defaultHeader = { 'Content-type': 'application/x-www-form-urlencoded' }
export let defaultData = { }
export let err_catch = (err) => { }

export default faiquInit = {
    baseUrl: function (url) {
        baseUrl = url
    },
    preMethod: function (methods) {
        preMethod = methods
    },
    defaultParams: function (params) {
        defaultParams = params
    },
    defaultHeader: function (headers) {
        defaultHeader = {}
    },
    defaultData: function (data) {
        Object.keys(data).map(v => {
            if (typeof data[v] !== 'function')
                throw new Error('defaultData接受参数是string->function')
        })
        defaultData = data
    },
    err_catch: function (func) {
        if (typeof func !== 'function') {
            throw new Error('err_catch接受参数是function')
        }
        err_catch = func
    }
}