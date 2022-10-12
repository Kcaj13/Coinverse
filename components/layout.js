import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';

const layout = (props) => {
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css" />
            </Head>

            <Header />
            {props.children}
        </Container>
    );
};

export default layout;