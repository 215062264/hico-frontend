import axios from 'axios';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';


const defaultValues = {
    firstName: "",
    lastName: "",
    salutation: "",
    gender: "",
    employeeNumber: "",
    salary: "",
    fullName: "",
    empProfileColor: "default",
  };


export default function EmployeeTable() {

    const [data, setData] = useState([]);
    const [formValues, setFormValues] = useState(defaultValues);

    const url = 'http://localhost:8080/employees/';
    const postUrl = 'http://localhost:8080/employees/save';
    
    let clickedEmployee = {};

    const tableBody = [];

    const tableHeading = [
        "Employee #",
        "First Name",
        "Last Name",
        "Salutation",
        "Profile Color"
    ];

    //Fetch and display employee data on application start-up
    useEffect(() => {
        const loadData = async() => {
            await axios.get(url).then((response) => {
                setData(response.data);
            }).catch(function (error){
                console.log(error);
            })
            
        }
        loadData();
    },[]);

    if(data){
        data.map((employee) => (
            tableBody.push([
                employee.employeeNumber,
                employee.firstName,
                employee.lastName,
                employee.salutation,
                employee.empProfileColor,
            ])
        ))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({...formValues,[name]: value, });
      };

      const handleReset = (e) => {
        e.preventDefault();
       setFormValues(defaultValues);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        //Format the salary from String to Int and remove white space
        let formattedData = formValues;
        let sal = formattedData.salary.trim().replace(/\s/g, '');
        formattedData.salary = parseInt(sal);
        //console.log('formattedData: ', formattedData);
       
        await axios.post(postUrl,formattedData)
        .then((response) => {
            setFormValues(defaultValues);
            let employee = response.data;
            console.log('Employee Object: ',employee);
        }).catch(function (error){
            console.log(error);
        })
      };

      function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

      const handleRecordClicked = (i) => {
        clickedEmployee={...data.at(i)}
        //format salary
        var num = clickedEmployee.salary;
        clickedEmployee.salary = numberWithSpaces(num);
        //console.log('clickedEmployee:', clickedEmployee);
        setFormValues( clickedEmployee );
      }

    return(
        <div>
            <h2 style={{margin:'auto', padding:'1%'}}>Current Employees</h2>
            <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto' }}>
            <TableContainer sx={{ maxHeight: 220 }}>
                <Table stickyHeader aria-label="sticky table" sx={{ "& .MuiTableRow-root:hover": {backgroundColor: "#D3D3D3"} }}>
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
                                <TableRow style={{ cursor:'pointer' }} key={i} onClick={()=> {
                                    handleRecordClicked(i)
                                }}>
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

            <EmployeeForm 
                formValues={formValues}
                setFormValues={setFormValues} 
                handleInputChange={handleInputChange} 
                handleReset={handleReset} 
                handleSubmit={handleSubmit}
            />
        </div>
    )
    
}

