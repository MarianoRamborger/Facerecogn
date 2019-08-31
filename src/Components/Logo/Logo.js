import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './brain.png'

const Logo = () =>{

return(
    <div className='ma4 mt0'> 
    
    <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} > {/*copypasted de la doc de tilt/*/}
    <div className="Tilt-inner"> <img style={{paddingTop: '1.2em'}}   src={Brain} alt="Brain logo" /> </div>
    </Tilt>

    </div>
)
}


export default Logo;