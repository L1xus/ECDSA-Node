## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

use these keys included in the code:
| Private Key | Wallet Address |
|------------------------------------------------------------------ |----------------------------------------------- |
| 1c9ee9fba746a5c32a25a1b745fee64215615e07d14a4dd39f08553c5beda774 | 0x22b24ce041f04b0e24cc1976b7d1c86b34764e1e |
| eafee7565ec4ad8c1caa01ad25438198f170504146076607b15544db7a303bcc | 0xf494edad1fb24651440ab330fa022d6bd70d2df1 |
| d44d0679b7af693d6087db27a2fd7161cd01c3f38797c2b5179d4a0a8b51e6a8 | 0xa1cb5afd917aa135971c489557d00cf804260352 |

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
