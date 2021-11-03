// show qa elem and event listner
const addQbtnElem = document.querySelector('#show-btn');
addQbtnElem.addEventListener('click', showQAPopup);
// qa card elem
const qAElem = document.querySelector('.question-card');
//qa close btn elem and eventlistner
const qAcloseBtnElem = document.querySelector('#close-btn');
qAcloseBtnElem.addEventListener('click', removeQApopup);
// qa submit btn and event listner
const qASubmitBtnElem = document.querySelector('#submitbtn');
qASubmitBtnElem.addEventListener('click', takingValueFromUser);
// update button element and event listner
const qAUpdateBtnElem = document.querySelector('#updatebtn');
qAUpdateBtnElem.addEventListener('click', updateItem);

// adding qa popup
function showQAPopup() {
    qAElem.style.display = 'block';
}



//removing qa popu[]
function removeQApopup() {
    qAElem.style.display = 'none';
}



// taking valus from user 
function takingValueFromUser(e) {
    e.preventDefault();
    qASubmitBtnElem.style.display = 'block';
    qAUpdateBtnElem.style.display = 'none';
    const questionTextAreaElem = document.querySelector('#question-input');
    const answerTextAreaElem = document.querySelector('#answer-input');
    const qakey = localStorage.getItem('qakey');

    if (qakey == null) {
        qaArray = [];
    }
    else {
        qaArray = JSON.parse(qakey);
    }

    let qaobj = {
        question: questionTextAreaElem.value,
        answer: answerTextAreaElem.value
    }

    if (questionTextAreaElem.value != '' & answerTextAreaElem.value != '') {
        qaArray.push(qaobj);
        localStorage.setItem('qakey', JSON.stringify(qaArray));
        questionTextAreaElem.value = '';
        answerTextAreaElem.value = '';
    }
    else {
        alert('Kindly Fill both Question & Answer fields');
    }
    // console.log(questionTextAreaElem.value, answerTextAreaElem.value)
    // console.log(localStorage.qakey)
    showQACards()
}


showQACards();

// showing qa cards 

function showQACards() {
    const qakey = localStorage.getItem('qakey');

    if (qakey == null) {
        qaArray = [];
    }
    else {
        qaArray = JSON.parse(qakey);
    }

    let html = '';

    qaArray.forEach((element, index) => {
        html +=
            `
            <div class="col-md-4">
    <div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${element.question}</h4>
        <a href="#" class="text-capitalize my-3 show-answer" onclick="showHideAnswer(${index})">Show/Hide Answer</a>
        <h5 class="answer mb-3">${element.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
            <a href="#"  class=" btn my-1 edit-flashcard text-uppercase" onclick="editItem(${index}), showQAPopup()">edit</a>
            <a href="#"  class=" btn my-1 delete-flashcard text-uppercase" onclick="deleteItem(${index})">delete</a>
        </div>
    </div>
</div>
            `;
    });

    let qaContainerElem = document.querySelector('#questions-list');

    qaContainerElem.innerHTML = html;
    // console.log(qaContainerElem);
}





// for show and hide answer
function showHideAnswer(index) {
    const answerElem = document.querySelectorAll('.answer');
    answerElem[index].classList.toggle('showItem');
    console.log(index);
}

// deleting card from localstorage

function deleteItem(index) {
    const qakey = localStorage.getItem('qakey');

    if (qakey == null) {
        qaArray = [];
    }
    else {
        qaArray = JSON.parse(qakey);
    }

    qaArray.splice(index, 1);
    localStorage.setItem('qakey', JSON.stringify(qaArray));
    showQACards()
    return index;
}


// editing array from localstorage 

function editItem(index) {

    qASubmitBtnElem.style.display = 'none';
    qAUpdateBtnElem.style.display = 'block';

    const questionTextAreaElem = document.querySelector('#question-input');
    const answerTextAreaElem = document.querySelector('#answer-input');
    const hiddenInputElem = document.querySelector('#hidden');

    const qakey = localStorage.getItem('qakey');

    if (qakey == null) {
        qaArray = [];
    }
    else {
        qaArray = JSON.parse(qakey);
    }

    questionTextAreaElem.value = qaArray[index].question;
    answerTextAreaElem.value = qaArray[index].answer;
    hiddenInputElem.value = index;
    // console.log(hiddenInputElem.value);
}

function updateItem() {

    const hiddenInputElemValue = document.querySelector('#hidden').value;
    const questionTextAreaElem = document.querySelector('#question-input');
    const answerTextAreaElem = document.querySelector('#answer-input');

    const qakey = localStorage.getItem('qakey');

    if (qakey == null) {
        qaArray = [];
    }
    else {
        qaArray = JSON.parse(qakey);
    }

    qaArray[hiddenInputElemValue].question = questionTextAreaElem.value;
    qaArray[hiddenInputElemValue].answer = answerTextAreaElem.value;

    localStorage.setItem('qakey', JSON.stringify(qaArray));

    questionTextAreaElem.value = '';
    answerTextAreaElem.value = '';

    showQACards();
    removeQApopup();


}














