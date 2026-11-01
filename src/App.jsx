import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Restuarent from "./Components/Restuarent";
import RestuarentMenu from "./Components/RestuarentMenu";
import SearchFood from "./Components/SearchFood";
import FoodLayout from "./Components/FoodLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<FoodLayout />}>
          <Route path="/restuarent" element={<Restuarent />} />
          <Route path="/restaurant/:id" element={<RestuarentMenu />} />
          <Route path="/search" element={<SearchFood />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;