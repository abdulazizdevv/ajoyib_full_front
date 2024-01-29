import React, { useEffect, useRef } from "react";
import "./modal.css";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  modal,
  setModal,
  children,
  title,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef?.current) {
      setModal(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" && modal) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [modal]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{ zIndex: 9999 }}
      className={`overlay z-[9] p-5 md:p-0 bg-black bg-opacity-40 ${modal ? "open" : ""}`}
    >
      <div
        className={` modal_wrapperPay bg-white p-5 rounded-lg z-[999999999]`}
      >
        <div className="flex justify-between">
          <h3 className="font-semibold text-[25px] text-center">{title}</h3>
          <button onClick={() => setModal(false)}>
            <IoClose size={25} />
          </button>
        </div>
        <div className={`modal-content`}>{children}</div>
      </div>
    </div>
  );
};
