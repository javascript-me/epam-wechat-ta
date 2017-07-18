import 'whatwg-fetch';
import config from './config';

export async function getRoles() {
  return await (await fetch(`${config.baseUri}team/role`)).json();
}

export async function getLocations() {
  return await (await fetch(`${config.baseUri}location`)).json();
}

export async function getJobDetail(jobId) {
  return await (await fetch(`${config.baseUri}jobs/detail?jobId=${jobId}`)).json();
}

export async function getJobs(pageNumber, teamRoleIds = 'AlL', locationIds = 'ALL', search) {
  let url = `${config.baseUri}jobs?pageNumber=${pageNumber}&pageSize=10&teamRoleIds=${teamRoleIds}&locationId=${locationIds}&sortBy=urgent&isAscending=false`;
  if (search) {
    url += `&search=${search}`;
  }
  let data = await (await fetch(url)).json();
  return data;
}


export async function submitJob(query, data) {

  if (!data) {
    data  = new FormData();
  }
  const url = `${config.baseUri}job/apply?fileCategory=image&${query}`;

  return await (await fetch(url, {method: 'POST', body: data})).json();

}
