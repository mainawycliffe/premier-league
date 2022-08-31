import { isBefore, parseISO } from 'date-fns';
import PremierLeagueFixture from '../../types/PremierLeagueFixture';
import PremierLeagueTableRow from '../../types/PremierLeagueTableRow';

export default function composePremierLeagueTable(data: PremierLeagueFixture[], todaysDate: Date) {
  // we need to create a premier league table, so we will only use past
  // data for this, so we filter out any data that is in the future
  const pastPremierFixtures = data.filter((fixture) => isBefore(parseISO(fixture.date), todaysDate));
  // next we need to create a premier league table
  let premierLeagueTableWithKeys: Record<string, PremierLeagueTableRow> = {};

  pastPremierFixtures.forEach((fixture) => {
    const teams = Object.keys(fixture.score);
    const homeTeam = teams[0];
    const awayTeam = teams[1];

    // if the home team is not in the premier league table, add it
    if (!premierLeagueTableWithKeys[homeTeam]) {
      premierLeagueTableWithKeys[homeTeam] = {
        team: homeTeam,
        gamesPlayed: 0,
        totalDrawn: 0,
        totalLost: 0,
        totalWon: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    // if the away team is not in the premier league table, add it
    if (!premierLeagueTableWithKeys[awayTeam]) {
      premierLeagueTableWithKeys[awayTeam] = {
        team: awayTeam,
        gamesPlayed: 0,
        totalDrawn: 0,
        totalLost: 0,
        totalWon: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    // increment the games played for both teams
    premierLeagueTableWithKeys[homeTeam].gamesPlayed++;
    premierLeagueTableWithKeys[awayTeam].gamesPlayed++;

    // increment the goals for and against for both teams
    premierLeagueTableWithKeys[homeTeam].goalsFor += fixture.score[homeTeam] ?? 0;
    premierLeagueTableWithKeys[awayTeam].goalsAgainst += fixture.score[awayTeam] ?? 0;

    // if draw, we add to both teams 1 point
    if (fixture.score[homeTeam]! === fixture.score[awayTeam]) {
      premierLeagueTableWithKeys[homeTeam].totalDrawn++;
      premierLeagueTableWithKeys[awayTeam].totalDrawn++;
      premierLeagueTableWithKeys[homeTeam].points++;
      premierLeagueTableWithKeys[awayTeam].points++;
    }

    // if home team won, we add to the home team 3 points and 0 to the away
    // team
    if (fixture.score[homeTeam]! > fixture.score[awayTeam]!) {
      premierLeagueTableWithKeys[homeTeam].totalWon++;
      premierLeagueTableWithKeys[homeTeam].points += 3;
      premierLeagueTableWithKeys[awayTeam].totalLost++;
    }

    // if away team won, we add to the away team 3 points and 0 to the home
    // team
    if (fixture.score[awayTeam]! > fixture.score[homeTeam]!) {
      premierLeagueTableWithKeys[awayTeam].totalWon++;
      premierLeagueTableWithKeys[awayTeam].points += 3;
      premierLeagueTableWithKeys[homeTeam].totalLost++;
    }
  });

  const premierLeagueTable = Object.entries(premierLeagueTableWithKeys).map(([_, team]) => team);
  return premierLeagueTable
    .sort((a, b) => b.points - a.points)
    .map((team) => ({
      ...team,
      goalDifference: team.goalsFor - team.goalsAgainst,
    }));
}
