import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import { Button } from "@material-tailwind/react";
import io from "socket.io-client";
import Swal from "sweetalert2";

const Homepage = () => {
  const [roomCode, setRoomCode] = useState("");
  const socket = io("http://localhost:3000", {
    autoConnect: false,
  });
  console.log(socket);
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    Swal.fire({
      title: "Logged Out",
      icon: "success",
      showConfirmButton: false,
      timer: 1200,
    });
    navigate('/login')
  }
  return (
    <div className="Homepage">
          <button className="btn btn-error" onClick={handleLogout}>Logout</button>
      <div className="homepage-menu flex justify-center h-1/2 ">
        <div className="bg-black/85 w-1/2 rounded-xl justify-center	mt-8">
          <p className="flex justify-center text-2xl mt-2 text-yellow-400">Welcome {localStorage.username}, let's play!</p>
          {/* <img src="../assets/logo1.png" width="50px" /> */}
          <div className="homepage-form">
            <div className="homepage-join mt-10 mx-4 ">
              <input
                className="text-white rounded-md m-auto my-4 "
                type="text"
                placeholder="Game Code"
                onChange={(event) => setRoomCode(event.target.value)}
              />
              <Link to={`/play?roomCode=${roomCode}`}>
                <Button
                  size="lg"
                  color="green"
                  className="flex items-center gap-2 justify-center shadow-md"
                  fullWidth
                >
                  <span>Join Room</span>
                  <img src="/assets/logo.png" height={24} width={24} alt="" />
                </Button>
              </Link>
            </div>
            <img src="/assets/or.png" className="size-20 mx-4 mt-16" alt="" />
            <div className="homepage-create mt-20 mx-4">
              {/* {socket.connected === true > 0 ? (
                <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
                  <Button
                    size="lg"
                    color="orange"
                    className="flex items-center gap-2 justify-center shadow-md"
                    fullWidth
                  >
                    <img src="/assets/logo.png" height={24} width={24} alt="" />
                    <span>Create Room</span>
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  color="orange"
                  className="flex items-center gap-2 justify-center shadow-md"
                  fullWidth
                >
                  <img src="/assets/logo.png" height={24} width={24} alt="" />
                  <span>Please Wait for Server to start...</span>
                </Button>
              )} */}
              <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
                <Button
                  size="lg"
                  color="orange"
                  className="flex items-center gap-2 justify-center shadow-md"
                  fullWidth
                >
                  <img src="/assets/logo.png" height={24} width={24} alt="" />
                  <span>Create Room</span>
                </Button>
              </Link>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
  <Outlet />;
};

export default Homepage;
