import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { API } from '../API/getRecips';
import { useEffect } from 'react';

const updateRecip = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API}/recips/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (response.ok) {
      const updatedRecipe = await response.json();
      console.log('Recipe updated successfully:', updatedRecipe);
      return updatedRecipe;
    } else {
      console.error('Failed to update recipe');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

function EditRecipeModal({ showModal, handleCloseModal, recip, updateRecipInCards }) {

    const [updatedFields, setUpdatedFields] = useState({
        name: '',
        image: '',
        ingredients: '',
        instructions: '',
        cooking_time: ''
      });
    
      useEffect(() => {
        if (recip) {
          setUpdatedFields({
            name: recip.name,
            image: recip.image,
            ingredients: recip.ingredients,
            instructions: recip.instructions,
            cooking_time: recip.cooking_time
          });
        }
      }, [recip]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({
      ...updatedFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecip = await updateRecip(recip.id, updatedFields);
    if (updatedRecip) {
      updateRecipInCards(updatedRecip);
      handleCloseModal();
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} backdrop='static' className='Modal'>
      <Modal.Header closeButton className='modal-header'>
        <Modal.Title>Edita aqui tu receta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 no-gap" controlId="formTitle">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedFields.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 no-gap" controlId="formIngredients">
            <Form.Label>Ingredientes:</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              value={updatedFields.ingredients}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 no-gap" controlId="formInstructions">
            <Form.Label>Instrucciones:</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              value={updatedFields.instructions}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 no-gap" controlId="formCookingTime">
            <Form.Label>Tiempo de cocción:</Form.Label>
            <Form.Control
              type="text"
              name="cooking_time"
              value={updatedFields.cooking_time}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 no-gap" controlId="formImageUrl">
            <Form.Label>URL imagen:</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={updatedFields.image}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-dark" type="submit" className="me-2">confirmar</Button>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditRecipeModal;
