import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../css/Pages.css";

const CrematoryInfo = () => {
  const [crematory, setCrematory] = useState({});
  const [fieldMLI, setFieldMLI] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCrematory = async () => {
      let fetch = await axios.get(`http://localhost:8080/crematories/${id}`);
      console.log(fetch.data);

      setCrematory(fetch.data);
      setFieldMLI(fetch.data.fieldMLI);
    };

    fetchCrematory();
  }, []);

  return (
    <div className="Page">
      <h2>{crematory.name}</h2>
      <ul>
        <li>
          Field MLI: {fieldMLI.firstName} {fieldMLI.lastName}
        </li>
        <li>Route: {fieldMLI.route}</li>
        <li>Location: {crematory.location}, MA</li>
      </ul>
      <img src={crematory.logo} alt="Crematory Logo"></img>
      <div className="returnLink">
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default CrematoryInfo;
