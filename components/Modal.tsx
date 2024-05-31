import Image from "next/image";

interface IModalData {
  message: string;
  onClick: () => void;
}

function Modal({ message, onClick }: IModalData) {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 grid place-content-center w-full h-full bg-[rgba(0,0,0,0.8)]"
    >
      <div className="w-[300px] bg-white flex flex-col items-center gap-4 p-6 rounded text-center">
        <Image src="info-icon.svg" alt="modal icon" width={30} height={30} />
        <h2 className="text-xl">{message}</h2>
        <button
          className="bg-[#330a68] text-white rounded p-1 w-full"
          onClick={onClick}
        >
          بستن
        </button>
      </div>
    </div>
  );
}

export default Modal;
