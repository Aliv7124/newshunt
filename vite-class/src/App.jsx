import React, { Component } from 'react';
import Navabar from './Components/Navabar'; 
import News from './Components/News';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {

state={
progress:0
}
setProgress=(progress)=>{
  this.setState({progress:progress})
}
  render() {
    return (
      <>
        <Navabar />
        
       <LoadingBar
        color="#f11946"
        progress={this.state.progress}
       
      />
        <Routes>


    



          <Route path="/" element={<News setProgress={this.setProgress} pagesize={8} category="general" />} />
          <Route path="/sports" element={<News setProgress={this.setProgress} pagesize={8} category="sports" />} />
          <Route path="/business" element={<News setProgress={this.setProgress} pagesize={8} category="business" />} />
          <Route path="/health" element={<News setProgress={this.setProgress}  pagesize={8} category="health" />} />
          <Route path="/science" element={<News setProgress={this.setProgress} pagesize={8} category="science" />} />
          <Route path="/technology" element={<News setProgress={this.setProgress} pagesize={8} category="technology" />} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress} pagesize={8} category="entertainment" />} />
        </Routes>
      </>
    );
  }
}
