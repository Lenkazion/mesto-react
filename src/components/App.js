import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer'
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}/>
      <Footer/>
      <PopupWithForm title="Редактировать профиль" textButton="Сохранить" name="profile-form" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="name"
        placeholder="Имя" 
        minLength="2"
        maxLength="40"
        required/>
        <span className="popup__error" id="name-error"></span>
        <input 
        className="popup__input popup__input_type_description"
        type="text"
        name="about"
        id="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required/>
        <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
    <PopupWithForm title="Новое место" textButton="Сохранить" name="place-form" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <input 
        className="popup__input popup__input_type_place-name"
        type="text"
        name="name"
        id="place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required/>
        <span className="popup__error" id="place-error"></span>
        <input 
        className="popup__input popup__input_type_place-url"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required/>
        <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
    <PopupWithForm title="Вы уверены?" textButton="Да" name="delete-confirmation-form" isOpen={false} onClose={closeAllPopups}>
    </PopupWithForm>
    <PopupWithForm title="Обновить аватар" textButton="Сохранить" name="avatar-form" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <input 
        className="popup__input popup__input_type_avatar-link"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        required/>
        <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
</div>
  );
}

export default App;
