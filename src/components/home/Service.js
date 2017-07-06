async function getJobsResult (pageNumber, teamRoleIds = 'AlL') {

    let url = `http://ec2-54-223-52-104.cn-north-1.compute.amazonaws.com.cn:8081/wechat/talent/acquisition/jobs?pageNumber=${pageNumber}&pageSize=10&teamRoleIds=${teamRoleIds}&locationId=ALL&sortBy=urgent&isAscending=false`;
    let data = await (await fetch(url)).json();
    return data
}

export default {
    getJobsResult: getJobsResult
}
