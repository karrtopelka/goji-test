'use client';

import {
  useDeleteGroceryItem,
  useGroceryItem,
  useGroceryItems,
  useUpdatePartialByIdGroceryItem,
} from '@/hooks';
import { GroceryItem } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
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
  const [activeItem, setActiveItem] = useState<undefined | string>(undefined);
  const { data: groceryItems } = useGroceryItems();
  const { data: selectedItem } = useGroceryItem({ id: activeItem });
  const { mutateAsync: deleteItem } = useDeleteGroceryItem();
  const { mutateAsync: updatePartial } = useUpdatePartialByIdGroceryItem();

  const handleCloseModal = () => {
    setActiveItem(undefined);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    handleCloseModal();
  };

  const handleUpdatePartial = async (id: string, data: Partial<GroceryItem>) => {
    await updatePartial({ id, data });
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
          {!!groceryItems && !!groceryItems.length ? (
            <TableContainer component={Paper} sx={{ maxHeight: 800, overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Bought</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groceryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={item.bought}
                          onChange={() => handleUpdatePartial(item.id, { bought: !item.bought })}
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 150 }}>
                        <Tooltip title={item.name}>
                          <Typography
                            sx={{
                              textDecoration: item.bought ? 'line-through' : 'none',
                            }}
                            noWrap>
                            {item.name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell
                        sx={{
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
                          onClick={() => handleDelete(item.id)}>
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
      <Modal open={!!selectedItem} onClose={handleCloseModal}>
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
            item={selectedItem!}
            onClose={handleCloseModal}
            showReset={false}
            onDelete={(id) => handleDelete(id)}
          />
        </Box>
      </Modal>
    </>
  );
};
