
const fullName = localStorage.getItem('fullName');
const dob = localStorage.getItem('dob');
const gender = localStorage.getItem('gender');
const phoneNumber = localStorage.getItem('phoneNumber');
const emailAddress = localStorage.getItem('emailAddress');
const pass = localStorage.getItem('pass');

const navBar = document.querySelector('.nav-bar');
const btn = navBar.querySelector('button')

if (fullName) {
    btn.innerHTML = fullName.substring(0, 1).toUpperCase();
    btn.onclick = "";

    const newDiv = document.createElement('div');

    //Styling
    newDiv.style.position = "absolute";
    newDiv.style.backgroundColor = "white";
    newDiv.style.color = "#1e7ea1";
    newDiv.style.textAlign = "center";
    newDiv.style.top = "80px";
    newDiv.style.right = "10px";
    newDiv.style.width = "400px";
    newDiv.style.borderTopRightRadius = "30px";

    //Adding Info
    newDiv.innerHTML = "Full Name:  " + fullName + "<br>Email:  " + emailAddress;

    document.body.appendChild(newDiv);

    newDiv.style.display = 'none';

    btn.addEventListener('mouseenter', () => {
        newDiv.style.display = 'block';
    });

    btn.addEventListener('mouseleave', () => {
        newDiv.style.display = 'none';
    });
}



