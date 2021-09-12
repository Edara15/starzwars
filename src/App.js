import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FilmsView from './Films';
import { retrieveCharacters,loadFilmsStart,loadFilms } from './action';
import { Spinner } from 'react-bootstrap';

function SearchBar() {
  const [selectedCharacter, setSelectedCharacter] = useState();

  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);
  const films = useSelector(state => state.films);
  const loadingFilms = useSelector(state => state.loadingFilms);
  useEffect(()=>{
    dispatch(retrieveCharacters());
  },[]);

  useEffect(()=>{
    if(selectedCharacter && selectedCharacter!=''){
        const urls = characters[selectedCharacter].films;
        const keys = films ? Object.keys(films): [];
        const filteredUrls = urls.filter(url=>!keys.includes(url));
       // console.log(filteredUrls,'***123');
        if(filteredUrls && filteredUrls.length>0){
          dispatch(loadFilmsStart());
        }
        dispatch(loadFilms(filteredUrls));

    }
  },[selectedCharacter])
  
  if (characters) {
    return (
      <React.Fragment>
      <Form.Control
          as="select"
          custom
          onChange = { (event) => {  setSelectedCharacter(event.target.value) } }
        >
          <option value='' key='-'>--Select Option--</option>
          {characters.map((option,index)=>(<option key={index} value={index}>{option.name}</option>))}
        </Form.Control>
        <hr/>
        {loadingFilms && (<Spinner animation="border" role="status"/>)}
        {!loadingFilms && characters && films && (<FilmsView selectedIndex={selectedCharacter} />)}
      </React.Fragment>
    );
  }
  return (
    <Spinner animation="border" role="status"/>
  );
}

const App = () => (
  <Container className="p-3">
    <Jumbotron >
      <h1 className="header">Welcome</h1>
      <SearchBar />
     
    </Jumbotron>
  </Container>
);

export default App;
