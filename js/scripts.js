// This file is intentionally left blank.document.addEventListener("DOMContentLoaded", () => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dataContainer = document.getElementById("data-container");

    // Initialize income and expenses arrays
    const incomeData = new Array(12).fill(0);
    const expensesData = new Array(12).fill(0);

    // Generate input fields dynamically
    months.forEach((month, index) => {
        const monthHtml = `
            <div class="col-12 col-md-6 mb-3">
                <h4>${month}</h4>
                <div class="p-3 border bg-light">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-2">
                            <label for="income-${month.toLowerCase()}" class="form-label">Income</label>
                            <input type="number" id="income-${month.toLowerCase()}" class="form-control" placeholder="Enter income" data-index="${index}" data-type="income">
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="expenses-${month.toLowerCase()}" class="form-label">Expenses</label>
                            <input type="number" id="expenses-${month.toLowerCase()}" class="form-control" placeholder="Enter expenses" data-index="${index}" data-type="expenses">
                        </div>
                    </div>
                </div>
            </div>
        `;
        dataContainer.innerHTML += monthHtml;
    });

    // Chart.js Bar Chart
    const ctx = document.getElementById("barChart").getContext("2d");
    const barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: months,
            datasets: [
                {
                    label: "Income",
                    data: incomeData,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Expenses",
                    data: expensesData,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Income vs Expenses (Jan - Dec)",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Update chart data when user inputs values
    dataContainer.addEventListener("input", (event) => {
        const target = event.target;
        const index = parseInt(target.dataset.index, 10);
        const type = target.dataset.type;

        if (type === "income") {
            incomeData[index] = parseFloat(target.value) || 0; // Update income data
        } else if (type === "expenses") {
            expensesData[index] = parseFloat(target.value) || 0; // Update expenses data
        }

        // Update the chart
        barChart.update();
    });