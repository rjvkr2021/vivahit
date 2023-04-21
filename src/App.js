import React, { useState } from 'react';

export default function App() {
  const [games, setGames] = useState([]);
  const [showAllGames, setShowAllGames] = useState(true);
  const [showPCGames, setShowPCGames] = useState(false);
  const [showWebBrowserGames, setShowWebBrowserGames] = useState(false);
  const [showBothGames, setShowBothGames] = useState(false);
  const [searchInputTitle, setSearchInputTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  
  fetch('/api/games')
    .then(response => response.json())
    .then(games => setGames(games))

  function handleShowAllGames() {
    setShowAllGames(true);
    setShowBothGames(false);
    setShowPCGames(false);
    setShowWebBrowserGames(false);
  };

  function handleShowPCGames() {
    setShowAllGames(false);
    setShowBothGames(false);
    setShowPCGames(true);
    setShowWebBrowserGames(false);
  };

  function handleShowWebBrowserGames() {
    setShowAllGames(false);
    setShowBothGames(false);
    setShowWebBrowserGames(true);
    setShowPCGames(false);
  };

  function handleShowBothGames() {
    setShowAllGames(false);
    setShowBothGames(true);
    setShowPCGames(false);
    setShowWebBrowserGames(false);
  };

  function handleSearchTitle(event) {
    setSearchInputTitle(true);
    setInputTitle(event.target.value);
  };

  let filteredGames = games;

  if (showAllGames) {
    filteredGames = games;
  }

  if (showPCGames) {
    filteredGames = games.filter(game => game.platform.includes('PC (Windows)'));
  }

  if(showWebBrowserGames) {
    filteredGames = games.filter(game => game.platform.includes('Web Browser'));
  }

  if (showBothGames) {
    filteredGames = games.filter(game => game.platform === 'PC (Windows), Web Browser');
  }

  if(searchInputTitle) {
    filteredGames = filteredGames.filter(filteredGames => filteredGames.title.toLowerCase().includes(inputTitle.toLowerCase()));
  }

  return (
    <>
      <div className='header'>
        <span className='filterButtons'>
          <b>Filters:-</b>
          <button onClick={handleShowAllGames}>All Games</button>
          <button onClick={handleShowPCGames}>PC (Windows) Games</button>
          <button onClick={handleShowWebBrowserGames}>Web Browser Games</button>
          <button onClick={handleShowBothGames}>Both PC (Windows) and WebBrowser Games</button>
        </span>
        <span className='inputTitleBox'>
          <b>Search (by title)</b> <input type="text" value={inputTitle} onChange={handleSearchTitle}/>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td><img src={game.thumbnail} alt={game.thumbnail}></img></td>
              <td>{game.genre}</td>
              <td>{game.platform}</td>
              <td>{game.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
