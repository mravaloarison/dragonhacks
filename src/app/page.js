"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader, Terminal } from "lucide-react";
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

	const [isAppFound, setIsAppFound] = useState(false);
	const [Title, setTitle] = useState("");
	const [Description, setDescription] = useState("");

	const [AnalyzeText, setAnalyzeText] = useState("Analyze");
	const [isLoading, setIsLoading] = useState(false);

	const [urlEntered, setUrlEntered] = useState("");

	const { disconnect } = useDisconnect();

	const handleButtonClick = () => {
		isConnected ? disconnect() : connect();
	};

	const handleUrlChange = (e) => {
		setUrlEntered(e.target.value);
	};

	const handleAnalyzeBtn = () => {
		setAnalyzeText(<Loader className="h-4 w-4 animate-spin" />);

		fetch("http://127.0.0.1:5000/flask_api/summarize", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: urlEntered,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setAnalyzeText("Analyze");
				setIsAppFound(true);
				setTitle(data.title);
				setDescription(data.description);
			})
			.catch((error) => {
				console.error("Error:", error);
				setAnalyzeText("Analyze");
			});
	};

	return (
		<div className="container mx-auto p-6 md:p-8 min-h-screen min-w-screen flex flex-col gap-6 items-center justify-between">
			<nav className="flex w-full justify-between items-center">
				<div>
					<h1 className="font-semibold text-xl">Plagia</h1>
				</div>
				<Button onClick={handleButtonClick} variant="secondary">
					{isConnected ? "Disconnect" : "Connect"}
				</Button>
			</nav>
			<section className="md:w-[60%] w-full flex flex-col gap-6">
				<div className="flex flex-col md:flex-row gap-4 md:gap-6">
					<Input
						placeholder="Insert the link to the project"
						value={urlEntered}
						onChange={handleUrlChange}
					/>
					<Button variant="" onClick={handleAnalyzeBtn}>
						{AnalyzeText}
					</Button>
				</div>
				{isAppFound && (
					<Alert>
						<AlertTitle>{Title}</AlertTitle>
						<AlertDescription>{Description}</AlertDescription>
					</Alert>
				)}
				<div className="md:grid md:grid-cols-2 flex flex-col gap-6">
					{isAppFound && (
						<Card className="md:h-64 flex flex-col justify-between">
							<CardHeader>
								<p className="text-red-400 font-semibold">
									90% (HackPSU2024)
								</p>
								<CardTitle>Plagiarism</CardTitle>
								<CardDescription>
									An app that detects plagiarsim in projects
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button variant="secondary" className="w-full">
									View Comparison
								</Button>
							</CardFooter>
						</Card>
					)}
				</div>
			</section>
			<footer className="mt-6 text-center">
				<p className="text-sm text-gray-400">© By Rava</p>
			</footer>
		</div>
	);
}
