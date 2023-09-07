import React, { CSSProperties } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  closeHandler: () => void;
  style?: CSSProperties;
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
        style={{
          content: { display: 'flex', flexDirection: 'column' },
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
      >
        <div style={{ display: 'flex', fontSize: 20, justifyContent: 'end' }}>
          <span onClick={props.closeHandler} style={{ cursor: 'pointer' }}>
            ✖️
          </span>
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            ...props.style
          }}
        >
          {props.children}
        </div>
      </ReactModal>
    </div>
  );
};
