export class User {
    user = []
    constructor(){
        console.log("User Class created")
    }

    add(newUser){
        this.user.push(newUser)
        console.log("New user added")

    }

}