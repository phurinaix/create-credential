import React from 'react';

const Recipient = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.pubKey}</td>
            <td>{props.identity}</td>
            <td>{props.email}</td>
            {props.type === "transcript" ?
                <td><input type="radio" name="transcript" value={props.name} onChange={props.choose}/></td>
                :
                <td><input type="checkbox" value={props.name} onChange={props.choose}/></td>
            }
        </tr>
    );
};

export default Recipient;