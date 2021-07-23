import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import UploadImage from "./UploadImage";
import Home from "./Home";

const NavBar = styled.div`
  display: flex;
  * {
    margin: 0 5px;
  }
`;

const NavigationBar = () => {
  return (
    <div>
      <NavBar>
        <Link to="/">Home</Link>
        <Link to="/upload-image">Upload Image</Link>
        <Link to="/sign-in">Sign In</Link>
      </NavBar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload-image" component={UploadImage} />
        <Route path="/sign-in" component={Login} />
      </Switch>
    </div>
  );
};

export default NavigationBar;
