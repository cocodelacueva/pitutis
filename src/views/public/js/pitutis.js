const urlbase = 'http://localhost:3000';
const urlAPI = urlbase + '/functions';

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    
    const deleteSessionBTN = document.querySelector('#delrobot');
    const startSessionBTN = document.querySelector('#startbtn');
    const infoBox = document.querySelector('#infobox');
    
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



    //info instrucciones
    if (infoBox) {
        const toggleBtnInfo = document.querySelector('#toggle-info');

        toggleBtnInfo.addEventListener('click', (event)=>{
            if ( infoBox.classList.contains('on') ) {
                infoBox.classList.remove('on');
            } else {
                infoBox.classList.add('on');
            }
        });

        const closeBtnInfo = infoBox.querySelector('#close-info');
        closeBtnInfo.addEventListener('click', (event) => {
            infoBox.classList.remove('on');
        })
    }

    //In init, must show info:
    infoBox.classList.add('on');


    //load robot functions

    //talker
    
    const talkerBtn = document.querySelector('#talk-action-btn');
    const actionsSelector = document.querySelector('#actions');

    if ( talkerBtn ) {
        talkerBtn.addEventListener('click', (event) => {
            const talker = document.querySelector('#talker');
            const msj = talker.value.trim();
            if (msj == '') {
                showHelpMessaje(['You need to write something.']);
            }

            //TODO
            //hacer llamada a api
        });
    }

    if ( actionsSelector ) {
        actionsSelector.addEventListener('change', (event)=> {
            const action = actionsSelector.value;
            
            if (action == 'none') {
                showHelpMessaje(['You need to select something.']);
            }

            //TODO
            //hacer llamada a api
            
        });
    }
    

}

function reload() {
    window.location.reload();
}

//array de msj
function showHelpMessaje(msjs) {
    const helpersMSJ = document.querySelector('#helpersmsj');
    const container = helpersMSJ.querySelector('.msjhelperwrapper');
    let html = '';

    msjs.forEach(msj => {
        html = html + '<p>' + msj + '</p>';
    });

    container.innerHTML = html;
    
    if (!helpersMSJ.classList.contains('on')) {
        helpersMSJ.classList.add('on');
    }
    
}