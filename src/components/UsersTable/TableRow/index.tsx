import { useState, useEffect } from 'react';
import { TableRow, Switch } from '@material-ui/core';
import { StyledTableCell } from '../StyledTableCell';
import moment from 'moment';

interface IUser {
    id: string,
    time: string,
    name: string,
    status: boolean
}

type TableRowProps = {
    user: IUser,
    changeUserStatus(): any
}

export const CustomTableRow = ({ user, changeUserStatus }: TableRowProps) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
      });

    function calculateTimeLeft() {
        let difference =  +moment() - +moment(user.time);

        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
      }
    
      return timeLeft;
    
    }

    return (
        <TableRow>
            <StyledTableCell align='center'>
                {`days: ${timeLeft.days}, 
                hours: ${timeLeft.hours}, 
                minutes: ${timeLeft.minutes}, 
                seconds: ${timeLeft.seconds}`}
            </StyledTableCell>
            <StyledTableCell align='center'>{user.name}</StyledTableCell>
            <StyledTableCell align='center'>
                {user.status ? 'Active' : 'Disabled'}
            </StyledTableCell>
            <StyledTableCell align='center'>
                <Switch
                    checked={user.status}
                    onChange={changeUserStatus  }
                    name="setActive"
                    color="primary"
                /> 
            </StyledTableCell>
        </TableRow>
    )
}