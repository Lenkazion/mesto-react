import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <article className="element">
      <img className="element__image" src={props.card.link} aria-label={props.card.name} onClick={handleClick}/>
      <button className="element__delete" type="button" aria-label="корзина"></button>
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="elements__like">
          <button className="element__like" type="button" aria-label="Нравится"></button>
          <span className="element__like_counter">{props.card.likes.length}</span>
        </div> 
      </div>
    </article>
  )
}

export default Card;