import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { getStockName } from 'util/stock';
import { setComma } from '../../util/util';

function MyVerticallyCenteredModal({ onHide, show, myStockInfo }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const [totalMoney, setTotalMoney] = useState(0);
	const [stockInfo, setStockInfo] = useState({});
	const [isLoadingInfo, setLoadingInfo] = useState(false);

	const fetchData = async name => {
		setLoadingInfo(true);
		const result = await axios.get(`${process.env.REACT_APP_BACK_API}/api/stock`, {
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
	const onSubmit = data => {
		console.log(data);
		onHide();
	};
	const calcTotalMoney = () => {
		const type = getValues('type');
		const cnt = getValues('cnt');

		setTotalMoney(
			Math.floor(cnt * (stockInfo?.value ?? 0) * (type === 'sell' ? 0.97 : 1)),
		);
	};

	return (
		<Modal
			show={show && myStockInfo?.name}
			onHide={onHide}
			size="lg"
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header id="example-modal-sizes-title-lg">
					<Modal.Title>
						<b>
							[{getStockName(stockInfo?.type)}] {myStockInfo?.name} - 개당:{' '}
							{setComma(stockInfo?.value ?? 0, true)}원 / 배당:
							{stockInfo?.dividend ?? 0 * 100}%{' '}
						</b>{' '}
						<i
							style={{ cursor: 'pointer' }}
							onClick={() => fetchData(myStockInfo?.name)}
							className={`nc-icon nc-refresh-02 ${isLoadingInfo && 'fa-spin'}`}
						></i>
						<br />
						<small>{stockInfo?.comment}</small>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid">
					<Container>
						<Row>
							<Col xs={6} md={2}>
								<Form.Group className="mb-3">
									<label>매수 / 매도</label>
									<br></br>
									<Form.Select
										style={{ height: 38 }}
										{...register('type', {
											value: 'buy',
											onChange: calcTotalMoney,
										})}
									>
										<option value="buy">매수</option>
										<option value="sell">매도</option>
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
										})}
										min={1}
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
								<th className="border-0">보유 비중</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>
									[{getStockName(stockInfo?.type)}]{myStockInfo?.name}
								</td>
								<td>{setComma(myStockInfo?.myValue ?? 0, true)}원</td>
								<td>{setComma(stockInfo?.value ?? 0, true)}원</td>
								<td>{setComma(myStockInfo?.cnt ?? 0)}개</td>
								<td>{myStockInfo?.holdingRatio}%</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => {
							onHide();
						}}
					>
						닫기
					</Button>
					<Button variant="secondary" type="submit">
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
};

export default MyVerticallyCenteredModal;
