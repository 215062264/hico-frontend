import axios from 'axios';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';

export default function EmployeeTable() {

    const [data, setData] = useState([]);
    const url = 'http://localhost:8080/employees/';
    
    const tableHeading = [
        "Employee #",
        "First Name",
        "Last Name",
        "Salutation",
        "Profile Color"
    ];

    const tableBody = [];

    if(data){
        data.map((employee) => (
            tableBody.push([
                employee.employeeNumber,
                employee.firstName,
                employee.lastName,
                employee.salutation,
                employee.empProfileColor
            ])
        ))
    }


    const loadData = async() =>{
        await axios.get(url).then((response) => {
            setData(response.data);
        }).catch(function (error){
            console.log(error);
        })
        
    }

    //Fetch and display employee data on application start-up
    useEffect(() => {
        loadData();
    },[]);

    console.log("data: ", data);

    return(
        <div>
            <h2 style={{margin:'auto', padding:'1%'}}>Current Employees</h2>
            <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto' }}>
            <TableContainer sx={{ maxHeight: 220 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableHeading.map((head, i) => (
                                <TableCell key={i}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody.map((employee, i) => {
                            return(
                                <TableRow key={i}>
                                    {
                                        employee.map((i)=> {
                                            return <TableCell key={i}>{i}</TableCell>
                                        })
                                    }
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    )
    
}

