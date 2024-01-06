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

async function updateStats() {
    console.log("Updating Codeforces Stats...");
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
    }
}

updateStats();
