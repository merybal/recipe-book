import Recipe from "@/pages/Recipe";
import Logo from "@/assets/Logo.png";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={Logo} alt="banner" />
      </header>
      <Recipe />
    </div>
  );
}

export default App;
