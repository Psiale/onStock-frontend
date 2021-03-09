/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Proptypes from 'prop-types';

const ModalComponent = ({
  title,
  modalTitle, child, handleClose, handleShow, show,
}) => (
  <>
    <Button variant="primary" onClick={handleShow}>
      {title}
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {child}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  </>
);

ModalComponent.propTypes = {
  child: Proptypes.object.isRequired,
  modalTitle: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  handleClose: Proptypes.func.isRequired,
  handleShow: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

export default ModalComponent;
