import { testDataFutureAndPast, testDataFutureOnly } from '../../tests/mocks/mockData';
import composePremierLeagueTable from '../composePremierLeagueTable';

jest.useFakeTimers().setSystemTime(new Date('2021-05-05T14:00:00').getTime());

test('if given empty data, return empty table', () => {
  const res = composePremierLeagueTable([], new Date());
  expect(res).toHaveLength(0);
});

test('if given data with no past fixtures, return empty table', () => {
  const res = composePremierLeagueTable(testDataFutureOnly, new Date());
  expect(res).toHaveLength(0);
});

test('if given data with past fixtures, return table with past fixtures', () => {
  const res = composePremierLeagueTable(testDataFutureAndPast, new Date());
  expect(res).toStrictEqual([
    {
      gamesPlayed: 4,
      goalDifference: 0,
      goalsAgainst: 8,
      goalsFor: 0,
      points: 10,
      team: 'Leicester City',
      totalDrawn: 1,
      totalLost: 0,
      totalWon: 3,
    },
    {
      gamesPlayed: 3,
      goalDifference: 0,
      goalsAgainst: 8,
      goalsFor: 0,
      points: 9,
      team: 'Liverpool',
      totalDrawn: 0,
      totalLost: 0,
      totalWon: 3,
    },
    {
      gamesPlayed: 5,
      goalDifference: 0,
      goalsAgainst: 0,
      goalsFor: 11,
      points: 5,
      team: 'Manchester United',
      totalDrawn: 2,
      totalLost: 2,
      totalWon: 1,
    },
    {
      gamesPlayed: 4,
      goalDifference: 0,
      goalsAgainst: 2,
      goalsFor: 2,
      points: 4,
      team: 'Manchester City',
      totalDrawn: 1,
      totalLost: 2,
      totalWon: 1,
    },
    {
      gamesPlayed: 3,
      goalDifference: 0,
      goalsAgainst: 3,
      goalsFor: 0,
      points: 3,
      team: 'Tottenham Hotspur',
      totalDrawn: 3,
      totalLost: 0,
      totalWon: 0,
    },
    {
      gamesPlayed: 5,
      goalDifference: 0,
      goalsAgainst: 2,
      goalsFor: 3,
      points: 3,
      team: 'Chelsea',
      totalDrawn: 3,
      totalLost: 2,
      totalWon: 0,
    },
    {
      gamesPlayed: 4,
      goalDifference: 0,
      goalsAgainst: 2,
      goalsFor: 3,
      points: 2,
      team: 'Arsenal',
      totalDrawn: 2,
      totalLost: 2,
      totalWon: 0,
    },
  ]);
});
