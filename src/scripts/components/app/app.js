import React from "react";
import {ToastContainer, toast} from "react-toastify";
import PrimeHeader from "../prime-header/prime-header";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <PrimeHeader
        toast={toast}
      />
      <ToastContainer
        autoClose={5000}
        position={toast.POSITION.TOP_LEFT}
        pauseOnFocusLoss={false}
      />
    </React.Fragment>
  );
}

App.propTypes = {};

export default App;
