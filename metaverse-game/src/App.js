import React,{useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);

  const checkIfWalletConnected = async() => {
    try{
      const {ethereum} = window;
      if (!ethereum){
        console.log("make sure that you have metamask");
      }else {
        const accounts = await ethereum.request({method:"eth_accounts"});
        console.log(accounts);

        if (accounts.length!==0){
          const account = accounts[0];
          console.log('Found an authorized account', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch(error){
      console.log(error);
    } 
  }

  const renderContent = () => {
    if(!currentAccount){
      return(
        <div className="connect-wallet-container">
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
    } else if (currentAccount && !characterNFT){
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
  }
  const connectWalletAction = async() => {
    try{
      const {ethereum} = window;

      if (!ethereum){
        alert("Get Metamask!");
        return;
      } else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccount(accounts[0]);
        console.log("connected->", accounts[0]);
      }
    } catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    checkIfWalletConnected();
  },[]);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          <div className="connect-wallet-container">
            {renderContent()} 
          </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
