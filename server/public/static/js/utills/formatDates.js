export const getDayName = (dayOfWeekNo) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

    return days[dayOfWeekNo];
}

export const getMonthName = month => {
    const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return monthsNames[month - 1];
}