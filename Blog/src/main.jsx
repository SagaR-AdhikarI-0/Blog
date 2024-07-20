import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import "./index.css";
import AllPost from "./Pages/AllPost.jsx";
import AddPost from "./Pages/AddPost.jsx";
import Home from "./Pages/Home.jsx";
import Protcted from "./Components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Post from './Pages/Post.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: (
          <Protcted authentication={false}>
            <Signup />
          </Protcted>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protcted authentication={true}>
            <AllPost />
          </Protcted>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protcted authentication={true}>
            <AddPost />
          </Protcted>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
            <Protcted authentication>
                {" "}
                {/* <EditPost /> */}
            </Protcted>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },

    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
