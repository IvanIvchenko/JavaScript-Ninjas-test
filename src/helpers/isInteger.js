export default function isInteger(num) {
    try{
        const n = +num
        return n>0 && num % parseInt(num) === 0
    }catch{
        return false
    }
}