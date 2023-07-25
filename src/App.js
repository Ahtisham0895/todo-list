import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import "./App.css"

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
    setOpenDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask('');
    setOpenDialog(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-container">
        <div className="input-container">
          <TextField
            label="Enter a task..."
            value={task}
            onChange={handleTaskChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button onClick={handleAddTask} variant="contained" color="primary">
            Add
          </Button>
        </div>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              {index === editIndex ? (
                <TextField
                  label="Edit task..."
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <ListItemText primary={task} />
              )}
              <ListItemSecondaryAction>
                {index === editIndex ? (
                  <React.Fragment>
                    <IconButton onClick={handleSaveEdit} edge="end" aria-label="save">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => setOpenDialog(false)} edge="end" aria-label="cancel">
                      <Delete />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <IconButton onClick={() => handleEditTask(index)} edge="end" aria-label="edit">
                    <Edit />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDeleteTask(index)} edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Edit task..."
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
