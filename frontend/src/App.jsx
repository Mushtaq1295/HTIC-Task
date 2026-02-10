import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<CreateUser/>}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreateUser />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit/:id"
  element={
    <ProtectedRoute>
      <EditUser />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
