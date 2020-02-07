import React, { PureComponent } from "react";
import axios from "axios";
import "./App.css";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isEditing: false,
      editing: {},
      creating: false
    };
  }

  componentWillMount() {
    this.getPosts();
  }

  getPosts = () => {
    console.log("GETTING POSTS");
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => this.setState({ ...this.state, posts: res.data }))
      .catch(err => console.log(err));
  };

  onChangeHandler = evt =>
    this.setState({
      ...this.state,
      editing: {
        ...this.state.editing,
        [evt.target.name]: evt.target.value,
        updated_at: Date.now()
      }
    });

  onSubmitHandler = evt => {
    // evt.preventDefault();
    this.state.creating
      ? axios
          .post(`http://localhost:5000/api/posts`, this.state.editing)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      : axios
          .put(
            `http://localhost:5000/api/posts/${this.state.editing.id}`,
            this.state.editing
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));
  };

  onDeleteHandler = id =>
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        console.log(res);
        this.getPosts();
      })
      .catch(err => {
        console.log(err);
      });

  render() {
    if (!this.state.creating) {
      if (!this.state.isEditing) {
        return (
          <>
            <button
              onClick={() => this.setState({ ...this.state, creating: true })}
            >
              CREATE
            </button>
            <section>
              {this.state.posts.map(e => (
                <div className="card-wrapper" key={e.id}>
                  <p>{e.id}</p>
                  <h3>Title: {e.title}</h3>
                  <p>Content: {e.contents}</p>
                  <p>Created: {e.created_at}</p>
                  <p>Updated: {e.updated_at}</p>
                  <div className="btn-div">
                    <button
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          isEditing: true,
                          editing: e
                        })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => this.onDeleteHandler(e.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </>
        );
      }
    }
    return (
      <form onSubmit={this.onSubmitHandler}>
        <label>Title: </label>
        <input
          name="title"
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.editing.title}
        />
        <label>Content: </label>
        <input
          name="contents"
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.editing.contents}
        />
        <input type="submit" />
      </form>
    );
  }
}
