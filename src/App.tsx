import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"

const App = () => {

  const name = "sahil"

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing name={name} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
