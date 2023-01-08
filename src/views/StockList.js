import MyVerticallyCenteredModal from 'components/Modal/TradeStockModal';
import { useGetUserStockListQuery } from 'quires/useUserQuery';
import React from 'react';

// react-bootstrap components
import { Button, Card, Table, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { getStockName } from 'util/stock';
import { setComma } from 'util/util';

function TableList() {
	const [modalShow, setModalShow] = React.useState(false);
	const [modalStockInfo, setModalStockInfo] = React.useState({});

	const { data } = useGetUserStockListQuery();
	const stockList = data?.stockList ?? [];
	return (
		<>
			<Container fluid>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => {
						setModalShow(false);
					}}
					myStockInfo={modalStockInfo}
				/>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">주식 리스트</Card.Title>
								<p className="card-category">매도시 3%의 수수료가 나갑니다.</p>
							</Card.Header>
							<Card.Body className="table-full-width table-responsive px-0">
								<Table className="table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0">ID</th>
											<th className="border-0">이름</th>
											<th className="border-0">내 포지션</th>
											<th className="border-0">현재 가격/최근 등락률</th>
											<th className="border-0">보유 갯수</th>
											<th className="border-0">손익 계산</th>
											<th className="border-0">보유 비중</th>
											<th className="border-0">매수/매도</th>
										</tr>
									</thead>
									{stockList.map((myStock, key) => {
										return (
											<tbody key={key}>
												<tr>
													<td>{key + 1}</td>
													<td>
														[{getStockName(myStock.stockType)}]{myStock.name}
													</td>
													<td>
														{setComma(myStock.myValue, true)}원/
														{setComma(myStock.myRatio)}%
													</td>
													<td>
														{setComma(myStock.stockValue, true)}원/
														{myStock.stockBeforeRatio}%
													</td>
													<td>{setComma(myStock.cnt, true)}개</td>
													<td>{setComma(myStock.profilMargin, true)}원</td>
													<td>
														<ProgressBar
															striped
															variant="success"
															label={`${myStock.holdingRatio}%`}
															now={myStock.holdingRatio}
														/>
													</td>
													<td>
														<Button
															onClick={() => {
																setModalStockInfo(myStock);
																setModalShow(true);
															}}
															variant="danger"
															size="sm"
														>
															매수/매도
														</Button>
													</td>
												</tr>
											</tbody>
										);
									})}
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default TableList;
