import React, { Component } from "react";
import StarsDataService from "../services/stars.service";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export const storage = firebase.storage();

export default class AddStars extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveStars = this.saveStars.bind(this);
    this.newStars = this.newStars.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,
      submitted: false,
      file: null,
      url: ""
    };
  }

  onChangeFile(e) {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  }

  handleUpload(e, file) {
    e.preventDefault();
    console.log(file);
    alert(file.name);
    const uploadTask = storage.ref('/images/'+file.name).put(file);
    uploadTask.on("state_changed", console.log, console.error, ()=>{
      storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((myurl)=>{
              alert(myurl);
              this.setState({ url: myurl });
            });
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveStars() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false,
      url: this.state.url
    };

    StarsDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newStars() {
    this.setState({
      title: "",
      description: "",
      published: false,
      url:"",
      submitted: false,
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newStars}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
                
              </div>
              <div>
                <form onSubmit= {(event)=>{
                  this.handleUpload(event, this.state.file);
                }}>
                <input type="file"  onChange={(event)=>{
                  this.onChangeFile(event)
                }}/>

                <button disabled={!this.state.file}>Upload to firebase</button>

                </form>
                <img className="firebase-image" src={this.state.url} alt="" />
              </div>

              <button onClick={this.saveStars} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}
