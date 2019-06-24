import React, { Component } from 'react';
import {Button, Form, Table, Alert} from 'react-bootstrap';
import axios from 'axios';

class Infomation extends Component {
    state = {
        issuer_url: '',
        issuer_email: '',
        issuer_name: '',
        issuer_id: '',
        issuer_pubKey: '',
        revocation_list: '',
        issuer_logo: null,
        isEdit: false,
        alertMessage: '',
    }
    editHandle = () => {
        this.setState({ isEdit: true });
    };
    cancelHandle = () => {
        this.setState({ isEdit: false });
    }
    issuerUrlHandle = (e) => {
        this.setState({ issuer_url: e.target.value});
    };
    issuerEmailHandle = (e) => {
        this.setState({ issuer_email: e.target.value});
    };
    issuerNameHandle = (e) => {
        this.setState({ issuer_name: e.target.value});
    };
    issuerIdHandle = (e) => {
        this.setState({ issuer_id: e.target.value});
    };
    issuerPubKeyHandle = (e) => {
        this.setState({ issuer_pubKey: e.target.value});
    };
    revocationListHandle = (e) => {
        this.setState({ revocation_list: e.target.value});
    };
    updateHandle = (e) => {
        e.preventDefault();
        axios.post('https://tu-issuer.herokuapp.com/issuer/information', {
                issuer_url: this.state.issuer_url,
                issuer_email: this.state.issuer_email,
                issuer_name: this.state.issuer_name,
                issuer_id: this.state.issuer_id,
                issuer_pubKey: this.state.issuer_pubKey,
                revocation_list: this.state.revocation_list,
                issuer_logo: this.state.issuer_logo
            })
            .then(response => {
                var data = response.data;
                if(data === 'success') {
                    this.setState({ isEdit: false });
                } else if(data === 'not_complete') {
                    this.setState({ alertMessage: 'please fill all required fields'});
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    uploadLogoHandle = (e) => {
        if (e.target.files && e.target.files[0]) {
      
            var FR = new FileReader();
          
            FR.addEventListener("load", (event) => {
                this.setState({ issuer_logo : event.target.result });
                 
            });
            FR.readAsDataURL( e.target.files[0] );
        }
    }
    componentDidMount = () => {
        axios.get('https://tu-issuer.herokuapp.com/issuer/information')
            .then(response => {
                const data = response.data;
                this.setState({ 
                    issuer_url: data.issuer_url,
                    issuer_email: data.issuer_email,
                    issuer_name: data.issuer_name,
                    issuer_id: data.issuer_id,
                    issuer_pubKey: data.issuer_pubKey,
                    revocation_list: data.revocation_list,
                    issuer_logo: data.issuer_logo
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div className="col-md-8 mx-auto my-5">
                {this.state.isEdit ? 
                    <Form onSubmit={this.updateHandle}>
                        <h1 className="text-center mb-5">Create Certificate Template</h1>
                        <h3>issuer information</h3>
                        {this.state.alertMessage && <Alert variant="danger">{this.state.alertMessage}</Alert>}
                        <Form.Group>
                            <Form.Label>Issuer URL</Form.Label>
                            <Form.Control type="text" value={this.state.issuer_url} onChange={this.issuerUrlHandle}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Issuer Email</Form.Label>
                            <Form.Control type="text" value={this.state.issuer_email} onChange={this.issuerEmailHandle}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Issuer Name</Form.Label>
                            <Form.Control type="text" value={this.state.issuer_name} onChange={this.issuerNameHandle}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Issuer ID</Form.Label>
                            <Form.Control type="text" value={this.state.issuer_id} onChange={this.issuerIdHandle}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Issuer Public Key</Form.Label>
                            <Form.Control type="text" value={this.state.issuer_pubKey} onChange={this.issuerPubKeyHandle}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Revocation List</Form.Label>
                            <Form.Control type="text" value={this.state.revocation_list} onChange={this.revocationListHandle}/>
                        </Form.Group>
                        <div className="col-md-3 mx-auto bg-light p-0">
                            {this.state.issuer_logo === null ?
                                <React.Fragment>
                                    <label htmlFor="input_logo" className="w-100 h-100 p-3">
                                        <div className="mb-3">
                                            <h4>Issuer Logo</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img/>
                                    </label>
                                    <Form.Control type="file" onChange={this.uploadLogoHandle} id="input_logo" style={{ display: 'none'}}/>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <label htmlFor="input_logo" className="w-100 h-100 p-3">
                                        <div className="mb-3">
                                            <h4>Issuer Logo</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img src={this.state.issuer_logo} width="80%"/>
                                    </label>
                                    <Form.Control type="file" onChange={this.uploadLogoHandle} id="input_logo" style={{ display: 'none'}}/>
                                </React.Fragment>
                            }
                        </div>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        <Button variant="danger" type="button" onClick={this.cancelHandle}>
                            Cancel
                        </Button>
                    </Form>
                :
                    <React.Fragment>
                        <h2>Issuer Information</h2>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Issuer URL</td>
                                    <td>{this.state.issuer_url}</td>
                                </tr>
                                <tr>
                                    <td>Issuer Email</td>
                                    <td>{this.state.issuer_email}</td>
                                </tr>
                                <tr>
                                    <td>Issuer Name</td>
                                    <td>{this.state.issuer_name}</td>
                                </tr>
                                <tr>
                                    <td>Issuer ID</td>
                                    <td>{this.state.issuer_id}</td>
                                </tr>
                                <tr>
                                    <td>Issuer Public Key</td>
                                    <td>{this.state.issuer_pubKey}</td>
                                </tr>
                                <tr>
                                    <td>Revocation List</td>
                                    <td>{this.state.revocation_list}</td>
                                </tr>
                                <tr>
                                    <td>Issuer Logo</td>
                                    <td><img src={this.state.issuer_logo} alt="" width="150px"/></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button variant="primary" type="button" onClick={this.editHandle}>Edit</Button>
                    </React.Fragment>
                }
            </div>
        );
    }
};

export default Infomation;