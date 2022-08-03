import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// 💕8.3 cookie사용 추가
import { CookiesProvider } from 'react-cookie';

// 스토어 만들기 7.18
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))   // 미들웨어 사용할거면 applyMiddleware해줌!(thunk) 사용할 거 적어줌!
console.log(store.getState());      // 콘솔창 보면 Object
                                    // customers:
                                    //  addCustomer: {c_name: '', c_phone: '', c_birth: '', c_gender: '', c_add: '', …}
                                    //  customers: {loading: false, data: null, error: null}     초기값이 잘 들어가 있음!
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <BrowserRouter>를 줘야지 route, routes를 쓸 수 있음! */}
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
