export function clearUnnecessarySession() {
    window.sessionStorage.removeItem('roomSettings')
    window.sessionStorage.removeItem('userStatus')
    window.sessionStorage.removeItem('roomID')
    window.sessionStorage.removeItem('peopleCounting')
    window.sessionStorage.removeItem('roomInfo')
    window.sessionStorage.removeItem("prepared");
}