import { useState } from "react";
import { IconButton, Menu, MenuItem, Select, FormControl, InputLabel, InputAdornment, Box, Button, SelectChangeEvent, OutlinedInput } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterToolsProps {
  onSearch: (searchText: string) => void;
  onFilter: (status: string) => void;
  onReset: () => void;
}

const FilterTools: React.FC<FilterToolsProps> = ({ onSearch, onFilter, onReset }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [status, setStatus] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setMenuAnchorEl(null);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setStatus(value);
    onFilter(value);
    handleFilterClose();
  };

  const handleReset = () => {
    setSearchText("");
    setStatus("");
    onReset();
    handleFilterClose();
  };

  return (
    <Box display="flex" alignItems="center" flexGrow={1}>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          sx={{ height: '35px', fontSize: '13px', margin: '8px' }}
          value={searchText}
          onChange={handleSearchChange}
          endAdornment={
              <InputAdornment position="end">
                <IconButton sx={{ height: 12, width: 12 }} onClick={handleFilterClick}>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
          }
          fullWidth
        />
      </FormControl>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              label="Status"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value=""><em>No Selection</em></MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <Button onClick={handleReset} variant="contained">
            Reset Filter
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterTools;