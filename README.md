# Scratch Collective
NFT-Minter / AI Art Generation Tool

ScratchCollective is full-stack application that uses neural style transfer to create an original image and allows the user to seamlessly mint that image to the Ethereum blockchain as an NFT.
We also provide a bridge and a how-to to sell your ScratchCollective NFT on the OpenSea marketplace.

In this app, I leverage the MERN stack (MongoDB, Express, React Node) combined with
Interplanetary File System (IPFS),
Metamask & the Ethereum Provider API,
web3.js,
eth-sig-util,
a custom ERC-1155 contract (Solidity), and
a python child process utilizing TensorFlow combined with the Arbitrary Image Stylization model.

One cool feature outside of the AI-Art Generation and the blockchain interaction is the automated login process based on your active Metamask wallet account.
There is no need for a traditional login/password. Rather, the browser detects your active account (via Metamask) and automatically authenticates or loads your user data.
If it is the first time your account is interacting with the app, it will automatically create an account using the address.
More details in the FAQs.

The app can be found at www.scratchcollective.app

Enjoy!
