import { useMemo } from "react";
import { useSelector } from "react-redux";

const RightPanel = () => {
  // Select the data from the Redux store
  const data = useSelector((state) => state.data.data);

  // Memoize the selectedName to avoid unnecessary recalculations on re-renders
  const selectedName = useMemo(() => {
    const activeProfile = data.find((profile) => profile.status === "active");
    return activeProfile ? activeProfile.name : "";
  }, [data]);

  return (
    <div className="thx-window">
      <div className="sub-title flex">
        <h1 className="eq-title">{selectedName}</h1>
      </div>
    </div>
  );
};
export default RightPanel;
