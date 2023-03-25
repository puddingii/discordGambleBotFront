import { useUserLoginMutation } from 'quires/useAuthMutation';
import React, { useEffect, useRef } from 'react';
import NotificationAlert from 'react-notification-alert';

// react-bootstrap components
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Login() {
	const notificationAlertRef = useRef(null);
	const { mutate: loginMutate, error } = useUserLoginMutation();
	const errorMessage = error?.response?.data ?? '';

	const notify = message => {
		const options = {
			place: 'tr',
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type: 'danger',
			icon: 'nc-icon nc-bell-55',
			autoDismiss: 7,
		};
		notificationAlertRef.current.notificationAlert(options);
	};

	const { register, handleSubmit } = useForm();
	const onSubmit = loginInfo => {
		loginMutate(loginInfo);
	};

	useEffect(() => {
		if (errorMessage) {
			notify(errorMessage);
		}
	}, [errorMessage]);

	return (
		<>
			<Container fluid>
				<NotificationAlert ref={notificationAlertRef} />
				<Row className="justify-content-center">
					<Col lg="3" md="3">
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>닉네임</Form.Label>
								<Form.Control
									type="text"
									placeholder="닉네임"
									required
									{...register('nickname')}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>패스워드</Form.Label>
								<Form.Control
									type="password"
									placeholder="패스워드"
									required
									{...register('password')}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								로그인
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Login;
