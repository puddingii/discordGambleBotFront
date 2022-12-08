import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { setComma } from '../../util/util';

function MyVerticallyCenteredModal({ onHide, show }) {
	const money = 100_000;
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const [totalMoney, setTotalMoney] = useState(money);
	const onSubmit = data => {
		console.log(data);
		onHide();
	};
	const calcTotalMoney = () => {
		const type = getValues('type');
		const cnt = getValues('cnt');

		setTotalMoney(cnt * money * (type === 'sell' ? 0.97 : 1));
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header id="example-modal-sizes-title-lg">
					<Modal.Title>
						<b>[주식] 무야호 - 개당: {setComma(100000)} / 배당: 0.3% </b>{' '}
						<i
							style={{ cursor: 'pointer' }}
							onClick={() => console.log('refresh')}
							className="nc-icon nc-refresh-02"
						></i>
						<br />
						<small>내용내용내용내용내용</small>
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
								<th className="border-0">매수/매도</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>[주식]무야호</td>
								<td>$1,336,738/-33.33%</td>
								<td>1,336,738/-33.33%</td>
								<td>10개</td>
								<td>1</td>
								<td>1</td>
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
};

export default MyVerticallyCenteredModal;
