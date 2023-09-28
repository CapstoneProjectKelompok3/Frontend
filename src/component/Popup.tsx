import { FC, useEffect, useRef } from 'react'
interface PopupProps {
  onConfirm: () => void;
  children?: React.ReactNode;
}
const Popup: FC<PopupProps> = ({ onConfirm, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onConfirm();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onConfirm]);

  const modalOverlayStyle = 'fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-10'
  const modalContentStyle = 'rounded-md'
  return (
    <div>
      <div className={`${modalOverlayStyle}`}>
        <div ref={modalRef} className={`${modalContentStyle}`}>
          {children}
        </div>
      </div>
    </div>
  );
};



export default Popup