import { useState } from "react";
import Agent from "./Agent";
import ToolBar from "./Toolbar";
import AddAndEditDialog from "./AddAndEditDialog";
import { Button, Table, TableBody, TableContainer, TableHead, Paper } from "@mui/material";
import { statusOrder } from "../constant";
import { mockData } from "../assets/mockData";
import { AgentType } from "../types";

// manually set the order of priority and status
const getOrderValue = (orderBy: string, value: string) => {
  if (orderBy === 'completionStatus') {
    return statusOrder[value];
  }
  return value;
};

const TableView: React.FC = () => {
  const toolBarTitles: Array<keyof AgentType> = ['name', 'email', 'status', 'lastSeen'];
  const [agents, setAgents] = useState<AgentType[]>(mockData);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof AgentType>('name');
  const [open, setOpen] = useState<boolean>(false);

  const handleRequestSort = (property: keyof AgentType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAgents = agents.sort((a, b) => {
    const aValue = getOrderValue(orderBy, String(a[orderBy]));
    const bValue = getOrderValue(orderBy, String(b[orderBy]));
    return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
  });

  const handleCreateAgent = (agent: AgentType) => {
    setAgents([...agents, agent]);
  };

  const handleEditAgent = (updatedAgent: AgentType) => {
    const index = agents.findIndex(agent => agent.id === updatedAgent.id);
    setAgents([...agents.slice(0, index), updatedAgent, ...agents.slice(index + 1)]);
  };

  const handleDeleteAgent = (id: number) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Agent</Button>
        <AddAndEditDialog
          isEditMode={false}
          newID={agents.length + 1}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreateAgent}
        />
        <Table>
          <TableHead>
            <ToolBar
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              toolBarTitles={toolBarTitles}
            />
          </TableHead>
          <TableBody>
            {sortedAgents.map((agent, index) => (
              <Agent
                key={index}
                handleEditAgent={handleEditAgent}
                handleDeleteAgent={handleDeleteAgent}
                agent={agent}
                toolBarTitles={toolBarTitles}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableView;