export const camelCase = (string) => {
    const stringArr = string.split('');
    stringArr[0] = stringArr[0].toUpperCase();

    return stringArr.join('');
}