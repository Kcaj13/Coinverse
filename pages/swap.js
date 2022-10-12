import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Layout from "../components/layout";

import SwapCoins from "./Swap/swap-your-coins";
import SwapEth from "./Swap/swap-your-ethereum";
import Transfer from "./Swap/transfer";

export default class Swap extends Component {
  state = {
    renderTab: "swapCoins",
    activeItem: "Swap your coins",
  };

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  changeTab(tabName) {
    this.setState({ renderTab: tabName });
  }

  render() {
    const { renderTab, activeItem } = this.state;
    return (
      <Layout>
        <Menu fluid widths={3} attached="top" tabular size="massive">
          <Menu.Item
            name="Swap your coins"
            color="yellow"
            active={activeItem === "Swap your coins"}
            onClick={() => {
              this.changeTab("swapCoins");
              this.handleItemClick("Swap your coins");
            }}
          />
          <Menu.Item
            name="Swap your Ethereum"
            color="yellow"
            active={activeItem === "Swap your Ethereum"}
            onClick={() => {
              this.changeTab("swapEth");
              this.handleItemClick("Swap your Ethereum");
            }}
          />
          <Menu.Item
            name="Transfer"
            color="yellow"
            active={activeItem === "Transfer"}
            onClick={() => {
              this.changeTab("transfer");
              this.handleItemClick("Transfer");
            }}
          />
        </Menu>
        <Segment
          attached="bottom"
          textAlign="center"
          padded="very"
          size="massive"
        >
          <RenderedContent tabName={renderTab} />
        </Segment>
      </Layout>
    );
  }
}

const RenderedContent = ({ tabName }) => {
  if (tabName === "swapCoins") {
    return <SwapCoins />;
  }
  if (tabName === "swapEth") {
    return <SwapEth />;
  }
  if (tabName === "transfer") {
    return <Transfer />;
  } else {
    return null;
  }
};
