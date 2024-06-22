import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <LeftPanel />
        <RightPanel name="Default" />{" "}
        {/* on first load it will show the default, then will take name from localStorage */}
      </div>
    </div>
  );
}

export default App;
