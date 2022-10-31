import "./App.css";
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import AddCard from "./AddCard";

function App() {
  return (
    <div className="App">
      <Header />
      <AddCard />
      <TinderCards />
      <SwipeButtons />
    </div>
  );
}

export default App;
