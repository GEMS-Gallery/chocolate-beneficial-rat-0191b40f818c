import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

type Task = {
  id: bigint;
  title: string;
  category: string;
  dueDate: bigint;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const { control, handleSubmit, reset } = useForm();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await backend.getTasks();
      setTasks(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = () => {
    setEditTask(null);
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editTask) {
        await backend.updateTask(editTask.id, data.title, data.category, BigInt(new Date(data.dueDate).getTime()), data.completed);
      } else {
        await backend.addTask(data.title, data.category, BigInt(new Date(data.dueDate).getTime()));
      }
      fetchTasks();
      handleClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setLoading(false);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    reset({
      title: task.title,
      category: task.category,
      dueDate: new Date(Number(task.dueDate)).toISOString().split('T')[0],
      completed: task.completed,
    });
    setOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={Number(task.id)} secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }>
              <ListItemText
                primary={task.title}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {task.category}
                    </Typography>
                    {` - Due: ${new Date(Number(task.dueDate)).toLocaleDateString()}`}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Title is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: 'Category is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Category"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              defaultValue=""
              rules={{ required: 'Due date is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Due Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            {editTask && (
              <Controller
                name="completed"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    margin="normal"
                    SelectProps={{ native: true }}
                  >
                    <option value="false">Incomplete</option>
                    <option value="true">Complete</option>
                  </TextField>
                )}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editTask ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default App;
