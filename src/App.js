import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import LogIn from "./components/LogIn"
import Debit from "./components/Debit"
import Credit from "./components/Credit"
import axios from 'axios'
import "./components/Bank.css"



class App extends Component {
  constructor() {
    super()
    this.state = {
      accountBalance: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'Abayomi',
        memberSince: "03/25/00"
      }
    }
  }

  componentDidMount() {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then(response => {
        this.setState({ debits: response.data })
        this.updateBalance()
      })
      .catch((error) => console.log(error))

    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then(response => {
        this.setState({ credits: response.data })
        this.updateBalance()
      })
      .catch((error) => console.log(error))

  }

  mockLogIn = (logInInfo) => {

    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  updateBalance = () => {
    let totalDebit = 0
    let totalCredit = 0
    for (let i = 0; i < this.state.debits.length; i++) {
      totalDebit += this.state.debits[i].amount
    }
    for (let i = 0; i < this.state.credits.length; i++) {
      totalCredit += this.state.credits[i].amount
    }
    this.setState({
      accountBalance: (totalCredit - totalDebit)
    })
  }

  addDebit = (addAmo, addDes) => {
    let addDate = new Date()
    let arr = {
      description: addDes,
      amount: Number(addAmo),
      date: addDate.toISOString()
    }
    this.state.debits.push(arr)
    this.updateBalance()
  }

  addCredit = (addAmo, addDes) => {
    let addDate = new Date()
    let arr = {
      description: addDes,
      amount: Number(addAmo),
      date: addDate.toISOString()
    }
    this.state.credits.push(arr)
    this.updateBalance()
  }

  render() {

    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
      />
    )
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        accountBalance={this.state.accountBalance}
      />
    )
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn} {...this.props}
      />
    )
    const DebitComponent = () => (
      <Debit accountBalance={this.state.accountBalance} debits={this.state.debits} addDebit={this.addDebit} />
    )
    const CreditComponent = () => (
      <Credit accountBalance={this.state.accountBalance} credits={this.state.credits} addCredit={this.addCredit} />
    )

    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/userProfile" component={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debit" component={DebitComponent} />
          <Route exact path="/credit" component={CreditComponent} />
        </div>
      </Router>
    )
  }
}

export default App 