import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navitems = [
    { name: "Home", slug: "./Home", active: true },
    { name: "Login", slug: "./login", active: !authStatus },
    { name: "SignUp", slug: "./Signup", active: !authStatus },
    { name: "All Posts", slug: "./all-posts", active: authStatus },
    { name: "Add post", slug: "./add-post", active: authStatus },
  ];

  return (
    <header className="bg-red-500">
      <Container>
        <nav>
          <div className="bg-red-500 flex items-center ">
            <Logo />
            <ul className='flex p-3'> 
              {navitems.map((item) =>(
                item.active ?
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)} className="m-1 bg-red-500">
                      {item.name}
                    </button>
                  </li>
                :null)
              )}
            </ul>
            {authStatus && <LogoutBtn/>}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
