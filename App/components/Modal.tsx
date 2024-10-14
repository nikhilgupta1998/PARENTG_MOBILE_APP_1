import React from 'react';
import Modal from 'react-native-modal';

interface ModalProps {
  modalizeRef: any;
  open: boolean;
  onBackdropPress: Function;
  style: any;
  children: any;
  onSwipeComplete: any;
}
const CustomModal = (props: ModalProps) => {
  return (
    <Modal
      testID="modal"
      ref={props.modalizeRef}
      propagateSwipe={true}
      isVisible={props.open}
      avoidKeyboard={true}
      onBackdropPress={() => props.onBackdropPress()}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={1000}
      animationInTiming={500}
      useNativeDriverForBackdrop
      swipeDirection={'down'}
      onSwipeComplete={() => props.onBackdropPress()}>
      {props.children}
    </Modal>
  );
};

CustomModal.defaultProps = {
  style: {},
  onSwipeComplete: undefined,
};
export default CustomModal;
