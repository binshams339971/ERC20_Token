import Head from 'next/head'
import { useEthers, useContractCall, useContractFunction } from '@usedapp/core';
import { Interface } from "ethers/lib/utils";
import TestJson from "../../../onchain/artifacts/contracts/Test.sol/Test.json"
import { Contract } from "ethers";
import { TEST_ADDRESS } from "../../constants/address";
import { useEffect, useState, useCallback } from 'react';

const Test = () => {
    const [readName, setReadName] = useState('');
    const { activateBrowserWallet, deactivate, account, library } = useEthers();

    const getName = useContractCall({
        address: TEST_ADDRESS,
        abi: new Interface(TestJson.abi),
        method: "getName",
        args: []
    });

    const { send, state, events } = useContractFunction(
        new Contract(
            TEST_ADDRESS,
            TestJson.abi,
            library?.getSigner?.(account ?? "")
        ),
        "setName",
        { signer: library?.getSigner?.(account ?? "") }
    );
    const [name, setName] = useState('');

    const handleSetName = useCallback(
        () => {
            if (name) {
                send(name)
            }
        },
        [name],
    );
    useEffect(() => {
        if (state.status === 'Success') {
            alert("Set Name")
        }
    }, [state.status])
    return (
        <>
            {!account ? <button onClick={() => activateBrowserWallet()}>Connect</button> : <button onClick={() => deactivate()}>Disconnect</button>}
            <p>Account: {account}</p>
            <p>Name: {getName}</p>

            <span>Set name: </span><input type='text' onChange={(e) => setName(e.target.value)} />
            <button onClick={() => handleSetName()}>Send</button>
            <p>State: {state.status}</p>

            <p>Event: {events?.map((a, i) => (
                <>
                    < div key={i} > {a.args.add}</div>
                </>

            ))}</p>
        </>
    )
}

export default Test;