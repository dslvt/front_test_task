import React from 'react';
import './TableCard.css';


class TableCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {...props, hovered:false};
    }

    render(){
        let sign = "";
        if (this.props.cur_price < this.props.rec_price){
            sign = "👍";
        }else if (this.props.cur_price > this.props.rec_price){
            sign = "👎";
        }else{
            sign = "👌";
        }

        let card_class = ["tableCard"];
        if(this.props.checked)
            card_class.push("checkedCard");
        else if(this.state.hovered)
            card_class.push("hoveredCard")


        return(
            <div className={card_class.join(" ")} 
                onClick={this.props.onclick} 
                onMouseEnter={()=>this.setState({hovered:true})}
                onMouseLeave={()=>this.setState({hovered:false})}
                onChange={this.props.onvaluechange}>

                <div className="priceHolder">
                    <div>{this.state.cur_price}</div>
                    <div className="inputField">
                        <input type="text" 
                        className="input" 
                        placeholder={this.props.rec_price}
                        onChange={this.props.onchangevalue}/>
                        <span className="bottomLine"></span>
                    </div>
                </div>
                <div className="sign">{sign}</div>
            </div>
        );
    }
}

export default TableCard;