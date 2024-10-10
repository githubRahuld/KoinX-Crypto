import cron from "node-cron";
import axios from "axios";
import { Crypto } from "../models/crypto.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchCryptoData = asyncHandler(async (req, res) => {
    const cryptoURL = process.env.CRYPTO_URL;
    const coins = ["bitcoin", "matic-network", "ethereum"];
    try {
        for (let coin of coins) {
            const response = await axios.get(
                `${cryptoURL}/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
            );
            console.log(response.data[coin]);

            const { usd, usd_market_cap, usd_24h_change } = response.data[coin];
            const data = new Crypto({
                coinId: coin,
                price: usd,
                marketCap: usd_market_cap,
                change24h: usd_24h_change,
            });
            await data.save();
        }
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
});

// cron.schedule("* * * * *", fetchCryptoData); //In every 2 mins ,for testing purpose
cron.schedule("0 */2 * * *", fetchCryptoData); // In every 2 hours

const fetchLatestData = asyncHandler(async (req, res) => {
    const { coin } = req.query;
    try {
        const latestData = await Crypto.findOne({ coinId: coin }).sort({
            timestamp: -1, // newest first
        });
        if (latestData) {
            return res.json({
                price: latestData.price,
                marketCap: latestData.marketCap,
                change24h: latestData.change24h,
            });
        } else {
            return res
                .status(404)
                .json({ message: "Data not found for this coin" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

const findDerivation = asyncHandler(async (req, res) => {
    const { coin } = req.query;
    try {
        const records = await Crypto.find({ coinId: coin })
            .sort({ timestamp: -1 })
            .limit(100);
        if (records.length === 0)
            return res.status(404).json({ message: "No data available" });

        const prices = records.map((record) => record.price);
        const mean =
            prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance =
            prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
            prices.length;
        const deviation = Math.sqrt(variance);

        return res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

export { fetchLatestData, findDerivation };
