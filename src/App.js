import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Coin from './Coin';
import Pagination from './Pagination';

const App = () => {

  const [coins,setCoins] = useState([]);
  const [search , setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


useEffect(() => {
  const fetchCoins = async () => {
    setLoading(true);
    await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((res) => {
      setCoins(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err))
  };
  fetchCoins()
}, [])



const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentCoins = coins.slice(indexOfFirstPost,indexOfLastPost)

const paginate = pageNumber => setCurrentPage(pageNumber)


const filterCoins = currentCoins.filter(({name,symbol}) => 
  name.toLowerCase().includes(search.toLowerCase()) ||
  symbol.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div className="coin-app">
     <div className="md-form mb-3">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
     </div>
          <Coin
            coins={filterCoins}
            loading={loading}
          />
          <Pagination coinsPerPage={postsPerPage} totalCoins={coins.length} paginate={paginate} />
     </div>
    );
}

export default App;
