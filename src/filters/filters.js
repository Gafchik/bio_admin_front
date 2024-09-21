// filters.js
export function removeSpaces(value) {
    return value.replace(/\s/g, '');
}

export function removeQueryParams(value) {
    return value.replace(/\?.*$/, '');
}
export function centToDollar(money){
    if(!!money){
        return money/100
    }
    return 0
}