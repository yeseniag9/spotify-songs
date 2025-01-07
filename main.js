// Declarations for our song values
let song;
let playSong;

// Spotify Client Creds (qualifications we have to access things; asking for a token from spotify so that we don't have to hand this line and the next every time we ask for something)
const clientId = "068d6d507c984a359e2b663ab1264564"
const clientSecret = "764c2738f3bc49668b325afd8ea45c65"

// The above two lines allow for our api's calls to tell spotify that it has authentication credits and it wants to prove to spotify that it's allowed to get the information 

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, { // requesting information through fetch; specific url for getting a token back for your account
        // This is where we're able to give more information to this url above 
        method: 'Post', // writing a JavaScript object that you would pass to a backend API along with fetched url as part of the same package of data; making a post request to /api/token endpoint
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 'application/x-www-form-urlencoded is what type of data we're sending
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials' // This is the actual thing we're sending
    });

    // Access the data given to us by the fetch response (Promise)
    const data = await result.json(); // Chaining the awaits together
    return data.access_token // Doesn't know that access_token is an attribute of data until it comes back
} // All asynchronous

// Function to get song info when the image is clicked
/** (Multiline comment)
 * @param img_index
 * @param item_index (going to give these things data because we're able to describe things)
 * 
 */

// * Function gets a song from spotify using the image index of our gallery. Then
//  * it finds the correct item_index inside of the JSON response data from Spotify
// * which will produce a preview URL that will be used to play our selected song.
// * 
// */ 
async function clickedEvent(img_index, item_index) { // Example of how other function declarations would use async
    // Get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[2].value // attributes are going to be src="", alt="" 

    // Get token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, { // Data prototype
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request);

    let response = await result.json();

    console.log(response);
    let song = response.tracks.items[item_index].preview_url

    // TODO : Add songSnippet function to play the selected song
    // TODO: Check if other song is playing and if so stop it
    // TODO : Create a function to stop music 

    // Check if song is playing and stop it
    if (playSong) {
        stopSnippet();
    }
    songSnippet(song)
}

/**
 * @param id
 * @param event
 * 
 * id = image if for gallery image
 * event = Mouse event given by the action from our user 
 * 
 * Function produces songs from the clickedEvent based on index of image.
 */

function getSong(id, event) {
    switch(id){
        case 'fig1': { 
            event.stopPropagation();
            clickedEvent(0,0)
            break;
        }
        case 'fig2': { 
            event.stopPropagation();
            clickedEvent(1,0)
            break;
        }
        case 'fig3': { 
            event.stopPropagation();
            clickedEvent(2,0)
            break;
        }
        case 'fig4': { 
            event.stopPropagation();
            clickedEvent(3,0)
            break;
        }
        case 'fig5': { 
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }
        case 'fig6': { 
            event.stopPropagation();
            clickedEvent(5,0)
            break;
        }
    }
}

/**
 * @param url
 * 
 * url = Song Preview_url
 *  
 * Function will return an audio clip given by the preview url
 */

function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * NO PARAMS
 *
 * Function returns event to stop song snippet
 */

function stopSnippet(){
    return playSong.pause();
}