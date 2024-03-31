import React from 'react';

const FrayFightGame = () => {
  return (
    <div>
      <iframe
        src="https://frayfight.com/game/"
        title="Fray Fight"
        scrolling="no"
        allow="autoplay; payment; fullscreen; microphone; clipboard-read; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-write 'self' https://frayfight.com"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        msallowfullscreen="true"
        allowFullScreen
        loading="eager"
        style={{
          border: '0px',
          backgroundColor: 'rgb(255, 255, 255)',
          width: '100%',
          height: '500px', // Adjust height as needed
          minWidth: '100%',
          minHeight: '100%',
        }}
      />
      <br />
      <a href="https://frayfight.com/" target="_blank" rel="noopener noreferrer">Fray Fight</a> is Developed by{' '}
      <a href="https://playsaurus.com" target="_blank" rel="noopener noreferrer">Playsaurus</a> - an idle game development studio.
    </div>
  );
};

export default FrayFightGame;
