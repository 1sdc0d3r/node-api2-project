import React from "react";

const Cards = ({ state, remove, edit }) => {
  return (
    <>
      <section>
        {state.posts.map(e => (
          <div className="card-wrapper" key={e.id}>
            <p>{e.id}</p>
            <h3>Title: {e.title}</h3>
            <p>Content: {e.contents}</p>
            <p>Created: {e.created_at}</p>
            <p>Updated: {e.updated_at}</p>
            <div className="btn-div">
              <button
                onClick={() => {
                  edit();
                }}
              >
                Edit
              </button>
              <button onClick={() => remove(e.id)}>Remove</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Cards;
