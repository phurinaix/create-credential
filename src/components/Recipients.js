import React, { Component } from 'react';
import {Table, Button, Alert, Spinner} from 'react-bootstrap';
import Recipient from './Recipient';
import axios from 'axios';

class Recipients extends Component {
    state = {
        recipients: [],
        choose_recipients: [],
        alertMessage: '',
        alertColor: 'success',
        fetching: false
    };
    recipientChooseHandle = (e) => {
        if (e.target.checked) {
            var r = this.state.recipients.filter(recipient => recipient.name === e.target.value);
            this.setState({ choose_recipients: [...this.state.choose_recipients, ...r]});
        } else {
            this.setState({ choose_recipients: this.state.choose_recipients.filter(recipient => recipient.name !== e.target.value)});
        }
    }
    issueHandle = () => {
        // /diploma/recipient
        axios.post('https://tu-issuer.herokuapp.com/diploma/recipient', {
                choose_recipients: this.state.choose_recipients,
                cert_name: this.props.certName
            })
            .then(response => {
                var data = response.data;
                if (data === 'success') {
                    this.setState({ 
                        choose_recipients: [],
                        alertMessage: 'Success',
                        alertColor: 'success'
                    });
                    this.props.back();
                        // window.location.assign(`https://tu-issuer.herokuapp.com/diploma_template/${this.props.certName}`);
                } else {
                    this.setState({
                        alertMessage: 'Please choose student row before issue',
                        alertColor: 'danger'
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    componentDidMount = () => {
        this.setState({ fetching: true });
        axios.get('https://tu-issuer.herokuapp.com/diploma/recipient')
            .then(response => {
                this.setState({ 
                    recipients: response.data,
                    fetching: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div>
                <h1>{this.props.certName}</h1>
                {this.state.alertMessage && <Alert variant={this.state.alertColor}>{this.state.alertMessage}</Alert>}
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Public Key</th>
                            <th>Identity</th>
                            <th>Email</th>
                            <th>Choose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recipients.length > 0 && this.state.recipients.map(recipient => {
                            return <Recipient key={recipient.identity} name={recipient.name} pubKey={recipient.pubKey} identity={recipient.identity} email={recipient.email} choose={this.recipientChooseHandle}/>
                        })}
                    </tbody>
                </Table>
                {this.state.fetching && 
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                <Button variant="primary" type="button" onClick={this.issueHandle}>Issue</Button>
                <Button variant="danger" onClick={this.props.back}>Back</Button>
            </div>
        );
    }
};

export default Recipients;