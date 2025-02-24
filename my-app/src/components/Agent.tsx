import { useState } from 'react';
import { Button, TableRow, TableCell, Popover } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AgentType } from '../types';
import TaskMenu from './TaskMenu';

interface AgentProps {
  agent: AgentType;
  toolBarTitles: Array<keyof AgentType>;
}

const Agent: React.FC<AgentProps> = ({ agent, toolBarTitles }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index}>
          {agent[title as keyof AgentType]}
        </TableCell>
      ))}
      <TableCell>
        <Button onClick={handleClick}>
          <MoreHorizIcon />
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <TaskMenu agent={agent} handleClose={handleClose} />
        </Popover>
      </TableCell>
    </TableRow>
  )
}

export default Agent;