console.log('JS is running');
let totalSalary = 0;
let empList = [];

function submitValues(event) {
    event.preventDefault();
    let newFirstName = document.getElementById('firstName').value;
    let newLastName = document.getElementById('lastName').value;
    let newId = document.getElementById('idNumber').value;
    let newTitle = document.getElementById('jobTitle').value;
    let newSalary = Number(document.getElementById('salaryInput').value);
    let newTableRow = document.getElementById('showEmployees');

    clearErrors();
    // pushing the gathered info into an array to be value-checkd
    empList.push(newFirstName);
    empList.push(newLastName);
    empList.push(newId);
    empList.push(newTitle);
    empList.push(newSalary);
    console.log(empList);

    if(checkValues(empList) === true){
        // only adds data to the table if true
        // otherwise gives error messages and asks user to retry data entry
    // sends data into the table on the DOM
    newTableRow.innerHTML += ` 
    <tr>
    <td>${newFirstName}</td>
    <td>${newLastName}</td>
    <td>${newId}</td>
    <td>${newTitle}</td>
    <td>${newSalary}</td>
    <td><button onClick="removeEmpl(event)">Delete</button></td>
    </tr>
    `
    calcTotalSalary(newSalary);
    }
}

//checks for missing input values or incorrect types
function checkValues(list){
    let  truthValue = true;
    if(empList[0] === ''){
        document.querySelector('#firstName').classList.add('required');
        document.querySelector('.comments').innerHTML += `* First Name required <br>`;
        truthValue = false;
    }
    if(empList[1] === ''){
        document.querySelector('#lastName').classList.add('required');
        document.querySelector('.comments').innerHTML += `* Last Name required<br>`;
        truthValue = false;
    }
    if(empList[2] === ''){
        document.querySelector('#idNumber').classList.add('required');
        document.querySelector('.comments').innerHTML += `* ID Number required<br>`;
        truthValue = false;
    }
    if(isNaN(empList[2])){
                document.querySelector('#idNumber').classList.add('required');
                document.querySelector('.comments').innerHTML += `* Enter a number for the ID<br>`;
                truthValue = false;
        }
    if(empList[3] === ''){
        document.querySelector('#jobTitle').classList.add('required');
        document.querySelector('.comments').innerHTML += `* Job Title required<br>`;
        truthValue = false;
    }
    console.log(empList[4]);
    if(empList[4] === '' || empList[4] === 0){
        document.querySelector('#salaryInput').classList.add('required');
        document.querySelector('.comments').innerHTML += `* Salary required<br>`;
        truthValue = false;
    }
    else if(isNaN(empList[4])){
        document.querySelector('#salaryInputs').classList.add('required');
        document.querySelector('.comments').innerHTML += `* Salary must be a number<br>`;
        truthValue = false;
    }
    if (truthValue === false){
        document.querySelector('.comments').innerHTML += `<br>Enter all the info again`;
    } 
    resetBoxes();
    empList = [];  //reset the employee list to empty
    return truthValue;
}

// clears the input fields
function resetBoxes(){
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('idNumber').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('salaryInput').value = '';
}

//clears the displayed errors once user re-enters data
function clearErrors(){
    document.querySelector('#firstName').classList.remove('required');
    document.querySelector('#lastName').classList.remove('required');
    document.querySelector('#idNumber').classList.remove('required');
    document.querySelector('#jobTitle').classList.remove('required');
    document.querySelector('#salaryInput').classList.remove('required');
    document.querySelector('.comments').innerHTML = ``;

}

// removes an employee and associated data
// also recalculates the total monthly cost
function removeEmpl(event){
 //   if (confirm(`Are you sure you want to delete this?`)){
    let salaryChange = Number(event.target.parentElement.parentElement.children[4].innerText) * -1;
    calcTotalSalary(salaryChange);
    event.target.parentElement.parentElement.remove();
 //   }
}

function calcTotalSalary(amount){
    totalSalary = totalSalary + Math.round((amount)/12 *100)/100;
    let stringSalary = totalSalary.toLocaleString();
    document.getElementById('total').innerHTML =`
    ${stringSalary}`
    if(totalSalary > 20000){
        document.querySelector('footer').classList = 'over-budget';
    }
    else {document.querySelector('footer').classList = 'budget';}
}
