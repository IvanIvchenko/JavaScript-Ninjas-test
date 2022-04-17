import { getBooks, getBook } from "../actions/booksActions.js"

const initialState = {
    error: null,
    loadingBooks: false,
    loadingBook: false,
    books: [],
    book: null
};

export function booksReducer(state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {
        case getBooks.REQUEST:
            return {
                ...state,
                loadingBooks: true
            };
        case getBook.REQUEST:
            return {
                ...state,
                loadingBook: true
            };
        case getBooks.SUCCESS:
            return {
                ...state,
                loadingBooks: false,
                books: Object.values(action.payload)
            };
        case getBook.SUCCESS:
            return {
                ...state,
                loadingBook: false,
                book: action.payload
            }
        case getBooks.FAILURE:
            return {
                ...state,
                loadingBooks: false,
                error: action.payload
            };
        case getBook.FAILURE:
            return {
                ...state,
                loadingBook: false,
                error: action.payload
            };
        default:
            return state
    }
}