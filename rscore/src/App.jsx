import { Route,Routes } from "react-router-dom"
import Homepage from "./Homepage"
import Parser from "./Parser"


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/upload" element={<Parser/>}></Route>
    </Routes>
    </>
  )
}

export default App
