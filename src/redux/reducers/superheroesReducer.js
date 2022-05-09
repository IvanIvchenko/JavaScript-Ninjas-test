import { getSuperheroes, getSuperhero, createSuperhero, deleteSuperhero, editSuperhero } from "../actions/superheroesActions.js"

const initialState = {
    error: null,
    pagesNumber: null,
    fetchingSuperheroes: false,
    fetchingSuperhero: false,
    creatingSuperhero: false,
    deletingSuperhero: false,
    editingSuperhero: false,
    superheroes: [],
    superhero: null
};

export function superheroesReducer(state = initialState, action) {
    switch (action.type) {
        case getSuperheroes.REQUEST:
            return {
                ...state,
                fetchingSuperheroes: true
            };
        case getSuperhero.REQUEST:
            return {
                ...state,
                fetchingSuperhero: true
            };
        case createSuperhero.REQUEST:
            return {
                ...state,
                creatingSuperhero: true
            };
        case editSuperhero.REQUEST:
            return {
                ...state,
                editingSuperhero: true
            };
        case deleteSuperhero.REQUEST:
            return {
                ...state,
                deletingSuperhero: true,
            };
        case getSuperheroes.SUCCESS:
            return {
                ...state,
                fetchingSuperheroes: false,
                pagesNumber: Math.ceil(+action.payload.superheroNumber / 5),
                superheroes: Object.values(action.payload.superheroes)
            };
        case getSuperhero.SUCCESS:
            return {
                ...state,
                fetchingSuperhero: false,
                superhero: action.payload
            }
        case createSuperhero.SUCCESS:
            return {
                ...state,
                creatingBook: false,
            }
        case editSuperhero.SUCCESS:
            return {
                ...state,
                editingSuperhero: false,
            }
        case deleteSuperhero.SUCCESS:
            return {
                ...state,
                deletingSuperhero: false,
                superhero: null,
            }
        case getSuperheroes.FAILURE:
            return {
                ...state,
                fetchingSuperheroes: false,
                error: action.payload
            };
        case getSuperhero.FAILURE:
            return {
                ...state,
                fetchingSuperhero: false,
                error: action.payload
            };
        case createSuperhero.FAILURE:
            return {
                ...state,
                creatingSuperhero: false,
                error: action.payload
            };
        case editSuperhero.FAILURE:
            return {
                ...state,
                editingSuperhero: false,
                error: action.payload
            };
        case deleteSuperhero.FAILURE:
            return {
                ...state,
                deletingSuperhero: false,
                error: action.payload
            };
        default:
            return state
    }
}