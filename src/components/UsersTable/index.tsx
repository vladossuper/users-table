import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { StyledTableCell } from './StyledTableCell';
import { CustomTableRow } from './TableRow';

interface IUser {
    id: string,
    time: string,
    name: string,
    status: boolean
}

type UsersTableProps = {
    users: IUser[] | null,
    header: Array<string>,
    changeStatus(users: IUser[], id: string): any
}

export const UsersTable = ({ users, header, changeStatus }: UsersTableProps) => {

    const changeUserStatus = (users: IUser[] , id: string) => changeStatus(users, id);
    
    return (
        <>
        <Table>
            <TableHead>
                <TableRow>
                    {header.map((item, index) => (
                        <StyledTableCell key={index} align='center'>{item}</StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {users && users.map(user => (
                    <CustomTableRow key={user.id} user={user} changeUserStatus={() => changeUserStatus(users, user.id)} />
                ))}
            </TableBody>
        </Table>
        </>
    )
}