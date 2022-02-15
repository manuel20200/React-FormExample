import { useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { isTouched: action.isTouched, value: state.value };
    }
    if (action.type === 'RESET') {
        return { value: action.value, isTouched: action.isTouched };
    }
    return initialInputState;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };

    const inputBlurHandler = event => {
        dispatch({ type: 'BLUR', isTouched: true });
    };

    const reset = () => {
        dispatch({ type: 'RESET', value: '', isTouched: false });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler,
        reset: reset,
    };
};

export default useInput;