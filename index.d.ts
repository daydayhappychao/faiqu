declare function faiqu(url: string): faiquObject
declare let faiquInit: faiquInitObject


interface faiquInitObject {
    baseUrl(url: string): void
    preMethod(methods: Array<Function>): void
    defaultParams(params: Object): void
    defaultHeader(params: Object): void
    defaultData(params: Object): void
    err_catch(func: Function): void
}

interface faiquObject {
    json(): faiquObject
    params(params: Object): faiquObject
    headers(params: Object): faiquObject
    get(): Promise<any>
    put(url?: string): Promise<any>
    post(): Promise<any>
    delete(url?: string): Promise<any>
}
export default faiqu
export { faiquInit }