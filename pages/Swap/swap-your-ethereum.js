import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import {
  Button,
  Icon,
  Input,
  Label,
  LabelDetail,
  Form,
  Message,
} from "semantic-ui-react";
import coinverse from "../../ethereum/coinverse";

export default class EthSwap extends Component {
  state = {
    ethSwapValue: "",
    ethSwapCoinAmount: 0,
    loadingEthSwap: false,
    ethSwapErrorMessage: "",

    address: web3.currentProvider.selectedAddress,
    coins: 0,
  };

  componentDidMount() {
    var coins = localStorage.getItem(this.state.address + "coins");
    this.setState({ coins: parseInt(coins) });
  }

  convertToCoinsSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loadingEthSwap: true, ethSwapErrorMessage: "" });

    try {
      await coinverse.methods.convertToCoins().send({
        from: this.state.address,
        value: web3.utils.toWei(this.state.ethSwapValue, "ether"),
      });

      var newCoinBal = parseInt(this.state.coins) + (this.state.ethSwapValue * 1000);
      localStorage.removeItem(this.state.address + "coins");
      localStorage.setItem(this.state.address + "coins", newCoinBal);
    } catch (err) {
      this.setState({ ethSwapErrorMessage: err.message });
    } finally {
      this.setState({ loadingEthSwap: false });
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.convertToCoinsSubmit}
        error={!!this.state.ethSwapErrorMessage}
      >
        <Label attached="top right">
          Your Coin Balance:
          <LabelDetail>{this.state.coins}</LabelDetail>
          <br />
          <br />
          Coin Balance After Swap:
          <LabelDetail>
            {this.state.coins + this.state.ethSwapCoinAmount}
          </LabelDetail>
        </Label>
        <Input
          value={this.state.ethSwapValue}
          onChange={(event) =>
            this.setState({
              ethSwapValue: event.target.value,
              ethSwapCoinAmount: event.target.value * 1000,
            })
          }
          label={{ basic: true, content: "ethereum" }}
          labelPosition="right"
          placeholder="Amout..."
          floated="right"
        />
        <p>
          <Icon name="long arrow alternate down" size="large" />
        </p>
        <Label compact size="huge" color="yellow">
          {this.state.ethSwapCoinAmount}
          <Label.Detail>Coins</Label.Detail>
        </Label>
        <br />
        <br />
        <br />
        <Message
          error
          header="Oops!"
          content={this.state.ethSwapErrorMessage}
        />
        <Button
          compact
          size="massive"
          color="green"
          loading={this.state.loadingEthSwap}
        >
          Swap
        </Button>
      </Form>
    );
  }
}
