//User Menu Actions
import {SERVER} from '../config';
import axios from 'axios';
import {loadAuthToken} from '../local-storage';
import {fetchProtectedData} from '../actions/protected-data';


//FIXME: this doesn't do anything anymore. Fix or get rid of
export const ADD_FOLDER= 'ADD_FOLDER';
// export const addNewFolder = folderName => ({
//     type: ADD_FOLDER,
//     folderName
// });

//takes new folder as argument and sends foldername as post request to server
//fetchProtected data gets the new information to render in components folder-buttonsLi.js and
//userMenu.js
export const addNewFolder = (foldername) => (dispatch) => {
    const authToken = loadAuthToken();
    return axios({
        method: 'post',
        url: `${SERVER}/api/newsflash/folders`,
        data:{foldername:foldername},
        headers:{
            "Authorization": `Bearer ${authToken}`
        }
      })
    .then(({data})=>{
    //    console.log(data);
       dispatch(fetchProtectedData());
    })
    .catch(error => console.log(error));
};

export const deleteFolder = (folderId) => (dispatch) => {
    const authToken = loadAuthToken();
    return axios({
        method: 'delete',
        url: `${SERVER}/api/newsflash/folders/${folderId}`,
        headers:{
            "Authorization": `Bearer ${authToken}`
        }
      })
    .then(({data})=>{
       console.log(data);
       dispatch(fetchProtectedData());
    })
    .catch(error => console.log(error));
};