import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import DiplomaTable from './DiplomaTable';
import Recipients from './Recipients';
import axios from 'axios';

class DiplomaList extends Component {
    state = {
        diplomas: [],
        instantiate_certificate_batch: null
    }
    instantiateCertBatchHandle = (certName) => {
        this.setState({ instantiate_certificate_batch: certName });
    };
    recipientBackButtonHandle = () => {
        this.setState({ instantiate_certificate_batch: null });
    }
    componentDidUpdate = (prevProps) => {
        if(prevProps.refresh !== this.props.refresh) {
            this.getAllDiploma();
        }
    }
    componentDidMount = () => {
        this.getAllDiploma();
    }
    getAllDiploma = () => {
        axios.get('https://tu-issuer.herokuapp.com/diploma_template')
            .then(response => {
                this.setState({ diplomas: response.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        console.log('DiplomaList');
        return (
            <div>
                {this.state.instantiate_certificate_batch === null ?
                    <React.Fragment>
                        <h1>Certificate List</h1>
                        <Table striped bordered hover>
                            <tbody>
                                {this.state.diplomas.map((diploma, index) => {
                                    return <DiplomaTable key={index} cert_name={diploma} clickInstant={this.instantiateCertBatchHandle} />
                                })}
                            </tbody>
                        </Table>
                    </React.Fragment>
                :
                    <Recipients certName={this.state.instantiate_certificate_batch} back={this.recipientBackButtonHandle}/>
                }
            </div>
        );
    }
};

export default DiplomaList;