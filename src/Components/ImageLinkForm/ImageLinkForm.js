import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ( { onInputChange , onButtonSubmit} ) => { /* destructuring and passed by app */
    return (
        <div>
            <p className="f3">
                {'This brain detects faces in pictures.'}
            </p>
           
            <div className='center' id="FORM">
                <div className='form center pa4 br3 shadow-5'>         
                    <input className="f4 pa2 w-70 center" type='text'
                     onChange= { onInputChange }  //Listens and passes when something changes in textfield.
                     />     

                    <button id="SUBMITBUTTON"
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick={onButtonSubmit} //Listens and passes when butotn is clicked.
                    >Detect
                    </button>
                
                </div>
            </div>
        </div>


    )
}





export default ImageLinkForm