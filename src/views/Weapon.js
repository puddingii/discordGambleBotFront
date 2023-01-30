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

function Weapon() {
	const MySwal = withReactContent(Swal);

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="4">
						<Card className="card-user">
							<div className="card-image" style={{ backgroundColor: '#a9a9a9' }}></div>
							<Card.Body>
								<div className="author">
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											alt="..."
											className="avatar border-gray"
											src={require('assets/img/weapon/sword.jpeg')}
										></img>
										<h5 className="title">무기 이름</h5>
									</a>
									<p className="description">+1 강</p>
								</div>
								<Row>
									<Col>
										<p className="description text-center">
											성공 : 4번<br></br>
											실패 : 4번<br></br>
											터짐 : 3번<br></br>
										</p>
									</Col>
									<Col>
										<p className="description text-center">
											보너스 : 4번<br></br>
											적중률 : 3번<br></br>
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
										const { isConfirmed, value } = await MySwal.fire({
											title: '강화횟수',
											input: 'number',
											inputValue: 1,
											inputAttributes: {
												autocapitalize: 'off',
											},
											showCancelButton: true,
											confirmButtonText: '강화',
											cancelButtonText: '취소',
											showLoaderOnConfirm: true,
											preConfirm: async weaponType => {
												try {
													const { data } = await axios.patch(
														`${process.env.REACT_APP_BACK_API}/api/user/weapon`,
														{ type: weaponType },
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
				</Row>
			</Container>
		</>
	);
}

export default Weapon;
