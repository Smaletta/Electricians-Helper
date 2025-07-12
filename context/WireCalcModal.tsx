import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface WireModalContextType {
    modalVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const WireModalContext = createContext<WireModalContextType>({
    modalVisible: false,
    openModal: () => console.log('Open modal not implemented'),
    closeModal: () => {},
});

export const WireModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        console.log('Open Wire modal called');
        setModalVisible(true);
    };
    const closeModal = () => {
        console.log('Close Wire modal called');
        setModalVisible(false);
    };

    return (
        <WireModalContext.Provider value={{ modalVisible, openModal, closeModal }}>
            {children}
        </WireModalContext.Provider>
    );
};

export const useWireModal = () => useContext(WireModalContext);
