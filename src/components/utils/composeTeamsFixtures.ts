import { isAfter, isBefore, parseISO } from 'date-fns';
import slugify from 'slugify';
import PremierLeagueFixture from '../../types/PremierLeagueFixture';

export default function composeTeamsFixtures(teamSlug: string, data: PremierLeagueFixture[]) {
  const todaysDate = parseISO('2021-05-05T14:00:00');

  const teamFixtures = data.filter((fixture) => {
    if (
      Object.keys(fixture.score)
        // slugify the team name to match the fixture team name
        .map((fixture) => slugify(fixture, { lower: true }))
        .includes(teamSlug)
    ) {
      return true;
    }
    return false;
  });

  const pastTeamFixtures = teamFixtures
    .filter((fixture) => isBefore(parseISO(fixture.date), todaysDate))
    .sort((a, b) => {
      if (isBefore(parseISO(a.date), parseISO(b.date))) {
        return -1;
      }
      if (isAfter(parseISO(a.date), parseISO(b.date))) {
        return 1;
      }
      return 0;
    });

  const futureTeamFixtures = teamFixtures
    .filter((fixture) => isAfter(parseISO(fixture.date), todaysDate))
    .sort((a, b) => {
      if (isBefore(parseISO(a.date), parseISO(b.date))) {
        return -1;
      }
      if (isAfter(parseISO(a.date), parseISO(b.date))) {
        return 1;
      }
      return 0;
    });

  return {
    past: pastTeamFixtures,
    future: futureTeamFixtures,
  };
}
