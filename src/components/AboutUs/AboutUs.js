import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AboutUs = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, [history]);

  return <div>This is All about us</div>;
};

export default AboutUs;
