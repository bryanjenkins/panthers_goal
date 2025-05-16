const apiUrl = 'https://nhl-score-api.herokuapp.com/api/scores/latest';
const homeLogo = document.getElementById('home-logo');
const homeName = document.getElementById('home-name');
const homeScore = document.getElementById('home-score');
const awayLogo = document.getElementById('away-logo');
const awayName = document.getElementById('away-name');
const awayScore = document.getElementById('away-score');
const siren = document.getElementById('siren');

async function fetchGameData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.games && data.games.length > 0) {
      const game = data.games[0];
      const homeTeam = game.teams.home;
      const awayTeam = game.teams.away;

      homeLogo.src = `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${homeTeam.id}.svg`;
      homeName.textContent = homeTeam.name;
      homeScore.textContent = homeTeam.score;

      awayLogo.src = `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${awayTeam.id}.svg`;
      awayName.textContent = awayTeam.name;
      awayScore.textContent = awayTeam.score;

      if (homeTeam.score > awayTeam.score) {
        siren.play();
      }
    }
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

fetchGameData();
setInterval(fetchGameData, 60000); // Refresh every minute