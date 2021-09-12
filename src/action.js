import {
    RETRIEVE_CHARACTERS,
    LOAD_FILMS,
    LOAD_FILMS_SUCCESS
  } from "./type";

import DataService from "./requests";

export const retrieveCharacters = () => async (dispatch) => {
    try {
      const res = await DataService.getAll();
  
      dispatch({
        type: RETRIEVE_CHARACTERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const loadFilmsStart = () => async (dispatch) => {
    dispatch({
        type: LOAD_FILMS
      });
};

export const loadFilms = (filmsUrls) => async (dispatch) => {
    try {
        if(filmsUrls && filmsUrls.length>0){
            const  res1 = new Promise((resolve, reject) => {
                let res={};
                filmsUrls.forEach(async(url, index, array) => {
                    const result = await DataService.getFilmData(url);
                    res[url]=result.data;
                    if (index === array.length -1) resolve(res);
                });
            });

            res1.then((data) => {
                dispatch({
                    type: LOAD_FILMS_SUCCESS,
                    payload: data,
                    });
            });
        }
    } catch (err) {
        console.log(err);
    }
};