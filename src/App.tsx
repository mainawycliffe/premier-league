import { data } from './data';
import './App.css';
import { useState } from 'react';
import PremierLeagueTable from './components/PremierLeagueTable';
import { Route, Routes } from 'react-router-dom';
import PremierLeagueFixtures from './components/PremierLeagueFixtures';

function App() {
  const [premierLeagueData] = useState(data);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex flex-col'>
        <Routes>
          <Route path='/'>
            <Route index element={<PremierLeagueTable data={premierLeagueData} />} />
            <Route path='/fixtures/:teamSlug' element={<PremierLeagueFixtures data={premierLeagueData} />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
