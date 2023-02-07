/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
	return (
		<footer className="footer px-0 px-lg-3">
			<Container fluid>
				<nav>
					<p className="copyright text-center">
						© {new Date().getFullYear()}{' '}
						<a href="https://github.com/puddingii">응애건영</a>...프론트 어려웡
					</p>
				</nav>
			</Container>
		</footer>
	);
}

export default Footer;
