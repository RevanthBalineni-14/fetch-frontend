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

// Create a router using HashRouter for GitHub Pages deployment
// HashRouter is used because GitHub Pages does not support backend routing
// It uses the hash portion of the URL to keep the UI in sync with the URL
const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Define the routes for the application */}
      <Route path="/" element={<Login />} />
      <Route path="/dogs" element={<Layout />}>
        <Route index={true} element={<Home />} />
      </Route>
    </>
  )
);

export default function App() {
  // Provide the router to the application
  return <RouterProvider router={router} />;
}
