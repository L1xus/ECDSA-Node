import { useState } from "react";
import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1.js";
import * as utils from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signMessage(msg, privateKey){
    const bytes = utils.utf8ToBytes(JSON.stringify(msg));
    const hashedMessage = utils.toHex(keccak256(bytes));
    const signature = await secp.secp256k1.sign(hashedMessage, privateKey);
    const signatureHash = `${BigInt(signature.r).toString(16)}${BigInt(signature.s).toString(16)}`;

    return {hashedMessage, signature, signatureHash};
  }

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
        amount: parseInt(sendAmount),
        recipient,
    }
    const signedMessage = await signMessage(message, privateKey);
    console.log(signedMessage);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: signedMessage.signatureHash,
        msg: signedMessage.hashedMessage,
        recoveryBit: signedMessage.signature.recovery,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
