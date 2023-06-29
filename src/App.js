import React from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'dc8af10eb7e34f5da10ffa571c609e9f'
 });

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input:'',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log('click')  
  
  }
  render() {
  return (
    <div className="App">
      <ParticlesBg
        num={30} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  
      onInputChange = {this.onInputChange} 
      onButtonSubmit = {this.onButtonSubmit}
      />
      {/*
            <FaceRecognition/>
            */}
    </div>
  );
          }
}
  
export default App;
