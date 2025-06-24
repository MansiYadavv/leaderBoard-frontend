// import React, { useEffect, useState } from 'react';
// import socket from './services/socket'
// import PlayerCard from './component/playerCard';

// function App() {
//   const [players, setPlayers] = useState([]);
//   const [formData, setFormData] = useState({
//     username: '', score: 0, region: '', gameMode: ''
//   });

//   useEffect(() => {
//     socket.emit('getTopPlayers', { region: 'Asia', gameMode: 'Deathmatch' });

//     socket.on('leaderboardData', (data) => setPlayers(data));
//     socket.on('leaderboardUpdate', (data) => setPlayers(data));
//   }, []);

//   const submitScore = () => {
//     socket.emit('scoreUpdate', formData);
//     setFormData({ ...formData, score: 0 });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
//       <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">Real-Time Leaderboard</h1>
//         <div className="grid gap-4">
//           <input
//             className="p-2 rounded border"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//           />
//           <input
//             className="p-2 rounded border"
//             type="number"
//             placeholder="Score"
//             value={formData.score}
//             onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
//           />
//           <input
//             className="p-2 rounded border"
//             placeholder="Region (e.g. Asia)"
//             value={formData.region}
//             onChange={(e) => setFormData({ ...formData, region: e.target.value })}
//           />
//           <input
//             className="p-2 rounded border"
//             placeholder="Game Mode (e.g. Deathmatch)"
//             value={formData.gameMode}
//             onChange={(e) => setFormData({ ...formData, gameMode: e.target.value })}
//           />
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//             onClick={submitScore}
//           >
//             Submit Score
//           </button>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold text-center mt-10 text-gray-700">Top Players</h2>
//       <div className="space-y-4 mt-4">
//         {players.map((p, i) => (
//           <PlayerCard key={i} player={p} index={i} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import socket from './services/socket';
import PlayerCard from './component/playerCard';

function App() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    username: '', score: 0, region: '', gameMode: ''
  });
  const [filter, setFilter] = useState({ region: 'Asia', gameMode: 'Deathmatch' });

  useEffect(() => {
    socket.emit('getTopPlayers', filter);

    socket.on('leaderboardData', (data) => setPlayers(data));
    socket.on('leaderboardUpdate', (data) => setPlayers(data));
  }, [filter]);

  const submitScore = () => {
    socket.emit('scoreUpdate', formData);
    setFormData({ ...formData, score: 0 });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    socket.emit('getTopPlayers', updatedFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">Real-Time Leaderboard</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            name="region"
            value={filter.region}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
          </select>

          <select
            name="gameMode"
            value={filter.gameMode}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="Deathmatch">Deathmatch</option>
            <option value="Classic">Classic</option>
            <option value="Survival">Survival</option>
          </select>
        </div>

        {/* Score Form */}
        <div className="grid gap-4">
          <input
            className="p-2 rounded border"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            className="p-2 rounded border"
            type="number"
            placeholder="Score"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
          />
          <input
            className="p-2 rounded border"
            placeholder="Region (e.g. Asia)"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          />
          <input
            className="p-2 rounded border"
            placeholder="Game Mode (e.g. Deathmatch)"
            value={formData.gameMode}
            onChange={(e) => setFormData({ ...formData, gameMode: e.target.value })}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={submitScore}
          >
            Submit Score
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mt-10 text-gray-700">Top Players</h2>
      <div className="space-y-4 mt-4">
        {players.map((p, i) => (
          <PlayerCard key={i} player={p} index={i} />
        ))}
      </div>
    </div>
  );
}

export default App;

