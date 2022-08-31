import { useMemo } from 'react';
import PremierLeagueFixture from '../types/PremierLeagueFixture';
import { parseISO } from 'date-fns';
import composePremierLeagueTable from './utils/composePremierLeagueTable';

type Props = {
  data: PremierLeagueFixture[];
};

export default function PremierLeagueTable({ data }: Props) {
  const todaysDate = parseISO('2021-05-05T14:00:00');

  const filteredData = useMemo(() => composePremierLeagueTable(data, todaysDate), [data, todaysDate]);

  return (
    <>
      <div className='flex flex-col'>
        <div className='block py-4'>
          <h3 className='text-left text-3xl font-bold'>Premier League Table</h3>
          <span className='py-2 font-semibold text-xl'>{todaysDate.toLocaleDateString()}</span>
        </div>
        {filteredData.length > 0 ? (
          <table className='table-auto text-xl'>
            <thead className='text-gray-700 bg-gray-300'>
              <tr className='font-bold'>
                <th className='text-left p-2'>Team</th>
                <th className='p-4'>Played</th>
                <th className='p-4'>Won</th>
                <th className='p-4'>Drawn</th>
                <th className='p-4'>Lost</th>
                <th className='p-4'>Goals For</th>
                <th className='p-4'>Goals Against</th>
                <th className='p-4'>Goal Difference</th>
                <th className='p-4'>Points</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {filteredData.map((team) => (
                <tr className='table-row hover:bg-gray-200' key={team.team}>
                  <td className='text-left p-4 font-semibold'>{team.team}</td>
                  <td data-testid={`${team.team}-played`} className='p-4'>
                    {team.gamesPlayed}
                  </td>
                  <td className='p-4'>{team.totalWon}</td>
                  <td className='p-4'>{team.totalDrawn}</td>
                  <td className='p-4'>{team.totalLost}</td>
                  <td className='p-4'>{team.goalsFor}</td>
                  <td className='p-4'>{team.goalsAgainst}</td>
                  <td className='p-4'>{team.goalDifference}</td>
                  <td className='p-4'>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='flex w-full py-10 text-center text-red-600 font-semibold'>
            No matches have been played yet!
          </div>
        )}
      </div>
    </>
  );
}
