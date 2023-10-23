import React from "react";
import { Modal } from "@mui/material";
import './customAlert.css'


const CustomAlert = ({open, onClose, title, message}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="custom-modal">
                
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </Modal>
    );
};

export default CustomAlert;