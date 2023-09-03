import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import Login from "./Login";

const BASE_URL = "http://localhost:4000";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("letstalk-loggedIn")) || false
  );
  const [username, setUsername] = useState(
    localStorage.getItem("letstalk-username") || ""
  );
  const [loading, setLoading] = useState(false);

  function logout() {
    setLoggedIn(false);
    localStorage.setItem("letstalk-loggedIn", false);
    setUsername("");
    localStorage.setItem("letstalk-username", "");
  }

  async function login(name, password) {
    setLoading(true);
    const response = await fetch(BASE_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.message === "welcome") {
      setLoggedIn(true);
      localStorage.setItem("letstalk-loggedIn", true);
      setUsername(name);
      localStorage.setItem("letstalk-username", name);
    }
  }

  return (
    <div>
      <Header loggedIn={loggedIn} logout={logout} username={username} />
      {!loggedIn ? (
        <Login login={login} loading={loading} />
      ) : (
        <ChatContainer username={username} />
      )}
      <Footer />
    </div>
  );
}

export default App;
