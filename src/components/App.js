import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import ConfirmationPopup from './ConfirmationPopup';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Footer from './Footer'
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isButtonText, setIsButtonText] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
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

  const handleUpdateUser = (user) => {
    setIsButtonText('Сохранение...')
    api
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    setIsButtonText('Сохранение...')
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeCardLikeStatus(card.cardId, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card.cardId ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = () => {
    setIsButtonText('Удаление...')
    api
      .setDelete(deleteCard.cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard.cardId));
        closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
    }

  const handleAddPlaceSubmit = (card) => {
    setIsButtonText('Сохранение...')
    api
      .setCard(card)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleDeleteCardClick = (card) => {
    setIsConfirmationPopupOpen(true);
    setDeleteCard(card);
}

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setIsButtonText('');
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleDeleteCardClick}
      cards={cards}
      />
      <Footer/>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={isButtonText}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        buttonText={isButtonText}
        onDeleteCard={handleCardDelete}
        onClose={closeAllPopups}>
      </ConfirmationPopup>
      <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups}/>
    </div>
 </CurrentUserContext.Provider>
  );
}

export default App;
