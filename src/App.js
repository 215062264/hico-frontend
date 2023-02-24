import './App.css';
import EmployeeTable from './api/EmployeeTable';
import EmployeeForm from './api/EmployeeForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmployeeTable/>
        <EmployeeForm/>
      </header>
    </div>
  );

}

export default App;
