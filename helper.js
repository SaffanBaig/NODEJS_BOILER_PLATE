
const isEmpty = (val) => {
    if (val == null) return true
    if (typeof val === 'object') {
        if (Array.isArray(val)) {
            return val.length === 0;
        } else {
            return Object.keys(val).length === 0;
        }
    }
    if (val.toString().trim().length === 0) return true;
    return false
}

module.exports = {isEmpty}