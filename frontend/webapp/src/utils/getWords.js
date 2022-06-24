const wordsSource = {
    default: ['请客，斩首，留下当狗', '让子弹再飞一会儿', '苹果', "香蕉", '火柴人', '卖火柴的小女孩'],
    fruits: ['苹果', '香蕉', '橘子', '梨', '橙子', '西瓜', '桃子', '哈密瓜', '蓝莓', '草莓']
}
// 乱序
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
export function getWords(type, number) {
    const words = shuffle(wordsSource[type])
    return words.slice(0, number)
}
export function getKeys() {
    return Object.keys(wordsSource)
}
