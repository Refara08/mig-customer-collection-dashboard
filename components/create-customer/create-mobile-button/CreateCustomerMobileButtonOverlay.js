import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalOverlay = (props) => {
  return (
    <div className={`block md:hidden fixed bottom-5 right-5 z-20`}>
      <div>{props.children}</div>
    </div>
  );
};

const CreateMobileBtnModal = (props) => {
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
            document.querySelector("#confirmation")
          )
        : null}
    </>
  );
};

export default CreateMobileBtnModal;
