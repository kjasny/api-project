import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Pages.css";

const AddNewCrematory = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fieldMLIId, setFieldMLIId] = useState(0);
  const [logo, setLogo] = useState("");

  const submitNewCrematory = async () => {
    await axios.post("http://localhost:8080/crematories", {
      name,
      location,
      fieldMLIId,
      logo
    });
    setName("");
    setLocation("");
    setFieldMLIId(0);
    setLogo("");
  };

  return (
    <div className="Page">
      <h2>Add New Crematory</h2>
      <form>
        <label for="name">Crematory Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <label for="=location">Crematory Location:</label>
        <br />
        <input
          type="text"
          id="=location"
          name="=location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <br />
        <label for="=fieldMLIId">Field MLI ID:</label>
        <br />
        <input
          type="text"
          id="=fieldMLIId"
          name="=fieldMLIId"
          onChange={(event) => {
            setFieldMLIId(event.target.value);
          }}
        />
        <br />
        <label for="=logo">Logo:</label>
        <br />
        <input
          type="text"
          id="=logo"
          name="=logo"
          onChange={(event) => {
            setLogo(event.target.value);
          }}
        />
        <br />
        <button className="submitButton" onClick={submitNewCrematory}>
          Submit
        </button>
      </form>
      <div className="returnLink">
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default AddNewCrematory;
