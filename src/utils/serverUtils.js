import { Deque } from "./deque";

export const newServerPlacement = (vacancy) => {
    const { start, end } = vacancy;
    return Math.floor(start + (end - start) / 2);
}

export const vacancyDivide = (vacancy, serverPosition) => {
    const vac = vacancy;
    const start = vac.getFront()["start"];
    const end = vac.getFront()["end"];
    if (start < end) {
        vac.addRear({ start: serverPosition + 1, end: end });
        vac.addRear({ start: start, end: serverPosition - 1 });
    }
    vac.removeFront();
    return vac;
}

export const vacancyDivideRemoval = (vacancy, serverPosition, n) => {
    let vac = new Deque();
    let newVac = {};
    while (!vacancy.isEmpty()) {
        if (vacancy.getFront()["start"] == serverPosition + 1)
            newVac["end"] = vacancy.getFront()["end"]
        else if ((vacancy.getFront()["end"] == serverPosition - 1) || (serverPosition === 0) && vacancy.getFront()["end"] === n - 1)
            newVac["start"] = vacancy.getFront()["start"]
        else
            vac.addFront(vacancy.getFront())
        vacancy.removeFront();
    } vac.addFront(newVac);
    return vac;
}