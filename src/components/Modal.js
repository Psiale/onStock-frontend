/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Proptypes from 'prop-types';

const ModalComponent = ({
  title, child, handleClose, handleShow, show,
}) => (
  <>
    <Button variant="primary" onClick={handleShow}>
      Launch static backdrop modal
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {child}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <button type="button">Understood</button>
      </Modal.Footer>
    </Modal>
  </>
);

ModalComponent.propTypes = {
  child: Proptypes.object.isRequired,
  title: Proptypes.string.isRequired,
  handleClose: Proptypes.func.isRequired,
  handleShow: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

export default ModalComponent;
