import useModalStore from "@/zustand/useModalStore";
import ModalComponent from "./ModalComponent"
import ButtonConfirm from "./Button/ButtonComfirm";
import { Fragment } from "react";
import propTypes from 'prop-types';



function ModalComplex ({onClick}) {
  const { closeModal, content} = useModalStore();

  const handleCancle = () => {
    closeModal();
  };


  return (
    <ModalComponent>
    <p className="my-4">
      {String(content).split("\n").map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
    <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
    <ButtonConfirm onClick={onClick} content="확인" confirm={true} />
  </ModalComponent>
  )
}
ModalComplex.propTypes = {
  onClick: propTypes.func,
};
export default ModalComplex