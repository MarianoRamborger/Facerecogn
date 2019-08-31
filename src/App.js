import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js'


const particleOptions = {
  "particles": {
    "number": {
        "value": 500
    },
    "size": {
        "value": 5
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
}
                 
              
	       
	}
 

class App extends Component {
    render() {
      return(
        <div className="App">
       <Particles className='particles'
    params={particleOptions
	    
	} />
        {/* <Particles className='particles'
                    params={{particleOptions}} 

                    />
                     */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
        <FaceRecognition /> */}
    
        </div>
      );
    }
      
    }
    


export default App;
