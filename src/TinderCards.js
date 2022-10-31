/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import axios from './axios.js';


function TinderCards() {

    const [people, setPeople] = useState([]);


    useEffect(()=> {
        async function fetchData() {
            const req = await axios.get('/tinder/cards')

            setPeople(req.data);
        }

        fetchData();
    }, [])


    const swiped = (direction, nameToDelete, cont) => {
        console.log("removing: " + nameToDelete);
        console.log(cont)
       
        if(direction==='right'){
            console.log(direction);
            window.open(cont, '_blank', 'noopener,noreferrer');
        }
        // setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen");
    }


  return (
    <div className='tinderCards'>
        <div className='tinderCards__cardCointainer'>
            
            {people.map((person)=>(
                <TinderCard className='swipe' key={person.name} preventSwipe={["up", "down"]} onSwipe={(dir)=> swiped(dir, person.name, person.contact)} onCardLeftScreen={()=> outOfFrame(person.name)}>
                     <div  style={{ backgroundImage: `url('${person.imgUrl}')`}} className='card' >
                        <a href={person.contact}> <h3>{person.name}</h3> </a>
                        <h2>{person.project}</h2>
                        <p className='favlang'>Favourite language/Stack:</p>
                        <p className='lang'>{person.language}</p>
                     </div>
                </TinderCard>
            ))}
        </div>
       
    </div>
  )
}

export default TinderCards