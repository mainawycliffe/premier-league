import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PremierLeagueFixtures from '../PremierLeagueFixtures';
import { testDataFutureAndPast } from './mocks/mockData';

test('should show fixtures for leicester', async () => {
  render(
    <MemoryRouter initialEntries={['/fixtures/leicester-city']}>
      <Routes>
        <Route path='fixtures/:teamSlug' element={<PremierLeagueFixtures data={testDataFutureAndPast} />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(
    screen.getByRole('heading', {
      name: /Fixtures and Results for/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: /Upcoming Fixtures/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByTestId('fixtures-0-home-team').innerHTML).toBe(`Liverpool`);
  expect(screen.getByTestId('fixtures-0-away-team').innerHTML).toBe(`Leicester City`);

  expect(screen.getByTestId('results-0-home-team').innerHTML).toBe(`Manchester City`);
  expect(screen.getByTestId('results-0-score').innerHTML).toBe(`1 - 2`);
  expect(screen.getByTestId('results-0-away-team').innerHTML).toBe(`Leicester City`);
});

test('should show fixtures for arsenal', async () => {
  render(
    <MemoryRouter initialEntries={['/fixtures/arsenal']}>
      <Routes>
        <Route path='fixtures/:teamSlug' element={<PremierLeagueFixtures data={testDataFutureAndPast} />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(
    screen.getByRole('heading', {
      name: /Fixtures and Results for/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: /Upcoming Fixtures/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByTestId('fixtures-0-home-team').innerHTML).toBe(`Arsenal`);
  expect(screen.getByTestId('fixtures-0-away-team').innerHTML).toBe(`Chelsea`);

  expect(screen.getByTestId('results-0-home-team').innerHTML).toBe(`Manchester United`);
  expect(screen.getByTestId('results-0-score').innerHTML).toBe(`6 - 2`);
  expect(screen.getByTestId('results-0-away-team').innerHTML).toBe(`Arsenal`);
});
