import React, { Component } from 'react';
import './App.css';

export default class Modal extends Component{
  
  render(){
    return(
        <div className={this.props.show ? "modal display-block" : "modal display-none"}>
          <section className="modal-main">
            {this.props.modalText}
            <button className={'closeButton'} onClick={this.props.onPress}>close</button>
          </section>
        </div>
      );
  }
}