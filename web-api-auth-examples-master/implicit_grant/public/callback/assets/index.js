  var stateKey = 'spotify_auth_state';  
  var spotifyUrl = "https://api.spotify.com/v1/me" 
//   var data = {};
  let yourGlobalVariable = {};

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

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  // function generateRandomString(length) {
  //   var text = '';
  //   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  //   for (var i = 0; i < length; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // };

  // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
      // userProfileTemplate = Handlebars.compile(userProfileSource),
      // userProfilePlaceholder = document.getElementById('user-profile');


      // oauthSource = document.getElementById('oauth-template').innerHTML,
      // oauthTemplate = Handlebars.compile(oauthSource),
      // oauthPlaceholder = document.getElementById('oauth');

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
            const imageHtml = document.getElementById("imageSection")
            imageHtml.innerHTML = 
            `<div class="avatar">
                <div class="rounded-full w-10 h-10 m-1">
                <img src=${image}>
                </div>
            </div>`
        })
        .catch(error => console.log(error))
    }

    //   $.ajax({
    //       url: 'https://api.spotify.com/v1/me',
    //       headers: {
    //         'Authorization': 'Bearer ' + access_token
    //       },
    //       success: function testing(response)  {
    //         // userProfilePlaceholder.innerHTML = userProfileTemplate(response);
    //         data = response;
    //         console.log(data.images[0].url)
    //         // $('#login').hide();
    //         // $('#loggedin').show();
    //       }
    //   });
    } // else {
    //     $('#login').show();
    //     $('#loggedin').hide();
    // }

    // document.getElementById('login-button').addEventListener('click', function() {

    //   var client_id = 'd824b67943c445e6855abb962d46e0be'; // Your client id
    //   var redirect_uri = 'http://localhost:8888/callback/index.html'; // Your redirect uri
      
    //   var state = generateRandomString(16);

    //   localStorage.setItem(stateKey, state);
    //   var scope = 'user-read-private user-read-email';

    //   var url = 'https://accounts.spotify.com/authorize';
    //   url += '?response_type=token';
    //   url += '&client_id=' + encodeURIComponent(client_id);
    //   url += '&scope=' + encodeURIComponent(scope);
    //   url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    //   url += '&state=' + encodeURIComponent(state);
    //   window.location = url;
    // }, false);
// }

  
