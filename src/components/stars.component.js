import React, { Component } from "react";
import StarsDataService from "../services/stars.service";

export default class Stars extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateStars = this.updateStars.bind(this);
    this.deleteStars = this.deleteStars.bind(this);

    this.state = {
      currentStars: {
        id: null,
        title: "",
        description: "",
        published: false,
        url: ""
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stars } = nextProps;
    if (prevState.currentStars.id !== stars.id) {
      return {
        currentStars: stars,
        message: ""
      };
    }

    return prevState.currentStars;
  }

  componentDidMount() {
    this.setState({
      currentStars: this.props.stars,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStars: {
          ...prevState.currentStars,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentStars: {
        ...prevState.currentStars,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    StarsDataService.update(this.state.currentStars.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentStars: {
            ...prevState.currentStars,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStars() {
    const data = {
      title: this.state.currentStars.title,
      description: this.state.currentStars.description,
    };

    StarsDataService.update(this.state.currentStars.id, data)
      .then(() => {
        this.setState({
          message: "The stars was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteStars() {
    StarsDataService.delete(this.state.currentStars.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentStars } = this.state;

    return (
      <div>
        <h4>Stars</h4>
        {currentStars ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStars.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStars.description}
                  onChange={this.onChangeDescription}
                />
              </div>



              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentStars.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentStars.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStars}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStars}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Stars...</p>
          </div>
        )}
      </div>
    );
  }
}
