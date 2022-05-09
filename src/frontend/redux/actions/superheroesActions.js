import actionCreator from "../utils/actionCreator.js"
import isInteger from "../../helpers/isInteger.js"
import {
    GET_SUPERHEROES,
    GET_SUPERHERO,
    CREATE_SUPERHERO,
    EDIT_SUPERHERO,
    DELETE_SUPERHERO
} from "./actionTypes.js"

export const getSuperheroes = actionCreator(GET_SUPERHEROES)
export const getSuperhero = actionCreator(GET_SUPERHERO)
export const createSuperhero = actionCreator(CREATE_SUPERHERO)
export const editSuperhero = actionCreator(EDIT_SUPERHERO)
export const deleteSuperhero = actionCreator(DELETE_SUPERHERO)

const link = "http://localhost:5000"

export const getSuperheroesData = (page) => {

    const pageNumber = isInteger(page) ? page : 1

    return dispatch =>{

        dispatch(getSuperheroes.request());
        
        fetch(link + `/superheroes?page=${pageNumber}`,{
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        .then(async result => {
            const rowNumber = result.headers.get('X-Total-Count')
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(getSuperheroes.failure(resultJson.error))
            }else{
                dispatch(getSuperheroes.success({superheroes: resultJson, superheroNumber: rowNumber}))
            }
        })
        .catch(err => {
            dispatch(getSuperheroes.failure(err.message));
        });
    }
};

export const getSuperheroData = (id) => {
    return dispatch =>{

        dispatch(getSuperhero.request());
        
        fetch(link + `/superheroes/${id}`,{
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(getSuperhero.failure(resultJson.error))
            }else{
                dispatch(getSuperhero.success(resultJson))
            }
        })
        .catch(err => {
            dispatch(getSuperhero.failure(err.message));
        });
    }
};

export const createSuperheroData = (data) => {
    return dispatch =>{

        dispatch(createSuperhero.request());
        
        fetch(link + `/superheroes`,{
            headers: {
                'Accept': 'application/json',
            },
            body: data,
            method: 'POST'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(createSuperhero.failure(resultJson.error))
            }else{
                dispatch(createSuperhero.success(result))
            }
        })
        .catch(err => {
            dispatch(createSuperhero.failure(err.message));
        });
    }
};

export const editSuperheroData = (id, data) => {
    return dispatch =>{

        dispatch(editSuperhero.request());
        
        fetch(link + `/superheroes/${id}`,{
            headers: {
                'Accept': 'application/json',
            },
            body: data,
            method: 'PUT'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                dispatch(editSuperhero.failure(resultJson.error))
            }else{
                dispatch(editSuperhero.success(result))
            }
        })
        .catch(err => {
            dispatch(editSuperhero.failure(err.message));
        });
    }
};


export const deleteSuperheroData = (id) => {
    return dispatch =>{

        dispatch(deleteSuperhero.request());
        
        fetch(link + `/superheroes/${id}`,{
            method: 'DELETE'
        })
        .then(async result => {
            const resultJson = await result.json()
            if (!result.ok) {
                    dispatch(deleteSuperhero.failure(resultJson.error))
            }else{
                dispatch(deleteSuperhero.success(resultJson))
            }
        })
        .catch(err => {
            dispatch(deleteSuperhero.failure(err.message));
        });
    }
};

