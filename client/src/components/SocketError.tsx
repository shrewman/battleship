import { useState } from "react";

const SocketError: React.FC<{
    errorMessage: string;
    onClose: () => void;
}> = ({ errorMessage, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
      };

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                    <p className="text-base text-bold mt-5 mb-2">
                        {errorMessage}
                    </p>
                </div>
            </div>
        )
    );
};

export default SocketError;
