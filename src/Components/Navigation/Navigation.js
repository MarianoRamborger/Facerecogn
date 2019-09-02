import React from 'react'

const Navigation = ({ onRouteChange , isSignedIn}) => {


    if (isSignedIn === true){
        return( // Notese que se retornan los individuales, adentro del if.
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p  className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange( 'signOut') }> Sign out </p>
    </nav>
    )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p  className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange( 'SignIn') } > Sign in </p> 
            <p  className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange( 'Register') }> Register </p> 
            </nav>
             )
    }
   
    
}

export default Navigation;

