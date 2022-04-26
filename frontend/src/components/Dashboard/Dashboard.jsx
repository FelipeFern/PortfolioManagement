import React from "react";
import "./dashboard.css";


function Dashboard({torneo,  tournamentLeaderboard, title, userInscription }) {
    const user = localStorage.getItem("userId");
    
    const getCorrectDate = (_date) => {
        var date = new Date(
            _date.replace(
                /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                "$4:$5:$6 $2/$3/$1"
            )
        );
        const toReturn = date.toLocaleDateString();
        return toReturn;
    };

    const isUser = (c) => user === c.user._id;

    const getIndex = () => {
        let aux = 0
        let aux1 = false;
        if(userInscription.length !== 0 ){
         for (let cae of tournamentLeaderboard){
            if(cae.user._id !== user && !aux1){
                aux++
            }
            else{
                aux1 = true
            }
         }
        }

        return aux
    }


  
    return (
        <div className="main-dash">
            <h1>{title}</h1>

            <div className="insights">
                <div className="div-1">
                    <div className="middle">
                        <div className="left">
                            <h3>Profits </h3>
                            <h1> $
                            {userInscription.length !== 0 ?
                            userInscription.inscription.profit.toFixed(3) : 0  
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Close Date </h3>
                            <h1> 
                            {torneo.length !== 0 ?
                            getCorrectDate(torneo.finishDate): 0   
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Current Position </h3>
                            <h1> 
                            {tournamentLeaderboard.length !== 0 ?
                            getIndex()
                            : 0   
                        }°
                            </h1>
                        </div>
                        
                    </div>
                </div>
             
                <div className="div-3">
                    <div className="leaderboard">
                        <div className="table-container">
                            <div className="table-container_title">
                                <h3> Leaderboard </h3>
                            </div>
                            
                            {tournamentLeaderboard.length !== 0  && userInscription.length !== 0 &&
                            <table className="table-container__table">
                                <thead>
                                    <tr>
                                        <th> Pos</th>
                                        <th>Name</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {tournamentLeaderboard.map(
                                            (rank, index) => (
                                                <tr key={rank.inscription._id}>
                                                    <td>{index + 1} °</td>
                                                    <td>{rank.user.name}</td>
                                                    <td>
                                                        $
                                                        {
                                                            rank.inscription
                                                                .profit.toFixed(1)
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
