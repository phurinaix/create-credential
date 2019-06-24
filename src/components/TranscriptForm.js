import React from 'react';
import {Button, Form, Alert} from 'react-bootstrap';

const TranscriptForm = (props) => {
    return (
        <tr>
            <td>
                <Form.Group>
                    <Form.Control type="text" value={props.course} onChange={(e) => props.courseHandler(e, props.type, props.index)}/>
                </Form.Group>
            </td>
            <td>
                <Form.Group>
                    <Form.Control type="text" value={props.grade} onChange={(e) => props.gradeHandler(e, props.type, props.index)}/>
                </Form.Group>
            </td>
            <td>
                <Form.Group>
                    <Form.Control type="text" value={props.units} onChange={(e) => props.unitHandler(e, props.type, props.index)}/>
                </Form.Group>
            </td>
            <td>
                <Form.Group>
                    <Form.Control type="text" value={props.gp} onChange={(e) => props.gpHandler(e, props.type, props.index)}/>
                </Form.Group>
            </td>
        </tr>
    );
};

export default TranscriptForm;