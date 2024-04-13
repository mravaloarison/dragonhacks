export async function POST(req) {
	const form = new FormData();

	const contractDetails = {
		chain: "sepolia",
		contractType: "nft721",
		contractCategory: "simple",
		isCollectionContract: "false",
		contractName: req.projectName,
	};

	for (const key in contractDetails) {
		form.append(key, contractDetails[key]);
	}

	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"X-API-Key": process.env.VERBWIRE_API_KEY,
		},
	};

	options.body = form;

	const res = await fetch(
		"https://api.verbwire.com/v1/nft/deploy/deployContract",
		options
	);
	const data = await res.json();

	return new Response(JSON.stringify(data));
}
