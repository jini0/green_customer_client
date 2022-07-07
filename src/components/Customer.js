import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Link } from "react-router-dom";

const Customer = ({customer}) => {
    return (      
            <TableRow>
                <TableCell>{customer.no}</TableCell>
                {/* <TableCell><Link to="/detailview/1">{customer.name}</Link></TableCell> */}
                <TableCell><Link to={`/customer/${customer.no}`}>{customer.name}</Link></TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.birth}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                {/* 1. */}
                {/* <TableCell>{customer.add}</TableCell> */}
                {/* 2. */}
                <TableCell>{customer.add1} {customer.add2}</TableCell>
            </TableRow>      
    );
};

export default Customer;