import React from "react";

export default function Form({ state, change, submit }) {
  return (
    <>
      <form onSubmit={submit}>
        <label>Title: </label>
        <input
          name="title"
          type="text"
          onChange={change}
          value={state.editing.title}
        />
        <label>Content: </label>
        <input
          name="contents"
          type="text"
          onChange={change}
          value={state.editing.contents}
        />
        <input type="submit" />
      </form>
    </>
  );
}
