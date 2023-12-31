import React from 'react';
import './ImageLInkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
        <p className='f3'>
            {'This Magic Brain Detects Faces In Your Pictures, Give it a try'}
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='f4 w-30 link grow ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    </div>
  );
}

export default ImageLinkForm;
