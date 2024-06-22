import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStatus,
  addData,
  deleteData,
  setEditId,
} from "../store/dataSlice";

const Toolbar = ({ data }) => {
  const dispatch = useDispatch();
  const editId = useSelector((state) => state.data.editId);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const currentIndex = useMemo(
    () => data.findIndex((item) => item.status === "active"),
    [data]
  );
  const currentItem = data[currentIndex];

  //handle Arrow Up & Down events
  const handleStatusChange = (indexChange) => {
    dispatch(setEditId(null));
    setShowDeletePopup(false);
    const newIndex = currentIndex + indexChange;
    if (newIndex >= 0 && newIndex < data.length) {
      dispatch(updateStatus({ id: data[newIndex].id }));
    }
  };

  //handle event for adding a profile
  const handleAddProfile = async () => {
    if (editId !== null) {
      dispatch(setEditId(null));
    }
    let maxId = 0;
    if (data.length > 0) {
      maxId = Math.max(...data.map((item) => item.id)); //getting the max id available for new profile
    }
    const newProfile = {
      id: maxId + 1,
      name: "New Profile",
      icon: "default",
      isEditable: true,
      status: "active",
    };
    try {
      dispatch(addData(newProfile));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  //handle event for editing a profile
  const handleEditProfile = async () => {
    dispatch(setEditId(currentItem.id));
    setShowDeletePopup(false);
  };

  //handle event for deleting a profile
  const handleDeleteProfile = () => {
    dispatch(deleteData(currentItem));
    setShowDeletePopup(false);
  };
  return (
    <>
      <div className="toolbar flex">
        <div
          className="icon up"
          onClick={() => handleStatusChange(-1)}
          style={{
            opacity: currentIndex === 0 ? "0.1" : "",
            pointerEvents: currentIndex === 0 ? "none" : "",
          }}
        ></div>
        <div
          className="icon down"
          onClick={() => handleStatusChange(1)}
          style={{
            opacity: currentIndex === data.length - 1 ? "0.1" : "",
            pointerEvents: currentIndex === data.length - 1 ? "none" : "",
          }}
        ></div>
        <div className="icon add" onClick={handleAddProfile}></div>
        <div
          className="icon edit show"
          style={{
            display: currentIndex >= 0 && currentItem.isEditable ? "" : "none",
          }}
          onClick={handleEditProfile}
        ></div>
        <div
          className="icon delete show"
          style={{
            display: currentIndex >= 0 && currentItem.isEditable ? "" : "none",
          }}
          onClick={() => setShowDeletePopup(true)}
        ></div>
      </div>
      {showDeletePopup ? (
        <div
          className="profile-del alert flex show"
          style={{ visibility: "visible !important" }}
        >
          <div className="titel">Delete EQ</div>
          <div className="body-text t-center">{currentItem.name}</div>
          <div className="thx-btn" onClick={handleDeleteProfile}>
            delete
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Toolbar;
