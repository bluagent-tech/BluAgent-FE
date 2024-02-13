const requiredInput = event => {
    var date = document.getElementById(event.target.name + 'Exp');
    if (event.target.value !== '') {
        date.setAttribute('required', '');
    }
    else { date.removeAttribute('required'); date.value = ''; }
};

export default requiredInput;