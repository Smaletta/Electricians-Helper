import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ConduitModalContextType {
    modalVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ConduitModalContext = createContext<ConduitModalContextType>({
    modalVisible: false,
    openModal: () => console.log('Open modal not implemented'),
    closeModal: () => {},
});

export const ConduitModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        console.log('Open modal called');
        setModalVisible(true);
    };
    const closeModal = () => {
        console.log('Close modal called');
        setModalVisible(false);
    };

    return (
        <ConduitModalContext.Provider value={{ modalVisible, openModal, closeModal }}>
            {children}
        </ConduitModalContext.Provider>
    );
};

export const useConduitModal = () => useContext(ConduitModalContext);
