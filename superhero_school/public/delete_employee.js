function deleteEmployee(id){
    $.ajax({
        url: '/employees/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}

function deleteTeamMember(tid, eid) {
    $.ajax({
        url: '/employees_teams/tid/' + tid + '/eid/' + eid,
        type: 'DELETE',
        success: function(result) {
            if(result.responseText != undefined) {
              alert(result.responseText);
            }
            else {
              window.location.reload(true);
            } 
        }
    })
}