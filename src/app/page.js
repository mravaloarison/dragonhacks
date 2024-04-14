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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
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
	const [Comparisons, setComparisons] = useState([]);

	const [AnalyzeText, setAnalyzeText] = useState("Analyze");
	const [isLoading, setIsLoading] = useState(false);

	const [hackathonEntered, setHackathonEntered] = useState("");
	const [urlEntered, setUrlEntered] = useState("");

	const { disconnect } = useDisconnect();

	const handleButtonClick = () => {
		isConnected ? disconnect() : connect();
	};

	const handleUrlChange = (e) => {
		setUrlEntered(e.target.value);
	};

	const handleHackathonChange = (e) => {
		setHackathonEntered(e.target.value);
	};

	const AlertingMsg = (msg) => {
		toast.error("Oops", {
			description: msg,
			type: "error",
		});
	};

	const handleAnalyzeBtn = () => {
		if (urlEntered === "" || hackathonEntered === "") {
			AlertingMsg("One of the URL is missing");
			return;
		}

		setIsLoading(true);
		setAnalyzeText(
			<div className="flex gap-2 items-center">
				<Loader className="h-4 w-4 mr-2 animate-spin" />
				<p>Loading ...</p>
			</div>
		);

		fetch("http://127.0.0.1:5000/flask_api/summarize", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: urlEntered,
				hackathon_url: hackathonEntered,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setAnalyzeText("Analyze");
				setIsLoading(false);
				setIsAppFound(true);
				setTitle(data.title);
				setDescription(data.description);

				console.log(data.comparisons);
				let comparisons = [];
				for (const item of data.comparisons) {
					comparisons.push(item);
				}

				setComparisons(comparisons);
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
				<section className="flex flex-col w-full gap-6">
					<div className="flex md:flex-row flex-col gap-4 md:gap-6 w-full">
						<Input
							placeholder="Insert the link to the project you want to analyze"
							value={urlEntered}
							onChange={handleUrlChange}
						/>
						<Input
							placeholder="Which Hackathon would you like it to refere to"
							value={hackathonEntered}
							onChange={handleHackathonChange}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Button
							onClick={handleAnalyzeBtn}
							className="md:w-fit w-full"
						>
							{AnalyzeText}
						</Button>
					</div>
				</section>
				{isLoading && (
					<Alert className="flex flex-col justify-between p-4 gap-2">
						<Skeleton className="h-4 w-[150px]" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-[200px]" />
					</Alert>
				)}
				{isAppFound && !isLoading && (
					<Alert>
						<AlertTitle>{Title}</AlertTitle>
						<AlertDescription>{Description}</AlertDescription>
					</Alert>
				)}
				<div className="md:grid md:grid-cols-2 flex flex-col gap-6">
					{isLoading && <Loader className="h-6 w-6 animate-spin" />}
					{isAppFound && !isLoading && (
						<>
							{Comparisons.length > 0 &&
								Comparisons.map((comparison) => (
									<Card
										key={Comparisons.indexOf(comparison)}
										className="md:h-64 flex flex-col justify-between"
									>
										<CardHeader>
											<CardTitle>
												{comparison.title}
											</CardTitle>
											<CardDescription className="md:overflow-scroll md:max-h-20">
												{comparison.explanation}
											</CardDescription>
										</CardHeader>
										<CardFooter>
											<Button
												variant="secondary"
												className="w-full"
												onClick={() => {
													toast.success(
														"Should be redirected to this link",
														{
															description:
																comparison.link,
														}
													);
												}}
											>
												View Comparison
											</Button>
										</CardFooter>
									</Card>
								))}
						</>
					)}
				</div>
			</section>
			<footer className="mt-6 text-center">
				<p className="text-sm text-gray-400">© By Rava</p>
			</footer>
		</div>
	);
}
