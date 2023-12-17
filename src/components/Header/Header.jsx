import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header() {
  return (
    <Navbar className="bg-header" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#">Toll Calculator</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;