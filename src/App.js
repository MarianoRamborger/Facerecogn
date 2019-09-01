import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js'
import FaceRecognition from './Components/Facerecognition/Facerecognition.js'


const app = new Clarifai.App({
    apiKey: '030a0b2c980b4ed8a51379b71c3f36dd'
})

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
            "mode": "repulse",
        }
    }
}
                 

	       
	}
 
   

class App extends Component {
    constructor() { //Hace al componente dinamico dandole un state.
        super();

        this.state = {
            input: '',
            imgUrl:'', //URL state. Changes when somebody uploads a picture.
            box: {},


            
        }
    }

    
 //Receives bounding-box data to create the square around people's faces.
 calculateFaceLocation = (data) => { //gets passed the 4 coordinates of bounding box
    const clarifyFace = (data.outputs[0].data.regions[0].region_info.bounding_box)  //stores data from the first face.
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return { //this is going to give the four values to the box. Thanks to fancy mathematics. when OnbuttonSubmit runs
        leftCol: clarifyFace.left_col * width,
        topRow: clarifyFace.top_row * height,
        rightCol: width - (clarifyFace.right_col * width),
        bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

// Receives props from calculateFaceLocation when onButtonSubmit runs and changes the state of box with them
  displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box})
  }


   /////////////////// // REVISA INPUT EN TEXTBOX.////////////////////////////////////////////////////
    onInputChange = (event) => { /* Trickles down to imagelinkform para escuchar. */
        this.setState({input :  event.target.value});
        console.log(event.target.value); 
        
          
        
        
    }

    //////////////////////CORRE LA FACERECOGNAPPI.
    onButtonSubmit = () => { 
        this.setState({imgUrl: this.state.input}); //imgurl becomes el input. Then pasa al facerecogn component

        app.models.predict( //toma 3 arguments. La key que está declarda mas arriba, el modo y la imagen. 
            Clarifai.FACE_DETECT_MODEL,
            this.state.input).then( // Pasa la imagen a la API
    
            response => //Recibe el analisis de la API
            this.displayFaceBox(this.calculateFaceLocation(response)))
            // Corre la formula para buscar los parámetros de la facialbox.
            // Y los pasa a la funcion que cambia el estado de la box.

            
            
            .catch(err => console.log(err)); 
            
            }


    
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
        <ImageLinkForm 
        onInputChange={this.onInputChange } //Clava el listener de eventos en imagelink 
        onButtonSubmit={this.onButtonSubmit } //Same with submit
        />   
        
        
        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} /> 



        </div>
      );
    }
      
    }
    


export default App;
