import { createContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import {
  Container,
  NavItem,
  Image,
} from "react-bootstrap";
//{navBarActive && <NavBar></NavBar>}
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Outlet,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Login from "./pages/Login.js";
import Blog from "./pages/Blog.js";
import { NotFound } from "./pages/NotFound.js";
import CreateAccount from "./pages/CreateAccount.js";
import profileThin from "../assets/userDark.png";
import Profile from "./pages/Profile.js";
import Calendar from "./pages/Calendar.js";
import MyPredictions from "./pages/MyPredictions.js";
import NextEvent from "./pages/NextEvent.js";

export type CurrentUserContextType = {
  FirstName: string | null;
  LastName: string | null;
  Email: string | null;
  Username: string | null;
  AccountType: number | null;
  UserID: number | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CurrentUserContext = createContext<CurrentUserContextType>({
  FirstName: "",
  LastName: "",
  Email: "",
  Username: "",
  AccountType: null,
  UserID: null,
});

const NavBar = () => {
  const [offCanvasShow, setOffCanvasShow] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUserContextType>({
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    AccountType: null,
    UserID: null,
  });

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Router>
          <Navbar className="navbar navbar-dark bg-dark" expand="false">
            <Container fluid>
              <Navbar.Brand as={Link} to={"/"}>
                THE SITE
              </Navbar.Brand>
              <Nav className="flex-grow-1">
                <NavItem
                  as={Link}
                  to={currentUser.UserID !== null ? "/profile" : "/login"}
                  className="ms-auto"
                  title={currentUser.UserID !== null ? currentUser.FirstName+"'s Profile" : "Login"}
                >
                  <Image className="me-1" width={23} src={profileThin} />
                </NavItem>
              </Nav>
              <Nav>
                <Navbar.Toggle
                  type="button"
                  onClick={() => setOffCanvasShow(true)}
                />
                <Offcanvas
                  show={offCanvasShow}
                  onHide={() => setOffCanvasShow(false)}
                  placement="end"
                  data-bs-theme="dark"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MENU</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav variant="underline" className="justify-content-end ">
                      <Nav.Link as={Link} to={"/"} onClick={() => setOffCanvasShow(false)}>
                        HOME
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/blog"} onClick={() => setOffCanvasShow(false)}>
                        BLOG
                      </Nav.Link>
                      <NavDropdown title="MMAPREDICTIONS">
                        <NavDropdown.Item as={Link} to={"/mma/nextevent"} onClick={() => setOffCanvasShow(false)}>
                          NEXTEVENT
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/mma/mypredictions"} onClick={() => setOffCanvasShow(false)}> 
                          MYPREDICTIONS
                        </NavDropdown.Item>
                        {/* <NavDropdown.Divider /> */}
                        <NavDropdown.Item as={Link} to={"/mma/calendar"} onClick={() => setOffCanvasShow(false)}>
                          CALENDAR
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link as={Link} to={"/about"} onClick={() => setOffCanvasShow(false)}>
                        ABOUT
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/comingsoon"} onClick={() => setOffCanvasShow(false)}>
                        COMINGSOON
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Offcanvas>
              </Nav>
            </Container>
          </Navbar>
          <div className="conatiner mt-4">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={<Login setCurrentUser={setCurrentUser} />}
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="/create" element={<CreateAccount />} />
                <Route
                  path="/profile"
                  element={<Profile setCurrentUser={setCurrentUser} />}
                />
                <Route path="/mma/nextevent" element={<NextEvent />} />
                <Route path="/mma/mypredictions" element={<MyPredictions />} />
                <Route path="/mma/calendar" element={<Calendar />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CurrentUserContext.Provider>
    </>
  );
};

export default NavBar;
