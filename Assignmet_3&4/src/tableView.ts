
import { User } from "./User";
import { autoBind } from "./decorators/autobind";
import data from "./data.json";
import { plainToClass } from "class-transformer";
import { Role } from "./User";
import { ICrud } from "./ICrud";

function DateTimeDecorator(target: Object, propertyKey: string) {

}
export class TableView {
    users: ICrud[] = [];
    hostEle: HTMLDivElement;

    date: string = "";


    // cellItem:
    constructor(hostId: string) {

        this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
    }

    loadDataFronJson() {
        for (const user of data) {
            const newUser = plainToClass(User, user)!;
            this.users.push(newUser);
        }
    }

    load() {
        this.hostEle.innerHTML = "";
        this.loadDataFronJson();
        const tableEle = document.createElement('table');
        tableEle.className = "styled-table";
        const thead = document.createElement("thead");
        tableEle.appendChild(thead);
        const headtr = document.createElement('tr');
        thead.appendChild(headtr);
        headtr.innerHTML = `<th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Actions</th>`;
        this.hostEle.appendChild(tableEle);
        const tbody = document.createElement("tbody");
        tableEle.appendChild(tbody);
        this.users.forEach((value, index) => {
            value.create(tbody,
                (event) => { this.edit(event, value) },
                (event) => { this.delete(event, value) },
                (event) => { this.save(event, value) },
                (event) => { this.cancel(event, value) });
        });
    }
    edit(e: Event, user: ICrud) {
        user.edit();


    }
    delete(e: Event, user: ICrud) {
        user.delete();
        this.users.splice(this.users.indexOf(user), 1);


    }
    save(e: Event, user: ICrud) {
        user.save();
    }
    cancel(e: Event, user: ICrud) {
        user.cancel();
    }

    refresh() {
        this.users.forEach((value, index) => {
            value.delete();
        })
        this.users = [];
        this.load();
    }
}