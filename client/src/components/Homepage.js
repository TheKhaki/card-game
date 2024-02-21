import React, { useState } from "react";
import { Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";

const Homepage = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="Homepage">
        <div className="homepage-menu flex justify-center">
      <div className="container bg-black/85 w-1/2 p-32 rounded-xl ">
          <img src={require("../assets/logo.png").default} width="200px" />
          <div className="homepage-form">
            <div className="homepage-join">
              <input className="text-black rounded-md" type="text" placeholder="Game Code" onChange={(event) => setRoomCode(event.target.value)} />
              <Link to={`/play?roomCode=${roomCode}`}>
                <button className="game-button green">JOIN GAME</button>
              </Link>
            </div>
            <h1>OR</h1>
            <div className="homepage-create">
              <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
                <button className="game-button orange">CREATE GAME</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