// //event listeners - will be invoked after DOM Content is loaded
// function eventListeners(){
//     const showBtn = document.getElementById("show-btn");
//     const questionCard = document.querySelector(".question-card");
//     const closeBtn = document.querySelector(".close-btn");
//     const form = document.getElementById("question-form");
//     const feedback = document.querySelector(".feedback");
//     const questionInput = document.getElementById("question-input");
//     const answerInput = document.getElementById("answer-input");
//     const questionList = document.getElementById("questions-list");
//     //let data = [];
//     let id;

//     //new ui instance
//     const ui = new UI();
//     //retrieve questions from local storage
//     let data = ui.retrieveLocalStorgage();
//     if (data.length > 0){
//         id = (data[(data.length-1)].id)+1;
//     } else {
//         id = 1;
//     }
//     data.forEach(function(question){
//         ui.addQuestion(questionList, question);
//     })
//     //show question form
//     showBtn.addEventListener('click', function(){
//         ui.showQuestion(questionCard);
//     });
//     //hide question form
//     closeBtn.addEventListener('click', function(){
//         ui.hideQuestion(questionCard);
//     });
//     //add question
//     form.addEventListener('submit', function(event){
//         event.preventDefault();

//         const questionValue = questionInput.value;
//         const answerValue = answerInput.value;

//         if(questionValue === '' || answerValue === ''){
//             feedback.classList.add('showItem', 'alert-danger');
//             feedback.textContent = 'cannot add empty values';

//             setTimeout(function(){
//                 feedback.classList.remove('alert-danger', 'showItem');    
//             }, 3000)
//         } else {
//             const question =  new Question(id, questionValue, answerValue);
//             data.push(question);
//             ui.addToLocalStorage(data);
//             id++;
//             ui.addQuestion(questionList, question)
//             ui.clearFields(questionInput, answerInput);
//         }
//     });
//     //work with a question
//     questionList.addEventListener('click', function(event){
//         event.preventDefault();
//     if(event.target.classList.contains('delete-flashcard')){
//         let id = event.target.dataset.id;

//         questionList.removeChild(event.target.parentElement.parentElement.parentElement);
//         // rest of data
//         let tempData = data.filter(function(item){
//             return item.id !== parseInt(id);
//         });
//         data = tempData;
//         ui.addToLocalStorage(data);

//     } else if (event.target.classList.contains('show-answer')){
//             event.target.nextElementSibling.classList.toggle('showItem');
//     } else if (event.target.classList.contains('edit-flashcard')){
//         //delete question from DOM
//         let id = event.target.dataset.id;
//         questionList.removeChild(event.target.parentElement.parentElement.parentElement);

//         //show question in question card
//         ui.showQuestion(questionCard);
//         //find specific question clicked
//         const tempQuestion = data.filter(function(item){
//             return item.id === parseInt(id);
//         });
//         // rest of data
//         let tempData = data.filter(function(item){
//             return item.id !== parseInt(id);
//         });
//         data = tempData;
//         questionInput.value = tempQuestion[0].title;
//         questionInput.value = tempQuestion[0].answer;
//     }  
//     });
// }
// //Contructor function responsible for the display
// function UI(){
//     //show question card
//     UI.prototype.showQuestion = function(element){
//         element.classList.add('showItem');
//     }
//     //hide question card
//     UI.prototype.hideQuestion = function(element){
//         element.classList.remove('showItem');
//     }
//     //add question
//     UI.prototype.addQuestion = function(element, question){
//         const div = document.createElement('div');
//         div.classList.add('col-md-4');
//         div.innerHTML = `<div class="card card-body flashcard my-3">
//         <h4 class="text-capitalize">${question.title}</h4>
//         <a href="#" class="text-capitalize my-3 show-answer">Show/Hide Answer</a>
//         <h5 class="answer mb-3">${question.answer}</h5>
//         <div class="flashcard-btn d-flex justify-content-between">

//          <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
//          <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
//         </div>
//        </div>`;
//        element.appendChild(div);
//     }
//     //add to Local Storage
//     UI.prototype.addToLocalStorage = function(data){
//         localStorage.clear();
//         const dataJSON = JSON.stringify(data);
//         localStorage.setItem('flash-questions', dataJSON)
//     }
//     //retrieve from localStorage
//     UI.prototype.retrieveLocalStorgage = function(){

//         let savedQuestions = localStorage.getItem('flash-questions');
//         if (savedQuestions){
//             const savedQuestionsParsed = JSON.parse(savedQuestions);
//             return savedQuestionsParsed;
//         } else {
//             return savedQuestions = [];
//         }

//     }

//     //clear fields
//     UI.prototype.clearFields = function(question, answer){
//         question.value = '';
//         answer.value = '';
//     }
// }
// //Constructor function responsible for each question
// function Question(id, title, answer){
//     this.id = id;
//     this.title = title;
//     this.answer = answer;
// }
// // dom event listener to run when content is loaded
// document.addEventListener('DOMContentLoaded', function(){
//     eventListeners();
// })