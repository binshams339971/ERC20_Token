import { useEthers, useContractCalls } from "@usedapp/core";
import { useMemo } from "react";
import { DCLTOKEN_ADDRESS } from "../../constants/address";
import DCLJSON from "../../artifacts/contracts/DCLToken.sol/DCLToken.json"
import { Interface } from "ethers/lib/utils";
import { DCLToken, DCLToken__factory } from "../../typechain";
import { Contract, utils } from "ethers";

const DCLTokens = () => {
    const { account } = useEthers();
    const contractDetails = useMemo(() => (
        {
            address: DCLTOKEN_ADDRESS,
            abi: new Interface(DCLJSON.abi),
        }
    ), []);
    const [name, symbol, totalSupply, decimals] = useContractCalls([
        {
            ...contractDetails,
            method: "name",
            args: []
        },
        {
            ...contractDetails,
            method: "symbol",
            args: []
        },
        {
            ...contractDetails,
            method: "totalSupply",
            args: []
        },
        {
            ...contractDetails,
            method: "decimals",
            args: []
        }
    ]);
    return (
        <>
            <p>Account: {account}</p>
            <h3>Token Name: {name}</h3>
            <h3>Token Symbol: {symbol}</h3>
            <h3>Total Supply: {totalSupply?.[0]?.toString()}</h3>
            <h3>Total amount: {totalSupply && decimals && utils.formatUnits(totalSupply[0], decimals[0])}</h3>
        </>
    )
}

export default DCLTokens;