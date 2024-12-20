window.addEventListener("load", () => {
  // event handelling
  // save button
  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", btnSaveClick);

  // get button
  const btnGet = document.getElementById("btnGet");
  btnGet.addEventListener("click", btnGetClick);

  // callbacks
  window.api.gotEmployees(gotEmployees);
  window.api.gotEmployeeUpdatedResult(gotEmployeeUpdatedResult);
  window.api.gotDeletedResult(gotDeletedResult);
});

let employeeData = {};

const gotEmployees = (employees) => {
  employeeData = employees;
  console.log("mainview  gotEmployees");

  var empData = employees
    .map((employee) => {
      var res = `<tr>
    <td>${employee.name}</td>
    <td>${employee.position}</td>
    <td>${employee.salary}</td>
    <td><input type="button" class="button is-danger is-small" onclick="Delete('${employee.id}')" value="Delete" /></td>
    <td><input type="button" class="button is-primary is-small" onclick="Edit('${employee.id}')" value="Edit Employee" /></td>
    <tr>`;

      return res;
    })
    .join("");

  var tdData = document.getElementById("tbEmployees");
  tdData.innerHTML = empData;
};

const btnGetClick = (event) => {
  console.log("button clicked!");
  event.preventDefault(); //cause I don't want page reload
  window.api.getEmployees(); //fucn is in mainpreload.js
};

const btnSaveClick = (event) => {
  console.log("Save button clicked");
  event.preventDefault();

  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;
  const empId = document.getElementById("empId").value;

  console.log(
    `Salary: ${salary} , Name:${name}, Position : ${position}, empId:${empId}`
  );

  if (empId == "") {
    window.api.saveEmployee({ name, position, salary }).then(() => {
      alert("Record saved!");
    });
  } else {
    window.api.updateEmployee(empId, { name, position, salary });
  }
  window.api.getEmployees(); //testing
};

const gotDeletedResult = (result) => {
  if (result) {
    alert("Record deleted successfully");
  }
  window.api.getEmployees(); //testing
};

// Delete button
function Delete(empId) {
  console.log(`mainView > Delete : ${empId}`);
  window.api.deleteEmployees(empId);
}

// Edit button
function Edit(empId) {
  const emp = employeeData.find((employee) => employee.id === empId);

  const inputId = document.getElementById("empId");
  const name = document.getElementById("name");
  const position = document.getElementById("position");
  const salary = document.getElementById("salary");

  inputId.value = empId;
  name.value = emp.name;
  position.value = emp.position;
  salary.value = emp.salary;
}

const gotEmployeeUpdatedResult = (result) => {
  if (result) {
    window.api.getEmployees();
  }
};
