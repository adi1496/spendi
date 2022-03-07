import {newUserPage} from './../utils/pages.js';

const newUserPageController = (firebase, userId) => {
    document.getElementById('root').innerHTML = newUserPage;

    document.getElementById('ok-btn').addEventListener('click', e => {
        e.preventDefault();

        const curency = document.getElementById('curency').value;
        firebase.firestore().collection('users').doc(userId).update({
            curency: curency,
            incomesList: ['salary', 'project', 'dividend', 'pension'],
            expensesList: ['rent', 'food', 'bills', 'car', 'transport', 'shopping']
        });

        window.localStorage.removeItem('isNewUser');
        window.location.reload();
    });
}




export default newUserPageController;