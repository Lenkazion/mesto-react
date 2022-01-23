import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
    })
  }, []);

  React.useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
    })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__all-info">
            <div className="profile__avatar-block" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
            </div>
            <div className="profile__info">  
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile} alt="Редактировть"></button>
                <p className="profile__description">{userDescription}</p>
            </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} aria-label="Добавлять"></button>
      </section>
      <section className="elements">
        {cards.map(card => <Card card={card} key={card._id} onCardClick={props.onCardClick}/>)}
      </section>
    </main>
  );
}

export default Main;