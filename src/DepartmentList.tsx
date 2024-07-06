import React, { useState } from 'react';
import { Box, Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const departments: Department[] = [
  { id: 1, name: 'Customer Service', subDepartments: [{ id: 3, name: 'Support' }, { id: 4, name: 'Customer Success' }] },
  { id: 2, name: 'Design', subDepartments: [{ id: 5, name: 'Graphic Design' }, { id: 6, name: 'Product Design' }, { id: 7, name: 'Web Design' }] }
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleSelect = (id: number, isSub: boolean = false) => {
    if (isSub) {
      setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    } else {
      const subDeps = departments.find(dep => dep.id === id)?.subDepartments?.map(sub => sub.id) || [];
      if (selected.includes(id)) {
        setSelected(prev => prev.filter(s => s !== id && !subDeps.includes(s)));
      } else {
        setSelected(prev => [...prev, id, ...subDeps]);
      }
    }
  };

  const renderDepartment = (department: Department, isSub: boolean = false) => {
    const isSelected = selected.includes(department.id);
    const isExpanded = expanded.includes(department.id);

    return (
      <React.Fragment key={department.id}>
        <ListItem>
          <IconButton onClick={() => handleToggle(department.id)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Checkbox checked={isSelected} onChange={() => handleSelect(department.id, isSub)} />
          <ListItemText primary={department.name} />
        </ListItem>
        {isExpanded && department.subDepartments && (
          <List component="div" disablePadding>
            {department.subDepartments.map(sub => renderDepartment(sub, true))}
          </List>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: '300px', margin: 'auto', mt: 2 }}>
      <List>
        {departments.map(department => renderDepartment(department))}
      </List>
    </Box>
  );
};

export default DepartmentList;
