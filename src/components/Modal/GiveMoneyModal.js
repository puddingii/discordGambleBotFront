import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';

import axios from 'axios';
import { setComma } from '../../util/util';

function MyVerticallyCenteredModal({
	onHide,
	show,
	myNickname,
	dataRefresh,
	totalMyMoney,
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();
	const watchMoneyValue = watch('money', false);
	const [nicknameList, setNicknameList] = useState([]);
	const [isLoadingInfo, setLoadingInfo] = useState(false);
	const notificationAlertRef = useRef(null);
	const notify = (colorType, message) => {
		let type;
		switch (colorType) {
			case 1:
				type = 'primary';
				break;
			case 2:
				type = 'success';
				break;
			case 3:
				type = 'danger';
				break;
			case 4:
				type = 'warning';
				break;
			case 5:
				type = 'info';
				break;
			default:
				break;
		}
		const options = {
			place: 'tr',
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type,
			icon: 'nc-icon nc-bell-55',
			autoDismiss: 7,
		};
		notificationAlertRef.current.notificationAlert(options);
	};
	const initFormData = () => {
		setValue('ptrNickname', '');
		setValue('money', 1);
	};

	const fetchData = async () => {
		setLoadingInfo(true);
		const result = await axios.get(
			`${process.env.REACT_APP_BACK_API}/api/user/nicklist`,
			{
				withCredentials: true,
			},
		);
		setLoadingInfo(false);
		const nickList = result.data ?? [];
		setNicknameList(
			nickList.filter(nickname => {
				return nickname !== myNickname;
			}),
		);
	};

	const onSubmit = async data => {
		try {
			setLoadingInfo(true);
			await axios.patch(
				`${process.env.REACT_APP_BACK_API}/api/user/give/money`,
				{ ...data, myNickname },
				{
					withCredentials: true,
				},
			);
			notify(1, '기부성공!');

			initFormData();
			dataRefresh();
		} catch (e) {
			let message = '처리에러...';
			if (e.response) {
				message = e.response?.data?.message ?? '처리에러...';
			}
			notify(3, message);
		} finally {
			setLoadingInfo(false);
		}
	};

	const onCloseModal = () => {
		initFormData();
		onHide();
	};

	useEffect(() => {
		if (show) {
			fetchData();
		}
	}, [show]);

	return (
		<Modal
			show={show}
			onHide={onCloseModal}
			size="lg"
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<NotificationAlert ref={notificationAlertRef} />
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header id="example-modal-sizes-title-lg" style={{ paddingTop: '0px' }}>
					<Modal.Title>
						<b>기부하기</b>{' '}
						<i
							style={{ display: isLoadingInfo ? '' : 'none' }}
							className="nc-icon nc-refresh-02 fa-spin"
						></i>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid" style={{ paddingTop: '12px' }}>
					<Container>
						<Row>
							<Col xs={6} md={3}>
								<Form.Group className="mb-3">
									<label>닉네임</label>
									<br></br>
									<Form.Select
										style={{ height: 38 }}
										{...register('ptrNickname', {
											value: '',
										})}
									>
										<option value="">선택</option>
										{nicknameList.map((nickname, key) => {
											return (
												<option key={key} value={nickname}>
													{nickname}
												</option>
											);
										})}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col xs={12} md={6}>
								<Form.Group>
									<label>액수</label>
									<Form.Control
										defaultValue="1"
										type="number"
										isInvalid={errors.money}
										{...register('money', {
											min: 1,
											valueAsNumber: true,
										})}
									></Form.Control>
									<Form.Control.Feedback type="invalid">
										<p>0 이하의 갯수는 입력할 수 없습니다.</p>
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
					</Container>
					<hr />
					<Container>
						<Row>
							<Col className="text-center" xs={12} md={3}>
								{setComma(totalMyMoney, true)} 원
							</Col>
							<Col className="text-center" xs={12} md={1}>
								-
							</Col>
							<Col className="text-center" xs={12} md={3}>
								{setComma(watchMoneyValue, true)} 원
							</Col>
							<Col className="text-center" xs={12} md={1}>
								=
							</Col>
							<Col className="text-center" xs={12} md={4}>
								{setComma(totalMyMoney - watchMoneyValue, true)} 원
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onCloseModal}>닫기</Button>
					<Button variant="secondary" type="submit">
						기부하기
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

MyVerticallyCenteredModal.propTypes = {
	onHide: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	myNickname: PropTypes.string.isRequired,
	dataRefresh: PropTypes.func.isRequired,
	totalMyMoney: PropTypes.number.isRequired,
};

export default MyVerticallyCenteredModal;
