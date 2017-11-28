import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'active',
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
      });
  }
  render() {
    const header = this.state.header;
    const data = this.state.data;
    const label = this.state.label;
    return (
      <main className="container">
      <div className="row">
        <header><h1>{header.title}</h1></header>
        <Tabs items={this.state.label} />
        <div className="tab-content">
          { Object.keys(data).map((x,i) => <Container id={x} key={x} status={label[x]} info={data[x]} /> )}
        </div>
      </div>
      </main> 
    ) 
  }
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: ''
    };
  }
  handleClick(e,tab){
    console.log(e,tab);
    this.setState(prev => ({
      activeTab: tab
    }));
  }
  render(){
    console.log(this.props.activeTab);
    const items = this.props.items;
    return (
      <ul className="nav nav-tabs">
      { Object.keys(items).map((x) => (
        <li key={x} className={items[x].classes ? "active" : null} onClick={this.handleClick.bind(this,x)}>
          <a data-toggle="tab" href={"#"+x}>{items[x].tab_name}  
            <small className="badge label-primary">{items[x].total_items}</small>
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
    console.log(this.props.activeTab);
    let id = this.props.id;
    let info = this.props.info;
    let status = this.props.status;
    console.log('info',info);
    console.log(id, status);
    return (
      <div>
      <div id={id} className={"tab-pane fade" + (status.hasOwnProperty("classes") ? status.classes : "")}>
        { Object.keys(info).map((x,i) => <Media title={info[x].title} img={info[x].image_url} description={info[x].description} /> )}
      </div>
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
