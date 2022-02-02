//Creating action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_Filter';


//Action creators 
export function Setmovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value }
}