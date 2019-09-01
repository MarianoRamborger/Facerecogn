import React from 'react';
import './faceRecognition.css'

const Facerecognition = ({ imgUrl , box }) =>
{
    return(
    <div className='center ma'>
        <div className='absolute mt2'>
        <img id='inputImage' alt={"your upload here"} src={imgUrl} width="500px" height='auto' /> {/*height en auto so it automatially adjusts to the width*/}
            <div  className='bounding-box' 
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>  {/* Encastra las direcciones en la pic */}
            </div>
        </div>
    </div>
    )
}



export default Facerecognition;