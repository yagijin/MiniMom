import React, { Component } from 'react';
import Date from './Date';

function days(props){
    return <td>{props.day}</td>
}

function weeks(props){
    return (
        <tr>
            {props.children}
        </tr>
    );
}

class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {
            month: 11,
            year: 2019,
            days: [
                "",
                "",
                "",
                "",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30"
            ]
        }
    }

    nextMonth = () => {
        switch()
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
                            <th>日</th>
                            <th>月</th>
                            <th>火</th>
                            <th>水</th>
                            <th>木</th>
                            <th>金</th>
                            <th>土</th>
                        </tr>
                        <tr>
                            <td>{this.state.days[0]}</td>
                            <td>{this.state.days[1]}</td>
                            <td>{this.state.days[2]}</td>
                            <td>{this.state.days[3]}</td>
                            <td>{this.state.days[4]}</td>
                            <td>{this.state.days[5]}</td>
                            <td>{this.state.days[6]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.days[7]}</td>
                            <td>{this.state.days[8]}</td>
                            <td>{this.state.days[9]}</td>
                            <td>{this.state.days[10]}</td>
                            <td>{this.state.days[11]}</td>
                            <td>{this.state.days[12]}</td>
                            <td>{this.state.days[13]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.days[14]}</td>
                            <td>{this.state.days[15]}</td>
                            <td>{this.state.days[16]}</td>
                            <td>{this.state.days[17]}</td>
                            <td>{this.state.days[18]}</td>
                            <td>{this.state.days[19]}</td>
                            <td>{this.state.days[20]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.days[21]}</td>
                            <td>{this.state.days[22]}</td>
                            <td>{this.state.days[23]}</td>
                            <td>{this.state.days[24]}</td>
                            <td>{this.state.days[25]}</td>
                            <td>{this.state.days[26]}</td>
                            <td>{this.state.days[27]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.days[28]}</td>
                            <td>{this.state.days[29]}</td>
                            <td>{this.state.days[30]}</td>
                            <td>{this.state.days[31]}</td>
                            <td>{this.state.days[32]}</td>
                            <td>{this.state.days[33]}</td>
                            <td>{this.state.days[34]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calender;