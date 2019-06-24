import React, { Component } from 'react';
import axios from 'axios';
import {Table, Button} from 'react-bootstrap';

class UnsignedList extends Component {
    state = {
        unsigned: []
    }
    deleteHandler = (name) => {
        axios.delete(`https://tu-issuer.herokuapp.com/unsigned/${name}`)
            .then(response => {
                if (response.data === 'success') {
                    this.setState({
                        unsigned: this.state.unsigned.filter(u => u !== `/app/cert_data/unsigned_certificates/${name}.json`)
                    });
                    console.log(this.state.unsigned);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    componentDidMount = () => {
        axios.get('https://tu-issuer.herokuapp.com/unsigned')
            .then(response => {
                this.setState({ unsigned: response.data.filter(d => d !== '/app/cert_data/unsigned_certificates/unsigned_credential.json') });
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div className="col-md-8 mx-auto mt-5">
                <h1 className="text-center">Certificate List</h1>
                    {this.state.unsigned.length >= 1 ?
                    <Table striped bordered hover>
                        <tbody>
                            {this.state.unsigned.map((u, index) => {
                                const path = u.split("/");
                                const name = path[path.length - 1].split(".")[0];
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{name}</td>
                                        <td><Button variant="secondary" href={`https://tu-issuer.herokuapp.com/unsigned/${name}`}>Download</Button></td>
                                        <td><Button variant="danger" onClick={() => this.deleteHandler(name)}>Delete</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    :
                        <p className="text-center">Nothing</p>
                    }
            </div>
        );
    }
};

export default UnsignedList;