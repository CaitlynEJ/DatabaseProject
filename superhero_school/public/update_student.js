function selectSuperpower(id) {
    $("#superpower-selector").val(id);
}

function selectMentor(id) {
    $("#mentor-selector").val(id);
}

function unableInputs() {
    var form = document.getElementById("update-student-form");
    var inputs = form.querySelectorAll("input");
    var selects = form.querySelectorAll("select");
    var len1 = inputs.length;
    var len2 = selects.length;
    
    for (let i = 0; i < len1; i++) {
        inputs[i].disabled = true;
    }

    for (let i = 0; i < len2; i++) {
        selects[i].disabled = true;
    }
}

function enableInputs() {
    var form = document.getElementById("update-student-form");
    var inputs = form.querySelectorAll("input");
    var selects = form.querySelectorAll("select");
    var len1 = inputs.length;
    var len2 = selects.length;
    
    for (let i = 0; i < len1; i++) {
        inputs[i].disabled = false;
    }

    for (let i = 0; i < len2; i++) {
        selects[i].disabled = false;
    }
}

function updateStudent(event, id) {
    var button =  document.getElementById('update-student');

    if (button.textContent == "Update") {
        console.log(button.textContent);
        enableInputs();
        button.textContent = "Save";
        button.style.backgroundColor = "lightblue";
        button.style.color = "black";
        event.preventDefault();

    } else if (button.textContent == "Save") {
        var fnameInput = document.getElementById("fname").value;
        var emailInput = document.getElementById("email").value;
        var gpaInput = document.getElementById("gpa").value;

        if (fnameInput == "") {
          alert("First name must be filled out");
          return false;
        }

        if (emailInput == "") {
            alert("Email must be filled out");
            return false;
        }

        if (gpaInput == "") {
            alert("GPA must be filled out");
            return false;
        }

        $.ajax({
            url: '/students/' + id,
            type: 'PUT',
            data: $('#update-student-form').serialize(),
            success: function(result){
                window.location.reload(true);
            }
        })
    }
}