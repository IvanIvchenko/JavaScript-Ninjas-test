import actionCreator from "../../components/redux/actionCreator.js"
import {
    GET_BOOKS,
    GET_BOOK
} from "./actionTypes.js"

export const getBooks = actionCreator(GET_BOOKS)
export const getBook = actionCreator(GET_BOOK)

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
        .then(result => {
            if (!result.ok) {
                result.json()
                .then(result => dispatch(getBooks.failure(result.error)))
            }
            result.json()
            .then(result => {
                dispatch(getBooks.success(result))
            })
        })
        .catch(err => {
            dispatch(getBooks.failure(err.message));
        });
    }
};

export const getBookData = (id) => {
    console.log(id)
    return dispatch =>{

        dispatch(getBook.request());
        
        fetch(link + `/books/${id}`,{
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        .then(result => {
            if (!result.ok) {
                result.json()
                .then(result => dispatch(getBook.failure(result.error)))
            }
            result.json()
            .then(result => {
                dispatch(getBook.success(result))
            })
        })
        .catch(err => {
            dispatch(getBook.failure(err.message));
        });
    }
};