import React from 'react';


class SignIn extends React.Component { //convertido a smart component para poder manejar el signin por si solo.
  constructor(props){ //armamos el constructor para poder settear el state
    super()
    this.state = {
      signInEmail : '',
      signInPassWord : ''
    }
  }
  onEmailChange = (event) => { //Escucha por cambios en email y maneja el estado
    this.setState({signInEmail: event.target.value})

  }
  onPasswordChange = (event) => { //Escucha por cambios en email y maneja el estado
    this.setState({signInPassWord: event.target.value})

  }

  onSubmitSignIn = () =>{
    fetch('https://immense-mesa-06427.herokuapp.com/signin', { 
      
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( { 
       email: this.state.signInEmail,
       password: this.state.signInPassWord
      })
    })
     .then(response => response.json())
     .then(user => {
       if (user.id) {
         this.props.loadUser(user);
         this.props.onRouteChange('Home')
       }
     }) 
    
  }

  render() {
    const {onRouteChange} = this.props; //destructuring because it's now a smart component and needs the state.
    return ( //from tachyons
      
      <article className="br3 bab--black-10 mv4 w-100 w-50-m shadow-5 w-25-l mw6 center">
      <main className="pa4 black-80">
    <div className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
          <input onChange={this.onEmailChange} //feedea cambios de mail al onEmailChange que está escuchando sus eventos.
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input onChange = {this.onPasswordChange}
          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
  
      </fieldset>
      <div className="">
        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        onClick={ this.onSubmitSignIn} //La arrow functino acá evita que la función sea llamada on rendering.
        type="submit" 
        value="Sign in"/>
      </div>
      <div className="lh-copy mt3">
        <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
  
      </div>
   </div>
  </main>
  </article>
  )
  
  
  
  }
  }


export default SignIn;