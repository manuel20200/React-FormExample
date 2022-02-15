import useInput from "../hooks/use-input";

const emailCheck = (value) => {
  if (!value) {
    return false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    return false;
  } else {
    return true;
  }
}

const BasicForm = (props) => {

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameEnteredHandler,
    inputBlurHandler: nameEnteredBlurHandler,
    reset: resetName
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameEnteredHandler,
    inputBlurHandler: lastNameEnteredBlurHandler,
    reset: resetLastName
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailEnteredHandler,
    inputBlurHandler: emailEnteredBlurHandler,
    reset: resetEmail
  } = useInput(emailCheck);

  const formSubmitHandler = event => {
    event.preventDefault();

    resetName();
    resetLastName();
    resetEmail();

  }

  let formIsValid = false;
  if (nameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const nameClasses = nameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={nameClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name'
            value={enteredName} 
            onChange={nameEnteredHandler}
            onBlur={nameEnteredBlurHandler}
          />
          {nameHasError && <p className="error-text">Text a valid name!</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='name'
            value={enteredLastName} 
            onChange={lastNameEnteredHandler}
            onBlur={lastNameEnteredBlurHandler} 
          />
          {lastNameHasError && <p className="error-text">Text a valid Lastname!</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='email' 
          id='name'
          value={enteredEmail} 
          onChange={emailEnteredHandler}
          onBlur={emailEnteredBlurHandler}
        />
        {emailHasError && <p className="error-text">Text a valid e-mail!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
