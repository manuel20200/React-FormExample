import { useRef } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  
  const { 
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const { 
    value: enteredLastName, 
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError, 
    valueChangeHandler: lastNameChangeHandler, 
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(value => value.trim() !== '');

  const { 
    value: enteredEmail, 
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError, 
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.includes('@'));

  const nameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  let formIsValid = false;
  //useEffect(() => {
    if (enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
    } else {
      formIsValid = false;
    }
  //}, [enteredNameIsValid]);

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }
    
    //const enteredValue = nameInputRef.current.value;
    resetNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
  const lastNameInputClasses = !lastNameInputHasError ? 'form-control' : 'form-control invalid';
  const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>

      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          ref={nameInputRef} 
          type='text' 
          id='name' 
          onChange={nameChangeHandler} 
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={lastNameInputClasses}>
        <label htmlFor='lastName'>Your Last Name</label>
        <input 
          ref={lastNameInputRef} 
          type='text' 
          id='lastName' 
          onChange={lastNameChangeHandler} 
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
        />
        {lastNameInputHasError && <p className="error-text">Lastname must not be empty.</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input 
          ref={emailInputRef} 
          type='email' 
          id='email' 
          onChange={emailChangeHandler} 
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">E-mail must not be empty.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
