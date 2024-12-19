const { contextBridge, ipcRenderer } = require("electron");
const globals = require("../../globals");
const Employees = require("../../models/Employees");

const employees = new Employees(globals.URI, globals.DB_NAME);

let gotEmployeeCallback;

let getEmployees = () => {
  console.log(`mainPreload > getEmployees`);

  employees.getEmployees().then((res) => {
    gotEmployeeCallback(res);
  });
};

let gotEmployees = (callback) => {
  gotEmployeeCallback = callback;
};

let saveEmployee = (employee) => {
  console.log(
    `mainPreload > name:${employee.name}, Position:${employee.position}, Salary:${employee.salary}`
  );
  return employees.addEmployee(employee);
};

contextBridge.exposeInMainWorld("api", {
  getEmployees,
  gotEmployees,
  saveEmployee,
});
