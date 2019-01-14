import React, { Component } from 'react';
import './App.css';
import Modal from './Modal';
import ReportComponent from './ReportComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      filter:3,
      search:'',
      keywords:['science','maths','biology','physics','physcology','modor','computers'],
      autoComplete:[],
      items:[],
      dropdown:"inline-block",
      show:false,
      modalText:'',
    }
    this.handleChange=this.handleChange.bind(this);
    this.updateSearch=this.updateSearch.bind(this);
    this.keywordClicked=this.keywordClicked.bind(this);
    this.reportClicked=this.reportClicked.bind(this);
    this.hideModal=this.hideModal.bind(this);
  }

  componentDidMount() {
    // api call
    fetch("http://localhost:8000/reports/").then(res => res.json())
      .then(
        (result) => {
            // console.log(result)
            result.sort(function(a, b){
                let A=new Date(a.date);
                let B=new Date(b.date);
                return B-A //sort by date ascending
            })
            this.setState({items:result})
        },
        (error) => {
          console.log('error',error)
        }
      )
  }

  updateSearch=(e)=>{
    this.setState({
      dropdown:'inline-block',
      search:e.target.value,
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
            let A=new Date(a.date);
            let B=new Date(b.date);
            return A-B //sort by date ascending
        })
      }else{
        items.sort(function(a, b){
            let A=new Date(a.date);
            let B=new Date(b.date);
            return B-A //sort by date descending
        })
      }
      this.setState({
        items:items
      })
    })
  }

  keywordClicked=(item)=>{
    this.setState({
      search:'',
      items:[],
      dropdown:"none"
    },()=>{
      //api call
      fetch("http://localhost:8000/searchReports/"+item).then(res => res.json())
      .then(
        (result) => {
            // console.log(result)
            this.setState({items:result})
        },
        (error) => {
          console.log('error',error)
        }
      )
    })
    
  }

  reportClicked=(item)=>{
    this.setState({
      search:'',
      dropdown:'none',
      show:true,
      modalText:item.desc,
    })
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="App">
        {this.state.items.length==0 && <div className="spinner"></div>}
        <Modal show={this.state.show} onPress={this.hideModal} modalText={this.state.modalText}>
        </Modal>
        <div className="header">
          <div className="search">
            <input type="text"
              className="searchBar"
              value={this.state.search}
              onChange={this.updateSearch}
              placeholder={"Search"}/>
            <div className="dropdown" style={{display:this.state.dropdown}}>
              {this.state.autoComplete.map((item,i)=>{
                return(<div className="list" key={i} onClick={()=>this.keywordClicked(item)}>
                          {item}
                        </div>)
              })}
            </div>
          </div>
        </div>
        <div className="filterTag">
          {"Filter: "}
          <div className="filter">
              <select 
                className="filterBar"
                value={this.state.filter} 
                onChange={this.handleChange} 
              >
               <option className="filterOption" value={0}>{"Cost Low-High"}</option>
                <option className="filterOption" value={1}>{"Cost High-Low"}</option>
                <option className="filterOption" value={2}>{"Date Low-High"}</option>
                <option className="filterOption" value={3}>{"Date High-Low"}</option>
              </select>
          </div>
        </div>
        <div className="cards">
          {this.state.items.map((item,i)=>{
            return (<ReportComponent key={i} item={item} onPress={()=>this.reportClicked(item)}/>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
