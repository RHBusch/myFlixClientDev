//Creating action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_Filter';


//Action creators 
export function setMovies(value) {
    console.log('SET_MOVIES action triggered')
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value }
}