import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Grid,
} from "@mui/material";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  // State to hold the list of tasks.
  const [taskList, setTaskList] = useState([]);

  // State for the task name being entered by the user.
  const [newTaskName, setNewTaskName] = useState("");

  // TODO: Support retrieving your todo list from the API.
  // Currently, the tasks are hardcoded. You'll need to make an API call
  // to fetch the list of tasks instead of using the hardcoded data.

  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      navigate("/login");
    } else {
      console.log(currentUser);
      fetch(`http://localhost:3001/tasks/${currentUser.uid}`, 
        {
          headers: {
            'Authorization': `Bearer: ${currentUser.accessToken}`
          } 
        })
        .then((response) => response.json())
        .then((data) => {
          setTaskList(data);
        })
        .catch((error) => {
          console.error("FAILED TO FETCH: ", error);
        })
    }
  }, [currentUser, navigate]);


  function handleAddTask() {
    // Check if task name is provided and if it doesn't already exist.
    if (newTaskName && !taskList.some((taskRef) => taskRef.task === newTaskName)) {

      // TODO: Support adding todo items to your todo list through the API.
      // In addition to updating the state directly, you should send a request
      // to the API to add a new task and then update the state based on the response.

      console.log(currentUser);
      console.log(newTaskName);

      fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          task: newTaskName, 
          finished: false,
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTaskList([...taskList, data]);
        setNewTaskName("");
      })
      .catch(error => {
        console.error("FAILED TO POST: ", error);
      })
      
    } else if (taskList.some((task) => task.task === newTaskName)) {
      alert("Task already exists!");
    }
  }

  // Function to toggle the 'finished' status of a task.
  function toggleTaskCompletion(task) {

    // TODO: Support removing/checking off todo items in your todo list through the API.
    // Similar to adding tasks, when checking off a task, you should send a request
    // to the API to update the task's status and then update the state based on the response.

    fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
    .then(() => {
      const updatedTaskList = taskList.filter((existingTask) => existingTask.id !== task.id);
      setTaskList(updatedTaskList);
    })
    .catch((error) => {
      console.error("FAILED TO DELETE: ", error);
    })

  }

  // Function to compute a message indicating how many tasks are unfinished.
  function getUnfinishedTaskMessage() {
    if (taskList == null) {
      return `You have 0 tasks left to do`;
    }
    const unfinishedTasks = taskList.filter((task) => !task.finished).length;
    return unfinishedTasks === 1
      ? `You have 1 unfinished task`
      : `You have ${unfinishedTasks} tasks left to do`;
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        {/* Main layout and styling for the ToDo app. */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display the unfinished task summary */}
          <Typography variant="h4" component="div" fontWeight="bold">
            {getUnfinishedTaskMessage()}
          </Typography>
          <Box
            sx={{
              width: "100%",
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Input and button to add a new task */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small" // makes the textfield smaller
                  value={newTaskName}
                  placeholder="Type your task here"
                  onChange={(event) => setNewTaskName(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/* List of tasks */}
            <List sx={{ marginTop: 3 }}>
              {taskList.map((task) => (
                <ListItem
                  key={task.id}
                  dense
                >
                  <Checkbox
                    checked={task.finished}
                    onChange={() => toggleTaskCompletion(task)}
                  />
                  <ListItemText primary={task.task} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
}