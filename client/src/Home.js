import React, { Fragment, useEffect, useState } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import LSide from './Components/LSide';

function Home() {

  const [grabText, setGrabText] = useState('Fetching from https://www.worldometers.info/coronavirus/country/us <br>Storing data into web server<br>Please Wait......');

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
    <Fragment>
      <Header />
      <main className='d-flex'>
        <LSide />
        <div className="maincontainer" dangerouslySetInnerHTML={{ __html: grabText }}></div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default Home;