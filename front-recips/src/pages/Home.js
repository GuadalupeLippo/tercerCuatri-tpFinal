import React from 'react'
import { getRecips } from '../API/getRecips';
import { useState, useEffect } from 'react';
import NavRecip from '../components/Nav'
import CardRecip from '../components/CardRecips'
import { API } from '../API/getRecips';



export default function Home() { 
    const [recip, setRecip] = useState([]);
    const [filteredRecips, setFilteredRecips] = useState([]);
    


    useEffect(()=>{
      getRecips()
      .then((res)=> res.json())
      .then((data)=> {
        setRecip(data);
        setFilteredRecips(data);}
    )
    },[])

  


    //esta funcion la utilizo para no refrescar la pagina,ni bien se crea una nueva receta se adhiere a las demas recetas por pantalla.
    //se la paso al modal
    const addRecip = (newRecip) => {
        const updatedRecips = [...filteredRecips, newRecip];
        setRecip(updatedRecips);
        setFilteredRecips(updatedRecips);
      };

    const deleteRecipe = async (id) => {
        try {
          const res = await fetch(`${API}/recips/${id}`, {
            method: 'DELETE'
          });
    
          if (res.ok) {
            const updatedRecip = recip.filter(recip => recip.id !== id);
            console.log('Recipe deleted successfully');
            setRecip(updatedRecip);
            setFilteredRecips(updatedRecip);
          } else {
            console.error('Failed to delete recipe');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const updateRecipInCards = (updatedRecip) => {
        const updatedRecips = recip.map((recip) =>
          recip.id === updatedRecip.id ? updatedRecip : recip
        );
        setRecip(updatedRecips);
        setFilteredRecips(updatedRecips); // también actualizar filteredRecips
      };
      

       const filterRecipByName = (searchTerm) => {
        const filtered = recip.filter(recip =>
          recip.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecips(filtered);
      };

      

  return (
    <div>
        <NavRecip addRecip={addRecip} filterRecipByName={filterRecipByName}/>
        <header className='text-center my-5'>
          <h2 className='title'>Libro de recetas</h2>
        </header>
        <div className="recip-cards-container">
          {filteredRecips.length > 0 ? (
           filteredRecips.map((recip) => <CardRecip recip={recip} filteredRecips={filteredRecips}  key={recip.id} deleteRecipe={deleteRecipe} updateRecipInCards={updateRecipInCards}/>)
          ) : (
          <p>No recipes found</p>
          )}
           
        </div>

    </div>
  )
}
