'use strict';

import 'normalize.css';
import './sass/main.sass';
import './sass/animation.sass';

function createElement(tag, props, children) {
    let element = document.createElement(tag);

    Object.keys(props).forEach(key => {
        element[key] = props[key];
    });

    if (children) {
        children.forEach(item => {
            element.appendChild(item);
        });
    }

    return element;
}

function addToDoItem(event) {
    event.preventDefault();

    if (!addInput.value) {
        createModal('You must enter a task name');
    } else {
        let toDoItem = createToDoItem(addInput.value);
        todoList.appendChild(toDoItem);

        addInput.value = '';
    }
}

function bindEvent(toDoItem) {
    let checkbox = toDoItem.querySelector('.checkbox');
    let editButton = toDoItem.querySelector('.edit');
    let deleteButton = toDoItem.querySelector('.delete');

    checkbox.addEventListener('change', toggleToDoItem);
    editButton.addEventListener('click', editToDoItem);
    deleteButton.addEventListener('click', deleteToDoItem);
}

function toggleToDoItem() {
    let listItem = this.parentNode.parentNode;

    listItem.classList.toggle('completed');
}

function editToDoItem() {
    let listItem = this.parentNode;
    let button = this;
    let title = listItem.querySelector('.title_text');
    let editInput = listItem.querySelector('.textfield');
    let isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.textContent = editInput.value;
        button.innerHTML = '<i class="fa fa-pencil"></i>Edit'
    } else {
        editInput.value = title.textContent;
        button.innerHTML = '<i class="fa fa-pencil"></i>Save';
    }
    listItem.classList.toggle('editing');
}

function deleteToDoItem() {
    let listItem = this.parentNode;

    todoList.removeChild(listItem);
}

function createToDoItem(title) {
    let checkboxTitle = createElement('p', {className: 'title_text', textContent: title});
    let checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});
    let checkboxSpan = createElement('span', {className: 'checkmark'});
    let editInput = createElement('input', {type: 'text', className: 'textfield'});
    let checkboxLabel = createElement('label', {className: 'title'}, [checkbox, checkboxTitle, checkboxSpan]);
    let editButtonIcon = createElement('i', {className: 'fa fa-pencil'});
    let editButton = createElement('button', {className: 'edit', textContent: 'Edit'}, [editButtonIcon]);
    let deleteButtonIcon = createElement('i', {className: 'fas fa-trash'});
    let deleteButton = createElement('button', {className: 'delete', textContent: 'Delete'}, [deleteButtonIcon]);
    let listItem = createElement('li', {className: 'todo-item'}, [checkboxLabel, editInput, editButton, deleteButton]);

    bindEvent(listItem);

    return listItem;
}

function createModal(message) {
    let modalHeading = createElement('h3', {textContent: 'Error'});
    let modalClose = createElement('span', {className: 'modal__close', textContent: ''});
    let modalContentText = createElement('p', {textContent: message});
    let modalContentTextBox = createElement('div', {className: 'modal__text'}, [modalContentText]);
    let modalHeader = createElement('div', {className: 'modal__header modal__header-error'}, [modalHeading, modalClose]);
    let modalContent = createElement('div', {className: 'modal__content'}, [modalHeader, modalContentTextBox]);
    let modalBox = createElement('div', {className: 'modal'}, [modalContent]);

    document.body.appendChild(modalBox);

    modalClose.addEventListener('click', () => {
        document.body.removeChild(modalBox);
    })
}

let form = document.getElementById('todo-form');
let addInput = document.getElementById('add-input');
let todoList = document.getElementById('todo-list');
let todoItems = document.querySelectorAll('.todo-item');

(function init() {
    form.addEventListener('submit', addToDoItem);

    todoItems.forEach(elem => {
        bindEvent(elem);
    });
})();

