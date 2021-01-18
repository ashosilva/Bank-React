import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank" />
                <h1>Bank of React</h1>
                <AccountBalance accountBalance={this.props.accountBalance} />
                <br></br>
                <Link to="/logIN"> Log In</Link>
                <br></br>
                <br></br>
                <Link to="/debit">Debit</Link>
                <br></br>
                <br></br>
                <Link to="/credit">Credit</Link>
            </div>

        );
    }
}

export default Home;