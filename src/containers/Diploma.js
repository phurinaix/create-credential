import React, { Component } from 'react';
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import DiplomaForm from '../components/DiplomaForm';
import DiplomaList from '../components/DiplomaList';

class Diploma extends Component {
    state = {
        key: 1,
        tabChange: false
    };
    selectHandle = (e) => {
        console.log(e);
        this.setState(prevState => ({ 
            key: e,
            tabChange: !prevState.tabChange
        }));
    };
    render() {
        return (
            <div>
                <Tab.Container id="left-tabs-example" className="bg-light" activeKey={this.state.key} onSelect={this.selectHandle}>
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey={1}>Create</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>View</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10} className="p-5">
                            <Tab.Content>
                                <Tab.Pane eventKey={1}>
                                    <DiplomaForm />
                                </Tab.Pane>
                                <Tab.Pane eventKey={2}>
                                    <DiplomaList refresh={this.state.tabChange}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
};

export default Diploma;