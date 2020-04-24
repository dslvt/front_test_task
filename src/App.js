import React from 'react';
import logo from './logo.svg';
import './App.css';
import TableCard from './TableCard';

class Table extends React.Component{
  constructor(props){
    super(props);

    this.state = {data: this.props.data, clicked: []};
    this.formatDate = this.formatDate.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectByCategory = this.selectByCategory.bind(this);

    this.tableHeader = this.state.data.map((d)=>{
      return d.category;
    }).filter((v, i, a) => a.indexOf(v) === i);


  }

  handleClick = (id) => {
    this.setState(state => ({
      clicked: this.state.clicked.includes(id)? this.state.clicked.filter(i => i !== id) : [...this.state.clicked, id]
    }));
  } 
  formatDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toDateString() == 'Invalid Date'?"":date.toDateString();
  }

  handleInputChange = (id, event) => {
    console.log(event.target.value, 'asf');
    this.setState({data: [...this.state.data.filter((e)=>e.id!==id), 
      {...this.state.data.filter((e)=>e.id===id)[0], recommend_price:event.target.value}]});
  }

  sendData = () => {
    let info = this.state.clicked
      .sort((a, b) => a - b)
      .map((d) => {return this.state.data.filter((v) => v.id === d)[0]});
    console.table(info);
    alert(JSON.stringify(info));
  } 

  selectByCategory = (name, category) => {
    this.setState(state => ({
      clicked:[...this.state.data.filter((v) => this.state.clicked.includes(v.id)).filter((e) => e[category] === name)].length!== [...this.state.data.filter((e) => e[category] === name)].length?
               [...this.state.data.filter((e) => e[category] === name).map((e) => e.id), ...this.state.clicked].filter((v, i, a) => a.indexOf(v) === i):
                this.state.clicked.filter((v) => ![...this.state.data.filter((e) => e[category] === name).map((e) => e.id)].includes(v))
    }));
  }



  render(){
    let firstRow = this.state.data
      .map((d) => d.date)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a-b);
    
    console.log(this.tableHeader, firstRow)

    let tableData = [...Array(firstRow.length)].map(e => Array(this.tableHeader.length));
    for(let i = 0; i < this.tableHeader.length; i++){
      for(let j = 0; j < firstRow.length; j++){
        let res = this.state.data.filter((d) => d.category === this.tableHeader[i]).filter((d) => d.date === firstRow[j]);
        if(res.length !== 0){
          tableData[i][j] = res[0];
        }else{
          tableData[i][j] = null;
        }
      }
    }

    return(
      <div className="Table">
        <table>
          <thead><tr>{["", ...firstRow].map((d) => <th onClick={this.selectByCategory.bind(this, d, "date")}>{this.formatDate(d)}</th>)}</tr></thead>
          <tbody>
            {tableData.map((row, i) => <tr>{[<td onClick={this.selectByCategory.bind(this, this.tableHeader[i], "category")}>{this.tableHeader[i]}
            </td>, ...row.map((card_data) => {
              return card_data!==null? <td><TableCard 
              cur_price={card_data.current_price} 
              rec_price={card_data.recommend_price} 
              date={card_data.date} 
              key={card_data.id} 
              onchangevalue={this.handleInputChange.bind(this, card_data.id)}
              checked={this.state.clicked.includes(card_data.id)} 
              onclick={this.handleClick.bind(this, card_data.id)}></TableCard></td> : <td>-</td>})]}</tr>)}
          </tbody>
          <button className="tbutton" onClick={this.sendData}>Apply</button>
        </table>
      </div>
    );
  }
}
export default Table;
