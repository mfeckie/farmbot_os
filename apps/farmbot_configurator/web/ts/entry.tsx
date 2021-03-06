import * as React from "react";
import { render } from "react-dom";
import { Main } from "./main";
import { state } from "./state";
import { useStrict } from "mobx";

import { wsInit } from "./web_socket";
import { uuid } from "./utils";
import "../css/main.scss"
// mobx setting for more saftey in the safe things.
useStrict(true);


let onInit = function () {
  // request some initial data
  // get whatever config is currently available.
  state.makeRequest({ method: "get_current_config", params: [], id: uuid() }, ws);

  // get a list of network interfaces
  state.makeRequest({ method: "get_network_interfaces", params: [], id: uuid() }, ws);
}

/** initialize the websocket connection. */
let ws = wsInit(state, onInit);

// get the element on which we want to render too.
let el = document.querySelector("#app");
if (el) {
  render(<Main state={state} ws={ws} />, el);
} else {
  console.error("could not find element #app");
}