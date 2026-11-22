
const cryptoContainer = document.getElementById("crypto-container");
const refreshBtn = document.getElementById("refreshBtn");
const lastUpdated = document.getElementById("last-updated");

async function fetchCryptoPrices() {
    cryptoContainer.innerHTML = "<p>Loading prices...</p>";

    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd,inr"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch prices");
        }

        const data = await response.json();

        const coins = [
            { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
            { id: "ethereum", name: "Ethereum", symbol: "ETH" },
            { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" }
        ];

        cryptoContainer.innerHTML = "";

        coins.forEach(coin => {
            const price = data[coin.id];

            const card = document.createElement("div");
            card.className = "crypto-card";

            card.innerHTML = `
                <h2>${coin.name} (${coin.symbol})</h2>
                <p class="price">₹${price.inr.toLocaleString("en-IN")}</p>
                <p>$${price.usd.toLocaleString("en-US")}</p>
            `;

            cryptoContainer.appendChild(card);
        });

        lastUpdated.textContent =
            "Last updated: " + new Date().toLocaleTimeString();

    } catch (error) {
        cryptoContainer.innerHTML =
            "<p>Could not load prices. Please try again later.</p>";

        console.error(error);
    }
}

refreshBtn.addEventListener("click", fetchCryptoPrices);

fetchCryptoPrices();

