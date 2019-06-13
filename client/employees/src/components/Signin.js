import React from 'react';

import { Button, Form, Input, Label, Container, FormGroup, Col } from 'reactstrap';


const Signin = (props) => {
    return (  
        <Container className="signup">
            <h2>Register</h2>
            <Form >
                <FormGroup>
                    <Col>
                        <Label>Name</Label>
                        <Input type="text" name="username" value={this.state.signUp.username} onChange={this.handleSignUpChanges} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col>
                        <Label>password</Label>
                        <Input type="password" name="password" value={this.state.signUp.password} onChange={this.handleSignUpChanges} />
                    </Col>
                </FormGroup>

                <Button type='submit' onClick={this.handleSignUpSubmit}>Sign Up</Button>
            </Form>
        </Container>
    )
} 

export default Signin;