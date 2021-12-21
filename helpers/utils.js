function splitRoleId(names) {
    const nameArray = names.split(" ")
    const roleId = nameArray[0]
    console.log(roleId)
    return roleId
}

const selectStr = `SELECT * FROM ??`

module.exports = { splitRoleId, selectStr }



    // function splitFirstName(names) {
    //     const nameArray = names.split(" ")
    //     const firstName = nameArray[1]
    //     console.log(firstName)
    //     return firstName
    // }
    // function splitLastName(names) {
    //     const nameArray = names.split(" ")
    //     const lastName = nameArray[2]
    //     console.log(lastName)
    //     return lastName
    // }
