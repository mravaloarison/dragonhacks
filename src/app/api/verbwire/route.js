export async function POST(req) {
    const body = await req.json();
    const walletAddress = body.walletAddress;
    const contractAddress = body.contractAddress;
    const chain = body.chain;
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-Key": process.env.VERBWIRE_API_KEY },
    };
  
    const res = await fetch(
      `https://api.verbwire.com/v1/nft/data/isWalletHolderOfToken?walletAddress=${walletAddress}&contractAddress=${contractAddress}&chain=${chain}`,
      options
    );
    const data = await res.json();
    
    return new Response(JSON.stringify({
      isWalletHolderOfToken: data.isWalletHolderOfToken,
      holdingsCount: data.holdingsCount,
      holdings: data.holdings,
    }));
  }