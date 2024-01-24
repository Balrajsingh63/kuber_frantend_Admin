import React from 'react'

export default function SettingModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="modal-dialog modal-dialog-centered bg-danger">
            {children}
        </div>
    )
}
