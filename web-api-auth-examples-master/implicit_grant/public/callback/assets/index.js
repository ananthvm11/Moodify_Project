var stateKey = 'spotify_auth_state';  
var spotifyUrl = "https://api.spotify.com/v1/me" 

/**
* Obtains parameters from the hash of the URL
* @return Object
*/

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

var params = getHashParams();

var access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);
  
  
  if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
  } else {
        localStorage.removeItem(stateKey);
        if (access_token) {
            fetch(spotifyUrl, {
                method: 'GET',
                // mode: 'no-cors',
                // redirect: 'follow',
                headers:{
                'Authorization': 'Bearer ' + access_token
                },
            })
            .then(response => response.json())
            .then(jsonData => {
                const image = jsonData.images[0].url
                const name = jsonData.display_name;
                console.log(name)
                console.log(image)
                const imageHtml = document.getElementById("imageSection")
                imageHtml.innerHTML = 
                `<div class="avatar">
                    <div class="rounded-full w-10 h-10 m-1">
                    <img src=${image}>
                    </div>
                </div>`
                })
        }
    }
  
