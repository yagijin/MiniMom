import React, { Component } from 'react';
import Maru from '../images/maru.png';

class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {
            month: 11,
            year: 2019
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
                        <tr>
                            <td>28
                            <br/><img class="calender-icon" src={Maru}/>
                            </td>
                            <td>29</td>
                            <td>30</td>
                            <td>31</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>12</td>
                            <td>13</td>
                            <td>14</td>
                            <td>15</td>
                            <td>16</td>
                            <td>17</td>
                        </tr>
                        <tr>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                            <td>21</td>
                            <td>22</td>
                            <td>23</td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>25</td>
                            <td>26</td>
                            <td>27</td>
                            <td>28</td>
                            <td>29</td>
                            <td>30</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calender;