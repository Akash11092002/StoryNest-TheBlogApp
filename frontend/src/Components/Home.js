import React, { useState } from 'react';
import img from './images/dfgg.jpg'
import './Home.css';


function Home() {




 return (
    <div className="landing-container">
      <div className="content">
        <div className="text-container">
        <h1>StoryNest</h1>
          <h2>Welcome to the BLOG Website</h2>
          <p>"Stories That Spark Conversations!"</p>
          <input
            type='text'
            placeholder='Enter your email to start'
            size={50}
            
           
          />
          <button >Start</button>
        </div>
        <div className="image-container">
          <img src={img} alt="Travel" className="landing-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
