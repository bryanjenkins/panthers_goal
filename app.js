const gameId = '2024030123'; // Replace with the actual game ID
const proxyUrl = 'https://corsproxy.io/?';
const apiUrl = `${proxyUrl}https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`;

const homeLogo = document.getElementById('homeLogo');
const awayLogo = document.getElementById('awayLogo');
const homeName = document.getElementById('homeName');
const awayName = document.getElementById('awayName');
const score = document.getElementById('score');
const siren = document.getElementById('siren');
const sirenSound = document.getElementById('sirenSound');

let lastPanthersGoals = 0;

async function fetchGameData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const homeTeam = data.homeTeam;
    const awayTeam = data.awayTeam;

    // Set team names
    homeName.textContent = homeTeam.name.default;
    awayName.textContent = awayTeam.name.default;

    // Set team logos
    homeLogo.src = `https://assets.nhle.com/logos/nhl/svg/${homeTeam.abbrev}_light.svg`;
    awayLogo.src = `https://assets.nhle.com/logos/nhl/svg/${awayTeam.abbrev}_light.svg`;

    // Update score
    score.textContent = `${homeTeam.abbrev} ${homeTeam.score} - ${awayTeam.score} ${awayTeam.abbrev}`;

    // Determine if Panthers are home or away
    let panthersGoals = 0;
    if (homeTeam.abbrev === 'FLA') {
      panthersGoals = homeTeam.score;
    } else if (awayTeam.abbrev === 'FLA') {
      panthersGoals = awayTeam.score;
    }

    // Check if Panthers scored
    if (panthersGoals > lastPanthersGoals) {
      triggerSiren();
    }

    lastPanthersGoals = panthersGoals;

  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

function triggerSiren() {
  siren.style.display = 'block';
  siren.classList.add('spin');
  sirenSound.play();
  setTimeout(() => {
    siren.classList.remove('spin');
    siren.style.display = 'none';
  }, 5000);
}

// Initial fetch
fetchGameData();
// Fetch data every 15 seconds
setInterval(fetchGameData, 15000);
