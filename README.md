# NFT Marketplace Thegraph.

This code is meant to deploy on [thegraph](https://thegraph.com/) so that it can Listen to the events fired on [NFT Marketplace Contract](https://github.com/sanjaydefidev/hardhat-nft-marketplace-smart-contracts) and store the NFT and user data on subgraph. We use it to store Listed NFT, active NFT, bought NFT and canceled NFT.

Later we can use NextJs frontend to query the subgraph data and show it on our frontend.

---

## Running the code

To run the code in your local development machine copy the repository with the following command. We have used `yarn` package manager to install all dependencies. You can use `NPM`. Make sure you have deployed [NFT Marketplace Contract](https://github.com/sanjaydefidev/hardhat-nft-marketplace-smart-contracts) on `Rinkeby` testnet.

```shell
git clone https://github.com/sanjaydefidev/nft-marketplace-thegraph
```

Installing all the dependencies

```shell
yarn install
```

To build subgraph

```shell
graph codegen && graph build
```

To deploy subgraph

```shell
graph deploy --studio your-subgraph-name
```

---

Check out this [link](https://github.com/PatrickAlphaC/graph-nft-marketplace-fcc) for more information about this tutorial.

## Note

Thanks to @PatrickAlphaC for creating such a helpful tutorial.
