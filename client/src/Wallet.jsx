import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1.js"
import * as utils from "ethereum-cryptography/utils.js"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address ="0x" + utils.toHex(publicKey).slice(-40);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet PrivateKey
        <input placeholder="Input a test privatekey (NEVER DO THAT WITH A VALID ONE)" value={privateKey} onChange={onChange}></input>
      </label>
            
      <div className="publicKey">Wallet: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
