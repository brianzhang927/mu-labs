import PropTypes from "prop-types";
import { useState } from "react";
import DoctorDetails from "./DoctorDetails";

function DoctorListItem({ id, name, onDeleteDoctor }) {
  const [details, setDetails] = useState(null);

  function handleLoadDetails() {
    fetch(
      `https://doctor-info.apps.cac.preview.pcf.manulife.com/v1/doctor/${id}`
    )
      .then((response) => response.json())
      .then((response) => setDetails(response));
  }

  function handleDeleteDoctor() {
    onDeleteDoctor(id);
  }

  return (
    <div>
      <button onClick={handleLoadDetails}>{name}</button>
      {details && (
        <DoctorDetails {...details}/>
      )}
      <button onClick={handleDeleteDoctor}>X</button>
    </div>
  );
}

DoctorListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DoctorListItem;
