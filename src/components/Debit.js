import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import { Link } from "react-router-dom";

class Debit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            debits: this.props.debits,
            debitDescription: "",
            debitAmount: "",
            debitDate: ""
        }
    }


    handleDescription = (event) => {
        const val = event.target.value
        this.setState({
            debitDescription: val
        })
        console.log(this.state.debitDescription)
    }

    handleAmount = (event) => {
        this.setState({
            debitAmount: event.target.value
        })
        console.log(this.state.debitAmount)
    }

    handleSubmitEvent = (event) => {
        event.preventDefault()
        this.props.addDebit(this.state.debitAmount, this.state.debitDescription)
        console.log(this.props.debits)
    }


    render() {

        let print = []
        print = (this.props.debits).map(deb =>
            <div key={deb.date}>
                <div> <label id="descriptionLable">Description: </label> {deb.description} </div>
                <div> <label id="amountLable">Amount: </label>  {deb.amount} </div>
                <div> <label id="dateLable">Date: </label>  {deb.date} </div>
                <br></br>
            </div>

        )
        //console.log(this.props.debits)

        return (
            <div id ="background">
                <h1>Debits</h1>
                <Link to="/">Home</Link>
                <br></br>

                <h3>Debit Entry</h3>

                <div className="debitInputs">
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="descriptionInput" onChange={this.handleDescription}></input>
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" id="amountInput" onChange={this.handleAmount}></input>
                    </div>
                </div>
                <br></br>

                <div>
                    <button type="button" id="debit-button" onClick={this.handleSubmitEvent}>Add Debit</button>
                </div>
                <br></br>

                <AccountBalance accountBalance={this.props.accountBalance} />
                <br></br>

                <div>{print}</div>


            </div>
        );
    }
}

export default Debit;