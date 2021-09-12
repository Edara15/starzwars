import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Spinner,Row,Col } from 'react-bootstrap';
import moment from 'moment';

const FilmsView = ({selectedIndex}) => {
    const characters = useSelector(state => state.characters);
    
    const films = useSelector(state => state.films);
    //console.log(selectedIndex,'**** inside films view');
    const selectedFilms = selectedIndex ? characters[selectedIndex].films : [];

    const arr = selectedFilms && selectedFilms.length> 0 && selectedFilms.map(item=>{
        const film = films && item in films ? films[item] : null;
        if(film){
            return {title:film.title,release_date:moment(film.release_date,'YYYY-MM-DD')};
        }
    }).filter(item=>item);
    

    const getMaxData=()=>{
        if(arr && arr.length){
            let moments = arr.map(d => d.release_date)
            let maxDate = moment.max(moments);
            let movieName = arr.find(d=>d.release_date ==maxDate).title;
            return (movieName + " " + maxDate.format('YYYY-MM-DD'));
        }
        
    }
    
    return(
        <React.Fragment>
            
            <h4>List of movies</h4>
            <div style={{background:'white',border:'1px solid #f3f3f3',padding:'20px'}}>
                
                { arr && arr.map(film=>(
                        <Row key={film.title}>
                            <Col>
                            {film.title} 
                            </Col>
                        </Row>)
                        )}
            </div>
            <hr/>
            <h4>Name / Year Last movie</h4>
            {getMaxData()}
            
        </React.Fragment>
    )
}

export default FilmsView;
