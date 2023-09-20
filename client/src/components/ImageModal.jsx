import { Image, Modal } from "react-bootstrap";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export default function ImageModal({
  showModal,
  setShowModal,
  current,
  setCurrent,
  data,
}) {
    const imgPics = data?.images.map((image) => image);
  const length = imgPics.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleClose = () => setShowModal(false)
  
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      fullscreen={true}
      backdrop="static"
    >
      <div className="text-end w-100">
        <AiOutlineClose
          size="1.8rem"
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </div>
      <div
        className="w-100 h-100 position-relative"
        // style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <Image
          src={imgPics[current]}
          alt="imgs"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
          }}
        />
        <BsArrowLeftCircle
          className="position-absolute top-50 start-0 translate-middle text-black z-2"
          size="1.8rem"
          style={{ cursor: "pointer" }}
          onClick={prevSlide}
        />
        <BsArrowRightCircle
          className="position-absolute top-50 start-100 translate-middle text-black z-2"
          size="1.8rem"
          style={{ cursor: "pointer" }}
          onClick={nextSlide}
        />
      </div>
    </Modal>
  );
}
