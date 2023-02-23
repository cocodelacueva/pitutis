const urlbase = 'http://localhost:3000';
const urlAPI = urlbase + '/functions';

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    
    let deleteSessionBTN = document.querySelector('#delrobot');
    let startSessionBTN = document.querySelector('#startbtn');

    if ( startSessionBTN ) {
        startSessionBTN.addEventListener('click', (event)=>{
            fetch( urlAPI+'/start' )
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (data.message == 'starting') {
                    reload();
                }
            })
            .catch(err => console.log(err));
        })
    }



    if ( deleteSessionBTN ) {
        deleteSessionBTN.addEventListener('click', (event)=>{
            fetch( urlAPI+'/destroy' )
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (data.message == 'destroyed') {
                    reload();
                }
            })
            .catch(err => console.log(err));
        })    
    }
}

function reload() {
    window.location.reload();
}
