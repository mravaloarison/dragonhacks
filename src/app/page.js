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

	const { disconnect } = useDisconnect();

	const handleButtonClick = () => {
		isConnected ? disconnect() : connect();
	};

	return (
		<div className="container mx-auto p-6 md:p-8 min-h-screen min-w-screen flex flex-col items-center justify-between">
			<nav className="flex w-full justify-between items-center">
				<div>
					<h1 className="font-semibold font-mono text-xl">Plagia</h1>
				</div>
				<button
					onClick={handleButtonClick}
					className="px-4 py-2 rounded-[3rem] text-sm text-white"
					style={{
						backgroundColor: isConnected ? "gray" : "blue",
					}}
				>
					{isConnected ? "Disconnect" : "Connect"}
				</button>
			</nav>
			<section>
				<input
					type="text"
					placeholder="Insert the link to the project"
					className="px-4 py-2 rounded-[3rem] w-full"
				/>
				{isConnected && (
					<p className="text-center">Wallet connected: {address}</p>
				)}
			</section>
			<footer className="mt-6 text-center">
				<p className="text-sm text-gray-400">© By Rava</p>
			</footer>
		</div>
	);
}
