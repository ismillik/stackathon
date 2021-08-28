import axios from 'axios';


//constants

const GET_IMDB_RESULTS = 'GET_IMDB_RESULTS';
const GET_STREAM_RESULTS = 'GET_STREAM_RESULTS';

//action creators

const _getImdbResults = (results) => {
    return {
        type: GET_IMDB_RESULTS,
        results
    };
};

const _getStreamResults = (results) => {
    return {
        type: GET_STREAM_RESULTS,
        results
    };
};

//THUNKS


export const getImdbResults = (title, type, history) => {
    console.log('IN getImdbResults')
    return async (dispatch) => {
        const response = await axios.get('/api/imdb', {params: {title, type}});
        let results = response.data;
        console.log('These are the results!!!!!!!', results);
        if (!results.search_results) {
            dispatch(_getImdbResults([]));
            history.push('/results');
        }
        else {
            if (type === 'get-movies-by-title') {
                dispatch(_getImdbResults(results.movie_results));
            }
            else if (type === 'get-shows-by-title') {
                dispatch(_getImdbResults(results.tv_results));
            }        
            history.push('/results');
        };   
    };
};

export const getStreamResults = (id) => {
    console.log('IN getStreamResults')
    return async (dispatch) => {
        const response = await axios.get('/api/stream', {params: {id}});
        let results = response.data; 
        dispatch(_getStreamResults(results));
    };
};



//reducer

export const imdbReducer = (state = [], action) => {
    switch (action.type) {
        case GET_IMDB_RESULTS:
            return action.results;
        default: 
            return state;
    }
}

export const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_STREAM_RESULTS:
            return action.results;
        default:
            return state;
    }
}


