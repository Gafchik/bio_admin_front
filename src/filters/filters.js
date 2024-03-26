// filters.js
export function removeSpaces(value) {
    return value.replace(/\s/g, '');
}

export function removeQueryParams(value) {
    return value.replace(/\?.*$/, '');
}
