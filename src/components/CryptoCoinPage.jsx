import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "./CryptoCoinPage.css";
import {motion} from "framer-motion";

Chart.register(...registerables);

const CryptoPage = () => {
    let [coinData, setCoinData] = useState(null);
    let [coinChartData, setCoinChartData] = useState(null);
    const [timeRange, setTimeRange] = useState(1); // Default to 1 day
    const [AiSuggestion, setAiSuggestion] = useState('');
    const location = useLocation();
    const cryptoId = location.pathname.split("/")[2];
    const chartRef = useRef(null);
    const typedAiSuggestion = useTypingEffect(AiSuggestion, 1);


    async function getCoinData() {
        const url = `http://localhost:8090/api/coindata/${cryptoId}`;
        try {
            const res = await fetch(url);
            const coinDataJson = await res.json();
            setCoinData(coinDataJson);
            console.log(coinDataJson);
        } catch (e) {
            console.error(e);
        }
    }

    async function getAiSuggestion() {
        event.preventDefault();
        const url = "http://localhost:8090/api/ai";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: `tell me the market trend of ${cryptoId}, in max 600 words without bold or large text` })
            });
            const data1 = await response.json();
            setAiSuggestion(data1.candidates[0].content.parts[0].text);
        } catch (e) {
            console.error(e);
        }
    }

    async function getCoinChartData(coinId, range) {
        const url = `http://localhost:8090/api/getchart/${coinId}/${range}`;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(":(");
                return;
            }
            const chartData = await res.json();
            const formattedChartData = chartData.prices.map((item) => ({
                x: new Date(item[0]),
                y: item[1],
            }));
            setCoinChartData(formattedChartData);
            console.log(formattedChartData);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getCoinData();
    }, [cryptoId]);

    useEffect(() => {
        if (coinData && coinData.id) {
            getCoinChartData(coinData.id, timeRange);
        }
    }, [coinData, timeRange]);

    function useTypingEffect(text, speed = 18) {
        const [displayed, setDisplayed] = useState("");

        useEffect(() => {
            setDisplayed("");
            if (!text) return;
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed((prev) => prev + text[i]);
                i++;
                if (i >= text.length) clearInterval(interval);
            }, speed);
            return () => clearInterval(interval);
        }, [text, speed]);

        return displayed;
    }

    useEffect(() => {
        if (coinChartData) {
            const ctx = document.getElementById("myChart").getContext("2d");
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: `${cryptoId} Price`,
                            data: coinChartData,
                            borderWidth: 2,
                            borderColor: "#17f51b",
                            backgroundColor: "black",
                            fill: false,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                            },
                        },
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });
        }
    }, [coinChartData]);

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    return (
        <div className="CryptoCoinDiv">
            <div className="titleCoin">
                {coinData && <img src={coinData.image.thumb} alt={coinData.name} />}
                <h4>
                    {coinData ? coinData.name : "Loading..."}{" "}
                    <span className="SingleSymbol">{coinData ? coinData.symbol : ""}</span>
                </h4>
            </div>
            <div className="mainPage">
                <div className="canvasContainer">
                    <canvas id="myChart"></canvas>
                    <nav aria-label="Page navigation example" className="timeChart">
                        <ul className="pagination">
                            {[1, 7, 31, 365].map((range) => (
                                <li className="page-item" key={range}>
                                    <a
                                        style={{marginLeft:"0.5rem"}}
                                        className="page-link "
                                        href="#"
                                        onClick={() => handleTimeRangeChange(range)}
                                    >
                                        {range}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="coinData">
                    <div className="price">
                        <h1>{coinData ? `${coinData.market_data.current_price.usd}$` : ""}</h1>
                    </div>
                    <div className="marketdata">
                        <table className="w-100">
                            <tbody>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Market Cap: ${coinData.market_data.market_cap.usd}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <hr/>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Fully Diluted Valuation: ${coinData.market_data.fully_diluted_valuation.usd}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <hr />
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Circulating Supply: ${coinData.market_data.circulating_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <hr />
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Max Supply: ${coinData.market_data.max_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <hr />
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Total Supply: ${coinData.market_data.total_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <hr />
                            </tbody>
                        </table>
                        <div className="actions">
                            <a href="#">OHLC Chart</a>
                            <a href="#" onClick={() => { getAiSuggestion(); }}>AI Suggestions</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aiSuggestion" style={{ display: "inline-block", marginTop: "1rem" }}>
                {AiSuggestion && AiSuggestion.length > 0 ? (
                    <div className="aiSuggestionContent" style={{ margin: "0 auto" }}>
                        <h4 className="aiText">
                            {typedAiSuggestion}
                            <span className="typing-cursor" />
                        </h4>
                    </div>
                ) : null}
            </div>
            <div className="description">
                <h2>Description</h2>
                <p>{coinData?.description?.en || "No description available."}</p>
            </div>

            <div className="links">
                <h2>Useful Links</h2>
                <ul>
                    {coinData?.links?.homepage[0] && (
                        <li>
                            <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                                Official Website
                            </a>
                        </li>
                    )}
                    {coinData?.links?.whitepaper && (
                        <li>
                            <a href={coinData.links.whitepaper} target="_blank" rel="noopener noreferrer">
                                Whitepaper
                            </a>
                        </li>
                    )}
                    {coinData?.links?.blockchain_site?.length > 0 && (
                        <li>
                            <strong>Blockchain Explorer:</strong>
                            <ul>
                                {coinData.links.blockchain_site.map((link, index) =>
                                    link ? (
                                        <li key={index}>
                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                {link}
                                            </a>
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </li>
                    )}
                    {coinData?.links?.subreddit_url && (
                        <li>
                            <a href={coinData.links.subreddit_url} target="_blank" rel="noopener noreferrer">
                                Subreddit
                            </a>
                        </li>
                    )}
                    {coinData?.links?.repos_url?.github?.length > 0 && (
                        <li>
                            <strong>GitHub Repository:</strong>
                            <ul>
                                {coinData.links.repos_url.github.map((repo, index) => (
                                    <li key={index}>
                                        <a href={repo} target="_blank" rel="noopener noreferrer">
                                            {repo}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CryptoPage;
