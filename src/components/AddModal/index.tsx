import { useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    TextField 
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

interface IUser {
    id: string,
    name: string,
    time: string,
    status: boolean
}   

interface IAddModalProps {
    visible: boolean,
    onClose(): any,
    onSave(user: IUser): any 
}

export const AddModal = ({ visible, onClose, onSave }: IAddModalProps) => {
    const [user, handleChangeUser] = useState<IUser>({
        id: uuidv4(),
        name: '',
        time: '',
        status: false
    });
    const [error, handleError] = useState<boolean>(false);
    const [helperText, handleHelperText] = useState<string>('');

    const resetUser = () => {
        handleChangeUser({ ...user, id: uuidv4(), name: '', time: '' });
    }

    const handleSave = () => {
        if (user.name.length > 0) {
            const userCopy = { ...user, time: moment().format() };
            onSave(userCopy);
            onClose();
            resetUser();
        } else {
            handleError(true);
            handleHelperText('This field is required!');
        }
    }

    const handleClose = () => {
        onClose();
        resetUser();
    }

    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: name } = event.target;
        handleChangeUser({ ...user, name });
        if (name.length > 0) {
            handleError(false);
            handleHelperText(''); 
        } else {
            handleError(true);
            handleHelperText('This field is requiered!'); 
        }
    }

    return (
        <Dialog fullWidth open={visible} onClose={handleClose}>
            <DialogTitle>Add user</DialogTitle>
            <DialogContent>
                <TextField 
                    fullWidth
                    label='User name' 
                    value={user.name} 
                    required
                    error={error}
                    helperText={helperText}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => handleUserName(event)
                    } 
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Add
                </Button>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}  
