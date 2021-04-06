/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const ModalComponent = ({
  title,
  modalTitle, child, handleShow, show, handleClose,
}) => (
  <>
    <button type="button" onClick={handleShow}>
      {title}
    </button>

    <Modal
      show={show}
      onHide={handleClose}
      keyboard
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {child}
      </Modal.Body>
    </Modal>
  </>
);

ModalComponent.propTypes = {
  child: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ModalComponent;
