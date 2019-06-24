import React from 'react';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Home = () => {
    return (
        <div>
            <div className="row justify-content-center">
                <LinkContainer to="/create_diploma">
                    <Button className="m-5">Diploma</Button>
                </LinkContainer>
                <LinkContainer to="/create_transcript">
                    <Button className="m-5">Transcript</Button>
                </LinkContainer>
            </div>
        </div>
    );
};

export default Home;