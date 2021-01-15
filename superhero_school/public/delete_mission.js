function deleteMission(id) {
    $.ajax({
        url: '/missions/' + id,
        type: 'DELETE',
        success: function(result){
            // window.location.reload(true);
            window.location.replace("/missions");
        }
    })
}