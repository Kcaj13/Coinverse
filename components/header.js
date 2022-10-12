import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { Link } from "../routes";

const header = () => {

  return (
    <Menu size ="large">
      <Link route="/">
        <a className="item">
          <Header as="h1" color="yellow" size="huge">
            <div className="logoImage" />
            <Header.Content>Coinverse</Header.Content>
          </Header>
        </a>
      </Link>
      <Link route="/">
        <Menu.Item>Games</Menu.Item>
      </Link>
      <Link route="/Swap">
        <Menu.Item>Swap</Menu.Item>
      </Link>
    </Menu>
  );
};

export default header;
