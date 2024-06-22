import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const defaultName = "Default"; // Default name if no data in localStorage
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <LeftPanel />
        <RightPanel name={defaultName} />{" "}
      </div>
    </div>
  );
}

export default App;
