import { useState } from "react";
import { MenuItem } from "@mui/material";
import { AgentType } from "../types";
import AddAndEditDialog from "./AddAndEditDialog";

interface TaskMenuProps {
  agent: AgentType;
  handleEditAgent: (agent: AgentType) => void;
  handleDeleteAgent: (id: number) => void;
  handleClose: () => void;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ agent, handleEditAgent, handleDeleteAgent, handleClose }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleDeleteClick = () => {
    handleDeleteAgent(agent.id);
    handleClose();
  };

  return (
    <div>
      <MenuItem onClick={handleEditClick}>Edit</MenuItem>
      <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      <AddAndEditDialog isEditMode={true} agent={agent} open={openEdit} onClose={() => { setOpenEdit(false); handleClose(); }} onEdit={handleEditAgent} />
    </div>
  )
}

export default TaskMenu;