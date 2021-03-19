/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-spacing */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import RawMaterialComponent from './setters/RawMaterialComponent';
import ModalComponent from './Modal';
import { retrieveItem } from '../helpers';
import styles from './Navbar.module.css';

const NavBar = ({ initialState, hasBusiness }) => {
  let businessID = false;
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [path, setPath] = useState({
    text: 'Inventory',
    path: '/business/raw_materials',
    selected: 'left',
  });

  const handleLocation = pathName => {
    console.log(location.pathname);
    (pathName === '/business/raw_materials') ? setPath({ text: 'Dashboard', path: '/dashboard' }) : setPath({ text: 'Inventory', path: '/business/raw_materials' });
  };
  useEffect(() => {
    (retrieveItem('businessID')) ? businessID = retrieveItem('businessID') : businessID = false;
    console.log(businessID);
    handleLocation(location.pathname);
  }, []);
  const history = useHistory();
  const handleClose = () => {
    setShow(false);
    history.push('/business/raw_materials');
    handleLocation(location.pathname);
  };
  const handleShow = () => {
    if (businessID !== null) setShow(true);
  };
  const handleOnClick = endpoint => {
    handleLocation(location.pathname);
    if (endpoint === '/') initialState();
    history.push(endpoint);
  };
  return (
    <div className={styles.mainContainer}>
      <div id={(path.selected === 'left') ? styles.selectedTab : null} className={styles.navChild}>
        <FontAwesomeIcon icon={faListAlt} />
        <button type="button" onClick={() => handleOnClick(path.path)}>{path.text}</button>
      </div>
      <div onClick={() => setPath({selected: 'center'})} id={(path.selected === 'center') ? styles.selectedTab : null} className={styles.navChild}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <button type="button" onClick={() => handleOnClick('/')}> Sign out</button>
      </div>
      <div onClick={() => setPath({selected: 'right'})} id={(path.selected === 'right') ? styles.selectedTab : null} className={styles.outerNavChild}>
        {(hasBusiness !== false)
          ? (
            <div id={styles.navChildren}>
              <FontAwesomeIcon icon={faPlus} />
              <ModalComponent show={show} handleClose={handleClose} handleShow={handleShow} title="Material" modalTitle="Add a new   Raw   Material" child={<RawMaterialComponent />} />
            </div>
          ) : null}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  initialState: PropTypes.func.isRequired,
  hasBusiness: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  hasBusiness: state.authStore.has_business,
});

const mapDispatchToProps = dispatch => ({
  initialState: () => dispatch({ type: 'DEFAULT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
