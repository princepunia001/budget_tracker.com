// Sample user data stored in memory (replace with a proper database)
const users = [];

// Function to register a new user
function registerUser(username, password) {
    const newUser = { username, password, transactions: [] };
    users.push(newUser);
    return newUser;
}

// Function to log in a user
function loginUser(username, password) {
    const user = users.find((u) => u.username === username && u.password === password);
    return user;
}

// Function to add a new transaction
function addTransaction(user, type, description, amount, date) {
    const transaction = { type, description, amount: parseFloat(amount), date };
    user.transactions.push(transaction);
}

// Function to calculate financial summary
function calculateSummary(user) {
    const income = user.transactions
        .filter((t) => t.type === "income")
        .reduce((total, t) => total + t.amount, 0);
    const expenses = user.transactions
        .filter((t) => t.type === "expense")
        .reduce((total, t) => total + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance };
}

// Event listener for user registration form
document.getElementById("registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("registration-username").value;
    const password = document.getElementById("registration-password").value;
    registerUser(username, password);
    alert("Registration successful. Please log in.");
    event.target.reset();
});

// Event listener for user login form
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = loginUser(username, password);

    if (user) {
        // Hide registration and login forms, show budget section
        document.getElementById("login-form").style.display = "none";
        document.getElementById("registration-form").style.display = "none";
        document.getElementById("budget-section").style.display = "block";

        // Event listener for adding transactions
        document.getElementById("transaction-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const transactionType = document.getElementById("transaction-type").value;
            const description = document.getElementById("transaction-description").value;
            const amount = document.getElementById("transaction-amount").value;
            const date = document.getElementById("transaction-date").value;

            addTransaction(user, transactionType, description, amount, date);
            updateTransactionList(user);
            updateFinancialSummary(user);
            event.target.reset();
        });
    } else {
        alert("Login failed. Please check your username and password.");
    }
});
// Define variables to store data
let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;

// Get HTML elements
const transactionForm = document.getElementById("transaction-form");
const transactionDescription = document.getElementById("transaction-description");
const transactionType = document.getElementById("transaction-type");
const transactionAmount = document.getElementById("transaction-amount");
const transactionDate = document.getElementById("transaction-date");
const transactionList = document.getElementById("transaction-list");
const totalIncomeSpan = document.getElementById("total-income");
const totalExpensesSpan = document.getElementById("total-expenses");
const balanceSpan = document.getElementById("balance");

// Handle form submission
transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = transactionDescription.value;
    const type = transactionType.value;
    const amount = parseFloat(transactionAmount.value);
    const date = transactionDate.value;

    if (description === "" || isNaN(amount) || date === "") {
        alert("Please fill in all fields correctly.");
        return;
    }

    const transaction = {
        description,
        type,
        amount,
        date,
    };

    transactions.push(transaction);

    updateTransactionList();
    updateFinancialSummary();

    // Clear form fields
    transactionDescription.value = "";
    transactionAmount.value = "";
    transactionDate.value = "";
});

// Update transaction list
function updateTransactionList() {
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}</span>
            <span>${transaction.date}</span>
            <button onclick="removeTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(listItem);
    });
}

// Remove a transaction
function removeTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateFinancialSummary();
}

// Update financial summary
function updateFinancialSummary() {
    totalIncome = 0;
    totalExpenses = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    totalIncomeSpan.textContent = totalIncome.toFixed(2);
    totalExpensesSpan.textContent = totalExpenses.toFixed(2);
    balanceSpan.textContent = balance.toFixed(2);
}
