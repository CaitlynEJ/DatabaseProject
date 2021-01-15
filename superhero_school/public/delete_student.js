function deleteStudent(id){
    $.ajax({
        url: '/students/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}

function deleteMissionStudent(mid, sid) {
    $.ajax({
        url: '/students_missions/mid/' + mid + '/sid/' + sid,
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