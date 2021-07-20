import data from "./data.json";
import { plainToClass } from "class-transformer";
import { Role, User } from "./User";
import { ICrud } from "./interface";
import { ClassConstants as CC } from "./classConstants";

function DateTimeDecorator(target: Object, propertyKey: string) {}
export class UserCrud implements ICrud<User> {
  users: User[];
  hostEle: HTMLDivElement;
  tableBody?: HTMLDivElement;
  date: string = "";

  // cellItem:
  constructor(hostId: string) {
    this.users = [];
    this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
    this.users[0];
  }

  loadDataFronJson() {
    for (const user of data) {
      const newUser = plainToClass(User, user)!;
      this.users.push(newUser);
    }
  }

  load() {
    this.loadDataFronJson();
    this.renderTable();
  }

  renderTable() {
    this.hostEle.innerHTML = "";
    const tableEle = document.createElement("table");
    tableEle.className = "styled-table";
    const thead = document.createElement("thead");
    tableEle.appendChild(thead);
    const headtr = document.createElement("tr");
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
    this.tableBody = document.createElement("tbody");
    tableEle.appendChild(this.tableBody);
    this.users.forEach((value, index) => {
      this.addRow(value);
    });
  }
  addRow(user: User) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.firstName}</td>
                        <td>${user.middleName} </td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address}</td>
                        <td>${user.role}</td>`;
    const actionTd = document.createElement("td");
    row.appendChild(actionTd);
    const editbutton = this.createNewButton("Edit", CC.editbutton, () => {
      this.edit(user);
    });
    const deletebutton = this.createNewButton("Delete", CC.deletebutton, () => {
      this.delete(user);
    });
    const cancelbutton = this.createNewButton("Cancel", CC.cancelbutton, () => {
      this.cancel(user);
    });
    cancelbutton.style.display = "none";
    const savebutton = this.createNewButton("Save", CC.savebutton, () => {
      this.save(user);
    });
    savebutton.style.display = "none";
    actionTd.appendChild(editbutton);
    actionTd.appendChild(deletebutton);
    actionTd.appendChild(savebutton);
    actionTd.appendChild(cancelbutton);

    this.tableBody!.appendChild(row);
  }
  createNewButton(
    text: string,
    className: CC,
    onClickHandler: EventListenerOrEventListenerObject
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", onClickHandler);
    return button;
  }
  editRow(i: number) {
    const row = this.tableBody!.children[i] as HTMLTableRowElement;
    const buttonTd = row.lastChild as HTMLTableDataCellElement;
    (
      buttonTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      buttonTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "";
    const user = this.users[i];
    row.children[0].innerHTML = `<input value=${user.firstName}>`;
    row.children[1].innerHTML = `<input value=${user.middleName}>`;
    row.children[2].innerHTML = `<input value=${user.lastName}>`;
    row.children[3].innerHTML = `<input value=${user.email}>`;
    row.children[4].innerHTML = `<input value=${user.phone}>`;
    const select = document.createElement("select");
    select.className = "selectrole";
    for (const e in Role) {
      const option = document.createElement("option");
      option.value = e;
      option.textContent = e;
      if (user.role === e) option.selected = true;
      else option.selected = false;
      select.appendChild(option);
    }
    row.children[5].innerHTML = `<input value=${user.address}>`;
    row.children[6].firstChild!.replaceWith(select);
  }
  create(user: User) {
    this.users.push(user);
  }
  edit(user: User) {
    this.editRow(this.users.indexOf(user));
  }
  delete(user: User) {
    const userIndex = this.users.indexOf(user);
    this.tableBody!.children[userIndex].remove();
    this.users.splice(userIndex, 1);
  }
  save(user: User) {
    const row = this.tableBody!.children[
      this.users.indexOf(user)
    ] as HTMLTableRowElement;
    const buttonTd = row.lastChild as HTMLTableDataCellElement;

    (
      buttonTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      buttonTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "";

    user.firstName = (row.children[0].children[0] as HTMLInputElement).value;
    user.middleName = (row.children[1].children[0] as HTMLInputElement).value;
    user.lastName = (row.children[2].children[0] as HTMLInputElement).value;
    user.email = (row.children[3].children[0] as HTMLInputElement).value;
    user.phone = (row.children[4].children[0] as HTMLInputElement).value;
    user.address = (row.children[5].children[0] as HTMLInputElement).value;
    user.role = (row.children[6].children[0] as HTMLInputElement).value as Role;

    row.children[0].innerHTML = `${user.firstName}`;
    row.children[1].innerHTML = `${user.middleName}`;
    row.children[2].innerHTML = `${user.lastName}`;
    row.children[3].innerHTML = `${user.email}`;
    row.children[4].innerHTML = `${user.phone}`;
    row.children[5].innerHTML = `${user.address}`;
    row.children[6].innerHTML = `${user.role}`;
  }
  cancel(user: User) {
    const row = this.tableBody!.children[
      this.users.indexOf(user)
    ] as HTMLTableRowElement;
    const actionTd = row.lastElementChild!;
    (
      actionTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      actionTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      actionTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      actionTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "";

    row.children[0].innerHTML = `${user.firstName}`;
    row.children[1].innerHTML = `${user.middleName}`;
    row.children[2].innerHTML = `${user.lastName}`;
    row.children[3].innerHTML = `${user.email}`;
    row.children[4].innerHTML = `${user.phone}`;
    row.children[5].innerHTML = `${user.address}`;
    row.children[6].innerHTML = `${user.role}`;
  }

  refresh() {
    this.users.length=0;
    
    this.load();
  }
}
