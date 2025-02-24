import { useState } from "react";
import { MenuItem } from "@mui/material";
import { AgentType } from "../types";
import AddAndEditDialog from "./AddAndEditDialog";
import { useAgentContext } from "../context/AgentContext";

interface TaskMenuProps {
  agent: AgentType;
  handleClose: () => void;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ agent, handleClose }) => {
  const { deleteAgent } = useAgentContext();
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleDeleteClick = () => {
    deleteAgent(agent.id);
    handleClose();
  };

  return (
    <div>
      <MenuItem onClick={handleEditClick}>Edit</MenuItem>
      <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      <AddAndEditDialog isEditMode={true} agent={agent} open={openEdit} onClose={() => { setOpenEdit(false); handleClose(); }} />
    </div>
  )
}

export default TaskMenu;