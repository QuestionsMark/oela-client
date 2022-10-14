import { useState } from "react";

export const useOpen = () => {

    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return { open, close, isOpen };
};