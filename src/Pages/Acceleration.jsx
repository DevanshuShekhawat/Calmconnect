import React from 'react';

const AccelerationGame = () => {
  return (
    <div>
      <iframe
        src="https://1000webgames.com/games/m-acceleration/webgl/"
        title="Acceleration Game"
        frameBorder="0"
        width="960"
        height="530"
        scrolling="no"
        style={{
          border: '0',
          backgroundColor: 'transparent',
          width: '100%',
          height: '530px', // Adjust height as needed
        }}
      ></iframe>
    </div>
  );
};

export default AccelerationGame;
