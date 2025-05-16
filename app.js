const siren = document.getElementById('siren');
const sirenSound = document.getElementById('sirenSound');

let lastGoalCount = 0;

async function checkGoals() {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/gamecenter/2024030216/boxscore');
    const data = await response.json();

    const panthersGoals = data.homeTeam.abbrev === 'FLA' ? data.homeTeam.goals : data.awayTeam.goals;

    if (panthersGoals > lastGoalCount) {
      lastGoalCount = panthersGoals;
      triggerSiren();
    }
  } catch (error) {
    console.error('Error fetching goal data:', error);
  }
}

function triggerSiren() {
  siren.style.display = 'block';
  sirenSound.play();
  setTimeout(() => {
    siren.style.display = 'none';
  }, 5000);
}

// Replace {gameId} with the actual game ID
setInterval(checkGoals, 15000); // Check every 15 seconds