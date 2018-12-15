import Axios from "axios";
import store from "./reducer";

export const log_to_console_function = () => ({ type : "logToConsole" });

export const set_donation_amount = (input_amount) => {
  return {
    type : "setDonationAmount",
    payload : {
      donation_amount : input_amount
    }
  }
};

export const changeCheckoutStep = (checkoutStep) => {
  return {
    type : 'setCheckoutStep',
    payload : {
      checkoutStep // this is that space saving ES6 destructuring syntax
    }
  }
};

// export const updateStateData = (stateData, stateVariable) => {
//   return {
//     type : 'stateUpdate',
//     payload : {
//       stateVariable,
//       stateData
//     }
//   }
// };

export const updateStateData = (stateData, stateVariable) => (dispatch => {
  const action = dispatch({ // dispatch is sync. and returns the same action
    type : 'stateUpdate',
    payload : {
      stateVariable,
      stateData
    }
  });
  console.log('updateStateData', action);
});



  // define a promise
    // the promise will do a set timeout and return a string after 2 seconds
  // After the 2 seconds
export const testThunk = () => ((dispatch) => {
  const fakeFetch = () => new Promise((resolve, reject) => (
    setTimeout(() => resolve('into the 1st promise data local, and then into the payload value of the action'), 2000)
  ));
  
  return fakeFetch()
    .then((resolvedValue) => {
      dispatch({
      type: 'thunkTest',
      payload: resolvedValue });
      
      return '1st promise return';
    })
    .then((returnedValue => {
      console.log('getstate call', store.getState());
      console.log(returnedValue);
    }))
  });


// testing axios with a real action/thunk
export const quoteThunk = () => (dispatch => {
  return Axios.get('http://quotesondesign.com/wp-json/posts')
    .then(returnedValue => {
      console.log(returnedValue);
      dispatch({
        type : 'quoteThunk',
        payload : returnedValue
      });
      console.log('getState 1 link after dispatch({})', store.getState())
    })
});

// post an object with donor state data to the api
export const postNewDonor = (step, firstName, lastName, emailAddress) => (dispatch => {
  return Axios.post('http://localhost:4000/api/donate', {
    step, firstName, lastName, emailAddress
  })
    .then(returnedValue => {
      console.log('returnedValue: ', returnedValue);
      dispatch({
        type : 'setCheckoutStep',
        checkoutStep : 'referrals'
      })
    })
});










