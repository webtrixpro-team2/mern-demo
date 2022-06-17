// import React, { useEffect, useState } from 'react';
// import {
//   ChakraProvider,
//   Box,
//   Text,
//   Link,
//   VStack,
//   Code,
//   Grid,
//   theme,
// } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';

// function App() {

//   const [grabText, setGrabText] = useState('Fetching... Data from PeGePay Please Wait......');

//   const callAPI = () => {
//     fetch("http://localhost:9000/testAPI")
//         .then(res => res.text())
//         .then(res => setGrabText(res))
//         .catch(err => err);
//    }

//   useEffect(() => {
//     callAPI()
//   })

//   return (
//     <ChakraProvider theme={theme}>
//       <div className="post__content" dangerouslySetInnerHTML={{__html: grabText}}></div>
//     </ChakraProvider>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="blogs" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
