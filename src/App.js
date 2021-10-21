import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
require("dotenv").config();

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Sidebar />
    </div>
  );
}

export default App;
