/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const ModalComponent = ({
  title,
  modalTitle, child, handleShow, isShowing,
}) => (
  <>
    <button type="button" onClick={handleShow}>
      {title}
    </button>

    <Modal
      show={isShowing}
      onHide={isShowing}
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
  child: Proptypes.object.isRequired,
  modalTitle: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  handleShow: Proptypes.func.isRequired,
  isShowing: Proptypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isShowing: state.modalStore.isShowing,
});

export default connect(mapStateToProps, null)(ModalComponent);
