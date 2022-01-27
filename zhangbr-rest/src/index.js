import express from "express"; // importing the module
import bodyParser from "body-parser";
import cors from "cors";
import data from "../data"; // the `./` denotes the folder structure
import * as utilities from "./utils/functions";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express(); // creating an Express app
const { PORT = 3000 } = process.env;
app.use(bodyParser.json()).use(cors());

app.get("/", (request, response) =>
  response.send("Hello World! First MU Project")
);

// GET ALL DOCTORS
app.get("/api/v1/doctors", (req, res) => res.json(data.doctors));

// GET A SINGLE DOCTOR
app.get("/api/v1/doctors/:id", (req, res) => {
  if (utilities.isInvalidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id." });
  }
  const id = parseInt(req.params.id);
  const doctor = data.doctors.find((doc) => doc.id === id);
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found." });
  }
  return res.json(doctor);
});

// POST A DOCTOR
app.post("/api/v1/doctors", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Doctor needs a name parameter." });
  }
  const nextId = data.doctors.length + 1;
  const doctor = { id: nextId, ...req.body };

  data.doctors.push(doctor);
  res.status(201).json(doctor); // 201 means Resource Created
});

// GET ALL PATIENTS
app.get("/api/v1/patients", (req, res) => res.json(data.patients));

// GET A SINGLE PATIENT
app.get("/api/v1/patients/:id", (req, res) => {
  if (utilities.isInvalidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id." });
  }
  const id = parseInt(req.params.id);
  const patient = data.patients.find((pat) => pat.id === id);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found." });
  }
  return res.json(patient);
});

// POST A PATIENT
app.post("/api/v1/patients", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Patient needs a name parameter." });
  }
  const nextId = data.patients.length + 1;
  const patient = { id: nextId, ...req.body };

  data.patients.push(patient);
  res.status(201).json(patient); // 201 means Resource Created
});

// GET VISITS
app.get("/api/v1/visits", (req, res) => {
  const { doctorid, patientid } = req.query;
  let visits = data.visits;

  if (doctorid) {
    visits = visits.filter(
      (visit) => visit.doctorid === parseInt(doctorid, 10)
    );
  }

  if (patientid) {
    visits = visits.filter(
      (visit) => visit.patientid === parseInt(patientid, 10)
    );
  }

  return res.json(visits);
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () =>
  console.log(`Hello World, I'm listening on port ${PORT}!`)
);
