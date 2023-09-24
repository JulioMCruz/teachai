/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ICartesiDAppFactory,
  ICartesiDAppFactoryInterface,
} from "../../contracts/ICartesiDAppFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract CartesiDApp",
        name: "application",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "diamondOwner",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "templateHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "inputDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "challengePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inputLog2Size",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feePerClaim",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "feeManagerOwner",
            type: "address",
          },
          {
            internalType: "address payable[]",
            name: "validators",
            type: "address[]",
          },
        ],
        indexed: false,
        internalType: "struct ICartesiDAppFactory.AppConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "ApplicationCreated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "diamondOwner",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "templateHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "inputDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "challengePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inputLog2Size",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feePerClaim",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "feeManagerOwner",
            type: "address",
          },
          {
            internalType: "address payable[]",
            name: "validators",
            type: "address[]",
          },
        ],
        internalType: "struct ICartesiDAppFactory.AppConfig",
        name: "_appConfig",
        type: "tuple",
      },
    ],
    name: "newApplication",
    outputs: [
      {
        internalType: "contract CartesiDApp",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ICartesiDAppFactory__factory {
  static readonly abi = _abi;
  static createInterface(): ICartesiDAppFactoryInterface {
    return new utils.Interface(_abi) as ICartesiDAppFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICartesiDAppFactory {
    return new Contract(address, _abi, signerOrProvider) as ICartesiDAppFactory;
  }
}
