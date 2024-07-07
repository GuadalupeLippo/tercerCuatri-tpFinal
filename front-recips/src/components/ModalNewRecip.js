import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../Styles/NavStyle.css'



function ModalNewRecip({ showModal, handleCloseModal, addRecip }) {
    const dataForm = {
    name: '',
    image: '',
    ingredients: [],
    instructions: '',
    cooking_time: ''}

  const [recip, setRecip] = useState(dataForm);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecip({
      ...recip,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipToSubmit = {
        ...recip,
        ingredients: recip.ingredients.split(',').map(ing => ing.trim()) 
      }; 

    try {
      const response = await fetch('http://localhost:3030/recips', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipToSubmit),
      });
      if (response.ok) {
        const newRecip = await response.json();
        addRecip(newRecip);
        setRecip(dataForm)
        handleCloseModal();
      } else {
        console.error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} backdrop='static' className='Modal'>
      <Modal.Header className='Modal-header'>
        <Modal.Title>Crea aquí tu nueva receta</Modal.Title>
      </Modal.Header >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={recip.name}
              onChange={handleChange}
              placeholder='Ingresa el nombre de la nueva receta.'
              className='custom-input'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIngredients">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              value={recip.ingredients}
              onChange={handleChange}
              placeholder='Ingresa los ingredientes separados por comas. Ejemplo: huevos, verduras, carne.'
              className='custom-input'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInstructions">
            <Form.Label>Instrucciones</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              value={recip.instructions}
              onChange={handleChange}
              placeholder='Ingresa una breve descripcion sobre como realizarla.'
              className='custom-input'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCookingTime">
            <Form.Label>Tiempo de coccion</Form.Label>
            <Form.Control
              type="text"
              name="cooking_time"
              value={recip.cooking_time}
              onChange={handleChange}
              placeholder='Ingresa el tiempo de coccion.'
              className='custom-input'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImageUrl">
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={recip.image}
              onChange={handleChange}
              placeholder='Ingresa una imagen para la receta.'
              className='custom-input'
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-dark" type="submit" className="me-2">Create Recipe</Button>
            <Button variant="outline-secondary" onClick={() => {
              setRecip(dataForm);
              handleCloseModal();
            }}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalNewRecip;
