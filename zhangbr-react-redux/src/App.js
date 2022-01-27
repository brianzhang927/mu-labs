import "./App.css";
import "@manulife/mux/core/typography/assets/fonts/fonts.css";
import { Footer, H1, UtilityHeader } from "@manulife/mux";

import DoctorsList from "./components/DoctorsList";
import PatientsList from "./components/PatientsList";

function App(props) {
  return (
    <>
      <UtilityHeader>Header</UtilityHeader>
      <H1>Hello, {props.name}</H1>
      <DoctorsList />
      <PatientsList></PatientsList>
      <Footer></Footer>
    </>
  );
}

export default App;
