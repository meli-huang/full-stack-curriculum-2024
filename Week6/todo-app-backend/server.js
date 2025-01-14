// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const db = require("./firebase");

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Middleware to validate input of post request
const validateInput = (req, res, next) => {
  const { user, task } = req.body;
  if (user && task ) {
      next();
  } else {
      res.status(400).json({ error: 'incomplete input' });
  }
};

// Your API routes will go here...

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await db.collection("tasks").get();
    
    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });
    
    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// GET: Endpoint to retrieve all tasks for a user
app.get("/tasks/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const userSnapshot = await db.collection("tasks").where("user", "==", user).get();
    if (userSnapshot.empty) {
      res.status(404).json({ error: "No tasks found for this user" });
    } else {
      let tasks = [];
      userSnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id, 
          ...doc.data(),
        });
      });
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// POST: Endpoint to add a new task
app.post("/tasks", validateInput, async (req, res) => {
  try {
    let newTask = {
      finished: req.body.finished,
      task: req.body.task,
      user: req.body.user,
    }

    const addedTask = await db.collection("tasks").add(newTask);
    res.status(201).json({
      id: addedTask.id,  // Automatically generated Document ID from Firestore
      ...newTask,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// DELETE: Endpoint to remove a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskRef = db.collection("tasks").doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      res.status(404).json({ error: "Task not found" })
    } else {
      await taskRef.delete();
      res.json({ id, ...taskSnapshot.data() });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});