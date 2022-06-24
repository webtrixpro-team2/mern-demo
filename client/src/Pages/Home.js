import React, { Fragment, useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import LSide from '../Components/LSide';

function Home() {

  const [isLoading, setIsLoading] = useState(1);
  const [grabText, setGrabText] = useState([]);
  const [info, setInfo] = useState('Crawling website from https://www.pegepay.com/ <br>Storing data into web server<br>This will take long. Please be patient<br>Please Wait......');

  const callAPI = () => {
    fetch("http://localhost:9000/crawl").then(res => res.json()
    ).then(res => {
      setIsLoading(0)
      setGrabText(res)
    }).catch(err => {
      setInfo('Unable to fetch data. Please try again');
    });
  }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <Fragment>
      <Header />
      <main className='d-flex'>
        <LSide />
        <div className="maincontainer">
          {isLoading ? (
            <div dangerouslySetInnerHTML={{ __html: info }}></div>
          ) : (
            <ul>
              {grabText.map((link) => {
                return <li>{link}</li>
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default Home;