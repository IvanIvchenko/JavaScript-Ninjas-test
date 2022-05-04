import actionCreator from "../../helpers/redux/actionCreator.js"
import {
    GET_BOOKS,
    GET_BOOK,
    CREATE_BOOK,
    EDIT_BOOK,
    DELETE_BOOK
} from "./actionTypes.js"

export const getBooks = actionCreator(GET_BOOKS)
export const getBook = actionCreator(GET_BOOK)
export const createBook = actionCreator(CREATE_BOOK)
export const editBook = actionCreator(EDIT_BOOK)
export const deleteBook = actionCreator(DELETE_BOOK)

const link = "http://localhost:5000"

export const getBooksData = () => {
    
    return dispatch =>{

        dispatch(getBooks.request());
        
        fetch(link + '/books',{
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(getBooks.failure(resultJson.error))
            }else{
                dispatch(getBooks.success(resultJson))
            }
        })
        .catch(err => {
            dispatch(getBooks.failure(err.message));
        });
    }
};

export const getBookData = (id) => {
    return dispatch =>{

        dispatch(getBook.request());
        
        fetch(link + `/books/${id}`,{
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(getBook.failure(resultJson.error))
            }else{
                dispatch(getBook.success(resultJson))
            }
        })
        .catch(err => {
            dispatch(getBook.failure(err.message));
        });
    }
};

export const createBookData = (data) => {
    return dispatch =>{

        dispatch(createBook.request());
        
        fetch(link + `/books`,{
            headers: {
                'Accept': 'application/json',
            },
            body: data,
            method: 'POST'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(createBook.failure(resultJson.error))
            }else{
                dispatch(createBook.success(result))
            }
        })
        .catch(err => {
            dispatch(createBook.failure(err.message));
        });
    }
};

export const editBookData = (id, data) => {
    return dispatch =>{

        dispatch(editBook.request());
        
        fetch(link + `/books/${id}`,{
            headers: {
                'Accept': 'application/json',
            },
            body: data,
            method: 'PUT'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(editBook.failure(resultJson.error))
            }else{
                dispatch(editBook.success(result))
            }
        })
        .catch(err => {
            dispatch(editBook.failure(err.message));
        });
    }
};


export const deleteBookData = (id) => {
    return dispatch =>{

        dispatch(deleteBook.request());
        
        fetch(link + `/books/${id}`,{
            method: 'DELETE'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                    dispatch(deleteBook.failure(resultJson.error))
            }else{
                dispatch(deleteBook.success(resultJson))
            }
        })
        .catch(err => {
            dispatch(deleteBook.failure(err.message));
        });
    }
};

