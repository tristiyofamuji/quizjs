import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/user/Users";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import Soallist from "./pages/quiz/Quiz";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/questions" element={<Soallist />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
