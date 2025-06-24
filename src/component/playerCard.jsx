import React from 'react';

const PlayerCard = ({ player, index }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center w-full max-w-md mx-auto hover:scale-105 transition">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-gray-700">{index + 1}</div>
        <div>
          <h3 className="text-lg font-semibold">{player.username}</h3>
          <p className="text-sm text-gray-500">{player.region} | {player.gameMode}</p>
        </div>
      </div>
      <div className="text-blue-600 font-bold text-xl">{player.score}</div>
    </div>
  );
};

export default PlayerCard;
