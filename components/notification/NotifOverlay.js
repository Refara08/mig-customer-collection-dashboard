import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalOverlay = (props) => {
  return (
    <div className={`fixed top-0 right-1/2 translate-x-1/2 z-50`}>
      <div>{props.children}</div>
    </div>
  );
};

const NotifModal = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <>
      {mounted
        ? createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            document.querySelector("#notification")
          )
        : null}
    </>
  );
};

export default NotifModal;
