import firebase from "../firebase";

const db = firebase.ref("/todos");

class DataService {
    getAll() {
        return db;
    }

    create(key, value) {
        return db.child(key).set(value);
    }

    pushList() {
        console.log("list push");
        var ID = function () {
            return Math.random().toString(36).substr(2, 10);
        };
        let listKey = ID();
        let createdList = {
            name: "username-todolist",
            items: this.todos,
            id: ID(),
            key: listKey
        };
        // Firebase magic! We're making a reference to the list using a unique ID, then creating the object itself
        firebase.database().ref('lists/' + listKey).set({
            name: createdList.name,
            items: createdList.items,
            id: createdList.id,
            key: createdList.key
        });
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new DataService();