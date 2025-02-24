import { useState } from "react";
import Task from "./Task";
import ToolBar from "./Toolbar";
import AddAndEditDialog from "./AddAndEditDialog";
import { Button, Table, TableBody, TableContainer, TableHead, Paper } from "@mui/material";
import { statusOrder } from "../constant";
import { mockData } from "../assets/mockData";
import { TaskType } from "../types";

// manually set the order of priority and status
const getOrderValue = (orderBy: string, value: string) => {
  if (orderBy === 'completionStatus') {
    return statusOrder[value];
  }
  return value;
};

const TableView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>(mockData);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof TaskType>('name');
  const [open, setOpen] = useState<boolean>(false);

  const handleRequestSort = (property: keyof TaskType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const aValue = getOrderValue(orderBy, String(a[orderBy]));
    const bValue = getOrderValue(orderBy, String(b[orderBy]));
    return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
  });

  const handleCreateTask = (task: TaskType) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Task</Button>
        <AddAndEditDialog
          newID={tasks.length + 1}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreateTask}
        />
        <Table>
          <TableHead>
            <ToolBar
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          </TableHead>
          <TableBody>
            {sortedTasks.map((task, index) => (
              <Task
                key={index}
                name={task.name}
                email={task.email}
                completionStatus={task.status}
                lastSeen={task.lastSeen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableView;