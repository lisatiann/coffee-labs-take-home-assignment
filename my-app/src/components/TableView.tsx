import { useState } from "react";
import Agent from "./Agent";
import ToolBar from "./Toolbar";
import AddAndEditDialog from "./AddAndEditDialog";
import FilterTools from "./FilterTools";
import { Button, Table, TableBody, TableContainer, TableHead, Paper, Box, Typography, useTheme } from "@mui/material";
import { statusOrder } from "../constant";
import { useAgentContext } from "../context/AgentContext";
import { AgentType } from "../types";

// manually set the order of priority and status
const getOrderValue = (orderBy: string, value: string) => {
  if (orderBy === 'completionStatus') {
    return statusOrder[value];
  }
  return value;
};

const TableView: React.FC = () => {
  const { agents } = useAgentContext();
  const theme = useTheme();
  const toolBarTitles: Array<keyof AgentType> = ['name', 'email', 'status', 'lastSeen'];
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof AgentType>('name');
  const [open, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const handleRequestSort = (property: keyof AgentType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleReset = () => {
    setSearchText("");
    setFilterStatus("");
  };

  const handleAddAgent = () => {
    setOpen(true);
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchText.toLowerCase()) || agent.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? agent.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const sortedAgents = filteredAgents.sort((a, b) => {
    const aValue = getOrderValue(orderBy, String(a[orderBy]));
    const bValue = getOrderValue(orderBy, String(b[orderBy]));
    return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Typography sx={{ marginTop: "16px" }} variant="h5" gutterBottom>
          <span
            style={{ 
              border: `2px solid ${theme.palette.primary.main}`, 
              padding: "8px", 
              borderRadius: "8px", 
              color: theme.palette.primary.main,
            }}
          >
            Agent Management
          </span>
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="8px">
          <FilterTools onSearch={handleSearch} onFilter={handleFilter} onReset={handleReset} />
          <Button sx={{ margin: "8px" }} variant="contained" color="primary" onClick={handleAddAgent}>
            Add Agent
          </Button>
        </Box>
        <AddAndEditDialog
          isEditMode={false}
          newID={agents.length + 1}
          open={open}
          onClose={() => setOpen(false)}
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