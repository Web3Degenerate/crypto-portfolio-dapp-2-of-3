import React, {useEffect, useState } from "react";
import './App.css';
import AssetTable from "./AssetTable";
import ChainSelector from "./ChainSelector";
import NetWorth from "./NetWorth";

function App() {

  const [selectedChains, setSelectedChains] = useState(["eth", "polygon", "bsc", "optimism", "base"]);

  const [tempAddress, setTempAddress] = useState("0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543")
  const [address, setAddress] = useState(tempAddress)


// (11:20) create new state to fetch net worth: https://youtu.be/TXsBAIcT6jA?si=7q4RMLK9pNzo49_j&t=680
  const [netWorth, setNetWorth] = useState({})

  const fetchNetWorth = async (address) => {
    try{
      // fetch from moralis API
      // const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/net-worth?exclude_spam=true&exclude_unverified_contracts=true`)
      // const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/net-worth?exclude_spam=true&exclude_unverified_contracts=true`)
      const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/net-worth?chains=eth&chains=polygon&chains=bsc&chains=optimism&chains=base&exclude_spam=true&exclude_unverified_contracts=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY
        }
      })

      const data = await response.json();
      setNetWorth(data);

      
    }catch(error){

    }
  }


  const handleInputChange = (e) => {
    setTempAddress(e.target.value);
  }
  
  const handleButtonClick = (e) => {
    setAddress(tempAddress)
  }


  // (17:34) set up useEffect to call our NetWorth component via fetchNetWorth function above: https://youtu.be/TXsBAIcT6jA?si=LEVPpf1xm5yTeBaT&t=1056
  useEffect(() => {
    fetchNetWorth(address)
  }, [address])
  

  return (
    <div className="App">
      <h1>My Crypto Portfolio</h1>
      <input 
        className="addressInput"
        type="text"
        value={tempAddress}
        onChange={handleInputChange}
        placeholder="Enter wallet address"
      />
      <button onClick={handleButtonClick} className="fetchButton">Fetch assets</button>
      <NetWorth netWorth={netWorth} />
      <ChainSelector netWorth={netWorth} selectedChains={selectedChains} onSelectionChange={setSelectedChains}/>
      <AssetTable address={address} selectedChains={selectedChains} />
    </div>
  );
}

export default App;
