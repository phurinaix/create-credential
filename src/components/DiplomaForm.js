import React, { Component } from 'react';
import {Button, Form, Alert, Spinner} from 'react-bootstrap';
import axios from 'axios';

class DiplomaForm extends Component {
    state = {
        cert_description: '',
        cert_title: '',
        cert_img: null,
        signature_img: null,
        alertMessage: '',
        fetching: false
    }
    certDescriptionHandle = (e) => {
        this.setState({ cert_description: e.target.value });
    };
    certTitleHandle = (e) => {
        this.setState({ cert_title: e.target.value });
    };

    submitHandle = (e) => {
        e.preventDefault();
        this.setState({ fetching: true });
        axios.post('https://tu-issuer.herokuapp.com/diploma_template', {
                cert_description: this.state.cert_description,
                cert_title: this.state.cert_title,
                cert_img: this.state.cert_img,
                signature_img: this.state.signature_img
            })
            .then(response => {
                this.setState({ fetching: false });
                var data = response.data;
                if(data === 'success') {
                    this.setState({
                        cert_description: '',
                        cert_title: '',
                        cert_img: null,
                        signature_img: null,
                        alertMessage: ''
                    });
                } else if (data === 'not_complete') {
                    this.setState({ alertMessage: 'please fill all required fields'});
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    clearAllHandle = () => {
        this.setState({
            cert_description: '',
            cert_title: '',
            cert_img: null,
            signature_img: null,
            alertMessage: ''
        });
    }
    imgHandle = (e) => {
        var dataImg = e.target.dataset.img;
        if (e.target.files && e.target.files[0]) {
      
            var FR = new FileReader();
          
            FR.addEventListener("load", (event) => {
                this.setState({ [`${dataImg}_img`] : event.target.result });
                 
            });
            FR.readAsDataURL( e.target.files[0] );
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.submitHandle} autoComplete="off">
                    <h1 className="text-center mb-5">Create Diploma Template</h1>
                    <h3>diploma information</h3>
                    {this.state.alertMessage && <Alert variant="danger">{this.state.alertMessage}</Alert>}
                    <Form.Group>
                        <Form.Label>Diploma Description</Form.Label>
                        <Form.Control type="text" value={this.state.cert_description} onChange={this.certDescriptionHandle}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Diploma Title</Form.Label>
                        <Form.Control type="text" value={this.state.cert_title} onChange={this.certTitleHandle}/>
                    </Form.Group>

                    <div className="row justify-content-center text-center">
                        <div className="col-md-4 mx-5 bg-light p-0">
                            {this.state.cert_img === null ?
                                <React.Fragment>
                                    <label htmlFor="input_cert" className="w-100 h-100 p-3">
                                        <div className="mb-3">
                                            <h4>Issuer diploma</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img/>
                                    </label>
                                    <Form.Control type="file" data-img="cert" onChange={this.imgHandle} id="input_cert" style={{ display: 'none'}}/>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <label htmlFor="input_cert" className="w-100 h-100 p-3">
                                        <div className="mb-3">
                                            <h4>Issuer diploma</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img src={this.state.cert_img} width="80%"/>
                                    </label>
                                    <Form.Control type="file" data-img="cert" onChange={this.imgHandle} id="input_cert" style={{ display: 'none'}}/>
                                </React.Fragment>
                            }
                        </div>
                        <div className="col-md-4 mx-5 bg-light p-0">
                            {this.state.signature_img === null ?
                                <React.Fragment>
                                    <label htmlFor="input_signature" className="w-100 h-100 p-3">
                                        <div>
                                            <h4>Issuer signature</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img/>
                                    </label>
                                    <Form.Control type="file" data-img="signature" onChange={this.imgHandle} id="input_signature" style={{ display: 'none'}}/>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <label htmlFor="input_signature" className="w-100 h-100 p-3">
                                        <div>
                                            <h4>Issuer signature</h4>
                                            <p><i className="fa fa-upload"></i> Upload Image</p>
                                        </div>
                                        <img src={this.state.signature_img} width="80%"/>
                                    </label>
                                    <Form.Control type="file" data-img="signature" onChange={this.imgHandle} id="input_signature" style={{ display: 'none'}}/>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    {this.state.fetching &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <br/>
                    <Button variant="primary" type="submit" disabled={this.state.fetching}>
                        Submit
                    </Button>
                    <Button variant="danger" type="button" onClick={this.clearAllHandle} disabled={this.state.fetching}>
                        Clear All
                    </Button>
                </Form>
            </div>
        );
    }
};

export default DiplomaForm;