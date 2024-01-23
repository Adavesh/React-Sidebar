import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div style={{ background: "lightgray" }}></div>
    </>
  );
}

export default App;
