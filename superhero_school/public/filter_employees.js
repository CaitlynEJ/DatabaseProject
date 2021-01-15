function filterEmployeesByTeam() {
    //get the id of the selected team from the filter dropdown
    var teamID = document.getElementById('team-list').value;
    //construct the URL and redirect to it
    window.location = '/teams/filter/' + parseInt(teamID);
}