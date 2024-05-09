// Set up at (10:50): https://youtu.be/TXsBAIcT6jA?si=WHaOzPdyjTTxCC07&t=650

// https://deep-index.moralis.io/api/v2.2/wallets/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/net-worth?exclude_spam=true&exclude_unverified_contracts=true

// Built out at (15:40): https://youtu.be/TXsBAIcT6jA?si=dx7JP1OI6nqS8ozN&t=940

import React from "react";

function NetWorth({netWorth}){

    // Imported from src/AssetTable.js at (19:45):
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });


    return (
        <div>
            <h1>{ USDollar.format(netWorth.total_networth_usd) }</h1>
        </div>
    )
}

export default NetWorth;