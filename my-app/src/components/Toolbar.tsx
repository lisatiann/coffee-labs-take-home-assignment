import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { AgentType } from "../types";

interface ToolBarProps {
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort: (property: keyof AgentType) => void;
  toolBarTitles: Array<keyof AgentType>;
}

const ToolBar: React.FC<ToolBarProps> = ({ order, orderBy, onRequestSort, toolBarTitles }) => {
  const createSortHandler = (property: keyof AgentType) => () => {
    onRequestSort(property);
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
          <TableSortLabel
            active={orderBy === title}
            direction={orderBy === title ? order : 'asc'}
            onClick={createSortHandler(title)}
          >
            {title !== 'lastSeen' ? title[0].toUpperCase() + title.slice(1) : 'Last Seen'}
          </TableSortLabel>
        </TableCell>
      ))}
      <TableCell></TableCell>
    </TableRow>
  );
};

export default ToolBar;