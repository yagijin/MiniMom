import React, { Component } from 'react';
import Maru from '../images/maru.png';

class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {
            month: 11,
            year: 2019,
            days: [
                28,
                29,
                30,
                31,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31
            ]
        }
    }

    nextMonth = () => {
        this.setState({month: this.state.month + 1})
        if(this.state.month === 12){
            this.setState({month: this.state.month - 11, year: this.state.year + 1})
        }
    }

    prevMonth = () => {
        this.setState({month: this.state.month - 1})
        if(this.state.month === 1){
            this.setState({month: this.state.month + 11, year: this.state.year - 1})
        }
    }

    render(){
        // var forday = () => {
        //     var body;
        //     var daycount = 0; 

        //     for(var i=0; i < 5; i++){
        //         body += <tr>
        //         for(var j=0; j < 7; j++){
        //             body += <td> + this.state.days[daycount] + </td>;
        //             daycount ++;
        //         }
        //         body += </tr>
        //     }

        //     return body;
        // }

        // var forday = <tr><td>test</td></tr>;

        var forday = [];
        var count = 0;
        for(var i = 0; i < 5; i++){
            var tds = [];
            for(var j = 0; j < 7; j++){
                tds.push(<td>{this.state.days[count]}</td>);
                count ++;
            }

            forday.push(<tr>{tds}</tr>);
        }


        return(
            <div className="carender">
                <div className="month-wrapper">
                    <p className="next" onClick={this.prevMonth}>
                        {'<'}
                    </p>
                    <div className="yearmonth">
                        <p className="month">{this.state.month}月</p>
                        <p className="year">{this.state.year}</p>
                    </div>
                    <p className="next" onClick={this.nextMonth}>
                        {'>'}
                    </p>
                </div>
                <table>
                    <tbody>
                        <tr className="weeks">
                            <th>月</th>
                            <th>火</th>
                            <th>水</th>
                            <th>木</th>
                            <th>金</th>
                            <th>土</th>
                            <th>日</th>
                        </tr>
                        {forday}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calender;