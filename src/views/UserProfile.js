import { useGetUserInfoQuery } from 'quires/useUserQuery';
import React from 'react';

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { setComma } from 'util/util';

function User() {
	const { data } = useGetUserInfoQuery();

	const nickname = data?.nickname ?? '';
	const totalStockValue = data?.totalStockValue ?? 0;
	const myMoney = data?.myMoney ?? 0;
	const grantMoney = data?.grantMoney ?? 0;
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="8">
						<Card>
							<Card.Header>
								<Card.Title as="h4">내 정보</Card.Title>
							</Card.Header>
							<Card.Body>
								<Form>
									<Row>
										<Col className="pr-1" md="5">
											<Form.Group>
												<label>유저타입</label>
												<Form.Control
													defaultValue="Discord 유저"
													disabled
													placeholder="Company"
													type="text"
												></Form.Control>
											</Form.Group>
										</Col>
										<Col className="px-1" md="7">
											<Form.Group>
												<label>닉네임</label>
												<Form.Control
													defaultValue={nickname}
													placeholder="닉네임"
													type="text"
													disabled
												></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>보유 캐쉬</label>
												<Form.Control
													value={`${setComma(myMoney, true)}원`}
													placeholder="보유 캐쉬"
													type="text"
													disabled
												></Form.Control>
											</Form.Group>
										</Col>
										<Col className="px-1" md="6">
											<Form.Group>
												<label>
													내 주식가치{' - '}
													<small
														style={{ cursor: 'pointer' }}
														className="text-danger"
														onClick={() => {
															location.href = '/admin/stock';
														}}
													>
														자세히
													</small>
												</label>
												<Form.Control
													value={`${setComma(totalStockValue, true)}원`}
													placeholder="총 주식가치"
													type="text"
													disabled
												></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="3">
											<Form.Group>
												<label>재산 랭킹</label>
												<Form.Control
													value={`$1 등`}
													placeholder="랭킹"
													type="text"
													disabled
												></Form.Control>
											</Form.Group>
										</Col>

										<Col className="px-1" md="6">
											<Form.Group>
												<label>보조금 통장(공유통장)</label>
												<Form.Control
													value={`${setComma(grantMoney, true)}원`}
													placeholder="총 주식가치"
													type="text"
													disabled
												></Form.Control>
											</Form.Group>
										</Col>
										<Col className="pr-1" md="3">
											<Form.Group>
												<label> - </label>
												<Form.Control
													className="btn-primary"
													defaultValue="보조금 받기"
													placeholder="받기"
													type="button"
												></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<hr />
									<Button className="btn-fill pull-right" variant="primary">
										돈 기부하기
									</Button>{' '}
									<Button className="btn-fill pull-right" variant="danger">
										탈퇴
									</Button>
									<div className="clearfix"></div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col md="4">
						<Card className="card-user">
							<div className="card-image">
								<img alt="..." src={require('assets/img/profileBackground.jpg')}></img>
							</div>
							<Card.Body>
								<div className="author">
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											className="avatar border-gray"
											src={require('assets/img/faces/profileImg2.jpeg')}
										></img>
										<h5 className="title">{nickname}</h5>
									</a>
									<p className="description">화성 갈끄닌까~</p>
								</div>
								<p className="description text-center">끼얏호우!</p>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default User;
