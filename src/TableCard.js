import React from 'react';
import './TableCard.css';


class TableCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {...props, hovered:false};
    }

    render(){
        let sign = "";
        if (this.state.cur_price < this.state.rec_price){
            sign = "👍";
        }else if (this.state.cur_price > this.state.rec_price){
            sign = "👎";
        }else{
            sign = "👌";
        }

        let date = new Date();
        date.setTime(Number(this.state.date));
        let st_time = `${date.getDay()}:${date.getMonth()}:${date.getYear()}`;
        let card_class = ["tableCard"];
        if(this.props.checked)
            card_class.push("checkedCard");
        else if(this.state.hovered)
            card_class.push("hoveredCard")


        return(
            <div className={card_class.join(" ")} onClick={this.props.onclick} onMouseEnter={()=>this.setState({hovered:true})}
                onMouseLeave={()=>this.setState({hovered:false})}>
                <div className="priceHolder">
                    <div>{this.state.cur_price}</div>
                    <div>{this.state.rec_price}</div>
                </div>
                <div className="sign">{sign}</div>
            </div>
        );
    }
}

export default TableCard;