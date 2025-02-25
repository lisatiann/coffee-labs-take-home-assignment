import { useState } from 'react';
import { Button, TableRow, TableCell, Popover, Chip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AgentType } from '../types';
import AgentMenu from './AgentMenu';

interface AgentProps {
  agent: AgentType;
  toolBarTitles: Array<keyof AgentType>;
}

const Agent: React.FC<AgentProps> = ({ agent, toolBarTitles }) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverAnchorEl(null);
  };

  const open = Boolean(popoverAnchorEl);

  const getStatusChip = (status: string) => {
    const color = status === 'active' ? 'primary' : 'default';
    return <Chip label={status[0].toUpperCase() + status.slice(1)} color={color as 'primary' | 'default'} />;
  };

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    return date.toLocaleString();
  };

  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell 
          key={index}
          sx={{
            padding: '8px',
            paddingLeft: '16px',
            borderLeft: index !== 0 ? '1px solid rgba(224, 224, 224, 1)' : 'none'
          }}
        >
          {title === 'status' ? getStatusChip(agent[title as keyof AgentType] as string) : title === 'lastSeen' ? formatLastSeen(agent[title as keyof AgentType] as string) : agent[title as keyof AgentType]}
        </TableCell>
      ))}
      <TableCell>
        <Button onClick={handleClick}>
          <MoreHorizIcon />
        </Button>
        <Popover
          open={open}
          anchorEl={popoverAnchorEl}
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
          <AgentMenu agent={agent} handleClose={handleClose} />
        </Popover>
      </TableCell>
    </TableRow>
  )
}

export default Agent;