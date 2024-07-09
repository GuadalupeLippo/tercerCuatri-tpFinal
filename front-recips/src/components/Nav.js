import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/libro-de-cocina.png';
import '../Styles/NavStyle.css'
import ModalNewRecip from './ModalNewRecip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function NavRecip({addRecip, filterRecipByName}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [search, setSearch]= useState([]);

  const onSearchChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
    };

    const onSearch = () => {
      filterRecipByName(search);
    };


  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/recips">
            <img src={logo} alt='logo de cocina' width='50px'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={handleShowModal}>Nueva receta</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar receta"
              className=" me-2 custom-input"
              aria-label="Search"
              value= {search}
              onChange={onSearchChange}
             />
              <Button variant="outline-secondary" onClick={onSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ModalNewRecip 
      showModal={showModal} handleCloseModal={handleCloseModal} addRecip={addRecip}/>
    </>
  );
}

export default NavRecip;