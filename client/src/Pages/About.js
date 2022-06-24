import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import LSide from '../Components/LSide';

function About() {
  const [grabText, setGrabText] = useState('Please Wait... Fetch from local server');

  const callAPI = () => {
    fetch("http://localhost:9000/api-about").then(res => res.text()
    ).then(res => {
      setGrabText(res)
    }).catch(err => err);
  }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <Fragment>
      <Header />
      <main className='d-flex'>
        <LSide />
        <div className="maincontainer" id="faqs">
          <div id="source-info">Source URL: https://pegepay.com/about-pegepay</div>
          <div dangerouslySetInnerHTML={{ __html: grabText }}></div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default About;