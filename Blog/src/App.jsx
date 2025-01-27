import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./Store/authSlice";
import { Header, Footer } from "./Components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <>
    <Header />
    <div className="min-h-screen">
      <div>
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </> ) : null;
 
}

export default App;
