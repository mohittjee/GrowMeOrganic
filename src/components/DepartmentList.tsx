import React, { useState } from 'react';
import { Box, Checkbox, List, ListItem, ListItemText, IconButton, Drawer, AppBar, Toolbar, Typography, Divider, IconButton as MUIIconButton } from '@mui/material';
import { ExpandMore, ExpandLess, Menu } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const departments: Department[] = [
  { id: 1, name: 'Customer Service', subDepartments: [{ id: 3, name: 'Support' }, { id: 4, name: 'Customer Success' }] },
  { id: 2, name: 'Design', subDepartments: [{ id: 5, name: 'Graphic Design' }, { id: 6, name: 'Product Design' }, { id: 7, name: 'Web Design' }] }
];

const drawerWidth = 260;

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = (id: number) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleSelect = (id: number, isSub: boolean = false) => {
    const subDeps = departments.find(dep => dep.id === id)?.subDepartments?.map(sub => sub.id) || [];

    if (isSub) {
      setSelected(prev => {
        const newSelected = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
        const parent = departments.find(dep => dep.subDepartments?.some(sub => sub.id === id));
        if (parent) {
          const parentSelected = parent.subDepartments?.every(sub => newSelected.includes(sub.id));
          return parentSelected ? [...newSelected, parent.id] : newSelected.filter(s => s !== parent.id);
        }
        return newSelected;
      });
    } else {
      setSelected(prev => {
        if (prev.includes(id)) {
          return prev.filter(s => s !== id && !subDeps.includes(s));
        } else {
          return [...prev, id, ...subDeps];
        }
      });
    }
  };

  const renderDepartment = (department: Department, isSub: boolean = false) => {
    const isSelected = selected.includes(department.id);
    const isExpanded = expanded.includes(department.id);

    let childCountInfo = '';
    if (!isSub && department.subDepartments) {
      const childCount = department.subDepartments.length;
      childCountInfo = `(${childCount})`;
    }

    return (
      <React.Fragment key={department.id}>
        <ListItem sx={{ pl: isSub ? 8 : 0 }}>
          {!isSub && (
            <IconButton onClick={() => handleToggle(department.id)}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
          <Checkbox
            checked={isSelected}
            onChange={() => handleSelect(department.id, isSub)}
            sx={{
              '&.Mui-checked': {
                color: !isSub ? 'sky-blue' : 'inherit', 
              },
            }}
          />
          <ListItemText primary={department.name + (childCountInfo ? ` ${childCountInfo}` : '')} />
        </ListItem>
        {isExpanded && department.subDepartments && (
          <List component="div" disablePadding>
            {department.subDepartments.map(sub => renderDepartment(sub, true))}
          </List>
        )}
      </React.Fragment>
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {departments.map(department => renderDepartment(department))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <MUIIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </MUIIconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            DASHBOARD [Component 1 & 2]
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default DepartmentList;
