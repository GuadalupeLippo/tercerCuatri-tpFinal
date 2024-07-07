import React from 'react'
import { getRecips } from '../API/getRecips';
import { useState, useEffect } from 'react';
import NavRecip from '../components/Nav'
import CardRecip from '../components/CardRecips'
import { API } from '../API/getRecips';



export default function Home() { 
    const [recip, setRecip] = useState([]);
    

    useEffect(()=>{
      getRecips()
      .then((res)=> res.json())
      .then((data)=> setRecip(data))
    },[])
  
    //esta funcion la utilizo para no refrescar la pagina,ni bien se crea una nueva receta se adhiere a las demas recetas por pantalla.
    //se la paso al modal
    const addRecip = (newRecip) => {
        setRecip([...recip, newRecip]);
      };

    const deleteRecipe = async (id) => {
        try {
          const res = await fetch(`${API}/recips/${id}`, {
            method: 'DELETE'
          });
    
          if (res.ok) {
            setRecip(recip.filter(recip => recip.id !== id));
            console.log('Recipe deleted successfully');
          } else {
            console.error('Failed to delete recipe');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const updateRecipInCards = (updatedRecip) => {
        setRecip((prevRecip) => 
           prevRecip.map((recip) =>
             recip.id === updatedRecip.id ? updatedRecip : recip
           )
         );
       };
      

  return (
    <div>
        <NavRecip addRecip={addRecip}/>
        <header className='text-center my-5'>
          <h2 className='title'>Libro de recetas</h2>
        </header>
        <div className="recip-cards-container">
          {recip.length > 0 ? (
          recip.map((recip) => <CardRecip recip={recip} key={recip.id} deleteRecipe={deleteRecipe} updateRecipInCards={updateRecipInCards}/>)
          ) : (
          <p>No recipes found</p>
          )}
        </div>
       
    </div>
  )
}
