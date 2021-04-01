module.exports = function addTimeToDateByRepetitionTypeAndTimes(repatitionType, times, value, negative = false) {
    let result = new Date(value)
    const computation = (value1, value2) => {
        return negative ? value1 - value2 : value1 + value2
    }
    switch (repatitionType) {
        case 1: result.setDate(computation(result.getDate(), times))
            return result;
        case 2: result.setDate(computation(result.getDate(), times * 7))
            return result;
        case 3: result.setMonth(computation(result.getMonth(), times))
            return result;
        case 4: result.setFullYear(computation(result.getFullYear() + times))
            return result;
    }
}