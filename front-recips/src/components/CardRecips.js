import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Styles/CardStyle.css'
import { useState } from 'react';
import EditRecipModal from './ModalEditRecip';

function CardRecip({
  recip,
  deleteRecipe,
  updateRecipInCards
})
{
  const [editRecip, setEditRecip] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenEditModal = (recip) => {
    setEditRecip(recip);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditRecip(null);
    setShowEditModal(false);
  };

  

  return (
    <>
    <Card className="recip-card" id={recip.id}>
      <Card.Img variant="top" src={recip.image} className="recip-image" alt='imagen de la receta'/>
      <Card.Body className="d-flex flex-column" >
        <Card.Title className='card-title text-center color-title'> <h4>{recip.name}</h4></Card.Title>
        <Card.Text>
          <strong className='text-secondary'>Ingredientes:</strong> <br/>
          {Array.isArray(recip.ingredients) ? recip.ingredients.join(', ') : 'No hay ingredientes disponibles'}
        </Card.Text>
        <Card.Text>
          <strong className='text-secondary'>Instrucciones: </strong> <br/>
          {recip.instructions}
        </Card.Text>
        <Card.Text>
          <strong className='text-secondary'>Tiempo de cocción: </strong> <br/>
          {recip.cooking_time}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-center button-container">
          <Button variant='outline-dark' className="button me-2 " onClick={() => handleOpenEditModal(recip)}>Editar</Button>
          <Button variant='outline-danger' className=" button" onClick={() => deleteRecipe(recip.id)}>Eliminar</Button>
        </div>
      </Card.Body>
    </Card>
      {editRecip && (
        <EditRecipModal
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal}
          recip={editRecip}
          updateRecipInCards={updateRecipInCards}
        />
      )} 
    </>  
  );

}

export default CardRecip;