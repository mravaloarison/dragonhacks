"use client";
"use client";
import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect({
		connector: new InjectedConnector({
			options: {
				shimDisconnect: false,
			},
		}),
	});

	const handleButtonClick = async () => {
		if (isConnected) {
			const response = await fetch("/api/verbwire", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					walletAddress: address,
					contractAddress:
						"0x791b1e3BA2088eCce017d1c60934804868691f67",
					chain: "goerli",
				}),
			});
			const data = await response.json();
			console.log("Check: ", data["isWalletHolderOfToken"]);
			if (data["isWalletHolderOfToken"] === true) {
				alert(
					"Ownership verified for the given token. Holdings count: " +
						data["holdingsCount"]
				);
			} else {
				alert("Wallet does not hold the asset.");
			}
		} else {
			connect();
		}
	};

	return (
		<div className="container mx-auto p-8 min-h-screen min-w-screen flex flex-col items-center justify-center">
			<div className="mt-6 text-center">
				<button
					onClick={handleButtonClick}
					className="px-4 py-2 rounded-md text-white"
					style={{ backgroundColor: isConnected ? "gray" : "blue" }}
				>
					{isConnected ? "Appropriate_Button_Text" : "Connect Wallet"}
				</button>
			</div>
		</div>
	);
}
