import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PremierLeagueTable from '../PremierLeagueTable';
import { testDataFutureAndPast, testDataFutureOnly } from './mocks/mockData';

test('renders results when there are past premier league matches', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<PremierLeagueTable data={testDataFutureAndPast} />} />
      </Routes>
    </MemoryRouter>,
  );

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.getByRole('heading', { name: /Premier League Table/i })).toBeInTheDocument();

  //   check if table headers are displayed
  expect(screen.getByText(/team/i)).toBeInTheDocument();
  expect(screen.getByText(/played/i)).toBeInTheDocument();
  expect(screen.getByText(/won/i)).toBeInTheDocument();
  expect(screen.getByText(/drawn/i)).toBeInTheDocument();
  expect(screen.getByText(/lost/i)).toBeInTheDocument();
  expect(screen.getByText(/goals for/i)).toBeInTheDocument();
  expect(screen.getByText(/goals against/i)).toBeInTheDocument();
  expect(screen.getByText(/goal difference/i)).toBeInTheDocument();
  expect(screen.getByText(/points/i)).toBeInTheDocument();

  // check if table rows are displayed
  expect(screen.getByText(/Leicester City/i)).toBeInTheDocument();
  expect(screen.getByText(/Liverpool/i)).toBeInTheDocument();
  expect(screen.getByText(/Manchester City/i)).toBeInTheDocument();
});

test('renders no results when there are no past premier league matches', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<PremierLeagueTable data={testDataFutureOnly} />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /Premier League Table/i })).toBeInTheDocument();

  // check if no results message is displayed
  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText(/No matches have been played yet!/i)).toBeInTheDocument();
});

test('renders no results when there are no fixtures', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<PremierLeagueTable data={[]} />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /Premier League Table/i })).toBeInTheDocument();

  // check if no results message is displayed
  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText(/No matches have been played yet!/i)).toBeInTheDocument();
});
