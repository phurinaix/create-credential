import React, { Component } from 'react';
import {Table, Alert, Form, Button} from 'react-bootstrap';
import TranscriptForm from '../components/TranscriptForm';
import Recipient from '../components/Recipient';
import axios from 'axios';
// import TranscriptList from '../components/TranscriptList';

class Transcript extends Component {
    state = {
        recipients: [],
        choose_recipients: [],
        freshman: {
            year: null,
            course1: null,
            course2: null,
            course3: null,
            course4: null,
            course5: null,
            course6: null,
            grade1: null,
            grade2: null,
            grade3: null,
            grade4: null,
            grade5: null,
            grade6: null,
            units1: null,
            units2: null,
            units3: null,
            units4: null,
            units5: null,
            units6: null,
            gp1: null,
            gp2: null,
            gp3: null,
            gp4: null,
            gp5: null,
            gp6: null,
            semester_units: null,
            semester_gpa: null
        },
        sophomore: {
            year: null,
            course1: null,
            course2: null,
            course3: null,
            course4: null,
            course5: null,
            course6: null,
            grade1: null,
            grade2: null,
            grade3: null,
            grade4: null,
            grade5: null,
            grade6: null,
            units1: null,
            units2: null,
            units3: null,
            units4: null,
            units5: null,
            units6: null,
            gp1: null,
            gp2: null,
            gp3: null,
            gp4: null,
            gp5: null,
            gp6: null,
            semester_units: null,
            semester_gpa: null
        },
        junior: {
            year: null,
            course1: null,
            course2: null,
            course3: null,
            course4: null,
            course5: null,
            course6: null,
            grade1: null,
            grade2: null,
            grade3: null,
            grade4: null,
            grade5: null,
            grade6: null,
            units1: null,
            units2: null,
            units3: null,
            units4: null,
            units5: null,
            units6: null,
            gp1: null,
            gp2: null,
            gp3: null,
            gp4: null,
            gp5: null,
            gp6: null,
            semester_units: null,
            semester_gpa: null
        },
        senior: {
            year: null,
            course1: null,
            course2: null,
            course3: null,
            course4: null,
            course5: null,
            course6: null,
            grade1: null,
            grade2: null,
            grade3: null,
            grade4: null,
            grade5: null,
            grade6: null,
            units1: null,
            units2: null,
            units3: null,
            units4: null,
            units5: null,
            units6: null,
            gp1: null,
            gp2: null,
            gp3: null,
            gp4: null,
            gp5: null,
            gp6: null,
            semester_units: null,
            semester_gpa: null
        }
    };
    yearHandler = (e, type) => {
        this.setState(Object.assign(this.state[type], {year: e.target.value}));
    };
    courseHandler = (e, type, index) => {
        this.setState(Object.assign(this.state[type], {[`course${index}`]: e.target.value}));
        console.log(this.state.freshman);
    };
    gradeHandler = (e, type, index) => {
        this.setState(Object.assign(this.state[type], {[`grade${index}`]: e.target.value}));
    };
    unitHandler = (e, type, index) => {
        this.setState(Object.assign(this.state[type], {[`units${index}`]: e.target.value}));
    };
    gpHandler = (e, type, index) => {
        this.setState(Object.assign(this.state[type], {[`gp${index}`]: e.target.value}));
    };
    submitHandle = (e) => {
        e.preventDefault();
        axios.post('https://tu-issuer.herokuapp.com/transcript', {
                    student: this.state.choose_recipients,
                    data: {freshman: this.state.freshman, sophomore: this.state.sophomore, junior: this.state.junior, senior: this.state.senior}
                })
                .then(response => {
                    console.log(response);
                    if (response.data === "success") {
                        window.location.href = `https://tu-issuer.herokuapp.com/transcript/${this.state.choose_recipients[0].identity}`;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
    };
    recipientChooseHandle = (e) => {
        console.log(e.target.value)
        // if (e.target.checked) {
            this.setState({ choose_recipients: this.state.recipients.filter(recipient => recipient.name === e.target.value)});
            // this.setState({ choose_recipients: [...this.state.choose_recipients, ...r]});
        // } else {
        //     this.setState({ choose_recipients: this.state.choose_recipients.filter(recipient => recipient.name !== e.target.value)});
        // }
        console.log(this.state.choose_recipients);
    };
    componentDidMount = () => {
        axios.get('https://tu-issuer.herokuapp.com/diploma/recipient')
            .then(response => {
                this.setState({ 
                    recipients: response.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div className="col-md-7 mx-auto mb-5">
                <h1 className="text-center mt-5">Transcript</h1>
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
                            return <Recipient key={recipient.identity} name={recipient.name} pubKey={recipient.pubKey} identity={recipient.identity} email={recipient.email} choose={this.recipientChooseHandle} type="transcript"/>
                        })}
                    </tbody>
                </Table>
                <Form onSubmit={this.submitHandle} autoComplete="off">
                    <h3>Freshman</h3>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" value={this.state.freshman.year} onChange={(e) => this.yearHandler(e,"freshman")}/>
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course title</th>
                                <th>Grade</th>
                                <th>Units</th>
                                <th>GP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TranscriptForm 
                                type="freshman"
                                index="1"
                                course={this.state.freshman.course1}
                                grade={this.state.freshman.grade1}
                                units={this.state.freshman.units1}
                                gp={this.state.freshman.gp1}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="freshman"
                                index="2"
                                course={this.state.freshman.course2}
                                grade={this.state.freshman.grade2}
                                units={this.state.freshman.units2}
                                gp={this.state.freshman.gp2}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="freshman"
                                index="3"
                                course={this.state.freshman.course3}
                                grade={this.state.freshman.grade3}
                                units={this.state.freshman.units3}
                                gp={this.state.freshman.gp3}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="freshman"
                                index="4"
                                course={this.state.freshman.course4}
                                grade={this.state.freshman.grade4}
                                units={this.state.freshman.units4}
                                gp={this.state.freshman.gp4}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="freshman"
                                index="5"
                                course={this.state.freshman.course5}
                                grade={this.state.freshman.grade5}
                                units={this.state.freshman.units5}
                                gp={this.state.freshman.gp5}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="freshman"
                                index="6"
                                course={this.state.freshman.course6}
                                grade={this.state.freshman.grade6}
                                units={this.state.freshman.units6}
                                gp={this.state.freshman.gp6}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                        </tbody>
                    </Table>

                    {/* Sophomore */}
                    <h3>Sophomore</h3>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" value={this.state.sophomore.year} onChange={(e) => this.yearHandler(e,"sophomore")}/>
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course title</th>
                                <th>Grade</th>
                                <th>Units</th>
                                <th>GP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TranscriptForm 
                                type="sophomore"
                                index="1"
                                course={this.state.sophomore.course1}
                                grade={this.state.sophomore.grade1}
                                units={this.state.sophomore.units1}
                                gp={this.state.sophomore.gp1}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="sophomore"
                                index="2"
                                course={this.state.sophomore.course2}
                                grade={this.state.sophomore.grade2}
                                units={this.state.sophomore.units2}
                                gp={this.state.sophomore.gp2}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="sophomore"
                                index="3"
                                course={this.state.sophomore.course3}
                                grade={this.state.sophomore.grade3}
                                units={this.state.sophomore.units3}
                                gp={this.state.sophomore.gp3}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="sophomore"
                                index="4"
                                course={this.state.sophomore.course4}
                                grade={this.state.sophomore.grade4}
                                units={this.state.sophomore.units4}
                                gp={this.state.sophomore.gp4}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="sophomore"
                                index="5"
                                course={this.state.sophomore.course5}
                                grade={this.state.sophomore.grade5}
                                units={this.state.sophomore.units5}
                                gp={this.state.sophomore.gp5}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="sophomore"
                                index="6"
                                course={this.state.sophomore.course6}
                                grade={this.state.sophomore.grade6}
                                units={this.state.sophomore.units6}
                                gp={this.state.sophomore.gp6}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                        </tbody>
                    </Table>

                    {/* Junior */}
                    <h3>junior</h3>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" value={this.state.junior.year} onChange={(e) => this.yearHandler(e,"junior")}/>
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course title</th>
                                <th>Grade</th>
                                <th>Units</th>
                                <th>GP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TranscriptForm 
                                type="junior"
                                index="1"
                                course={this.state.junior.course1}
                                grade={this.state.junior.grade1}
                                units={this.state.junior.units1}
                                gp={this.state.junior.gp1}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="junior"
                                index="2"
                                course={this.state.junior.course2}
                                grade={this.state.junior.grade2}
                                units={this.state.junior.units2}
                                gp={this.state.junior.gp2}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="junior"
                                index="3"
                                course={this.state.junior.course3}
                                grade={this.state.junior.grade3}
                                units={this.state.junior.units3}
                                gp={this.state.junior.gp3}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="junior"
                                index="4"
                                course={this.state.junior.course4}
                                grade={this.state.junior.grade4}
                                units={this.state.junior.units4}
                                gp={this.state.junior.gp4}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="junior"
                                index="5"
                                course={this.state.junior.course5}
                                grade={this.state.junior.grade5}
                                units={this.state.junior.units5}
                                gp={this.state.junior.gp5}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="junior"
                                index="6"
                                course={this.state.junior.course6}
                                grade={this.state.junior.grade6}
                                units={this.state.junior.units6}
                                gp={this.state.junior.gp6}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                        </tbody>
                    </Table>

                    {/* Senior */}
                    <h3>Senior</h3>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" value={this.state.senior.year} onChange={(e) => this.yearHandler(e,"senior")}/>
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Course title</th>
                                <th>Grade</th>
                                <th>Units</th>
                                <th>GP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TranscriptForm 
                                type="senior"
                                index="1"
                                course={this.state.senior.course1}
                                grade={this.state.senior.grade1}
                                units={this.state.senior.units1}
                                gp={this.state.senior.gp1}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="senior"
                                index="2"
                                course={this.state.senior.course2}
                                grade={this.state.senior.grade2}
                                units={this.state.senior.units2}
                                gp={this.state.senior.gp2}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="senior"
                                index="3"
                                course={this.state.senior.course3}
                                grade={this.state.senior.grade3}
                                units={this.state.senior.units3}
                                gp={this.state.senior.gp3}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="senior"
                                index="4"
                                course={this.state.senior.course4}
                                grade={this.state.senior.grade4}
                                units={this.state.senior.units4}
                                gp={this.state.senior.gp4}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="senior"
                                index="5"
                                course={this.state.senior.course5}
                                grade={this.state.senior.grade5}
                                units={this.state.senior.units5}
                                gp={this.state.senior.gp5}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                            <TranscriptForm 
                                type="senior"
                                index="6"
                                course={this.state.senior.course6}
                                grade={this.state.senior.grade6}
                                units={this.state.senior.units6}
                                gp={this.state.senior.gp6}
                                courseHandler={this.courseHandler}
                                gradeHandler={this.gradeHandler}
                                unitHandler={this.unitHandler}
                                gpHandler={this.gpHandler}
                            />
                        </tbody>
                    </Table>
                    <Button variant="primary" type="submit" disabled={this.state.fetching}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default Transcript;