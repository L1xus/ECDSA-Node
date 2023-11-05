const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } =  require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0x22b24ce041f04b0e24cc1976b7d1c86b34764e1e": 100,
  //PublicKey: 0250547c3e45c8e051011633bb22b24ce041f04b0e24cc1976b7d1c86b34764e1e
  //PrivateKey:1c9ee9fba746a5c32a25a1b745fee64215615e07d14a4dd39f08553c5beda774
  "0xf494edad1fb24651440ab330fa022d6bd70d2df1": 50,
  //PublicKey: 029ff0de9a562920b40352b3daf494edad1fb24651440ab330fa022d6bd70d2df1
  //PrivateKey:eafee7565ec4ad8c1caa01ad25438198f170504146076607b15544db7a303bcc
  "0xa1cb5afd917aa135971c489557d00cf804260352": 75,
  //PublicKey: 0328f88063690670b59b1e945ba1cb5afd917aa135971c489557d00cf804260352
  //PrivateKey:d44d0679b7af693d6087db27a2fd7161cd01c3f38797c2b5179d4a0a8b51e6a8
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", (req, res) => {
  const { sender, msg, recoveryBit, recipient, amount } = req.body;
  
  let sig = secp.secp256k1.Signature.fromCompact(sender);
  sig = sig.addRecoveryBit(recoveryBit);
  const senderPublicKey = sig.recoverPublicKey(msg).toRawBytes();
  const senderAddress = "0x" + toHex(senderPublicKey).slice(-40);
  console.log(senderAddress);



  console.log("Received POST request to /send");
  console.log("Request Body:", req.body);

  setInitialBalance(senderAddress);
  setInitialBalance(recipient);

  if (balances[senderAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[senderAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
