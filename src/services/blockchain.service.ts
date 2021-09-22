import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {timer} from 'rxjs';
import Web3 from "web3";
import {Account} from 'web3-core';
import {Contract} from 'web3-eth-contract';
// const HashStorage = require("../contracts/artifacts/HashStorage.json");
import HashStorage from "../contracts/artifacts/HashStorage.json";
import {ContractRequestDto, ContractResponseDto} from '../models';




@injectable({scope: BindingScope.TRANSIENT})
export class BlockchainService {

  web3: Web3;
  signer: Account;
  hashStorageContract: Contract;
  hashStorageAddress: string;

  constructor(/* Add @inject to inject parameters */) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        ``
      )
    );

    this.signer = this.web3.eth.accounts.privateKeyToAccount(
      ""
    );
    this.web3.eth.accounts.wallet.add(this.signer);

    this.hashStorageAddress = process.env.HASH_STORAGE_ADDRESS ? <string>process.env.HASH_STORAGE_ADDRESS : "0x31db9334613A07968Db2eB2e8a11fE1Fb9BA4D28";
    this.hashStorageContract = new this.web3.eth.Contract(
      //@ts-ignore
      HashStorage.abi,
      this.hashStorageAddress
    );

  }

  async storeHash(contractRequestDto: ContractRequestDto): Promise<ContractResponseDto> {

    const hash: String = contractRequestDto.contractHash ? contractRequestDto.contractHash : this.web3.utils.keccak256(contractRequestDto.contract ?? "");
    const addHashTx = this.hashStorageContract.methods.add(hash.valueOf());

    // mine transaction with retry
    const addHashTxReceipt = await addHashTx
      .send({
        from: this.web3.eth.accounts.wallet[0].address,
        gas: (await addHashTx.estimateGas()) * 10,
      }) // In case even that transaction is rejected tripple the gas!
      .catch(async () => {
        timer(10000); // wait 10s and allow previous transactions to be added to the block

        return await addHashTx.send({
          from: this.web3.eth.accounts.wallet[0].address,
          gas: (await addHashTx.estimateGas()) * 3 * 10,
        });
      });

    console.log(
      `https://rinkeby.etherscan.io/tx/${addHashTxReceipt.transactionHash}`
    );

    return new ContractResponseDto({
      blockchainIdentifier: process.env.ETH_NETWORK ? process.env.ETH_NETWORK : "rinkeby",
      transactionId: addHashTxReceipt.transactionHash
    })

  }

}
