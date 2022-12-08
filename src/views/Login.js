import axios from 'axios';
import React from 'react';

// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Login() {
	const { register, handleSubmit } = useForm();
	const onSubmit = async ({ nickname, password }) => {
		console.log(nickname, password);
		const result = await axios.post(
			'http://localhost:3300/user/login',
			{
				nickname,
				password,
			},
			{ withCredentials: true },
		);
		console.log(result);
	};
	return (
		<>
			<Container fluid>
				<Row className="justify-content-center">
					<Col lg="3" md="3">
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>닉네임</Form.Label>
								<Form.Control
									type="text"
									placeholder="닉네임"
									{...register('nickname')}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>패스워드</Form.Label>
								<Form.Control
									type="password"
									placeholder="패스워드"
									{...register('password')}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								로그인
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									const result = axios.post(
										'http://localhost:3300/user/logout',
										{},
										{ withCredentials: true },
									);
								}}
							>
								?
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Login;
