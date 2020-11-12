import React from 'react';
import './Coin.css';
import imageBg from './bg.gif';
const Coin = ({ coins, loading }) => {
  if (loading) {
    return (
      <div>
        <img src={imageBg} />;
      </div>
    );

  }

  return (
    <div className='table-responsive-lg'>
    <table className='table'>
       <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Symbol</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">24h</th>
      <th scope="col">Market Cap</th>
      <th scope="col">Volume</th>
    </tr>
  </thead>
  <tbody>
      {coins.map(coin => (
        <tr>
            <td><img className='imgCoin' src={coin.image} alt='crypto' /></td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>{coin.name}</td>
            <td>${coin.current_price}</td>
            {coin.price_change_percentage_24h < 0 ? (<td className='coin-percent red'>${coin.price_change_percentage_24h.toFixed(2)}%</td>) : (<td className='coin-percent green'>${coin.price_change_percentage_24h.toFixed(2)}%</td>)}
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            
        </tr>

      ))}
      </tbody>
    </table>
    </div>
  );
};

export default Coin;