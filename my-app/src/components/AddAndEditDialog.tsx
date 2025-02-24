import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { statusOrder } from "../constant";
import { AgentType } from "../types";

interface AddAndEditDialogProps {
  isEditMode: boolean;
  agent?: AgentType;
  newID?: number;
  open: boolean;
  onClose: () => void;
  onCreate?: (agent: AgentType) => void;
  onEdit?: (agent: AgentType) => void;
}

const AddAndEditDialog: React.FC<AddAndEditDialogProps> = ({ isEditMode, agent, newID, open, onClose, onCreate, onEdit }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (isEditMode && agent) {
      setName(agent.name);
      setEmail(agent.email);
      setStatus(agent.status);
    } else {
      setName("");
      setEmail("");
      setStatus("");
    }
  }, [isEditMode, agent]);

  const handleSave = () => {
    const newAgent = {
      id: isEditMode && agent ? agent.id : newID!,
      name,
      email,
      status,
      lastSeen: new Date().toISOString(),
    };
    if (!name) {
      return alert("Name is required"); // if time, improve error
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return alert("A valid email is required");
    }
    if (isEditMode && onEdit) {
      onEdit(newAgent);
    } else if (onCreate) {
      onCreate(newAgent);
    }
    onClose();
    setName("");
    setEmail("");
    setStatus("");
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name === "status") {
      setStatus(value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? "Edit Agent" : "Create Agent"}</DialogTitle>
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
        <Button onClick={handleSave}>{isEditMode ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddAndEditDialog;