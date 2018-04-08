import React from 'react';
import { photos } from '../util/photos';
import Gallery from './gallery';

class App extends React.Component{
  render(){
    //photos will be located in store in real apps
    const items = photos;
    return(
      <div className="app">
        <Gallery items = {items}/>
      </div>
    );
  }
}

export default App;
