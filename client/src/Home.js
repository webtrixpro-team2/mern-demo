import React, { useEffect, useState } from 'react';

function Home() {

  const [grabText, setGrabText] = useState('Fetching... Data Please Wait......');

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setGrabText(res))
        .catch(err => err);
   }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <div className="container" dangerouslySetInnerHTML={{__html: grabText}}></div>
  );
}

export default Home;