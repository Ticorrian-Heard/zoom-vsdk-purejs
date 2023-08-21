// import '@zoom/videosdk-ui-toolkit';
// import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';


let utilityTestCode = () => {
    console.log("called from utility");
    document.getElementById('UIToolkit').style.display = 'none';
    document.getElementById('session').disabled = false;
}

let joinSession = async () => {
     let token = '';
     let name = 'Ticorrian';
     let sessionId = 'test1';
     let password = 'test123';
     
     let url = "https://zoom-auth-server-20be414301cf.herokuapp.com/zoomtoken?name=" + name + "&topic=" + sessionId + "&password=" + password;
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
         authEndpoint: "https://zoom-auth-server-20be414301cf.herokuapp.com/zoomtoken",
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
         features:  [ "video", "audio", "share", "chat", "settings", "users", "roles" ], 
       };

     console.log("config", obj)
     
     let UIKit = document.createElement('app-uitoolkit');
     document.getElementById('UIToolkit')?.append(UIKit);
     window.initUIToolKit(obj);
     window.UIkitSubscribe("uitoolkit-destroy", () => {
      utilityTestCode();
     });
     window.joinSession();
}

window.onload = () => {
   let session = document.getElementById('session');
   session.addEventListener('click', () => {
       let toolkit = document.getElementById('UIToolkit');
       if (toolkit.style.display === 'none') { 
          toolkit.style.display = 'block';
          session.disabled = true;
          joinSession();
        }
   });
   
   let previewBtn = document.getElementById('preview');
   previewBtn.addEventListener('click', () => {
    let preview = document.getElementById('previewKit');
    if (preview.style.display === 'none') preview.style.display = 'block';
    else preview.style.display = 'none';
   });
}
