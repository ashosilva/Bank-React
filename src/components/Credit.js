import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import { Link } from "react-router-dom";

class Credit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            credits: this.props.credits,
            creditDescription: "",
            creditAmount: "",
            creditDate: ""
        }
    }


    handleDescription = (event) => {
        const val = event.target.value
        this.setState({
            creditDescription: val
        })
        console.log(this.state.creditDescription)
    }

    handleAmount = (event) => {
        this.setState({
            creditAmount: event.target.value
        })
        console.log(this.state.creditAmount)
    }

    handleSubmitEvent = (event) => {
        event.preventDefault()
        this.props.addCredit(this.state.creditAmount, this.state.creditDescription)
        console.log(this.props.credits)
    }


    render() {

        let print = []
        print = (this.props.credits).map(cre =>
            <div key={cre.date}>
                <div> <label id="descriptionLable">Description: </label> {cre.description} </div>
                <div> <label id="amountLable">Amount: </label>  {cre.amount} </div>
                <div> <label id="dateLable">Date: </label>  {cre.date} </div>
                <br></br>
            </div>

        )

        return (
            <div id ="background">
                <h1>Credits</h1>
                <Link to="/">Home</Link>
                <br></br>

                <h3>Credit Entry</h3>

                <div className="creditInputs">
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
                    <button type="button" id="credit-button" onClick={this.handleSubmitEvent}>Add Credit</button>
                </div>
                <br></br>

                <AccountBalance accountBalance={this.props.accountBalance} />
                <br></br>

                <div>{print}</div>


            </div>
        );
    }
}

export default Credit;