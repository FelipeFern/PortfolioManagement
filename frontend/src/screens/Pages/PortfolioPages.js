import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const PortfolioPage = () => {
    // Crear un tipo de estos para cada uno de los webSockets a usar, entonces los modificamos desde aca.
    const [coins, setCoins] = useState([]);
    const ws = useRef();

    const initializeSockets = async () => {
        const prevDaySocketURL = "https://final-iaw.herokuapp.com/api/binance/prevDay";
        await axios.get(prevDaySocketURL);
    };

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:8080");
        ws.binaryType = 'arraybuffer';

        ws.current.onopen = () => {
            console.log("Connection opened calling Portfolio Pages !");
            initializeSockets();
        };

        ws.current.onmessage = (message) => {
            //console.log(JSON.parse(message.data));
            //const message = JSON.parse(ev.data);

            setCoins(message);
            if (message.socket === "prevDay") {
                setCoins(message);
            }
            //console.log(message);
            console.log(message.data);

            //if( message.socket === 'Socket que quiero'){
            //      set socket (...)
            //}
        };

        //ws.send("Portfolio Pages Socket initialized");

        ws.current.onclose = (ev) => {
            if (ev.code === 4000) {
                // hacer algo para cerrar la conexion. En el ejemplo, te manda a la página que te hecharon.
            }
        };

        return () => {
            console.log("Cleaning up");
            ws.current.close();
        };
    }, []);

    // const componentWillMount () => {
    //     client.onopen = () =>  {
    //         console.log('WebSocket Client Connected');
    //     }

    //     client.onmessage = (message) => {
    //         console.log(message)
    //     };

    //     4
    // };

    // Meter esto cuando obtenemos cada uno de los mensajes.

    return (
        <div>
            <p> Hey There, this is how we do it</p>
            <div>
                {coins.map((coin) => (
                    <article key={coin.sentAt} className="coin-container">
                        <header className="coin-header">
                            <h4 className="coin-symbol"> {coin.socket} </h4>
                        </header>
                        <p className="coin-body"> {coin.body} </p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default PortfolioPage;
