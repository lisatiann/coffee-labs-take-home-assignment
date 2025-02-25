import { useState, useEffect } from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from "@mui/material";
import { statusOrder } from "../constant";
import { AgentType } from "../types";
import { useAgentContext } from "../context/AgentContext";
import { useAlertContext } from "../context/AlertContext";

interface AddAndEditDialogProps {
  isEditMode: boolean;
  agent?: AgentType;
  newID?: number;
  open: boolean;
  onClose: () => void;
}

const AddAndEditDialog: React.FC<AddAndEditDialogProps> = ({ isEditMode, agent, newID, open, onClose }) => {
  const { createAgent, editAgent } = useAgentContext();
  const { showAlert } = useAlertContext();
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
      showAlert("Name is required", "error");
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showAlert("A valid email is required", "error");
      return;
    }
    if (!status) {
      showAlert("Status is required", "error");
      return;
    }
    if (isEditMode) {
      editAgent(newAgent);
      showAlert("Agent updated successfully", "success");
    } else {
      createAgent(newAgent);
      showAlert("Agent created successfully", "success");
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '10px', minWidth: '300px' }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="status"
            value={status}
            onChange={handleChange}
          >
            {Object.keys(statusOrder).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">{isEditMode ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddAndEditDialog;