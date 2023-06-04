import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';


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
    }, 300000); // 300000 milliseconds = 5 minutes

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
    const templateParams = {
      from_email: email,
      to_email: email, // Send the email to the user-provided email address
      userText: text, // Pass the user's text as the template parameter
    };
  
    emailjs
      .send('service_chwt4ld', 'template_wy617zg', templateParams, 'fUdLpu-M23Eyc2Doq')
      .then((response) => {
        console.log('Email sent:', response.status);
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
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
