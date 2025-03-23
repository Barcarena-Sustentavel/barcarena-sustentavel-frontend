import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import logo from "../../../assets/images/icons/Logo2.png";
//import logoMinimalist from "../assets/images/icons/LogoMinimalist.png";
import "../../../css/navbar.css"
const NavbarComponent: FC = () => {
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleCloseMobileModal = () => setShowMobileModal(false);
  const handleShowMobileModal = () => setShowMobileModal(true);

  return (
    <Navbar expand="lg" className="flex-row navbar-light bg-light">
      <Container style={{display:"flex", justifyContent:"space-between", width: "80%", margin:"0 auto"}} >
        <Navbar.Brand as={Link} to="/" className="d-flex align-self-left logo-navbar">
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
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
          <Nav className="navbar-nav d-flex justify-content-end" style={{ width: "50%", justifyContent: "space-between", display: "flex" }}>
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
        <Modal show={showMobileModal} onHide={handleCloseMobileModal} id="mobile-modal">
          <Modal.Header>
            <Button 
              variant="close" 
              onClick={handleCloseMobileModal} 
              aria-label="Close"
            />
          </Modal.Header>
          
          <Modal.Body>
            <Nav className="navbar-nav">
              <Nav.Item className="active">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  style={{"--clr": "var(--secondary-light-blue)"} as React.CSSProperties} 
                  onClick={handleCloseMobileModal}
                >
                  <i className="bi bi-house-door"></i>
                  <span className="light-blur"></span>
                  <span className="text">Home</span>
                </Nav.Link>
              </Nav.Item>
              
              <Nav.Item>
                <Nav.Link 
                  as={Link} 
                  to="/about" 
                  style={{"--clr": "var(--secondary-green)"} as React.CSSProperties}
                  onClick={handleCloseMobileModal}
                >
                  <i className="bi bi-info-circle"></i>
                  <span className="light-blur"></span>
                  <span className="text">O ODSB</span>
                </Nav.Link>
              </Nav.Item>
              
              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-bell"></i>
                    <span className="light-blur"></span>
                    <span className="text">Serviços</span>
                  </>
                } 
                id="navbarLightDropdownMenuLink"
                style={{"--clr": "var(--secondary-orange)"} as React.CSSProperties}
              >
                <NavDropdown.Item as={Link} to="/job-listings" onClick={handleCloseMobileModal}>
                  Job Listings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/job-details" onClick={handleCloseMobileModal}>
                  Job Details
                </NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Item>
                <Nav.Link 
                  as={Link} 
                  to="/contact" 
                  style={{"--clr": "var(--secondary-light-blue)"} as React.CSSProperties}
                  onClick={handleCloseMobileModal}
                >
                  <i className="bi bi-envelope-exclamation"></i>
                  <span className="light-blur"></span>
                  <span className="text">Contato</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Body>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
