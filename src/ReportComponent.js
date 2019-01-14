import React, { Component } from 'react';
import './App.css';

export default class ReportComponent extends Component{
  
  render(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date=new Date(this.props.item.date)
    let mon=months[date.getMonth()];
    let year=date.getFullYear()
    return(
        <div className="report" onClick={this.props.onPress}>
          <img className="image" src={this.props.item.image}/>
          <div className="info">
            <div className="title">{this.props.item.title}</div>
            <div className="shortDesc">{this.props.item.shortDesc}</div>
            <div className="date">{'PUBLISHED: '}{mon+" "+year}</div>
            <div className="cost">{'COST OF REPORT: '}{this.props.item.cost}</div>
          </div>
        </div>
      );
  }
}