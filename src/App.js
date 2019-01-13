import React, { Component } from 'react';
import './App.css';

class ReportComponent extends Component{
  
  render(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let mon=months[this.props.item.date.getMonth()];
    let year=this.props.item.date.getFullYear()
    return(
        <div className="report">
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

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      filter:0,
      search:'',
      keywords:['science','maths','biology'],
      autoComplete:[],
      items:[
        {
          title:"Name",
          shortDesc:"Fadfsfs asdfsadfsd asfsdaf asdfafas asfdsafgdfg fh fh hyterhsfbrtb wr sdfsadfsd asfsdaf asdfafas asfdsafgdfg fh",
          date:new Date(2012,4),
          image:"http://blogs.lse.ac.uk/lsereviewofbooks/files/2016/02/Books-for-Survey.jpg",
          cost:200,
          keyword:"science"
        },
        {
          title:"Name",
          shortDesc:"Fadfsfs asdfsadfsd asfsdaf asdfafas asfdsafgdfg fh fh hyterhsfbrtb wr sdfsadfsd asfsdaf asdfafas asfdsafgdfg fh",
          date:new Date(2011,4),
          image:"http://blogs.lse.ac.uk/lsereviewofbooks/files/2016/02/Books-for-Survey.jpg",
          cost:400,
          keyword:"maths"
        },
        // {
        //   title:"Name",
        //   shortDesc:"Fadfsfs asdfsadfsd asfsdaf asdfafas asfdsafgdfg fh fh hyterhsfbrtb wr sdfsadfsd asfsdaf asdfafas asfdsafgdfg fh",
        //   date:new Date(2012,4),
        //   image:"http://blogs.lse.ac.uk/lsereviewofbooks/files/2016/02/Books-for-Survey.jpg",
        //   cost:200
        // },
        // {
        //   title:"Name",
        //   shortDesc:"Fadfsfs asdfsadfsd asfsdaf asdfafas asfdsafgdfg fh fh hyterhsfbrtb wr sdfsadfsd asfsdaf asdfafas asfdsafgdfg fh",
        //   date:new Date(2013,4),
        //   image:"http://blogs.lse.ac.uk/lsereviewofbooks/files/2016/02/Books-for-Survey.jpg",
        //   cost:200
        // }
      ],
    }
    this.handleChange=this.handleChange.bind(this);
    this.updateSearch=this.updateSearch.bind(this);
    this.keywordClicked=this.keywordClicked.bind(this);
  }

  // componentDidMount() {
  //   // api call
  //   fetch("http://localhost:8000/userStocks/5c39b04fa856711748df3802/").then(res => res.json())
  //     .then(
  //       (result) => {
  //           let items=result;
  //           items.sort(function(a, b){
  //                 return a.cost-b.cost //sort by cost ascending
  //               })
  //           this.setState({
  //               items:items
  //             })
  //       },
  //       (error) => {
  //         console.log('error',error)
  //       }
  //     )
  // }

  updateSearch=(e)=>{
    this.setState({
      search:e.target.value
    },()=>{
      let searchedKeywords=this.state.keywords.filter((obj)=>{
        return this.state.search!=''&&obj.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
      })
      this.setState({
        autoComplete:searchedKeywords
      })
    })
  }

  handleChange=(e)=>{
    this.setState({
      filter:e.target.value
    },()=>{
      let items=this.state.items;
      let filter=this.state.filter;
      if (filter==0) {
        items.sort(function(a, b){
          return a.cost-b.cost //sort by cost ascending
        })
      }else if (filter==1) {
        items.sort(function(a, b){
          return b.cost-a.cost //sort by date descending
        })
      }else if (filter==2) {
        items.sort(function(a, b){
            return a.date-b.date //sort by date ascending
        })
      }else{
        items.sort(function(a, b){
            return b.date-a.date //sort by date descending
        })
      }
      this.setState({
        items:items
      })
    })
  }

  keywordClicked=(e)=>{
    console.log(e)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="search">
            <input type="text"
              value={this.state.search}
              onChange={this.updateSearch}
              placeholder={"Search"}/>
            <ul>
              {this.state.autoComplete.map((item,i)=>{
                return(<button key={i} onClick={this.keywordClicked}>
                          {item}
                        </button>)
              })}
            </ul>
          </div>
        </div>
        <div className="filterTag">
          {"Filter: "}
          <div className="filter">
              <select 
                value={this.state.filter} 
                onChange={this.handleChange} 
              >
               <option value={0}>{"Cost Low-High"}</option>
                <option value={1}>{"Cost High-Low"}</option>
                <option value={2}>{"Date Low-High"}</option>
                <option value={3}>{"Date High-Low"}</option>
              </select>
          </div>
        </div>
        <div className="cards">
          {this.state.items.map((item,i)=>{
            return (<ReportComponent key={i} item={item}/>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
