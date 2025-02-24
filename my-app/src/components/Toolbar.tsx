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
        <TableCell key={index}>
          <TableSortLabel
            active={orderBy === title.toLowerCase()}
            direction={orderBy === title.toLowerCase() ? order : 'asc'}
            onClick={createSortHandler(title)}
          >
            {title}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ToolBar;