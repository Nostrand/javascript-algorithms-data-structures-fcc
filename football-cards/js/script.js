// Reference HTML elements for displaying team info and player cards
const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");

// Football team data including details on team, coach, and players

const myFavoriteFootballTeam = {
  team: "Chile",
  sport: "Football",
  year: 2015,
  headCoach: {
    coachName: "Jorge Sampaoli",
    matches: 6,
  },
  players: [
    { name: "Claudio Bravo", position: "goalkeeper", number: 1, isCaptain: true, nickname: "El Capitán" },
    { name: "Gary Medel", position: "defender", number: 17, isCaptain: false, nickname: "Pitbull" },
    { name: "Gonzalo Jara", position: "defender", number: 18, isCaptain: false, nickname: null },
    { name: "Mauricio Isla", position: "defender", number: 4, isCaptain: false, nickname: "Huaso" },
    { name: "Jean Beausejour", position: "defender", number: 15, isCaptain: false, nickname: "Palmatoria" },
    { name: "Marcelo Díaz", position: "midfielder", number: 21, isCaptain: false, nickname: "Chelo" },
    { name: "Charles Aránguiz", position: "midfielder", number: 20, isCaptain: false, nickname: "Príncipe" },
    { name: "Arturo Vidal", position: "midfielder", number: 8, isCaptain: false, nickname: "Rey Arturo" },
    { name: "Jorge Valdivia", position: "midfielder", number: 10, isCaptain: false, nickname: "El Mago" },
    { name: "Eduardo Vargas", position: "forward", number: 11, isCaptain: false, nickname: "Turboman" },
    { name: "Alexis Sánchez", position: "forward", number: 7, isCaptain: false, nickname: "El Niño Maravilla" },
    { name: "David Pizarro", position: "midfielder", number: 22, isCaptain: false, nickname: "Pek" },
    { name: "José Pedro Fuenzalida", position: "midfielder", number: 6, isCaptain: false, nickname: "Chapita" },
    { name: "Francisco Silva", position: "defender", number: 5, isCaptain: false, nickname: "Gato" },
    { name: "Matías Fernández", position: "midfielder", number: 14, isCaptain: false, nickname: "Matigol" },
    { name: "Johnny Herrera", position: "goalkeeper", number: 12, isCaptain: false, nickname: null },
    { name: "Miiko Albornoz", position: "defender", number: 2, isCaptain: false, nickname: null },
    { name: "Paulo Díaz", position: "defender", number: 13, isCaptain: false, nickname: null },
    { name: "Mauricio Pinilla", position: "forward", number: 9, isCaptain: false, nickname: null },
    { name: "Angelo Henríquez", position: "forward", number: 16, isCaptain: false, nickname: null },
    { name: "Eduardo Lobos", position: "goalkeeper", number: 23, isCaptain: false, nickname: null },
  ],
};

// Freeze the team object to prevent accidental modifications
Object.freeze(myFavoriteFootballTeam);

// Destructure main team properties for easier access
const { sport, team, year, players } = myFavoriteFootballTeam;
const { coachName } = myFavoriteFootballTeam.headCoach;

// Populate the HTML with team details
typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;
headCoach.textContent = coachName;

// Function to generate and display player cards based on a given array of players
const setPlayerCards = (arr = players) => {
  playerCards.innerHTML += arr
    .map(
      ({ name, position, number, isCaptain, nickname }) =>
        `
        <div class="player-card">
          <h2>${name} ${isCaptain ? "(Captain)" : ""}</h2>
          <p>Position: ${position}</p>
          <p>Number: ${number}</p>
          <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p>
        </div>
      `
    )
    .join("");
};

// Call setPlayerCards to display players at the start
setPlayerCards();

// Event listener to update player cards based on dropdown filter selection
playersDropdownList.addEventListener("change", (e) => {
  playerCards.innerHTML = "";

  // Filter and display players based on selected option
  switch (e.target.value) {
    case "nickname":
      setPlayerCards(players.filter((player) => player.nickname !== null));
      break;
    case "forward":
      setPlayerCards(players.filter((player) => player.position === "forward"));
      break;
    case "midfielder":
      setPlayerCards(
        players.filter((player) => player.position === "midfielder")
      );
      break;
    case "defender":
      setPlayerCards(
        players.filter((player) => player.position === "defender")
      );
      break;
    case "goalkeeper":
      setPlayerCards(
        players.filter((player) => player.position === "goalkeeper")
      );
      break;

default:
setPlayerCards();
      break;

  }
});