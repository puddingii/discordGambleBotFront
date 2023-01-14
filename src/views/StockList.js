import MyVerticallyCenteredModal from 'components/Modal/TradeStockModal';
import { useGetUserStockListQuery } from 'quires/useUserQuery';
import React, { useState } from 'react';
import styled from 'styled-components';

// react-bootstrap components
import { Button, Card, Table, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { getStockName } from 'util/stock';
import { setComma } from 'util/util';

const Total = styled.td`
	font-weight: bold;
`;

const getNumberColor = num => {
	return num < 0 ? { color: 'blue' } : { color: 'red' };
};

function TableList() {
	const [modalShow, setModalShow] = useState(false);
	const [modalStockInfo, setModalStockInfo] = useState({});

	const { data, refetch: stockRefetch, status } = useGetUserStockListQuery();
	const stockList = data?.stockList ?? [];
	const totalCurrentValue = data?.totalCurrentValue ?? 0;
	const totalAvgValue = data?.totalAvgValue ?? 0;
	const totalProfitValue = totalCurrentValue - totalAvgValue;
	return (
		<>
			<Container fluid>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => {
						setModalShow(false);
					}}
					myStockInfo={modalStockInfo}
					dataRefresh={stockRefetch}
				/>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<Card.Title as="h4">
									주식 리스트{' '}
									<i
										style={{ cursor: 'pointer' }}
										onClick={() => stockRefetch()}
										className={`nc-icon nc-refresh-02 ${
											status !== 'success' && 'fa-spin'
										}`}
									></i>
								</Card.Title>
								<p className="card-category">매도시 3%의 수수료가 나갑니다.</p>
							</Card.Header>
							<Card.Body className="table-full-width table-responsive px-0">
								<Table className="table-hover table-striped">
									<thead>
										<tr>
											<th className="border-0" onClick={() => useGetUserStockListQuery}>
												ID
											</th>
											<th className="border-0">이름</th>
											<th className="border-0">내 포지션</th>
											<th className="border-0">현재 가격/최근 등락률</th>
											<th className="border-0">손익 계산</th>
											<th className="border-0">총 매입금액</th>
											<th className="border-0">총 평가금액</th>
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
														<span style={getNumberColor(myStock.myRatio)}>
															{setComma(myStock.myRatio)}%
														</span>
													</td>
													<td>
														{setComma(myStock.stockValue, true)}원/
														<span style={getNumberColor(myStock.stockBeforeRatio)}>
															{myStock.stockBeforeRatio}%
														</span>
													</td>
													<td style={getNumberColor(myStock.profilMargin)}>
														{setComma(myStock.profilMargin, true)}원
													</td>
													<td>{setComma(myStock.cnt * myStock.myValue, true)}원</td>
													<td>{setComma(myStock.cnt * myStock.stockValue, true)}원</td>
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
									<tbody>
										<tr>
											<Total>計</Total>
											<td></td>
											<td></td>
											<td></td>
											<Total style={getNumberColor(totalProfitValue)}>
												{setComma(totalProfitValue, true)}원
											</Total>
											<Total>{setComma(totalAvgValue, true)}원</Total>
											<Total>{setComma(totalCurrentValue, true)}원</Total>
											<td></td>
											<td></td>
										</tr>
									</tbody>
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
