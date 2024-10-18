import { upperBound } from "./algorithms";

export const loadManager = (data, vacancy, index, shards) => {
    let next = (vacancy["end"] + 1) % shards;
    data[next].maxLoad = vacancy["end"] - index;
    data[index].maxLoad = index - vacancy["start"];
    let requests = data[next].requests;
    let thisReq = []
    let nextReq = []
    for (let i = 0; i < requests.length; i++) {
        if (requests[i] < index) {
            data[requests[i]].servedBy = index;
            thisReq.push(requests[i])
        }
        else nextReq.push(requests[i])
    }
    data[index].requests = thisReq;
    data[index].currentLoad = thisReq.length;
    data[next].requests = nextReq;
    data[next].currentLoad = nextReq.length;
    return data;
}

export const currLoadManager = (data, index, servers) => {
    let serverId = upperBound(index, servers);
    data[index].servedBy = serverId.toString();
    data[serverId].currentLoad = data[serverId].currentLoad + 1;
    data[serverId].requests.push(index);
    return data;
}