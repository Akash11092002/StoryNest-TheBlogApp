import React, { useState } from 'react';


function Home() {


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginRight: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>Welcome to the Travel Website</h1>
          <p style={{ color: '#555', marginBottom: '20px' }}>Your adventure begins here. Explore the world with us.</p>
         
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
