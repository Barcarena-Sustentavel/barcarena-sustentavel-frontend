import React from "react";
import { FC, useState, useEffect, createContext, useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// 1. Criamos um contexto para o modal
interface MobileModalContextType {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  closeModal: () => void;
}

const MobileModalContext = createContext<MobileModalContextType | undefined>(undefined);

// 2. Componente Provider que encapsula a lógica
const MobileModalProvider: FC<{ 
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <MobileModalContext.Provider value={{ 
      activeId, 
      setActiveId,
      closeModal: onClose
    }}>
      {children}
    </MobileModalContext.Provider>
  );
};

// 3. Componente Item desacoplado
const MobileModalItem: FC<{
  id: string;
  children: React.ReactNode;
  to: string;
  style?: React.CSSProperties;
}> = ({ id, children, to, style }) => {
  const context = useContext(MobileModalContext);
  
  if (!context) {
    throw new Error("MobileModalItem must be used within a MobileModalProvider");
  }

  const { activeId, setActiveId, closeModal } = context;
  const isActive = activeId === id;

  return (
    <Nav.Item 
      className={isActive ? 'active' : ''}
      onClick={() => setActiveId(id)}
      onMouseEnter={() => setActiveId(id)}
    >
      <Nav.Link
        as={Link}
        to={to}
        className={isActive ? 'active' : ''}
        style={style}
        onClick={closeModal}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

type DropdownChildProps = {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
};

const MobileModalDropdown: FC<{
  id: string;
  title: React.ReactNode;
  style: React.CSSProperties;
  children: React.ReactNode;
}> = ({ id, title, style, children }) => {
  const context = useContext(MobileModalContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!context) {
    throw new Error("MobileModalDropdown must be used within a MobileModalProvider");
  }

  const { activeId, setActiveId, closeModal } = context;
  const isActive = activeId === id;

  // Fecha o dropdown quando o activeId muda para outro item
  useEffect(() => {
    if (activeId !== id && isOpen) {
      setIsOpen(false);
    }
  }, [activeId, id, isOpen]);

  const handleToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (isOpen) {
      setActiveId(id);
    } else if (activeId === id) {
      setActiveId(null);
    }
  };

  return (
    <NavDropdown 
      title={title}
      show={isOpen}
      onToggle={handleToggle}
      id={`mobile-dropdown-${id}`}
      style={style}
      className={isActive ? 'active' : ''}
      onMouseEnter={() => setActiveId(id)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: () => {
              closeModal();
              setIsOpen(false);
              setActiveId(null);
            }
          } as Partial<unknown>);
        }
        return child;
      })}
    </NavDropdown>
  );
};
  
const MobileModalDropdownItem: FC<DropdownChildProps> = ({ to, children, onClick }) => {
    return (
        <NavDropdown.Item 
          as={Link} 
          to={to} 
          onClick={onClick} 
          className="no-active"
        >
        {children}
        </NavDropdown.Item>
    );
};

export {MobileModalItem, MobileModalDropdown, MobileModalDropdownItem, MobileModalProvider};