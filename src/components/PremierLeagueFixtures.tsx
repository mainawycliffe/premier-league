import { parseISO, format } from 'date-fns';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import slugify from 'slugify';
import PremierLeagueFixture from '../types/PremierLeagueFixture';
import composeTeamsFixtures from './utils/composeTeamsFixtures';

type Props = {
  data: PremierLeagueFixture[];
};

export default function PremierLeagueFixtures({ data }: Props) {
  const params = useParams();
  const teamSlug = params['teamSlug'];

  const { future, past } = useMemo(() => composeTeamsFixtures(teamSlug ?? '', data), [data, teamSlug]);

  const teamsName = Object.keys(future[0].score).filter((key) => slugify(key, { lower: true }))[0];

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <h3 className='block font-bold tracking-wide text-5xl'>Fixtures and Results for {teamsName}</h3>
        <Link className='text-lg text-blue-400 font-semibold' to='/' role='button'>
          {'<'} Back to Table
        </Link>
        {future.length > 0 && (
          <div className='flex flex-col py-4 space-y-6'>
            <h3 className='text-3xl font-bold'>Upcoming Fixtures</h3>
            {future.map((fixture, index) => (
              <div key={fixture.date} className='flex flex-col space-y-2'>
                <div className='block font-bold text-2xl'>Date: {format(parseISO(fixture.date), 'dd/yy, HH:mm')}</div>
                <div className='flex flex-row font-semibold text-xl w-full md:w-3/4 lg:w-1/2'>
                  <div className='inline-block w-2/5' data-testid={`fixtures-${index}-home-team`}>
                    {Object.keys(fixture.score)[0]}
                  </div>
                  <div className='inline-block w-1/5 text-center'>vs</div>
                  <div className='inline-block w-2/5 text-right' data-testid={`fixtures-${index}-away-team`}>
                    {Object.keys(fixture.score)[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {past.length > 0 && (
          <div className='flex flex-col space-y-4 w-full md:w-3/4 lg:w-1/2'>
            <h3 className='text-3xl font-bold'>Previous Results</h3>
            <div className='flex flex-col space-y-4'>
              {past.map((fixture, index) => (
                <div key={fixture.date} className='flex flex-col space-y-2'>
                  <div className='block font-bold text-2xl'>Date: {format(parseISO(fixture.date), 'dd/yy, HH:mm')}</div>
                  <div className='flex flex-row font-semibold text-xl'>
                    <div className='inline-block w-2/5' data-testid={`results-${index}-home-team`}>
                      {Object.keys(fixture.score)[0]}
                    </div>
                    <div
                      className='inline-block w-1/5 text-center bg-red-600 p-1'
                      data-testid={`results-${index}-score`}>
                      {fixture.score[Object.keys(fixture.score)[0]]} - {fixture.score[Object.keys(fixture.score)[1]]}
                    </div>
                    <div className='inline-block w-2/5 text-right' data-testid={`results-${index}-away-team`}>
                      {Object.keys(fixture.score)[1]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
