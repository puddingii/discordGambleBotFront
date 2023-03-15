import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';

import axios from 'axios';
import { getStockName } from 'util/stock';
import { setComma } from '../../util/util';

const getNumberColor = num => {
	return num < 0 ? { color: 'blue' } : { color: 'red' };
};

function MyVerticallyCenteredModal({
	onHide,
	show,
	myStockInfo,
	dataRefresh,
	totalMyMoney,
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm();
	const [totalMoney, setTotalMoney] = useState(0);
	const [stockInfo, setStockInfo] = useState({});
	const [isLoadingInfo, setLoadingInfo] = useState(false);
	const myValueRef = useRef(null);
	const myCntRef = useRef(null);
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
		setValue('type', 'b');
		setValue('cnt', 1);
		setTotalMoney(Math.floor(stockInfo?.value));
	};

	const fetchData = async name => {
		if (isLoadingInfo) {
			return;
		}
		setLoadingInfo(true);
		const result = await axios.get(`${process.env.REACT_APP_BACK_API}/stock`, {
			withCredentials: true,
			params: { name },
		});
		setLoadingInfo(false);
		setStockInfo(result.data);
		setTotalMoney(Math.floor(result?.data?.value ?? 0));
	};

	useEffect(() => {
		if (myStockInfo?.name) {
			fetchData(myStockInfo.name);
		}
	}, [myStockInfo]);
	const onSubmit = async data => {
		try {
			setLoadingInfo(true);
			const { data: result } = await axios.patch(
				`${process.env.REACT_APP_BACK_API}/user/stock`,
				{ ...data, stockName: myStockInfo.name },
				{
					withCredentials: true,
				},
			);
			notify(1, '주문 성공!');

			myCntRef.current.innerText = `${setComma(result.cnt)}개`;
			myValueRef.current.innerText = `${setComma(result.value)}원`;
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
	const calcTotalMoney = () => {
		const type = getValues('type');
		const cnt = getValues('cnt');

		setTotalMoney(Math.floor(cnt * (stockInfo?.value ?? 0) * (type === 's' ? 0.98 : 1)));
	};

	const onCloseModal = () => {
		initFormData();
		onHide();
	};

	return (
		<Modal
			show={show && myStockInfo?.name}
			onHide={onCloseModal}
			size="lg"
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<NotificationAlert ref={notificationAlertRef} />
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header id="example-modal-sizes-title-lg" style={{ paddingTop: '0px' }}>
					<Modal.Title>
						<b>
							[{getStockName(stockInfo?.type)}] {myStockInfo?.name}{' '}
							<span style={getNumberColor(Number(stockInfo?.diffRatio))}>
								{stockInfo?.diffRatio}%
							</span>
						</b>{' '}
						<i
							style={{ cursor: 'pointer' }}
							onClick={() => fetchData(myStockInfo?.name)}
							className={`nc-icon nc-refresh-02 ${isLoadingInfo && 'fa-spin'}`}
						></i>
						<br />
						<small>
							배당:
							{stockInfo?.dividend ?? 0 * 100}% <br />
							{stockInfo?.comment}
						</small>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid" style={{ paddingTop: '12px' }}>
					<Container>
						<Row>
							<Col xs={6} md={2}>
								<Form.Group className="mb-3">
									<label>매수 / 매도</label>
									<br></br>
									<Form.Select
										style={{ height: 38 }}
										{...register('type', {
											value: 'b',
											onChange: calcTotalMoney,
										})}
									>
										<option value="b">매수</option>
										<option value="s">매도</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col xs={12} md={3}>
								<Form.Group>
									<label>갯수</label>
									<Form.Control
										defaultValue="1"
										type="number"
										isInvalid={errors.cnt}
										{...register('cnt', {
											onChange: calcTotalMoney,
											min: 1,
											valueAsNumber: true,
										})}
									></Form.Control>
									<Form.Control.Feedback type="invalid">
										<p>0 이하의 갯수는 입력할 수 없습니다.</p>
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col xs={6} md={7}>
								<Form.Group>
									<label>들어오는/나가는 금액(추정치)</label>
									<Form.Control
										value={`대략 ${setComma(totalMoney)}원`}
										placeholder="들어오는/나가는 금액"
										disabled
										type="text"
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
					</Container>
					<Table className="table-hover table-striped">
						<thead>
							<tr>
								<th className="border-0">ID</th>
								<th className="border-0">이름</th>
								<th className="border-0">내 포지션</th>
								<th className="border-0">현재 가격</th>
								<th className="border-0">보유 갯수</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>
									[{getStockName(stockInfo?.type)}]{myStockInfo?.name}
								</td>
								<td ref={myValueRef}>{setComma(myStockInfo?.myValue ?? 0, true)}원</td>
								<td>{setComma(stockInfo?.value ?? 0, true)}원</td>
								<td ref={myCntRef}>{setComma(myStockInfo?.cnt ?? 0)}개</td>
							</tr>
						</tbody>
					</Table>
					<hr />
					<Container>
						<Row>
							<Col className="text-center" xs={12} md={3}>
								{setComma(totalMyMoney, true)} 원
							</Col>
							<Col className="text-center" xs={12} md={1}>
								{getValues('type') === 's' ? '+' : '-'}
							</Col>
							<Col className="text-center" xs={12} md={3}>
								{setComma(totalMoney, true)} 원
							</Col>
							<Col className="text-center" xs={12} md={1}>
								=
							</Col>
							<Col className="text-center" xs={12} md={4}>
								{setComma(
									totalMyMoney + totalMoney * (getValues('type') === 's' ? 1 : -1),
									true,
								)}{' '}
								원
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onCloseModal}>닫기</Button>
					<Button disabled={isLoadingInfo} variant="secondary" type="submit">
						매수/매도
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

MyVerticallyCenteredModal.propTypes = {
	onHide: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	myStockInfo: PropTypes.object.isRequired,
	dataRefresh: PropTypes.func.isRequired,
	totalMyMoney: PropTypes.number.isRequired,
};

export default MyVerticallyCenteredModal;
