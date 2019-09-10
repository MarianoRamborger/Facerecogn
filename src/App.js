import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js'
import FaceRecognition from './Components/Facerecognition/Facerecognition.js'
import SignIn from './Components/SignIn/SignIn.js'
import Register from './Components/Register/Register.js'



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
 

const initialState = {
    input: '',
    imgUrl:'', //URL state. Changes when somebody uploads a picture.
    box: {},
    route: 'SignIn', //keeps track of where we are on the page. Starts en SignIn
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ''
}
}

class App extends Component {
    constructor() { //Hace al componente dinamico dandole un state.
        super();

        this.state = initialState;
            
    }

    



     loadUser = (data) => { //Es llamada por register y signin, updateando el user. 
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            entries: data.entries,
            joined: data.joined,
        }})
     }



   
    // componentDidMount(){ //if mounted, fetches server
    //     fetch('http://localhost:3000')  //notice que fetchea la root.
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }


    
 //Receives bounding-box data to create the square around people's faces.
 calculateFaceLocation = (data) => { //gets passed the 4 coordinates of bounding box
    const clarifyFace = (data.outputs[0].data.regions[0].region_info.bounding_box)  //stores data from the first face.
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);


    return { //this is going to give the four values to the box. Thanks to fancy mathematics. when OnbuttonSubmit runs
        leftCol: clarifyFace.left_col * width,
        topRow: clarifyFace.top_row * height,
        rightCol: width - (clarifyFace.right_col * width),
        bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

// Receives props from calculateFaceLocation when onButtonSubmit runs and changes the state of box with them
  displayFaceBox = (box) => {
   
      this.setState({box: box})
  }


   /////////////////// // REVISA INPUT EN TEXTBOX.////////////////////////////////////////////////////
    onInputChange = (event) => { /* Trickles down to imagelinkform para escuchar. */
        this.setState({input :  event.target.value});
     
        
          
        
        
    }

    //////////////////////CORRE LA FACERECOGNAPPI.
    onButtonSubmit = () => { 
        this.setState({imgUrl: this.state.input}); //imgurl becomes el input. Then pasa al facerecogn component

        app.models.predict( //toma 3 arguments. La key que está declarda mas arriba, el modo y la imagen. 
            Clarifai.FACE_DETECT_MODEL,
            this.state.input).then( // Pasa la imagen a la API
    
            response =>  {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify( { 
                        id: this.state.user.id,  
                        })
                     
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(
                            Object.assign(this.state.user, {
                                entries: count
                            })

                        )  
                        .catch(console.log);
                })}
                                                                                        //Recibe el analisis de la API
            this.displayFaceBox(this.calculateFaceLocation(response))
            })
                                                                                                            // Corre la formula para buscar los parámetros de la facialbox.
                                                                                                                     // Y los pasa a la funcion que cambia el estado de la box.
            .catch(err => console.log(err)); 
            }
            


            onRouteChange = (route) => {
                this.setState({route: route}); //signs in thru signIn
                if (route === 'signOut') {
                    this.setState(initialState)
                } else if (route === 'Home') {
                    this.setState({isSignedIn: true});
                }
            }

         
            

    
    render() {
      return(
        <div className="App">
       <Particles className='particles'
    params={particleOptions
	    
	} />
        
        <Navigation 
            onRouteChange={this.onRouteChange} 
            isSignedIn={this.state.isSignedIn}
        />
       { //curly brackets dejan usar JS sintaxys para hacer el if statement.
        
        this.state.route === 'Home'   //The UGLIEST if statement decides what is to be rendered
           ?  <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm 
        onInputChange={this.onInputChange } //Clava el listener de eventos en imagelink 
        onButtonSubmit={this.onButtonSubmit } //Same with submit
        />   
        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} /> 
                </div>
           
           
           :  ( 
              this.state.route === 'SignIn'  
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              :   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )    
               
           
        }

       
        
    


        </div>
      );
    }
      
    }
    


export default App;
