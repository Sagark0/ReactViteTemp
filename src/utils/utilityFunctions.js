import axios from 'axios';
import {EncryptStorage} from 'encrypt-storage'


const apiURL='http://localhost:5000';
export async function apiCall(data,api,method){
  const config={
    method: method,
    url: apiURL+api,
    data: data
  }
  return axios(config)
    .then((res)=> res)
    .catch((err)=> err);
}

export const encryptedStorage = new EncryptStorage('9xV%rt?p%ns', { storageType: 'localStorage' });

