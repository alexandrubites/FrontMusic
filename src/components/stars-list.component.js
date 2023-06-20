import React, { Component } from "react";
import StarsDataService from "../services/stars.service";

import Stars from "./stars.component";

export default class StarsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStars = this.setActiveStars.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      starsList: [],
      currentStars: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = StarsDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let starsList = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      starsList.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      starsList: starsList,
    });
  }

  refreshList() {
    this.setState({
      currentStars: null,
      currentIndex: -1,
    });
  }

  setActiveStars(stars, index) {
    this.setState({
      currentStars: stars,
      currentIndex: index,
    });
  }

  render() {
    const { starsList, currentStars, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Stars List</h4>

          <ul className="list-group">
            {starsList &&
              starsList.map((star, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveStars(star, index)}
                  key={index}
                >
                  {star.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentStars ? (
            <Stars
              stars={currentStars}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Stars...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}