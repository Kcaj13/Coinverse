import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import {
  Button,
  Icon,
  Input,
  Label,
  Form,
  Message,
  LabelDetail,
} from "semantic-ui-react";
import coinverse from "../../ethereum/coinverse";

export default class CoinSwap extends Component {
  state = {
    coinSwapValue: "",
    coinSwapEthAmount: 0,
    loadingCoinSwap: false,
    coinSwapErrorMessage: "",

    address: web3.currentProvider.selectedAddress,
    coins: 0,
  };

  componentDidMount() {
    var coins = localStorage.getItem(this.state.address + "coins");
    this.setState({ coins: parseInt(coins) });

  }

  convertToEthSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loadingCoinSwap: true, coinSwapErrorMessage: "" });

    try {
      //Can't convert more coins than they have
      if (this.state.coinSwapValue > this.state.coins || this.state.coinSwapValue <  1000){
        throw new Error("");
      } 

      await coinverse.methods.convertToEth(parseInt(this.state.coinSwapValue)).send({
        from: this.state.address,
      });

      //Subtract coins from their balance
      var newCoinBal = parseInt(this.state.coins) - this.state.coinSwapValue;
      localStorage.removeItem(this.state.address + "coins");
      localStorage.setItem(this.state.address + "coins", newCoinBal);
    } catch (err) {
      this.setState({ coinSwapErrorMessage: err.message });
    } finally {
      this.setState({ loadingCoinSwap: false });
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.convertToEthSubmit}
        error={!!this.state.errorMessage}
      >
        <Label attached="top right">
          Your Coin Balance:
          <LabelDetail>{this.state.coins}</LabelDetail>
          <br />
          <br />
          Coin Balance After Swap:
          <LabelDetail>
            {this.state.coins - this.state.coinSwapValue}
          </LabelDetail>
        </Label>

        <Input
          value={this.state.coinSwapValue}
          onChange={(event) =>
            this.setState({
              coinSwapValue: event.target.value,
              coinSwapEthAmount: event.target.value / 1000,
            })
          }
          label={{ basic: true, content: "coins" }}
          labelPosition="right"
          placeholder="Amount (Has to be in 1000s)..."
          floated="right"
        />
        <p>
          <Icon name="long arrow alternate down" size="large" />
        </p>
        <Label compact size="huge" color="yellow">
          {this.state.coinSwapEthAmount}
          <Label.Detail>Ethereum</Label.Detail>
        </Label>
        <br />
        <br />
        <br />
        <Message
          error
          header="Oops!"
          content={this.state.coinSwapErrorMessage}
        />
        <Button
          compact
          size="massive"
          color="green"
          loading={this.state.loadingCoinSwap}
        >
          Swap
        </Button>
      </Form>
    );
  }
}
