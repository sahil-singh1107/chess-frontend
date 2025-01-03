import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

const SecondApp = () => {
  
  return (
    <>
        <Routes>
          <Route path="/game" element={<Landing />} />
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
