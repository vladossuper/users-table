import { TableCell } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor:  '#aaaaaa',
            color: theme.palette.common.white,
            fontWeight: 'bold'
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);
