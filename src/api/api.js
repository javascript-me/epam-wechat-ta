 import config from './config';

 export async function getRoles() {
      return await (await fetch(`${config.baseUri}team/role`)).json();
  }
