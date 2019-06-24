import React from 'react';
import {Button} from 'react-bootstrap';

const DiplomTable = (props) => {
    const cert_path = props.cert_name.split("/");
    const cert_name = cert_path[cert_path.length - 1].split(".")[0];
    return (
        <tr>
            <td>{cert_name}</td>
            <td><Button variant="secondary" href={`https://tu-issuer.herokuapp.com/diploma_template/${cert_name}`} >Download</Button></td>
            <td><Button variant="success" onClick={() => props.clickInstant(cert_name)}>Instantiate certificate batch</Button></td>
            <td><Button variant="danger" onClick={() => props.delete(cert_name)}>Delete</Button></td>
        </tr>
    );
};

export default DiplomTable;