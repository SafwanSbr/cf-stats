const handle = "NIGHT_FURY_sbr";
const apiKey = "33dd3896d1fb391e087484ef90f2df67194766b4";

async function fetchCodeforcesData() {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=NIGHT_FURY_sbr`);
        const data = await response.json();
        return data.result[0];
    } catch (error) {
        console.error("Error fetching Codeforces data", error);
        return null;
    }
}

// ... (existing code)

async function updateStats() {
    const userData = await fetchCodeforcesData();

    if (userData) {
        const statsContainer = document.getElementById("codeforces-stats");
        statsContainer.innerHTML = `
            <p>Name: ${userData.firstName} ${userData.lastName}</p>
            <p>Handle: ${userData.handle}</p>
            <p>Rank: ${userData.rank}</p>
            <p>Max Rank: ${userData.maxRank}</p>
            <p>Solves: ${userData.rating}</p>
            <p>Contests: ${userData.contribution}</p>
            <p>Last Online: ${new Date(userData.lastOnlineTimeSeconds * 1000)}</p>
            <img src="${userData.avatar}" alt="User Avatar" style="max-width: 100px; max-height: 100px;">
        `;

        // Generate a bar chart
        generateChart(userData);
    }
}

function generateChart(userData) {
    const ctx = document.createElement("canvas").getContext("2d");
    const chartContainer = document.getElementById("chart-container");

    if (chartContainer) {
        // Clear previous charts
        chartContainer.innerHTML = "";

        // Create a canvas element for the chart
        const canvas = document.createElement("canvas");
        canvas.width = 400; // Set width as needed
        canvas.height = 300; // Set height as needed
        chartContainer.appendChild(canvas);

        const chartData = {
            labels: ["Solves", "Contests"],
            datasets: [{
                label: "Codeforces Statistics",
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
                data: [userData.rating, userData.contribution],
            }],
        };

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
    }
}

// ... (remaining code)
