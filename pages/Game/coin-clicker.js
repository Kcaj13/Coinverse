import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import { Grid, Button, Label } from "semantic-ui-react";

import Layout from "../../components/layout";

class CoinClicker extends Component {
  state = {
    factoryCount: 0,
    coinValueCount: 1,
    coinMultiplyer: 1,

    factoryPrice: 25,
    coinValuePrice: 10,
    coinMultiplyerPrice: 1000,

    sessionCoinsEarned: 0,
    totalCoinsEarned: 0,

    address: web3.currentProvider.selectedAddress,
    coins: 0,
  };

  componentDidMount() {
    const coins = localStorage.getItem(this.state.address + "coins");
    if (coins != null) {
      this.setState({ coins: parseInt(coins) });
    }

    const factoryStored = localStorage.getItem(
      this.state.address + "factoryCount"
    );
    if (factoryStored != null) {
      this.setState({ factoryCount: parseInt(factoryStored) + 1 });
    }

    const coinValueStored = localStorage.getItem(
      this.state.address + "coinValue"
    );
    if (coinValueStored != null) {
      this.setState({ coinValueCount: parseInt(coinValueStored) + 1 });
    }

    const coinMultiplyerValueStored = localStorage.getItem(
      this.state.address + "coinMultiplyer"
    );
    if (coinMultiplyerValueStored != null) {
      this.setState({ coinMultiplyer: parseInt(coinMultiplyerValueStored) + 0.1 });
    }

    //Coin Factory Function
    setInterval(() => {
      this.setState({ 
        coins: (this.state.coins + this.state.factoryCount) * this.state.coinMultiplyer,
        sessionCoinsEarned: (this.state.sessionCoinsEarned + this.state.factoryCount) * this.state.coinMultiplyer
      });
      localStorage.removeItem(this.state.address + "coins");
      localStorage.setItem(this.state.address + "coins", this.state.coins);
    }, 10000);
  }

  handleBuyCoinValue = () => {
    if (this.state.coins >= this.state.coinValuePrice) {
      this.setState({
        coinValueCount: this.state.coinValueCount + 1,
        coins: this.state.coins - this.state.coinValuePrice,
        sessionCoinsEarned: this.state.sessionCoinsEarned - this.state.coinValuePrice,
        coinValuePrice: this.state.coinValuePrice * 1.5
      });

      localStorage.setItem(this.state.address + "coinValue", this.state.coinValueCount);
    }
  };

  handleBuyFactory = () => {
    if (this.state.coins >= this.state.factoryPrice) {
      this.setState({
        factoryCount: this.state.factoryCount + 1,
        coins: this.state.coins - this.state.factoryPrice,
        sessionCoinsEarned: this.state.sessionCoinsEarned - this.state.factoryPrice,
        factoryPrice: this.state.factoryPrice * 1.5
      });

      localStorage.setItem(this.state.address + "factoryCount", this.state.factoryCount);
    }
  };

  handleBuyCoinMultiplyer = () => {
    if (this.state.coins >= this.state.coinMultiplyerPrice) {
      this.setState({
        coinMultiplyer: this.state.coinMultiplyer + 0.1,
        coins: this.state.coins - this.state.coinMultiplyerPrice,
        sessionCoinsEarned: this.state.sessionCoinsEarned - this.state.coinMultiplyerPrice,
        coinMultiplyerPrice: this.state.coinMultiplyerPrice * 2
      });

      localStorage.setItem(this.state.address + "coinMultiplyer", this.state.coinMultiplyer);
    }
  };

  handleCoinClick = () => {
    this.setState({
      sessionCoinsEarned: this.state.sessionCoinsEarned + (this.state.coinValueCount * this.state.coinMultiplyer),
      coins: this.state.coins + (this.state.coinValueCount * this.state.coinMultiplyer)
    });
    localStorage.removeItem(this.state.address + "coins");
    localStorage.setItem(this.state.address + "coins", this.state.coins);
  };

  render() {
    return (
      <Layout coins={this.state.coins}>
        <Grid celled>
          <Grid.Column textAlign="center" width={4} color="grey">
            <h3>Shop</h3>
            <p>
              Coin Value&emsp;
              <Button size="mini" onClick={this.handleBuyCoinValue}>
                Buy ({this.state.coinValuePrice.toFixed(0)} coins)
              </Button>
            </p>
            <p>
              Coin Factory&emsp;
              <Button size="mini" onClick={this.handleBuyFactory}>
                Buy ({this.state.factoryPrice.toFixed(0)} coins)
              </Button>
            </p>
            <p>
              Coin Multiplier&emsp;
              <Button size="mini" onClick={this.handleBuyCoinMultiplyer}>
                Buy ({this.state.coinMultiplyerPrice.toFixed(0)} coins)
              </Button>
            </p>
          </Grid.Column>
          <Grid.Column textAlign="center" width={9} color="grey">
            <div className="coinButton">
              <Button
                circular
                color="yellow"
                icon="dollar"
                size="massive"
                onClick={this.handleCoinClick}
              ></Button>
            </div>
            <Label attached="bottom">
              Coin value: {this.state.coinValueCount} &emsp;&emsp;&emsp;&emsp;
              Number of coin factories: {this.state.factoryCount}
              &emsp;&emsp;&emsp;&emsp; Coin Multiplier: {"x"}
              {this.state.coinMultiplyer.toFixed(1)}
            </Label>
          </Grid.Column>
          <Grid.Column width={3} color="grey">
            <h2>Information</h2>

            <p>
              You can earn coins faster buy purchasing the following upgrades
              from the shop:
            </p>
            <b>Coin Value:</b>
            <p>
              Amount of coins earned per click by a click clicker or your mouse
            </p>
            <b>Coin Factory:</b>
            <p>Produces one coin every ten seconds</p>
            <b>Coin Multiplier:</b>
            <p>
              Buy a multiplier on all coins earned
            </p>

            <h3>Current coins earned</h3>
            <p>This session: {this.state.sessionCoinsEarned.toFixed(1)}</p>
            <p>Total coins: {this.state.coins.toFixed(1)}</p>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CoinClicker;
