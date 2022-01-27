import { useState } from "react";
const AddDoctor = (props) => {
  const [doctorName, setDoctorName] = useState("");

  const handleAddDoctor = () => {
    props.onAddDoctor(doctorName); // using controlled name
  };

  const handleChangeName = (event) => {
    setDoctorName(event.target.value);
  };

  return (
    <div>
      <input type='text' value={doctorName} onChange={handleChangeName} />
      <button onClick={handleAddDoctor}>Add Doctor</button>
    </div>
  );
};

export default AddDoctor;
