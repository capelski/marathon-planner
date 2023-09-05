import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  closeHandler: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ReactModal
        isOpen={true}
        onRequestClose={props.closeHandler}
        style={{ content: { display: 'flex', flexDirection: 'column' } }}
      >
        <div style={{ display: 'flex', fontSize: 20, justifyContent: 'end' }}>
          <span onClick={props.closeHandler} style={{ cursor: 'pointer' }}>
            ✖️
          </span>
        </div>
        <div style={{ flexGrow: 1 }}>{props.children}</div>
      </ReactModal>
    </div>
  );
};
