import isInteger from './isInteger.js'

export default function setPage(page, pagesNumber) {
    if (page === null || !isInteger(page)) {
        return 1
    } else if (page > pagesNumber) {
        return pagesNumber
    } else{
        return page
    }
}