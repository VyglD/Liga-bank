import React from "react";
import {ToastContainer, toast} from "react-toastify";
import PrimeHeader from "../prime-header/prime-header";
import PrimeFooter from "../prime-footer/prime-footer";

import "react-toastify/dist/ReactToastify.css";

const handleBlankLinkClick = (evt) => {
  evt.preventDefault();

  toast.info(`Функционал отсутствует`);
};

function App() {
  return (
    <React.Fragment>
      <PrimeHeader
        onBlankLinkClick={handleBlankLinkClick}
      />
      <PrimeFooter
        onBlankLinkClick={handleBlankLinkClick}
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
