import { fetchPost } from "../utills/fetch.js";

export const newAccountLinstener = async event => {
    if(event.target.id === 'config-btn') configNewAccount();
}

export const initNewAccountPage = () => {
    const userNameDOM = document.getElementById('user-name');
    userNameDOM.textContent = appState.user.firstName;
}

const configNewAccount = async () => {
    const newUserForm = document.getElementById('new-user-form');

    const formData = new FormData(newUserForm)
    const body = {
        baseCurrency: formData.get('curency')
    }

    const response = await fetchPost('/api/v1/users/config-new-account', true, body);

    if(response.status === 'fail' || response.status === 'error'){
        return alert(response.message);
    }

    if(response.status === 'success') {
        alert(response.message);
        location.reload();
    }
}