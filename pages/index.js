import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../components/layout";
import { Link } from "../routes";

export default class CoinverseIndex extends Component {
  render() {
    return (
      <Layout>
        <div className="gameScrollMenu">
          <div className="gameItem">
            <Link route="Game/coin-clicker">
              <Button size="large">Play Coin Clicker</Button>
            </Link>
          </div>
          <div className="Item2">
            <Link route="Game/coin-capture">
              <Button size="large">Play Coin Capture</Button>
            </Link>
          </div>
          <div className="Item3">
            <Button size="large">Coming Soon!</Button>
          </div>
        </div>
      </Layout>
    );
  }
}

