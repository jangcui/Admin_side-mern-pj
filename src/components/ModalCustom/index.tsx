'use client';

import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import React from 'react';

interface MyModalProps extends Omit<ModalProps, 'visible'> {
    open: boolean;
    title?: React.ReactNode;
    performAction?: () => void;
}

function ModalCustom(props: MyModalProps) {
    const { open, onOk, onCancel, title = 'Confirm?' } = props;
    return (
        <Modal
            title={title}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Agree"
            cancelText="Cancel"
            okButtonProps={{ className: 'bg-primary' }}
        >
            <p> {title}</p>
        </Modal>
    );
}

export default ModalCustom;
