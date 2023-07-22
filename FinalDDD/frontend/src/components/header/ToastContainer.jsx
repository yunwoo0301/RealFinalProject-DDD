import React from 'react';
import { toast, ToastContainer} from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 1rem;
    border-radius: 1rem;
    padding: 1rem 1.2rem;
    color: #fff;
  }

  .Toastify__toast-icon {
    width: 5rem;
  }

  .Toastify__toast--info {
    background: rgba(94, 173, 247, 0.8);
  }

`;

export const showToast =(message) =>
      toast.info(message, {
        position: "top-center",
        autoClose: 2000,
        closeProgressBar: true,
        hideProgressBar: true,
        icon: false,
        closeButton: false,
        limit: 1
      }
      );


const Toast = () => {
  return <Container />;
}

export default Toast;