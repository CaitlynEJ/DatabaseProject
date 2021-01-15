function filterStudentsByMission() {
    //get the id of the selected mission from the filter dropdown
    var missionID = document.getElementById('mission-list').value;
    //construct the URL and redirect to it
    window.location = '/missions/filter/' + parseInt(missionID);
}