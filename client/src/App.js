import React, { PureComponent } from "react";
import "./App.css";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "test"
    };
  }

  render() {
    return (
      <>
        <p>test</p>
      </>
    );
  }
}
