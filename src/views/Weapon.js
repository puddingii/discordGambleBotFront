import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useGetUserWeaponListQuery } from 'quires/useUserQuery';
import { setComma } from 'util/util';

function Weapon() {
	const MySwal = withReactContent(Swal);

	const { data, refetch: stockRefetch, status } = useGetUserWeaponListQuery();
	const weaponList = data ?? [];

	return (
		<>
			<Container fluid>
				<Row>
					{weaponList.map((weapon, key) => {
						return (
							<Col md="4" key={key}>
								<Card className="card-user">
									<div
										className="card-image"
										style={{ backgroundColor: '#a9a9a9' }}
									></div>
									<Card.Body>
										<div className="author">
											<a href="#pablo" onClick={e => e.preventDefault()}>
												<img
													alt="..."
													className="avatar border-gray"
													src={require(`assets/img/weapon/${weapon.type}.jpeg`)}
												></img>
												<h5 className="title">
													+{weapon.curPower} {weapon.name}
												</h5>
											</a>
											<p className="description">{weapon.comment}</p>
										</div>
										<Row>
											<Col>
												<p className="description text-center">
													성공 : {weapon.successCnt}번<br />
													실패 : {weapon.failCnt}번<br />
													터짐 : {weapon.destroyCnt}번<br />
												</p>
											</Col>
											<Col>
												<p className="description text-center">
													부가힘 : {weapon.bonusPower}
													<br />
													적중률 : {setComma(weapon.hitRatio * 100)} %
													<br />
													회피율 : {setComma(weapon.missRatio * 100)} %
													<br />
												</p>
											</Col>
										</Row>
									</Card.Body>
									<hr></hr>
									<div className="button-container mr-auto ml-auto">
										<Button
											className="btn-simple btn-icon"
											href="#pablo"
											onClick={async () => {
												const { data } = await axios.get(
													`${process.env.REACT_APP_BACK_API}/weapon/enhance?type=${weapon.type}`,
													{
														withCredentials: true,
													},
												);
												if (!data) {
													return;
												}

												const { isConfirmed, value } = await MySwal.fire({
													title: '강화하기',
													html: `강화비용: ${setComma(data.cost, true)} 원<br/>성공 ${
														data.successRatio * 100
													}% 실패 ${data.failRatio * 100}% 파괴 ${
														data.destroyRatio * 100
													}%`,
													showCancelButton: true,
													confirmButtonText: '강화',
													cancelButtonText: '취소',
													showLoaderOnConfirm: true,
													preConfirm: async () => {
														try {
															const { data } = await axios.patch(
																`${process.env.REACT_APP_BACK_API}/user/weapon`,
																{ type: weapon.type },
																{
																	withCredentials: true,
																},
															);
															return data;
														} catch (e) {
															let message = '처리에러...';
															if (e.response) {
																message = e.response?.data?.message ?? '처리에러...';
															}
															MySwal.showValidationMessage(`요청오류: ${message}`);
														}
														// return fetch(`//api.github.com/users/${login}`)
														// 	.then(response => {
														// 		if (!response.ok) {
														// 			throw new Error(response.statusText);
														// 		}
														// 		return response.json();
														// 	})
														// 	.catch(error => {
														// 		MySwal.showValidationMessage(`Request failed: ${error}`);
														// 	});
													},
													allowOutsideClick: () => !MySwal.isLoading(),
												});
												if (isConfirmed) {
													MySwal.fire({
														title: `ㄴㄴㄴ's avatar`,
														imageUrl: require(`assets/img/weapon/${'sword'}.jpeg`),
														imageWidth: 200,
														imageHeight: 200,
														text: '히히',
													});
												}
											}}
											variant="primary"
										>
											강화하기
										</Button>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}

export default Weapon;
