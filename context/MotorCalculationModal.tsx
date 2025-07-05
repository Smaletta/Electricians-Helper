import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface MotorModalContextType {
    modalVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const MotorModalContext = createContext<MotorModalContextType>({
    modalVisible: false,
    openModal: () => console.log('Open modal not implemented'),
    closeModal: () => {},
});

export const MotorModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        console.log('Open motor modal called');
        setModalVisible(true);
    };
    const closeModal = () => {
        console.log('Close motor modal called');
        setModalVisible(false);
    };

    return (
        <MotorModalContext.Provider value={{ modalVisible, openModal, closeModal }}>
            {children}
        </MotorModalContext.Provider>
    );
};

export const useMotorModal = () => useContext(MotorModalContext);
