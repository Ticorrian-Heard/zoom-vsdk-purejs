import * as UIToolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

let joinSession = async () => {
     let token = '';
     let name = 'Ticorrian';
     let sessionId = 'test';
     let password = 'test123';
     
     let url = "https://zoom-comparison-middleware.herokuapp.com/zoomtoken?name=" + name + "&topic=" + sessionId + "&password=" + password;
     let settings = {
         mode: "cors",
         method: 'POST',
         headers: {
           "Content-Type": "text/plain"
         }
       };
     
     await fetch(url,settings).then( async res => {
         await res.text().then(data => {
             token = data.toString().trim();
         });
     });
     
     console.log(token);
     
     let obj = {
         authEndpoint: "https://zoom-comparison-middleware.herokuapp.com/zoomtoken",
         sessionName: sessionId,
         videoSDKJWT: token,
         role: 1,
         userIdentity: "",
         sessionKey: "",
         geoRegions: "",
         cloudRecordingOption: "",
         cloudRecordingElection: "",
         userName: name,
         sessionPasscode: password,
         features:  [ "video", "audio", "share", "chat", "settings", "users" ], 
       };
     
     let UIToolkitConfig = JSON.stringify(obj);
     let UIKit = document.createElement('app-uitoolkit');
     UIKit.setAttribute("uitoolkitconfig", UIToolkitConfig);
     document.getElementById('UIToolkit')?.append(UIKit);
}

window.onload = () => {
   let session = document.getElementById('session');
   session.addEventListener('click', () => {
       document.getElementById('UIToolkit').style.display = 'block';
       joinSession();
   });
   
   let previewBtn = document.getElementById('preview');
   previewBtn.addEventListener('click', () => {
    let preview = document.getElementById('previewKit');
    if (preview.style.display === 'none') preview.style.display = 'block';
    else preview.style.display = 'none';
   });
}
