import { useContext, useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button } from '@material-ui/core'
import { UsersStore } from '../../store';
import { UsersTable } from '../../components/UsersTable';
import { AddModal } from '../../components/AddModal';
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
  const store = useContext(UsersStore);

  const { usersList, fetchUsers, setUser, changeStatus } = store;
  const header = [ 'Elapsed time', 'Name', 'Status', 'Change Status' ];

  const [userModalVisible, handleUserModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]);

  if (!usersList) {
      return (
        <CircularProgress />
      )
  }

  return (
    <div>
        <Typography variant='h3'>Users Table</Typography>

        <Box paddingTop={2}>
            <Button 
                variant='contained' 
                color='primary' 
                onClick={() => handleUserModalVisible(true)}
            >
                Add new user
            </Button>
        </Box>
        
        <Box paddingTop={2}>
            {usersList.length > 0 ? 
                <UsersTable users={usersList} header={header} changeStatus={changeStatus} /> : 
                <Typography variant='h6'>No users!</Typography>
            }
        </Box>

        <AddModal 
            visible={userModalVisible} 
            onClose={() => handleUserModalVisible(false)}
            onSave={setUser}
        />
    </div>
  );
});