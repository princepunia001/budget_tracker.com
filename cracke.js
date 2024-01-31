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
// Function to update the transaction list
function updateTransactionList(user) {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    user.transactions.forEach((transaction) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type} - ${transaction.description}:₹${transaction.amount} on ${transaction.date}`;
        transactionList.appendChild(listItem);
    });
}
//funtion to remove the 
function removeTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateFinancialSummary();
}

// Function to update the financial summary
function updateFinancialSummary(user) {
    const summary = calculateSummary(user);
    document.getElementById("total-income").textContent = `₹${summary.income.toFixed(2)}`;
    document.getElementById("total-expenses").textContent = `₹${summary.expenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `₹${summary.balance.toFixed(2)}`;

    // Create a simple chart (you can use a more advanced chart library)
    const ctx = document.getElementById("summary-chart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Income", "Expenses"],
            datasets: [
                {
                    data: [summary.income, summary.expenses],
                    backgroundColor: ["#36A2EB", "#FF6384"],
                },
            ],
        },
    });
}

// #############################
