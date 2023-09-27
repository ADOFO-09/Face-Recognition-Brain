import React, { useState } from 'react';
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





const App = () => {
  const [imgUrl, setImgUrl] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  })

const [myState, setMyState] = useState({
  route: 'signin',
  isSignedIn: false,
})

 const myUser = (data) => {
    setUser({ 
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  })
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

 const onInputChange = (event) => {
    setImgUrl(event.target.value)
  }

 const onButtonSubmit = () => {
  setImagePath(imgUrl)

      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: imgUrl,   
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id    
          })
        })
          .then(response => response.json())
          .then(count => {
            setUser({...user, entries: count.entries}) 
            
          })
          .catch(err => console.log("error", err))            
      }
    }) 
  // .then(response => this.displayFaceBox() (this.calculateFaceLocation(response)))
  //   .catch(err => console.log(err))
  //   .catch((error) => console.log("error", error))
}

  

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setMyState({myState});
    } else if(route === 'home'){
      setMyState({...myState, isSignedIn: true});
    }
     setMyState({...myState, route: route});
  }


  return (
      <div className="App">
          <ParticlesBg
            num={30} type="cobweb" bg={true} />
          <Navigation isSignedIn={myState.isSignedIn} onRouteChange={onRouteChange} />
          { myState.route === 'home'
            ?<div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm  
              onInputChange = {onInputChange} 
              onButtonSubmit = {onButtonSubmit}
              />
              <FaceRecognition box={myState.box} imageUrl={imagePath}/>
            </div>
            :(
              myState.route === 'signin'
              ?<Signin loadUser={myUser} onRouteChange={onRouteChange} />
              :<Register loadUser={myUser} onRouteChange={onRouteChange}/> 
            )
            
          }  
        </div>
    )
};
  

export default App;
