import React from 'react';
import ReactECharts from 'echarts-for-react';

// react-bootstrap components
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useGetMyDashboardInfoQuery } from 'quires/useUserQuery';
import { setComma } from 'util/util';

function Dashboard() {
	const { data, refetch: summaryRefetch, status } = useGetMyDashboardInfoQuery();
	const ratioList = data?.stockRatioList.filter(ratioInfo => ratioInfo.value !== 0) ?? [];
	const myMoney = data?.money ?? 0;
	const stockProfit = data?.stockProfit ?? 0;

	// const stockList = data?.stockList ?? [];
	const options = {
		grid: { height: 300 },
		tooltip: {
			trigger: 'item',
		},
		legend: {
			bottom: '0%',
		},
		series: [
			{
				name: '퍼센트',
				type: 'pie',
				radius: '50%',
				data: ratioList,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	};
	return (
		<>
			<Container fluid>
				<Row>
					<Col lg="6" sm="6">
						<Card className="card-stats">
							<Card.Body>
								<Row>
									<Col xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-chart text-warning"></i>
										</div>
									</Col>
									<Col xs="7">
										<div className="numbers">
											<p className="card-category">내 돈</p>
											<Card.Title as="h4">{setComma(myMoney, true)}원</Card.Title>
										</div>
									</Col>
								</Row>
							</Card.Body>
							<Card.Footer>
								<hr></hr>
								<div className="stats">
									<i className="fas fa-redo mr-1"></i>
									Update Now
								</div>
							</Card.Footer>
						</Card>
					</Col>
					<Col lg="6" sm="6">
						<Card className="card-stats">
							<Card.Body>
								<Row>
									<Col xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-light-3 text-success"></i>
										</div>
									</Col>
									<Col xs="7">
										<div className="numbers">
											<p className="card-category">주식 수익률</p>
											<Card.Title
												as="h4"
												style={{ color: stockProfit > 0 ? 'red' : 'blue' }}
											>
												<b>{stockProfit}%</b>
											</Card.Title>
										</div>
									</Col>
								</Row>
							</Card.Body>
							<Card.Footer>
								<hr></hr>
								<div className="stats">
									<i className="far fa-calendar-alt mr-1"></i>
									Last day
								</div>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Email Statistics</Card.Title>
								<p className="card-category">Last Campaign Performance</p>
							</Card.Header>
							<Card.Body>
								<ReactECharts option={options} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Dashboard;
