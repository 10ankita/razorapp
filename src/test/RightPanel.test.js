import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import RightPanel from "../components/RightPanel";
const mockStore = configureStore([]);

describe("RightPanel Component", () => {
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
            status: "active",
          },
        ],
      },
    };
    store = mockStore(initialState);
  });

  //test for initial functionaly, RightPanel will render with first element
  test("renders with default active profile", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPanel />
      </Provider>
    );

    expect(getByTestId("profilename")).toHaveTextContent("default");
  });
});
