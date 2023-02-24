const urlbase = 'http://localhost:3000';
const urlAPI = urlbase + '/functions';
let isItaRobot = false;
let myRobot = {};
let bateryIntervalID;

loadRobot();
document.addEventListener('DOMContentLoaded', init, false);

async function init() {
    
    const deleteSessionBTN = document.querySelector('#delrobot');
    const startSessionBTN = document.querySelector('#startbtn');
    const infoBox = document.querySelector('#infobox');

    //botones inicio y apagado del juego
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
    
    if (!isItaRobot) {
        //In init, must show info:
        infoBox.classList.add('on');
    } else {
        myRobot = {
            name: 'Pitutis',
            batery: 20,
        }
        saveRobot();
    }

    setInterval(() => {
        saveRobot();
    }, 5000);
    
    robotLive();

    //load robot functions

    //talker
    const talkerBtn = document.querySelector('#talk-action-btn');
    const actionsSelector = document.querySelector('#actions');

    if ( talkerBtn ) {
        talkerBtn.addEventListener('click', async (event) => {
            const talker = document.querySelector('#talker');
            const msj = talker.value.trim();
            if (msj == '') {
                showHelpMessaje(['You need to write something.']);
            }

            //TODO
            //hacer llamada a api
            const response = await callFunctions({action: 'ask', msj: msj})
            console.log(response );
        });
    }

    if ( actionsSelector ) {
        actionsSelector.addEventListener('change', async (event)=> {
            const action = actionsSelector.value;
            
            if (action == 'none') {
                showHelpMessaje(['You need to select something.']);
            }

            
            const response = await callFunctions({action: action})
            console.log(response );
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

//param: object with params
function callFunctions(options) {
    let data = {action: options.action};

    if ( options.action == 'ask') {
        data.question = options.msj
    }

    return fetch( urlAPI + '/actions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        } })
        .then(response => response.json())
        .then((data) => data)
        .catch(err => console.log(err));
}

//save and load robot
function loadRobot() {
    let savedData = localStorage.getItem('myRobot');
    if (savedData) {
        myRobot = JSON.parse(savedData);
        isItaRobot = true;
    }
    
}
function saveRobot() {
    localStorage.setItem('myRobot', JSON.stringify(myRobot));
}
function deleteRobot() {
    localStorage.removeItem('myRobot');
}

function robotLive() {
    baterydonwloading();
}

function baterydonwloading() {
    bateryIntervalID = setInterval(() => {
        
        myRobot.batery = myRobot.batery-1;

        if ( myRobot.batery < 21 ) {
            robotTalk(['I am tired.']);
        }

        if ( myRobot.batery < 10 ) {
            robotTalk(['I am tired.', 'Really tired!', 'Please charge me!']);
        }

    }, 60000);
}

function robotTalk(messages) {
    console.log(messages)

    let container = document.querySelector('#talk_wrapper');
    container.innerHTML = '';

    messages.forEach(msj => {
        if ( msj.trim() != '' ) {
            let el = document.createElement( 'p' );
            el.innerText = msj;
            container.append(el);
        }
    });

    container.parentElement.classList.add('on');


}