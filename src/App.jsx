import {
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dogs" element={<Layout />}>
        <Route index={true} element={<Home />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
