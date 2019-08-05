import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null
  }
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post('//83.212.89.217:5000/predict', fd)
      .then(response => {
        console.log(response.data.predictions.label);
      })
  }

  render() {
    return ( <
      div className = "App" >
      <
      input style = {
        {
          display: 'none'
        }
      }
      type = "file"
      onChange = {
        this.fileSelectedHandler
      }
      ref = {
        fileInput => this.fileInput = fileInput
      }
      /> <
      button onClick = {
        () => this.fileInput.click()
      } > Pick File < /button> <
      button onClick = {
        this.fileUploadHandler
      } > Upload < /button>

      <
      /div>
    );
  }
}

export default App;