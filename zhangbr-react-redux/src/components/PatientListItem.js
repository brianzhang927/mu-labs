import { useState } from "react";

const PatientListItem = ({ patient }) => {
  const [doctorsList, setDoctorsList] = useState(null);

  const GQL_API = `https://graphql-doctor-patient.apps.cac.preview.pcf.manulife.com/`;
  const GQL_QUERY = `
 query($id: ID!) {
   patient(id: $id) {
     doctors {
       id
       name
     }
   }
 }`;

 const handleLoadDoctors = () => {
  const variables = { id: patient.id };
  fetch(GQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GQL_QUERY,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((result) => setDoctorsList(result.data.patient.doctors));
};


  return (
    <div>
      <button onClick={handleLoadDoctors}>{patient.name}</button>
      {doctorsList &&
        doctorsList.map((doctor) => <div key={doctor.id}>{doctor.name}</div>)}
    </div>
  );
};

export default PatientListItem;
