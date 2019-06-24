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
    };
    deleteHandle = (certName) => {
        axios.delete(`https://tu-issuer.herokuapp.com/diploma_template/${certName}`)
            .then(response => {
                if (response.data === 'success') {
                    this.setState({
                        diplomas: this.state.diplomas.filter(diploma => diploma !== `/app/cert_data/cert_template/${certName}.json`)
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
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
                this.setState({ diplomas: response.data.filter(d => d !== '/app/cert_data/cert_template/cert.json') });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                {this.state.instantiate_certificate_batch === null ?
                    <React.Fragment>
                        <h1>Diploma List</h1>
                        {this.state.diplomas.length >= 1 ?
                        <Table striped bordered hover>
                            <tbody>
                                {this.state.diplomas.map((diploma, index) => {
                                    return <DiplomaTable key={index} cert_name={diploma} clickInstant={this.instantiateCertBatchHandle} delete={this.deleteHandle}/>
                                })}
                            </tbody>
                        </Table>
                        :
                        <p>Nothing</p>
                        }
                    </React.Fragment>
                :
                    <Recipients certName={this.state.instantiate_certificate_batch} back={this.recipientBackButtonHandle}/>
                }
            </div>
        );
    }
};

export default DiplomaList;