import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import { Button, Icon, Input, Form, Message } from "semantic-ui-react";
import coinverse from "../../ethereum/coinverse";

export default class EthSwap extends Component {
  state = {
    transferValue: "",
    transferAddress: "",
    loadingTrasnfer: false,
    transferErrorMessage: "",

    address: web3.currentProvider.selectedAddress,
  };

  onTransferSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loadingTrasnfer: true, transferErrorMessage: "" });

    try {
      await coinverse.methods.sendEth(this.state.transferAddress).send({
        from: this.state.address,
        value: web3.utils.toWei(this.state.transferValue, "ether"),
      });
    } catch (err) {
      this.setState({ transferErrorMessage: err.message });
    }
    this.setState({ loadingTrasnfer: false });
  };

  render() {
    return (
      <Form
        onSubmit={this.onTransferSubmit}
        error={!!this.state.transferErrorMessage}
      >
        <Input
          value={this.state.transferValue}
          onChange={(event) =>
            this.setState({ transferValue: event.target.value })
          }
          label={{ basic: true, content: "ethereum" }}
          labelPosition="right"
          placeholder="Amount..."
          floated="right"
        />
        <p>
          <Icon name="long arrow alternate down" size="large" />
        </p>
        <Input
          value={this.state.transferAddress}
          onChange={(event) =>
            this.setState({
              transferAddress: event.target.value,
            })
          }
          label={{ basic: true, content: "address" }}
          labelPosition="right"
          placeholder="Enter address...."
        />
        <br />
        <br />
        <br />
        <Message
          error
          header="Oops!"
          content={this.state.transferErrorMessage}
        />
        <Button
          compact
          size="massive"
          color="green"
          loading={this.state.loadingTrasnfer}
        >
          Transfer
        </Button>
      </Form>
    );
  }
}
