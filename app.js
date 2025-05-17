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
      console.log(data);

      const game = data.games[0];
      const homeTeam = game.teams.home;
      const awayTeam = game.teams.away;

      homeLogo.src = `https://assets.nhle.com/logos/nhl/svg/FLA_light.svg`;
      homeName.textContent = homeTeam.shortName;
      homeScore.textContent = game.scores.FLA;

      awayLogo.src = `https://assets.nhle.com/logos/nhl/svg/TOR_light.svg`;
      awayName.textContent = awayTeam.shortName;
      awayScore.textContent = game.scores.TOR;

      if (game.scores.FLA > game.scores.TOR) {
        siren.play();
      }
    }
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

fetchGameData();
setInterval(fetchGameData, 60000); // Refresh every minute