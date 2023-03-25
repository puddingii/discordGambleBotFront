import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// react-bootstrap components
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useGetUserWeaponListQuery } from 'quires/useUserQuery';
import { setComma } from 'util/util';

function Weapon() {
	const MySwal = withReactContent(Swal);

	const { data, refetch: stockRefetch } = useGetUserWeaponListQuery();
	const weaponList = data ?? [];

	const onClickEnhanceButton = async (curPower, type) => {
		const { data } = await axios.get(
			`${process.env.REACT_APP_BACK_API}/weapon/enhance-info?type=${type}`,
			{
				withCredentials: true,
			},
		);
		if (!data) {
			return;
		}

		const getTitle = (curPower, beforePower) => {
			return beforePower ? `${beforePower}강 > ${curPower}강` : `${curPower}강`;
		};

		const getHTML = data => {
			return `강화비용: ${setComma(data?.cost ?? 0, true)} 원<br/>성공 ${setComma(
				(data?.successRatio ?? 0) * 100,
				true,
			)}% 실패 ${setComma((data?.failRatio ?? 0) * 100, true)}% 파괴 ${setComma(
				(data?.destroyRatio ?? 0) * 100,
				true,
			)}%`;
		};

		const fireOptions = {
			title: getTitle(curPower),
			html: getHTML(data),
			showCancelButton: true,
			confirmButtonText: '강화',
			cancelButtonText: '취소',
			showLoaderOnConfirm: true,
			preConfirm: async () => {
				const { data } = await axios.patch(
					`${process.env.REACT_APP_BACK_API}/user/weapon/enhance`,
					{ type },
					{ withCredentials: true },
				);
				return data;
			},
			allowOutsideClick: () => !MySwal.isLoading(),
		};

		const { isConfirmed, value } = await MySwal.fire(fireOptions);
		fireOptions.title = getTitle(
			value?.enhanceResult?.curPower,
			value?.enhanceResult?.beforePower,
		);
		fireOptions.html = getHTML(value);
		let FLAG = isConfirmed;
		while (FLAG) {
			// eslint-disable-next-line no-await-in-loop
			const { isConfirmed, value } = await MySwal.fire(fireOptions);
			fireOptions.title = getTitle(
				value?.enhanceResult?.curPower,
				value?.enhanceResult?.beforePower,
			);
			fireOptions.html = getHTML(value);
			FLAG = isConfirmed;
		}
		stockRefetch();
	};

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
											onClick={() => {
												onClickEnhanceButton(weapon.curPower, weapon.type);
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
