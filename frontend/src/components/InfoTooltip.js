import React from 'react'
import successImage from '../images/success.svg'
import failImage from '../images/fail.svg'

const InfoTooltip = (props) => {
  return (
    <div className={`
      popup popup_${props.name} 
      ${props.isOpen ? 'popup_opened' : ''}
    `}>
      <div className="popup__container">
        <img src={props.isSuccess ? successImage : failImage} className='popup__status-image'/>
        <h2 className="popup__header">
          {props.isSuccess 
            ? props.headerSuccessText 
            : props.headerFailText
          }
        </h2>
        <button 
          onClick={props.onClose}
          type="button" 
          aria-label="Закрыть" 
          className="popup__close popup__close_button_delete-card"
        ></button>
      </div>
    </div>
  )
}

export default InfoTooltip

