import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <form className={`popup__form popup__form_${props.name}`} name={props.name} id={props.name} noValidate>
          {props.children}
          <button className="popup__submit" type="submit">{props.textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;