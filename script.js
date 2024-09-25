// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const peopleInputsDiv = document.getElementById('people-inputs');
    const addPersonButton = document.getElementById('add-person');
    const expenseForm = document.getElementById('expense-form');
    let personCount = 0;

    // Add a new person input field
    addPersonButton.addEventListener('click', () => {
        personCount++;
        const newPersonDiv = document.createElement('div');
        newPersonDiv.innerHTML = `
            <label for="person${personCount}">Person ${personCount}:</label>
            <input type="text" id="person${personCount}" placeholder="Name" required>
            <input type="number" id="expense${personCount}" placeholder="Expense" required>
            <br><br>
        `;
        peopleInputsDiv.appendChild(newPersonDiv);
    });

    // Calculate the share when the form is submitted
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const names = [];
        const expenses = [];
        for (let i = 1; i <= personCount; i++) {
            const name = document.getElementById(`person${i}`).value;
            const expense = parseFloat(document.getElementById(`expense${i}`).value);
            names.push(name);
            expenses.push(expense);
        }

        const totalExpense = expenses.reduce((acc, curr) => acc + curr, 0);
        const equalShare = totalExpense / personCount;

        // Determine who owes whom
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h3>Total Expense: ${totalExpense}</h3>`;
        resultDiv.innerHTML += `<h3>Equal Share: ${equalShare.toFixed(2)}</h3>`;
        
        for (let i = 0; i < personCount; i++) {
            const balance = expenses[i] - equalShare;
            if (balance > 0) {
                resultDiv.innerHTML += `<p>${names[i]} should receive ${balance.toFixed(2)}</p>`;
            } else if (balance < 0) {
                resultDiv.innerHTML += `<p>${names[i]} should pay ${(-balance).toFixed(2)}</p>`;
            } else {
                resultDiv.innerHTML += `<p>${names[i]} is settled up</p>`;
            }
        }
    });
});
