import React, { useRef } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';

import { useGetUserNicknameListQuery } from 'quires/useUserQuery';
import { useGiveMoneyMutation } from 'quires/useUserMutation';
import { notify, setComma } from '../../util/util';

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
	const notificationAlertRef = useRef(null);
	const {
		data: nicknameList,
		status: isDataLoading,
		refetch: refetchUserNicknameList,
	} = useGetUserNicknameListQuery();
	const { mutate: giveMoneyMutate, isLoading: isGiveMoneyMutateLoading } =
		useGiveMoneyMutation();

	const initFormData = () => {
		setValue('ptrNickname', '');
		setValue('money', 1);
	};

	const onSubmit = data => {
		giveMoneyMutate(
			{ ...data, myNickname },
			{
				onSuccess: () => {
					notify(notificationAlertRef, 1, '기부성공!');
					initFormData();
					dataRefresh();
				},
				onError: e => {
					let message = '처리에러...';
					if (e.response) {
						message = e.response?.data?.message ?? '처리에러...';
					}
					notify(notificationAlertRef, 3, message);
				},
			},
		);
	};

	const onCloseModal = () => {
		initFormData();
		onHide();
	};

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
							style={{ cursor: 'pointer' }}
							onClick={refetchUserNicknameList}
							className={`nc-icon nc-refresh-02${
								isGiveMoneyMutateLoading || isDataLoading ? 'fa-spin' : ''
							}`}
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
										{(nicknameList ?? [])
											.filter(nickname => nickname !== myNickname)
											.map((nickname, key) => {
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
