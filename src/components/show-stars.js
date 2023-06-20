import React, { Component } from 'react';
import StarsDataService from "../services/stars.service";
import LoginWithGoogle from './google_signin_reactions_comments'

export default class StarsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStars = this.setActiveStars.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      starsList: [],
      currentStars: null,
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
        url: data.url,
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
    });
  }

  setActiveStars(stars) {
    this.setState({
      currentStars: stars,
    });
  }

  render() {
    const { starsList, currentStars } = this.state;

    return (
      <div className="gallery">
        {currentStars ? (
          <div>
            
            <div>
              <h4>Titulo: {currentStars.title}</h4>
              <p>Descripcion: {currentStars.description}</p>
              <img className="firebase-image" src={currentStars.url} alt={currentStars.title} />
            </div>
            <div>
              <LoginWithGoogle currentStars={currentStars} />
            </div>
            
            <div className='divButton'>
              <button className='buttonStl' onClick={this.refreshList}>Regresar</button>
            </div>
          </div>
        ) : (
          starsList &&
          starsList.map((star) => (
            <div className="gallery-item" key={star.id}>
              <h4>{star.title}</h4>
              <img src={star.url} alt={star.title} onClick={() => this.setActiveStars(star)} />
              <div className="gallery-item-description">
                <p>{star.description}</p>
                <button className='buttonStl' onClick={() => this.setActiveStars(star)}>Detalles</button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
