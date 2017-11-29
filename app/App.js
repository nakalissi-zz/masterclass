import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: [],
      label: [],
      data: []
    }
  }

  componentDidMount() {
    axios.get(`https://titan.asset.tv/api/channel-view-json/2240`)
      .then(response => {
        this.setState({
          header: response.data.mcd,
          label: response.data.tabs,
          data: response.data.content
        });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const header = this.state.header;
    const data = this.state.data;
    const label = this.state.label;
    return (
      <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">{header.title}</a>
          </div>
        </div>
      </nav>
      <main className="container">
      <div className="row">
        <Tabs items={this.state.label} />
        <div className="tab-content">
          { Object.keys(data).map((x) => <Container id={x} key={x} status={label[x]} info={data[x]} /> )}
        </div>
      </div>
      </main> 
      </div>
    ) 
  }
}

class Tabs extends React.Component {
  render(){
    const items = this.props.items;
    return (
      <ul className="nav nav-tabs">
      { Object.keys(items).map((x) => (
        <li key={x} className={items[x].classes}>
          <a data-toggle="tab" href={"#"+x}>{items[x].tab_name}  
            <small className="badge badge-primary">{items[x].total_items}</small>
          </a>
        </li>
      ))
      }
      </ul>
    )
  }
}

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    }
  }
  render(){

    let id = this.props.id;
    let info = this.props.info;
    let status = this.props.status;
    // Populate media content 
    return (
      <div id={id} className={"tab-pane fade" + (status.hasOwnProperty("classes") ? " in active" : null)}>
        { Object.keys(info).map((x,i) => <Media title={info[x].title} img={info[x].image_url} description={info[x].description} /> )}
      </div>
    )
  }
}

class Media extends React.Component {
  render(){
    return (
      <div>
      <div className="col-sm-4">
        <h3>{this.props.title}</h3>
        <img src={this.props.img} className="img-responsive" />
        <p>{this.props.description}</p>
      </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
