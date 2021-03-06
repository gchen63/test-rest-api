const express = require("express");
const cors = require("cors");
const app = express();

// express.json ritorna un middleware che verrà utilizato nel pipeline di richiesta dell'app
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// Tutte le richieste OPTIONS devono passare per CORS
app.options("*", cors());
// Accetta tutti gli Origin
app.use(cors());

/*
---
// Accetta solo gli Origin definiti al suo interno
const corsOptions = {
  origin: ["http://localhost/30000/", "http://secondurl.com"],
  optionsSuccessStatus: 200
};
*/

app.get("/", (req, res) => {
  res.send("Hello World, Test REST API and Kubernetes");
});

app.get("/api/courses", (req, res) => {
  // Normalmente si prende la lista dei corsi dal DB
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404 Not found
    res.status(404).send("The course with the given ID was not found!");
    return;
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Find Course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found!");
    return;
  }

  // Update Course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Find Course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found!");
    return;
  }

  // Delete Course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
