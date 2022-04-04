import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";

const URI = "https://api.coinstats.app/public/v1/coins";

const InitialPage = () => {
    const fetchCoins = async () => {
        const data = await (await axios.get(URI)).data;
        //const coins = data.coins;
        setCoins(data.coins);
    };

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // se llama cada vez que se renderiza un componente.
        fetchCoins();
    }, []);

    return (
        <MainScreen title="Welcome back">
            <Link to="/ConnectPortfolio">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Connect Portfolio
                </Button>
            </Link>
            {coins.map((coin) => (
                <Accordion key = {coin.id}>
                    <Card style={{ margin: 10 }}>
                        <Card.Header style={{ display: "flex" }}>
                            <span
                                style={{
                                    textDecoration: "none",
                                    flex: 1,
                                    cursor: "pointer",
                                    alignSelf: "center",
                                    fontsize: 18,
                                }}
                            >
                                <Accordion.Header
                                    as={Card.Text}
                                    variant="link"
                                    defaultactivekey="0"
                                >
                                    {coin.id} {coin.symbol}
                                </Accordion.Header>
                            </span>
                            <span>
                                <div> {coin.rank}</div>
                                <div> {coin.price}</div>
                            </span>
                        </Card.Header>
                        <Accordion.Body defaultactivekey="0">
                            <Card.Body>
                                <h4>
                                    <Badge variant="success">
                                        Category - {coin.availableSupply}
                                    </Badge>
                                </h4>

                                <blockquote className="blockquote mb-0">
                                    <p>{coin.icon}</p>
                                    <footer className="blockquote-footer">
                                        Change 24hs{coin.priceChange1d}
                                        <cite title="Source Title"></cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Body>
                    </Card>
                </Accordion>
            ))}
        </MainScreen>
    );
};

export default InitialPage;

