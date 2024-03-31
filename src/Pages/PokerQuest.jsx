import React, { Component } from 'react';

class PokerQuestGame extends Component {
  render() {
    return (
      <div>
        <iframe
          src="https://playsaurus.com/kongPokerQuest63/"
          title="Poker Quest"
          scrolling="no"
          allow="autoplay; payment; fullscreen; microphone; clipboard-read; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-write 'self' https://playsaurus.com/kongPokerQuest56/"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          msallowfullscreen="true"
          allowFullScreen
          loading="eager"
          style={{
            border: '0px',
            backgroundColor: 'rgb(255, 255, 255)',
            width: '100%',
            height: '600px', // Adjust height as needed
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
        <br />
        <a href="https://pokerquest.com/" target="_blank" rel="noopener noreferrer">Poker Quest</a> is Developed by{' '}
        <a href="https://playsaurus.com" target="_blank" rel="noopener noreferrer">Playsaurus</a> - an idle game development studio.
      </div>
    );
  }
}

export default PokerQuestGame;
