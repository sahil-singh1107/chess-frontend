import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useEffect, useState } from "react"

const SecondApp = () => {
  let navigate = useNavigate();
  const [name, setName] = useState<string | null>(localStorage.getItem("username"));

  useEffect(() => {
    if (!name) {
      navigate("/signin");
    }
    navigate("/game");
  }, [])


  return (
    <>
        <Routes>
          <Route path="/game" element={<Landing name={name} />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      
    </>
  )
}

function App () {
  return (
    <BrowserRouter>
      <SecondApp/>
    </BrowserRouter>
  )
}

export default App
