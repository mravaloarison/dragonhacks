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

	const [AnalyzeText, setAnalyzeText] = useState("Analyze");
	const [isLoading, setIsLoading] = useState(false);

	const { disconnect } = useDisconnect();

	const handleButtonClick = () => {
		isConnected ? disconnect() : connect();
	};

	const handleAnalyzeBtn = () => {
		setAnalyzeText(<Loader className="h-4 w-4 animate-spin" />);
	};

	return (
		<div className="container mx-auto p-6 md:p-8 min-h-screen min-w-screen flex flex-col items-center justify-between">
			<nav className="flex w-full justify-between items-center">
				<div>
					<h1 className="font-semibold text-xl">Plagia</h1>
				</div>
				<Button onClick={handleButtonClick} variant="secondary">
					{isConnected ? "Disconnect" : "Connect"}
				</Button>
			</nav>
			<section className="w-[60%] flex flex-col gap-6">
				<div className="flex gap-4">
					<Input placeholder="Insert the link to the project" />
					<Button variant="" onClick={handleAnalyzeBtn}>
						{AnalyzeText}
					</Button>
				</div>
				<Alert>
					<Terminal className="w-6 h-6" />
					<AlertTitle>Plagia</AlertTitle>
					<AlertDescription>
						This project is a plagiarism detector that compares your
						project with others to check if there are any
						similarities.
					</AlertDescription>
				</Alert>
				<div className="grid grid-cols-2 gap-6">
					<Card className="h-64 flex flex-col justify-between">
						<CardHeader>
							<p className="text-red-500">90% (HackPSU2024)</p>
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

					<Card className="h-64 flex flex-col justify-between">
						<CardHeader>
							<p className="text-yellow-400">85% (HackHarvard)</p>
							<CardTitle>Another Project</CardTitle>
							<CardDescription>
								Another description for the project, maybe
								longer than the first one just to see the gap
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant="secondary" className="w-full">
								View Comparison
							</Button>
						</CardFooter>
					</Card>
				</div>
			</section>
			<footer className="mt-6 text-center">
				<p className="text-sm text-gray-400">© By Rava</p>
			</footer>
		</div>
	);
}
