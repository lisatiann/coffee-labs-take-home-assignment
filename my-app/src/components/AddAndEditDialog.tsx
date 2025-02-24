import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { statusOrder } from "../constant";
import { TaskType } from "../types";

interface AddAndEditDialogProps {
  newID: number;
  open: boolean;
  onClose: () => void;
  onCreate: (task: TaskType) => void;
}

const AddAndEditDialog: React.FC<AddAndEditDialogProps> = ({ newID, open, onClose, onCreate }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleCreate = () => {
    const newTask = {
      id: newID,
      name,
      email,
      status,
      lastSeen: new Date().toISOString(),
    };
    if (!name) {
      return alert("Name is required"); // if time, improve error
    }
    onCreate(newTask);
    setName("");
    setStatus("");
    onClose();
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name === "status") {
      setStatus(value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={status}
            onChange={handleChange}
          >
            {Object.keys(statusOrder).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddAndEditDialog;