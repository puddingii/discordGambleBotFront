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
import { useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';

/**
 * @param {object} Sidebar
 * @param {string} Sidebar.color
 * @param {string} Sidebar.image
 * @param {Object[]} Sidebar.routes
 */
function Sidebar({ color, image, routes }) {
	const location = useLocation();
	const activeRoute = routeName => {
		return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
	};
	return (
		<div className="sidebar" data-image={image} data-color={color}>
			<div
				className="sidebar-background"
				style={{
					backgroundImage: `url(${image})`,
				}}
			/>
			<div className="sidebar-wrapper">
				<div className="logo d-flex align-items-center justify-content-start">
					<a href="https://github.com/puddingii" className="simple-text logo-mini mx-1">
						<div className="logo-img">
							<img src={require('assets/img/black-cow2.jpeg')} alt="..." />
						</div>
					</a>
					<a className="simple-text" href="https://github.com/puddingii">
						나만의 작은 게임봇
					</a>
				</div>
				<Nav>
					{routes.map((prop, key) => {
						if (!prop.redirect) {
							return (
								<li
									className={
										prop.upgrade
											? 'active active-pro'
											: activeRoute(prop.layout + prop.path)
									}
									key={key}
								>
									<NavLink
										to={prop.layout + prop.path}
										className="nav-link"
										activeClassName="active"
									>
										<i className={prop.icon} />
										<p>{prop.name}</p>
									</NavLink>
								</li>
							);
						}
						return null;
					})}
				</Nav>
			</div>
		</div>
	);
}

Sidebar.propTypes = {
	color: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	routes: PropTypes.array.isRequired,
};

export default Sidebar;
