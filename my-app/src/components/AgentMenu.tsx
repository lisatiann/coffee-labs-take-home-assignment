import { useState } from "react";
import { Box, MenuItem } from "@mui/material";
import { AgentType } from "../types";
import AddAndEditDialog from "./AddAndEditDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useAgentContext } from "../context/AgentContext";

interface TaskMenuProps {
  agent: AgentType;
  handleClose: () => void;
}

const AgentMenu: React.FC<TaskMenuProps> = ({ agent, handleClose }) => {
  const { deleteAgent } = useAgentContext();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    deleteAgent(agent.id);
    setOpenConfirmDelete(false);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
      <MenuItem sx={{ borderBottom: "1px solid #e0e0e0" }} onClick={handleEditClick}>Edit</MenuItem>
      <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      <AddAndEditDialog isEditMode={true} agent={agent} open={openEdit} onClose={() => { setOpenEdit(false); handleClose(); }} />
      <ConfirmDeleteDialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)} onConfirm={handleConfirmDelete} />
    </Box>
  )
}

export default AgentMenu;