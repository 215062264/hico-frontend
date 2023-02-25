import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Loader from '../loader/loader';



const defaultValues = {
  firstName: "",
  lastName: "",
  salutation: "",
  gender: "",
  employeeNumber: 0,
  salary: "",
  fullName: "",
  empProfileColor: "default",
  loading: false,
};


const EmployeeForm = () => {

  const url = 'http://localhost:8080/employees/save';

  const [formValues, setFormValues] = useState(defaultValues);


  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({...formValues,[name]: value, });
  };

  const refresh = () => window.location.reload(true);


  const handleReset = (e) => {
    e.preventDefault();
   setFormValues(defaultValues);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormValues({loading: true});

    //Format the salary from String to Int and remove white space
    let formattedData = formValues;
    let sal = formattedData.salary.trim().replace(/\s/g, '');
    formattedData.salary = parseInt(sal);
    console.log('formattedData: ', formattedData);
   
    await axios.post(url,formattedData)
    .then((response) => {
        setFormValues(defaultValues);
        let employee = response.data;
        console.log('Employee Object: ',employee);
    }).catch(function (error){
        console.log(error);
    })
  };

  if(formValues.loading){
    return <Loader name="loading" value={formValues.loading}/>
  }

  return (

    <Paper
      sx={{ width: "80%", overflow: "hidden", margin: "auto", marginTop: "1%" }}
    >
      <form onSubmit={handleSubmit}>
        <h2 style={{ margin: "auto", padding: "1%" }}>Employee Information</h2>

        <div style={{ float: "left", marginLeft: "1%" }}>
          <div className="form-group">
            <FormLabel>First Name(s)* </FormLabel>
            <TextField
              id="firstname-input"
              name="firstName"
              label="First Name"
              size="small"
              type="text"
              style={{ width: 400 }}
              required
              value={formValues.firstName ? formValues.firstName : ''}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel>Last Name* </FormLabel>
            <TextField
              id="laststname-input"
              name="lastName"
              label="Last Name"
              size="small"
              type="text"
              style={{ width: 400 }}
              required
              value={formValues.lastName ? formValues.lastName : ''}
              onChange={handleInputChange}
            />
          </div>
          <br />

          <div className="form-group">
            <FormLabel>Salutation* </FormLabel>
            <Select
              id="salutation-input"
              name="salutation"
              size="small"
              style={{ width: 400 }}
              value={formValues.salutation ? formValues.salutation : ''}
              onChange={handleInputChange}
            >
              <MenuItem key="dr" value="Dr">
                Dr
              </MenuItem>
              <MenuItem key="mr" value="Mr">
                Mr
              </MenuItem>
              <MenuItem key="ms" value="Ms">
                Ms
              </MenuItem>
              <MenuItem key="mrs" value="Mrs">
                Mrs
              </MenuItem>
              <MenuItem key="mx" value="Mx">
                Mx
              </MenuItem>
            </Select>
          </div>

          <br />
          <FormControl>
            <div className="form-group">
              <FormLabel style={{ float: "left", marginRight: "1%", width:'50%' }}>
                Gender
              </FormLabel>
              <RadioGroup
                id="gender-input"
                name="gender"
                value={formValues.gender ? formValues.gender : ''}
                onChange={handleInputChange}
                style={{ width: 400 }}
                row
              >
                <FormControlLabel
                  key="male"
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  key="female"
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  key="unspecified"
                  value="unspecified"
                  control={<Radio size="small" />}
                  label="Unspecified"
                />
              </RadioGroup>
            </div>
          </FormControl>

          <br/><br/>
          <div className="form-group">
            <FormLabel>Employee # * </FormLabel>
            <TextField
              id="employeeNumber-input"
              name="employeeNumber"
              label="Employee #"
              type="number"
              size="small"
              style={{ width: 400, marginBottom:'2%' }}
              required
              value={formValues.employeeNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div style={{ float: "right", marginRight: "1%", width:'50%'}}>

          <Button  style={{ marginRight: '2%', color:'#000000', backgroundColor:'#D3D3D3' }} variant="outlined" type="submit" 
          onClick={handleReset}>
            Cancel
          </Button>
            
          <Button  style={{ background: formValues.empProfileColor, color:'#000000' }} variant="outlined" type="submit" onClick={refresh}>
            Save
          </Button>
          <br/><br/><br/>

          <div className="form-group">
            <FormLabel>Full Name </FormLabel>
            <TextField
              id="fullName-input"
              name="fullName"
              label="Full Name"
              size="small"
              type="text"
              style={{ width: 400 }}
              disabled
              value={{...formValues}.firstName.concat(' ',{...formValues}.lastName)}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel>Gross Salary $PY </FormLabel>
            <TextField
              id="salary-input"
              name="salary"
              label="Gross Salary PY"
              size="small"
              type="text"
              style={{ width: 400, marginRight: "1%" }}
              required
              value={formValues.salary ? formValues.salary : ""}
              onChange={(e) => {setFormValues({
                ...formValues,
                salary : e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
              })}}
            />
          </div>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Employee Profile Color</FormLabel>
            <FormGroup
              aria-label="position"
              id="empProfileColor-input"
              row>

            <FormControlLabel control={<Checkbox />} checked={formValues.empProfileColor === "Green"} onChange={handleInputChange} name="empProfileColor" value="Green" label="Green" labelPlacement="end"/>
            <FormControlLabel control={<Checkbox />} checked={formValues.empProfileColor === "Blue"} onChange={handleInputChange} name="empProfileColor" value="Blue" label="Blue" labelPlacement="end"/>
            <FormControlLabel control={<Checkbox />} checked={formValues.empProfileColor === "Red"} onChange={handleInputChange} name="empProfileColor" value="Red" label="Red" labelPlacement="end"/>
            <FormControlLabel disabled control={<Checkbox />} checked={formValues.empProfileColor === "Default"} onChange={handleInputChange} name="empProfileColor" value="Default" label="Default" labelPlacement="end"/>
    
            </FormGroup>
          </FormControl>
        </div>
      </form>
    </Paper>
  );
};
export default EmployeeForm;
