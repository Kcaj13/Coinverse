import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import { Grid, Dropdown, Button } from "semantic-ui-react";

import Layout from "../../components/layout";

class CoinCapture extends Component {
  state = {
    coinSize: "medium",
    coinVisibleDuration: 2000,

    showCoinButton: false,

    sessionCoinsEarned: 0,
    totalCoinsEarned: 0,

    address: web3.currentProvider.selectedAddress,
    coins: 0,

    interval: null,
  };

  componentDidMount() {
    const coins = localStorage.getItem(this.state.address + "coins");
    if (coins != null) {
      this.setState({ coins: parseInt(coins) });
    }

    //Show & Hide Coin Function
    var showCoin = setInterval(() => {
      this.setState({
        showCoinButton: !this.state.showCoinButton,
      });
      localStorage.removeItem(this.state.address + "coins");
      localStorage.setItem(this.state.address + "coins", this.state.coins);
    }, this.state.coinVisibleDuration);
    this.setState({ interval: showCoin });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleCoinVisibleDurationChange = (e, result) => {
    this.setState({ coinVisibleDuration: result.value });
  };

  handleCoinSizeChange = (e, result) => {
    this.setState({ coinSize: result.value });
  };

  handleUpdateClick = () => {
    clearInterval(this.state.interval);

    var updatedShowCoin = setInterval(() => {
      this.setState({
        showCoinButton: !this.state.showCoinButton,
      });
      localStorage.removeItem(this.state.address + "coins");
      localStorage.setItem(this.state.address + "coins", this.state.coins);
    }, this.state.coinVisibleDuration);

    this.setState({ interval: updatedShowCoin });
  };

  handleCoinClick = () => {
    var coinValue = 0;
    //Increase coin value depending on coin size
    switch (this.state.coinSize) {
      case "tiny":
        coinValue = coinValue + 50;
        break;
      case "medium":
        coinValue = coinValue + 25;
        break;
      case "big":
        coinValue = coinValue + 10;
        break;
      case "massive":
        coinValue = coinValue + 5;
        break;
    }

    //Increase coin value depending on visible duration
    switch (this.state.coinVisibleDuration) {
      case 500:
        coinValue = coinValue + 100;
        break;
      case 1000:
        coinValue = coinValue + 50;
        break;
      case 2000:
        coinValue = coinValue + 25;
        break;
      case 3000:
        coinValue = coinValue + 10;
        break;
      case 5000:
        coinValue = coinValue + 5;
        break;
    }
    this.setState({
      sessionCoinsEarned: this.state.sessionCoinsEarned + coinValue,
      coins: this.state.coins + coinValue,
    });
    localStorage.removeItem(this.state.address + "coins");
    localStorage.setItem(this.state.address + "coins", this.state.coins);
  };

  render() {
    const CoinSizes = [
      { key: "tiny", text: "Small", value: "tiny" },
      { key: "medium", text: "Medium", value: "medium" },
      { key: "big", text: "Large", value: "big" },
      { key: "massive", text: "Massive", value: "massive" },
    ];
    const CoinVisibleDurations = [
      { key: "0.5 Seconds", text: "0.5 Seconds", value: 500 },
      { key: "1 Second", text: "1 Second", value: 1000 },
      { key: "2 Seconds", text: "2 Seconds", value: 2000 },
      { key: "3 Seconds", text: "3 Seconds", value: 3000 },
      { key: "5 Seconds", text: "5 Seconds", value: 5000 },
    ];

    return (
      <Layout coins={this.state.coins}>
        <Grid celled>
          <Grid.Column textAlign="center" width={4} color="grey">
            <h3>Difficulty</h3>
            <p>
              Coin Size&emsp;
              <Dropdown
                placeholder="Select Coin Size"
                fluid
                selection
                defaultValue="medium"
                options={CoinSizes}
                onChange={this.handleCoinSizeChange}
              />
            </p>
            <hr />
            <p>
              Coin Visible Duration&emsp;
              <Dropdown
                placeholder="Select Coin Visible Duration"
                fluid
                selection
                defaultValue={2000}
                options={CoinVisibleDurations}
                onChange={this.handleCoinVisibleDurationChange}
              />
            </p>
            <p>
              <Button size="mini" onClick={this.handleUpdateClick}>
                Update Duration
              </Button>
            </p>
          </Grid.Column>
          <Grid.Column textAlign="center" width={9} color="grey">
            <div
              style={{
                display: this.state.showCoinButton ? "block" : "none",
                position: "absolute",
                top: Math.random() * 350,
                left: Math.random() * 550,
              }}
            >
              <Button
                circular
                color="yellow"
                icon="dollar"
                size={this.state.coinSize}
                onClick={this.handleCoinClick}
              ></Button>
            </div>
          </Grid.Column>
          <Grid.Column width={3} color="grey">
            <h2>Information</h2>

            <p>
              Coins will appear on the middle screen, click them as fast as you
              can to earn coins!
            </p>
            <b>Coin Size:</b>
            <p>
              Set the size of the coins. <br /> Smaller = bigger reward!
            </p>
            <b>Coin Visible Duration:</b>
            <p>
              Set how long coins are visible for. <br /> Shorter = bigger
              reward!
            </p>

            <h3>Current coins earned</h3>
            <p>This session: {this.state.sessionCoinsEarned}</p>
            <p>Total coins: {this.state.coins}</p>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CoinCapture;
