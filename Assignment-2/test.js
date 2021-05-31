// First name, Middle name, Last name, email, phone number, role, address.
class User {

    constructor(fname, mname, lname, email, phone, role, address) {
        this["First Name"] = fname;
        this["Middle Name"] = mname;
        this["Last Name"] = lname;
        this["Email"] = email;
        this["Phone"] = phone;
        this["Role"] = role;
        this["Address"] = address;
    }

    toJSON() {
        return {
            "First Name": this["First Name"],
            "Middle Name": this["Middle Name"],
            "Last Name": this["Last Name"],
            "Email": this["Email"],
            "Phone": this["Phone"],
            "Role": this["Role"],
            "Address": this["Address"]
        }
    }
}

let arr = [];
arr.push(new User("Rohit", "", "Vishwakarma", "rohit@gmail.com", "7000515270", "Full-Stack Trainee", "Jabalpur"));
arr.push(new User("Steve", "", "Jobs", "steve@gmail.com", "7000515271", "Apple CEO", "NewYork"));
arr.push(new User("Satya", "", "Nadella", "Satya@gmail.com", "7000515272", "Microsoft CEO", "UK"));
arr.push(new User("Jeff", "S", "Bezos", "Jeff@gmail.com", "7000515273", "Amazon CEO", "Australia"));
arr.push(new User("Sundar", "Ram", "Pitchai", "Sundar@gmail.com", "7000515274", "Google CEO", "Delhi"));


let jsondata = JSON.stringify(arr, 2);
console.log(jsondata);

const fs = require('fs');
fs.writeFile('./Assignment-2/data.json', jsondata, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})