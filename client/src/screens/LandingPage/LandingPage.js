import { React, useState, useEffect } from "react";
import Search from "../../Components/Search";
import axios from "axios";
import CrematoriesList from "../../Components/CrematoriesList";
import { useNavigate } from "react-router-dom";
import "../../css/Pages.css";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const [crematories, setCrematories] = useState([]);
  const [filteredCrematories, setFilteredCrematories] = useState([]);

  useEffect(() => {
    const fetchCrematories = async () => {
      let fetch = await axios.get("http://localhost:8080/crematories");
      setCrematories(fetch.data);
      setFilteredCrematories(fetch.data);
    };
    fetchCrematories();
  }, []);

  useEffect(() => {
    setFilteredCrematories(
      crematories.filter((crematory) => {
        if (crematory.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [search]);

  const navigate = useNavigate();

  const changePage = () => {
    navigate("/crematories");
  };

  return (
    <div className="Page">
      <div className="crematoryList">
        <h1>Crematories of Massachusetts</h1>
        <Search search={search} setSearch={setSearch} />
        <CrematoriesList crematories={filteredCrematories} />
      </div>
      <button onClick={changePage}>Add New Crematory</button>
    </div>
  );
};

export default LandingPage;
