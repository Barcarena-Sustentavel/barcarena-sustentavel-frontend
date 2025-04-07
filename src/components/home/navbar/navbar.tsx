import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
//import logoMinimalist from "../assets/images/icons/LogoMinimalist.png";
import "../../../css/navbar.css"
import Logo from "./logo.tsx";
import {MobileModalItem, MobileModalDropdown, MobileModalDropdownItem, MobileModalProvider} from "./mobileModalItem.tsx";
import { color } from "highcharts";

const NavbarComponent: FC = () => {
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [iconRotated, setIconRotated] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleCloseMobileModal = () => setShowMobileModal(false);
  const handleShowMobileModal = () => setShowMobileModal(true);
  const toggleModal = () => {
    setModalActive(!modalActive);
    console.log("teste modal")
    setIconRotated(!iconRotated);
  };
  const ativarListItemMobileModal = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <Navbar expand="lg" className="flex-row navbar-light bg-light">
      <Container style={{display:"flex", justifyContent:"space-between", width: "80%", margin:"0 auto"}} >
        <Navbar.Brand as={Link} to="/" className="d-flex align-self-left logo-navbar">
          <Logo></Logo>
        </Navbar.Brand>
        
        <Button 
          className="navbar-toggler" 
          onClick={handleShowMobileModal}
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        
        <Navbar.Collapse id="navbarNav">
          <Nav className="navbar-nav d-none d-lg-flex justify-content-end" style={{ width: "100%", justifyContent: "space-between", display: "flex" }}>
            <Nav.Item>
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            </Nav.Item>
            
            <Nav.Item>
              <Nav.Link as={Link} to="/about">O ODSB</Nav.Link>
            </Nav.Item>
            
            <NavDropdown title="Menu 3" id="navbarLightDropdownMenuLink">
              <NavDropdown.Item as={Link} to="/job-listings">Job Listings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/job-details">Job Details</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Item>
              <Nav.Link as={Link} to="/contact">Menu 4</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        
        {/* Mobile Modal */}
        <Modal show={showMobileModal} onHide={handleCloseMobileModal} id="mobile-modal" dialogClassName={modalActive ? "active" : ""} >
          <Modal.Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
          }}>
          <Logo 
              forceVersion="minimalist" 
              className={"logo-minimalist"}
              onClick={toggleModal}
              style={{
                transform: iconRotated ? "rotate(360deg)" : "rotate(0deg)",
                transition: "transform 1s",
                cursor: "pointer",
                flexShrink: 1
              }}
            />
            <Button 
              variant="close" 
              onClick={handleCloseMobileModal} 
              aria-label="Close"
              style={{
                position: 'absolute',
                right: '1rem',
                width: '30px',
                height: '30px',
                padding: '0',
              }}
            />
          </Modal.Header>
          
          <MobileModalProvider  onClose={handleCloseMobileModal}>
            <Modal.Body>
              <Nav className="navbar-nav">
                <MobileModalItem
                  id={"home"}
                  to={"/"}
                  style={{"--clr": "var(--secondary-light-blue)"} as React.CSSProperties}>
                    <i className="bi bi-house-door"></i>
                    <span className="light-blur"></span>
                    <span className="text">Home</span>
                </MobileModalItem>
            
                <MobileModalItem 
                  id={"about"} 
                  to={"/about"} 
                  style={{"--clr": "var(--secondary-green)"} as React.CSSProperties}>
                  <i className="bi bi-info-circle"></i>
                  <span className="light-blur"></span>
                  <span className="text">O ODSB</span>
                </MobileModalItem>

                <MobileModalDropdown id={"servicos"} title={
                    <>
                      <i className="bi bi-bell"></i>
                      <span className="light-blur"></span>
                      <span className="text">Serviços</span>
                    </>
                  } style={{"--clr": "var(--secondary-orange)"} as React.CSSProperties}>
                    <MobileModalDropdownItem onClick={handleCloseMobileModal} to={"/job-listings"}>
                      Job Listings
                    </MobileModalDropdownItem>
                    <MobileModalDropdownItem onClick={handleCloseMobileModal} to={"/job-details"}>
                      Job Listings
                    </MobileModalDropdownItem>
                </MobileModalDropdown>    
                <MobileModalItem 
                  id={"contact"} 
                  to={"/contact"}
                  style={{"--clr": "var(--secondary-light-blue)"} as React.CSSProperties}
                >
                  <i className="bi bi-envelope-exclamation"></i>
                  <span className="light-blur"></span>
                  <span className="text">Contato</span>
                </MobileModalItem>   
              </Nav>
            </Modal.Body>
          </MobileModalProvider>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
