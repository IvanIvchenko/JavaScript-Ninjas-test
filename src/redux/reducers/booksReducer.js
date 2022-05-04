import { getBooks, getBook, createBook, deleteBook, editBook } from "../actions/booksActions.js"

const initialState = {
    error: null,
    fetchingBooks: false,
    fetchingBook: false,
    creatingBook: false,
    deletingBook: false,
    editingBook: false,
    books: [],
    book: null
};

export function booksReducer(state = initialState, action) {
    switch (action.type) {
        case getBooks.REQUEST:
            return {
                ...state,
                fetchingBooks: true
            };
        case getBook.REQUEST:
            return {
                ...state,
                fetchingBook: true
            };
        case createBook.REQUEST:
            return {
                ...state,
                creatingBook: true
            };
        case editBook.REQUEST:
            return {
                ...state,
                editingBook: true
            };
        case deleteBook.REQUEST:
            return {
                ...state,
                deletingBook: true,
            };
        case getBooks.SUCCESS:
            return {
                ...state,
                fetchingBooks: false,
                books: Object.values(action.payload)
            };
        case getBook.SUCCESS:
            return {
                ...state,
                fetchingBook: false,
                book: action.payload
            }
        case createBook.SUCCESS:
            return {
                ...state,
                creatingBook: false,
                book: action.payload
            }
        case editBook.SUCCESS:
            return {
                ...state,
                editingBook: false,
            }
        case deleteBook.SUCCESS:
            return {
                ...state,
                deletingBook: false,
                book: null,
            }
        case getBooks.FAILURE:
            return {
                ...state,
                fetchingBooks: false,
                error: action.payload
            };
        case getBook.FAILURE:
            return {
                ...state,
                fetchingBook: false,
                error: action.payload
            };
        case createBook.FAILURE:
            return {
                ...state,
                creatingBook: false,
                error: action.payload
            };
        case editBook.FAILURE:
            return {
                ...state,
                editingBook: false,
                error: action.payload
            };
        case deleteBook.FAILURE:
            return {
                ...state,
                deletingBook: false,
                error: action.payload
            };
        default:
            return state
    }
}