import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { FC } from "react";
import { TaskType } from "../types";

interface ToolBarProps {
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort: (property: keyof TaskType) => void;
}

const ToolBar: FC<ToolBarProps> = ({ order, orderBy, onRequestSort }) => {
  const toolBarTitles: Array<keyof TaskType> = ['name', 'email', 'status', 'lastSeen'];
  const createSortHandler = (property: keyof TaskType) => () => {
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