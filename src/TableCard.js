import React from 'react';
import './TableCard.css';


class TableCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {...props};
    }

    render(){
        let sign = "";
        if (this.state.cur_price > this.state.rec_price){
            sign = "👍";
        }else if (this.state.cur_price < this.state.rec_price){
            sign = "👎";
        }else{
            sign = "👌";
        }

        let date = new Date();
        date.setTime(Number(this.state.date));
        let st_time = `${date.getDay()}:${date.getMonth()}:${date.getYear()}`;

        return(
            <div className={this.props.checked?"tableCard checkedCard":"tableCard"} onClick={this.props.onclick}>
                <div className="priceHolder">
                    <div>{this.state.cur_price}</div>
                    <div>{this.state.rec_price}</div>
                </div>
                <div>{sign}</div>
            </div>
        );
    }
}

export default TableCard;