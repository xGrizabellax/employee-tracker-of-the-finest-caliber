function splitRoleId(names) {
    const nameArray = names.split(" ")
    const roleIdArray = nameArray[0].split('')
    const roleId = roleIdArray[0]
    console.log(roleId)
    return roleId
}
function splitDepId(names) {
    const nameArray = names.split(" ")
    const depIdArray = nameArray[0].split('')
    const depId = depIdArray[0]
    console.log(depId)
    return depId
}

const selectStr = `SELECT * FROM ??`

module.exports = { splitRoleId, splitDepId, selectStr }



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
