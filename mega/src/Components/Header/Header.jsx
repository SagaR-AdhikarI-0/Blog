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
    <header className="w-screen sticky top-0 bg-black bg-opacity-75 z-50  ">
      <Container>
        <nav>
          <div className=" flex items-center justify-between p-4 font-bold text-white text-shadow ">
            <Logo className={"text-2xl"} />
            <ul className='flex p-1'> 
              {navitems.map((item) =>(
                item.active ?
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)} className="m-1">
                      {item.name}
                    </button>
                  </li>
                :null)
              )}
              {authStatus && <LogoutBtn/>}
            </ul>
            
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
