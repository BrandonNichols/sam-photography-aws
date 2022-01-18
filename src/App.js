import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import LoadRoute from "./components/LoadRoutes";
import WebFont from "webfontloader";
require("dotenv").config();

WebFont.load({
  google: {
    families: ["Montserrat:600", "sans-serif"]
  }
});

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Sidebar />
      <LoadRoute />
    </div>
  );
}

export default App;
