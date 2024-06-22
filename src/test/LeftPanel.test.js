import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import LeftPanel from "../components/LeftPanel";

const mockStore = configureStore([]);

describe("LeftPanel Component", () => {
  let store;
  beforeEach(() => {
    const initialState = {
      data: {
        data: [
          {
            id: 1,
            name: "default",
            icon: "default",
            isEditable: false,
            status: "active",
          },
          {
            id: 2,
            name: "game",
            icon: "game",
            isEditable: false,
            status: "",
          },
          {
            id: 3,
            name: "movie",
            icon: "movie",
            isEditable: false,
            status: "",
          },
          {
            id: 4,
            name: "music",
            icon: "music",
            isEditable: false,
            status: "",
          },
          {
            id: 5,
            name: "Demo Long Text Demo Long",
            icon: "default",
            isEditable: true,
            status: "",
          },
        ],
        editId: null,
      },
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn(); // Mock dispatch function
  });

  test("renders profile list correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <LeftPanel />
      </Provider>
    );

    // Verify if the profile names are rendered
    expect(getByText("default")).toBeInTheDocument();
    expect(getByText("game")).toBeInTheDocument();
    expect(getByText("movie")).toBeInTheDocument();
    expect(getByText("music")).toBeInTheDocument();
    expect(getByText("Demo Long Text Demo Long")).toBeInTheDocument();
  });

  test("scrolls to bottom when data changes", async () => {
    const { container, rerender } = render(
      <Provider store={store}>
        <LeftPanel />
      </Provider>
    );

    // Mock a change in Redux data
    const updatedState = {
      data: {
        ...store.getState().data,
        data: [
          ...store.getState().data.data,
          {
            id: 6,
            name: "New Profile",
            icon: "default",
            isEditable: true,
            status: "active",
          },
        ],
      },
    };
    store = mockStore(updatedState);

    rerender(
      <Provider store={store}>
        <LeftPanel />
      </Provider>
    );

    // Wait for scroll to bottom action
    await waitFor(() => {
      const scrollableDiv = container.querySelector(".scrollable");
      expect(scrollableDiv.scrollTop).toBe(scrollableDiv.scrollHeight);
    });
  });

  // Add more tests as needed for other functionalities
});
