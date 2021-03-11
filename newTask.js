import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function formatDate(date) {
  return date.toLocaleDateString();
}

function newTask(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "TaskName" }, /*#__PURE__*/
    React.createElement("div", { className: "UserInfo" }, /*#__PURE__*/
    

    React.createElement("div", { className: "UserInfo-name" },
    props.author.name)), /*#__PURE__*/


    React.createElement("div", { className: "Comment-text" }, props.text), /*#__PURE__*/
    React.createElement("div", { className: "Comment-date" },
    formatDate(props.date))));



}

const comment = {
  date: new Date(),
  text: 'Task 1',
  author: {
    name: 'Task Description',
     };


ReactDOM.render( /*#__PURE__*/
React.createElement(Comment, {
  date: comment.date,
  text: comment.text,
}),

document.getElementById('root'));




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
