import {RETRIEVE_CHARACTERS,LOAD_FILMS, LOAD_FILMS_SUCCESS} from './type'
const initialState = {
    characters:[],
    loadingFilms:false,
    films:{},
  }
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {
       
    switch (action.type) {
      case RETRIEVE_CHARACTERS:
        {
            return {...state, 
                characters:action?.payload?.results
            };
        }
        case LOAD_FILMS:
            {
                return {...state,loadingFilms:true}
            }
        case LOAD_FILMS_SUCCESS:
            {
                
                return {
                    ...state,
                    loadingFilms:false,
                    films:{...state.films,...action.payload}
                }
            }
      default:
        return state
    }
  }