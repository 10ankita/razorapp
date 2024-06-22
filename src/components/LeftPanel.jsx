import { useEffect, useState } from "react";
import "../assets/css/profile.css";
import {
  setData,
  updateData,
  updateStatus,
  setEditId,
} from "../store/dataSlice";
import Toolbar from "./Toolbar";
import { useDispatch, useSelector } from "react-redux";

const LeftPanel = () => {
  //Redux selectors to get the data and editId from the store
  const data = useSelector((state) => state.data.data);
  const editId = useSelector((state) => state.data.editId);

  // Local state to manage the profile name input
  const [profileName, setProfileName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profilesData"));
    if (savedData) {
      dispatch(setData(savedData));
      const activeProfile = savedData.find(
        (profile) => profile.status === "active"
      );
      if (!activeProfile && savedData.length > 0) {
        dispatch(updateStatus({ id: savedData[0].id }));
      }
    } else {
      // Fetch data from the server if not available in localStorage
      fetch("/data.json")
        .then((response) => response.json())
        .then((jsonData) => {
          dispatch(setData(jsonData));
          const activeProfile = jsonData.find(
            (item) => item.status === "active"
          );
          if (activeProfile) {
            dispatch(updateStatus({ id: activeProfile.id }));
          } else if (jsonData.length > 0) {
            dispatch(updateStatus({ id: jsonData[0].id }));
          }
        });
    }
  }, [dispatch]);

  // useEffect to handle profile name updates when editId or profileName changes
  useEffect(() => {
    if (editId !== null && profileName.trim() !== "") {
      const updatedProfile = {
        id: editId,
        name: profileName.trim(),
        icon: "default",
        isEditable: true,
        status: "active",
      };
      // Dispatch the updated profile to Redux store
      dispatch(updateData(updatedProfile));
    }
  }, [profileName, editId, dispatch]);

  //Handle Enter key press event for the input field to uddate editId
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && profileName.trim() !== "") {
      dispatch(setEditId(null));
    }
  };

  const handleFetchById = (id) => {
    dispatch(updateStatus({ id }));
    dispatch(setEditId(null));
  };

  return (
    <div className="thx-drawer flex">
      <div className="main-title">PROFILE LIST</div>
      <div className="drawer-select flex">
        <div className="scrollable">
          {data.map((profile, key) =>
            editId === profile.id ? (
              <div className="flex">
                <div className={`profile-item ${profile.icon} active`}></div>
                <input
                  type="text"
                  value={profile.name}
                  className={`profile-item show`}
                  placeholder="Enter Profile Name"
                  onChange={(e) => setProfileName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            ) : (
              <div
                onClick={() => handleFetchById(profile.id)}
                key={key}
                className={`profile-item ${profile.icon} ${profile.status}`}
              >
                {profile.name}
              </div>
            )
          )}
        </div>
        <Toolbar data={data} />
      </div>
    </div>
  );
};
export default LeftPanel;
