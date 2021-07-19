import { TableView } from './tableView';
import { autoBind } from "./decorators/autobind";

function dateTimeDC(target: any, propertyKey: string) {
    const update = Reflect.defineProperty(
        target,
        propertyKey, {
        get: () => {

            return new Date().toLocaleString();
        },
        set: (value: string) => {

        }
    });
}
class HomePage {
    loadButton: HTMLButtonElement;
    refreshButton: HTMLButtonElement;
    tableView: TableView;
    @dateTimeDC
    date: string = "";

    constructor() {
        this.loadButton = document.getElementById("loadbutton")! as HTMLButtonElement;
        this.refreshButton = document.getElementById("refreshbutton")! as HTMLButtonElement;
        this.tableView = new TableView("tablecontainer")

        this.loadButton.addEventListener("click", this.loadData);
        this.refreshButton.addEventListener("click", this.refreshData);
        this.refreshButton.style.display = "none";
        // this.loadData();
    }

    updateDate() {
        const datetime = document.getElementById("datetime");
        datetime!.innerHTML = `Updated on - ${this.date.replace(",", " at ")}`;
    }

    @autoBind
    loadData(): void {
        this.tableView.load();
        this.refreshButton.style.display = "";
        this.loadButton.style.display = "none";
        this.updateDate();



    }
    @autoBind
    refreshData(): void {
        this.tableView!.refresh();
        this.updateDate();

    }
}
new HomePage();