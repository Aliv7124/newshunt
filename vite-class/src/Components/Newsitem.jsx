import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,date}=this.props;
    return (
      <div className="card" style={{width: "18rem"}}>
  <img src={imageUrl?imageUrl:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ityVZ38JHhzQ/v0/1200x800.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text">{new Date(date).toGMTString()}</p>
    <a href={newsUrl} target='blank' className="btn btn-primary">Read More</a>
  </div>
</div> 
    )
  }
}

export default Newsitem
