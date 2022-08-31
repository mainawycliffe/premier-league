import { data } from './data';
import './App.css';
import { useState } from 'react';
import PremierLeagueTable from './components/PremierLeagueTable';

function App() {
  const [premierLeagueData] = useState(data);

  return (
    <div className='container mx-auto py-10'>
      <div className='flex flex-col'>
        <PremierLeagueTable data={premierLeagueData} />
      </div>
    </div>
  );
}

export default App;
