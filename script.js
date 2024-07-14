console.log('JS is running');
let totalSalary = 0;

function submitValues(event) {
    console.log('in submit values');
    event.preventDefault();
    let newFirstName = document.getElementById('firstName').value;
    let newLastName = document.getElementById('lastName').value;
    let newId = document.getElementById('idNumber').value;
    let newTitle = document.getElementById('jobTitle').value;
    let newSalary = Number(document.getElementById('salaryInput').value);
    let newTableRow = document.getElementById('showEmployees');
    
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('idNumber').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('salaryInput').value = '';

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

function removeEmpl(event){
    event.target.parentElement.parentElement.remove()
}

function calcTotalSalary(amount){
    totalSalary = totalSalary + Math.round((amount)/12 *100)/100;
    console.log(totalSalary);
    document.getElementById('total').innerHTML =`
    ${totalSalary}`
    if(totalSalary > 20000){
        document.querySelector('footer').classList = 'over-budget';
    }
    else {document.querySelector('footer').classList = 'budget';}
}
