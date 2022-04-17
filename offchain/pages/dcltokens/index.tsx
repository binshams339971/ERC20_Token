import { useEthers, useContractCall, useContractCalls, useContractFunction } from "@usedapp/core";
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { DCLTOKEN_ADDRESS } from "../../constants/address";
import DCLJSON from "../../artifacts/contracts/DCLToken.sol/DCLToken.json"
import { Interface } from "ethers/lib/utils";
import { DCLToken, DCLToken__factory } from "../../typechain";
import { Contract, utils } from "ethers";

const DCLTokens = () => {
    const { account, library } = useEthers();
    const contractDetails = useMemo(() => (
        {
            address: DCLTOKEN_ADDRESS,
            abi: new Interface(DCLJSON.abi),
        }
    ), []);
    // const contract2 = useMemo(()=>(new))
    // useEffect(() => {
    //     var contract1 = new Contract(DCLTOKEN_ADDRESS, contractDetails.abi);
    //     contract1.functions.buyerAddress().then((res) => {
    //         console.log(res);
    //     })
    // }, [contractDetails.abi]);

    //Read contract
    const [name, symbol, totalSupply, decimals, owner, getBuyerAddresses] = useContractCalls([
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
        },
        {
            ...contractDetails,
            method: "owner",
            args: []
        },
        {
            ...contractDetails,
            method: "getBuyerAddresses",
            args: []
        }
    ]);

    const [balanceOf] = useContractCalls([
        {
            ...contractDetails,
            method: "balanceOf",
            args: ['owner']
        }
    ]);

    //Write contract
    const newContract = useMemo(() => new Contract(DCLTOKEN_ADDRESS, DCLToken__factory.createInterface(), library?.getSigner(account ?? "")) as DCLToken, [account, library]);

    const { send, state } = useContractFunction(
        newContract,
        "purchageToken",
        { signer: library?.getSigner?.(account ?? "") }
    );


    const [value, setValue] = useState('');
    const [tValue, setTvalue] = useState('');

    const ethHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTvalue((+e.target.value * 100).toString());
        setValue(e.target.value);
    }

    const tokenHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setValue((+e.target.value / 100).toString());
    }
    const handleSubmit = () => {
        if (value) {
            send({ value: utils.parseEther(value) });
        }
    }
    return (
        <>
            <p>Account: {account}</p>
            <h3>Token Name: {name}</h3>
            <h3>Token Symbol: {symbol}</h3>
            <h3>Token Owner: {owner}</h3>
            <h3>Total Token: {totalSupply && decimals && utils.formatUnits(totalSupply[0], decimals[0])}</h3>
            <h3>Available Token: {balanceOf}</h3>
            {console.log(balanceOf)}
            <hr />
            <p>1 Eth = 100 DC Token</p>
            <input type='text' onChange={(e) => ethHandler(e)} placeholder="Enter ether amount" />
            <input type='text' onChange={(e) => tokenHandler(e)} value={tValue} placeholder="Enter token amount" />
            <button onClick={handleSubmit}>Purchange</button>
            <h5>{state?.status}</h5>
            {console.log(getBuyerAddresses)}
        </>
    )
}

export default DCLTokens;