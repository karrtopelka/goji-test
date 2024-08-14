'use client';

import { useGroceryItemsContext } from '@/contexts';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { GroceryForm } from './grocery-form';

export const GroceryList = () => {
  const { groceryItems, deleteItem, updateItem } = useGroceryItemsContext();
  const [activeItem, setActiveItem] = useState<null | string>(null);

  const handleCloseModal = () => {
    setActiveItem(null);
  };

  return (
    <>
      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 4,
          p: 4,
        }}>
        <Typography variant='h6' component='h2'>
          Grocery List
        </Typography>
        <Box mt={2}>
          {groceryItems.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 800, overflow: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        right: 0,
                        background: 'inherit',
                      }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groceryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ maxWidth: 150 }}>
                        <Tooltip title={item.name}>
                          <Typography noWrap>{item.name}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell
                        sx={{
                          position: 'sticky',
                          right: 0,
                          background: 'inherit',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 2,
                        }}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => setActiveItem(item.id)}
                          sx={{ mr: 1 }}>
                          Update
                        </Button>
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteItem(item.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No items in the list.</Typography>
          )}
        </Box>
      </Box>
      <Modal open={!!activeItem} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h6' component='h2'>
              Update Grocery Item
            </Typography>
            <Tooltip title='Close'>
              <IconButton color='primary' onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <GroceryForm
            item={groceryItems.find((item) => item.id === activeItem)!}
            onClose={handleCloseModal}
            showReset={false}
            showDelete={true}
          />
        </Box>
      </Modal>
    </>
  );
};
