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
     //help me => user_id can be found in multiple ways, one way is in https://portal.clarifai.com/settings/profile 
  const USER_ID = "dev-id";

  
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  // help me => PAT can be found in https://portal.clarifai.com/settings/authentication (create one if necessary!)
  const PAT = "804b3b17ea1245de94df8c10382621b2"; 
  
  
  // help me => App Id is just the name of your app on the portal. 
  const APP_ID = "second-application"; 


  // Change these to whatever model and image input you want to use
  // help me => https://help.clarifai.com/hc/en-us/articles/1500007677141-Where-to-find-your-Model-IDs-and-Model-Version-IDs
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

  const IMAGE_URL = this.state.input;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) =>
      console.log(result)
    )
    .catch((error) => console.log("error", error));
};
  

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
  )
};
  }

             
export default App;
