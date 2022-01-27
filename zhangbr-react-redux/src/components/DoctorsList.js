import { useState, useEffect } from "react";
import AddDoctor from "./AddDoctor";
import DoctorListItem from "./DoctorListItem";
function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(
      "https://rest-example-node.apps.cac.preview.pcf.manulife.com/v1/doctors"
    )
      .then((response) => response.json())
      .then((data) => setDoctors(data));
  }, []);

  const handleAddDoctor = (name) => {
    const newDoctor = { id: Date.now().toString(), name: name };
    const newDoctorsList = [...doctors, newDoctor];
    setDoctors(newDoctorsList);
  };

  const handleDeleteDoctor = (id) => {
    const newDoctorList  = doctors.filter(doc => doc.id !== id);
    setDoctors(newDoctorList);
}

  return (
    <>
      <h2>Doctors List</h2>
      <AddDoctor onAddDoctor={handleAddDoctor} />
      {doctors.map((doctor) => (
        <DoctorListItem
          key={doctor.id}
          id={doctor.id}
          name={doctor.name}
          onDeleteDoctor={handleDeleteDoctor}
        ></DoctorListItem>
      ))}
    </>
  );
}

export default DoctorsList;
