import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-40"
      onClick={props.onCloseCart}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div
      className={`fixed top-0 right-1/2 translate-x-1/2 translate-y-80 lg:translate-y-60 z-50`}
    >
      <div>{props.children}</div>
    </div>
  );
};

const ConfirmationModal = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <>
      {mounted
        ? createPortal(
            <Backdrop onCloseCart={props.onCloseCart} />,
            document.querySelector("#confirmation")
          )
        : null}
      {mounted
        ? createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            document.querySelector("#confirmation")
          )
        : null}
    </>
  );
};

export default ConfirmationModal;
