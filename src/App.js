import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import LoadRoute from "./components/LoadRoutes";
require("dotenv").config();

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
