import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import axios from 'axios';
import './App.css';




const intialState = {
    input:'',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}
class App extends React.Component {
  constructor(){
    super()
    this.state = intialState;
  }

  loadUser = (data) => {
    this.setState({user:{ 
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  }});
}

// calculateFaceLocation = (data) => {
//   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//   const image = document.getElementById('inputimage');
//   const width = Number(image.width);
//   const height = Number(image.height);
//   return {
//     leftCol: clarifaiFace.leftCol * width,
//     topRow: clarifaiFace.topRow * height,
//     rightCol: width - (clarifaiFace.rightCol * width),
//     bottomRow: height - (clarifaiFace.bottomRow * height)
//   }
// }

// displayFaceBox = (box) => {
//   console.log(box)
//   this.setState({box: box})
// }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input,   
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id    
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user.id,{entries: count})) 
          })
          .catch(err => console.log("error", err))            
      }
    }) 
  // .then(response => this.displayFaceBox() (this.calculateFaceLocation(response)))
  //   .catch(err => console.log(err))
  //   .catch((error) => console.log("error", error))
}
        
  

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(intialState);
    } else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

render() {
  const {isSignedIn, imageUrl, route} = this.state;
  return (
      <div className="App">
          <ParticlesBg
            num={30} type="cobweb" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home'
            ?<div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm  
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={imageUrl}/>
            </div>
            :(
              route === 'signin'
              ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            )
            
          }  
        </div>
    )
};
  }

export default App;
