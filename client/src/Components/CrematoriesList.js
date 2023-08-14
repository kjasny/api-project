import React from "react";
import { Link } from "react-router-dom";

const CrematoriesList = (props) => {
  const { crematories } = props;

  const renderCrematories = crematories.map((crematory) => {
    return (
      <div key={crematory.id}>
        <Link to={`/crematories/${crematory.id}`}>{crematory.name} </Link>
      </div>
    );
  });

  return <div>{renderCrematories}</div>;
};

export default CrematoriesList;
