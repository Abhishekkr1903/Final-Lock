import { Routes, Route } from "react-router-dom"
import Wifi from "./wifi"
import DistanceControlScreen from "./DistanceControlScreen"
import DistanceLock from "./DistanceLock"
 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Wifi/> } />
        <Route path="/control" element={ <DistanceControlScreen/> } />
        <Route path="/lock" element={<DistanceLock/>}/>
         
      </Routes>
    </div>
  )
}

export default App