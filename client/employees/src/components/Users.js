import React from 'react';

import axios from 'axios';

import { Container, Col, Row } from 'reactstrap';

class Users extends React.Component {

    state = {
        users:[],
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            axios
            .create({
                headers: {authorization: token}
            })
            .get('http://localhost:5000/api/users')
            .then(res => {
                this.setState({users: res.data})
            })
            .catch(err => console.log(err))
        }
        else {
            window.alert("You need to login first");
            this.props.history.push('/signin')
        }
    }
 
    render() {
        return (
            <div className='users'>
                <Container>
                    <Row className='headers'>
                        <Col>Id</Col>
                        <Col>username</Col>
                        <Col>department</Col>

                    </Row>
                    {this.state.users.map(user => 
                        <Row key={user.id} className='user'>
                            <Col>{user.id}</Col>
                            <Col>{user.username}</Col>
                            <Col>{user.department}</Col>
                        </Row>
                    )}
                </Container>
            </div>
            
        )
    }
    
} 

export default Users;