import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
    });
};

export const ErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
    });
};
export const InfoToast = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
    });
};

