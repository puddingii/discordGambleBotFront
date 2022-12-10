import { useUserLogoutMutation, useUserLoginMutation } from 'quires/useUserMutation';
import React from 'react';

// react-bootstrap components
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Login() {
	const { mutate: loginMutate } = useUserLoginMutation();
	const { mutate: logoutMutate } = useUserLogoutMutation();

	const { register, handleSubmit } = useForm();
	const onSubmit = loginInfo => {
		loginMutate(loginInfo);
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
									logoutMutate();
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
