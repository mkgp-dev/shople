import { Route, Routes } from "react-router";
import Navigation from "./components/blocks/Navigation";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div className="flex flex-col p-4 w-full max-w-5xl mx-auto h-screen">
      <Navigation />
      <main className="grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}