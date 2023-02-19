
import Header from "./header";
import Footer from "./Footer";
import  './Loading.css';

import React from 'react';

const Loading = () => {
  return (
    <div>
        <main>
          <div className="loading"></div>
        </main>
        <Footer />
      </div>
  );
}

export default Loading;
