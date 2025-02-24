import { TableRow, TableCell } from '@mui/material';

interface TaskProps {
  name: string;
  email: string;
  completionStatus: string;
  lastSeen: string;
}

const Task: React.FC<TaskProps> = ({ name, email, completionStatus, lastSeen }) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{completionStatus}</TableCell>
      <TableCell>{lastSeen}</TableCell>
    </TableRow>
  )
}

export default Task;