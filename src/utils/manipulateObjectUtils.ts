export const compareObjectsAndFormat = <T extends Record<string, any>, R extends Record<string, any>>(firstObj: T, secondObject: R):Partial<T> => {

return Object.entries(firstObj).reduce((acc: Record<string, any>,  [k,v]) => {
    const secondValue = JSON.stringify(secondObject[k])
    if(JSON.stringify(v) !== secondValue){
        acc[k] = secondObject[k]
    }
    return acc
}, {}) as Partial<T>
}

export const removeEmptyValues = <T extends Record<string, any>>(data: T) => {
    return Object.entries(data).reduce((acc: Partial<T>, [k, v]) => {
        if(!v) return acc
        acc[k as keyof T]  = v
        return acc
    }, {})
}

export const objectToQuery = (object: Record<string, unknown>) => {
    const query = Object.entries(object).map(([k, v]) => `${k}=${v}`).join('&')
    return !query ? '' : '?' +query 
}


export const queryToObject = (query: string) => {
    const params = new URLSearchParams(query)
    return Object.fromEntries(params.entries());
}