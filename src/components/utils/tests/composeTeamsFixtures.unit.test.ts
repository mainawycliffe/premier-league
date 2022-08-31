import { testDataFutureAndPast } from '../../tests/mocks/mockData';
import composeTeamsFixtures from '../composeTeamsFixtures';

test('returns a list of fixtures for a team', () => {
  const slug = 'leicester-city';
  const fixtures = composeTeamsFixtures(slug, testDataFutureAndPast);

  expect(fixtures.future).toStrictEqual([
    {
      date: '2021-05-06T17:00:00',
      score: {
        'Leicester City': null,
        Liverpool: null,
      },
    },
    {
      date: '2021-05-09T14:00:00',
      score: {
        'Leicester City': null,
        'Tottenham Hotspur': null,
      },
    },
  ]);

  expect(fixtures.past).toStrictEqual([
    {
      date: '2021-04-17T17:00:00',
      score: {
        'Leicester City': 2,
        'Manchester City': 1,
      },
    },
    {
      date: '2021-04-28T12:00:00',
      score: {
        Arsenal: 0,
        'Leicester City': 0,
      },
    },
    {
      date: '2021-05-03T14:00:00',
      score: {
        Chelsea: 1,
        'Leicester City': 4,
      },
    },
    {
      date: '2021-05-04T14:00:00',
      score: {
        'Leicester City': 2,
        'Manchester United': 1,
      },
    },
  ]);
});
