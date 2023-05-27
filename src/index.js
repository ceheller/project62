import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 300 seconds = 5 minutes
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    // Generate a random number for the image
    const randomNumber = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/800/400?random=${randomNumber}`;

    setImage(imageUrl);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Handle timer completion
    setTimeout(() => {
      clearInterval(timer);
      setIsTimeUp(true);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmail = () => {
    // Simulate sending the email
    // This is just a mock implementation and won't actually send an email
    console.log('Sending email to:', email);
    console.log('Text:', text);

    // Set email sent state to true
    setIsEmailSent(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {image && <img src={image} alt="Inspiration" />}
      <textarea
        value={text}
        onChange={handleTextChange}
        disabled={isTimeUp}
        style={{ width: '900px', height: '100px', margin: '20px 0' }}
        placeholder="Write your text here"
      />
      {isTimeUp && (
        <div>
          <h3>Time's up! Here's your text:</h3>
          <p>{text}</p>
          {!isEmailSent && (
            <div>
              <p>Please enter your email to receive the text:</p>
              <input type="email" value={email} onChange={handleEmailChange} />
              <button onClick={sendEmail}>Send Email</button>
            </div>
          )}
          {isEmailSent && <p>Email sent successfully!</p>}
        </div>
      )}
      {!isTimeUp && (
        <div>
          <h3>Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}</h3>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
