/* student list page */
-- get all students and their names 
SELECT studentID, firstName, lastName AS name FROM Students ORDER BY firstName, lastName ASC;

-- delete a student
DELETE FROM Students WHERE studentID = :studentID_selected_from_student_list;

-- get all superpower IDs, names and levels to populate the Superpower dropdown
SELECT superpowerID, CONCAT(name,' LEVEL ',level) AS superpower FROM Superpowers ORDER BY name, level ASC;

-- get all  mentor IDs, names to populate the Mentor dropdown
SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC;

-- add a new student
INSERT INTO Students (firstName, lastName, alias, email, GPA, superpower, mentor) 
VALUES (:firstNameInput, :lastNameInput, :aliasInput, :emailInput, :GPAInput, :superpowerID_from_Superpower_dropdown_Input, :mentorID_from_Mentor_dropdown_Input);


/* student personal info page */
-- get a single student's data for the Update Student form
SELECT studentID, firstName, lastName, alias, email, GPA, superpower, mentor FROM Students WHERE studentID = :studentID_selected_from_student_personal_info_page;

-- get all superpower IDs, names and levels to populate the Superpower dropdown
SELECT superpowerID, CONCAT(name,' LEVEL ',level) AS superpower FROM Superpowers ORDER BY name, level ASC;

-- get all  mentor IDs, names to populate the Mentor dropdown
SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC;

-- update a student's data based on submission of the Update Student form
UPDATE Students SET firstName = :firstNameInput, lastName= :lastNameInput, alias = :aliasInput, email = :emailInput, GPA = :GPAInput, superpower = :superpowerID_from_dropdown_Input, mentor = :employeeID_from_dropdown_Input 
WHERE studentID = :studentID_from_the_update_form;

-- get a single student's participated missions
SELECT s.studentID, m.missionID, m.name FROM Students s
INNER JOIN Students_Missions sm on s.studentID = sm.studentID
INNER JOIN Missions m on m.missionID = sm.missionID
WHERE s.studentID = :studentID_selected_from_student_personal_info_page
ORDER BY m.name ASC;


/* mission list page */
-- get all missions 
SELECT missionID, name FROM Missions ORDER BY name ASC;

-- get all leader IDs and names to populate the Leader dropdown
SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC;

-- add a new mission
INSERT INTO Missions (name, leader) 
VALUES (:nameInput, :employeeID_from_Leader_dropdown_Input);

-- get all mission IDs, names to populate the Mission dropdown
SELECT missionID, name FROM Missions ORDER BY missionID ASC;

-- get all student IDs, names to populate the Student dropdown
SELECT studentID, firstName, lastName AS name FROM Students ORDER BY firstName, lastName ASC;

-- associate a student with a mission (M-to-M relationship addition)
INSERT INTO Students_Missions (missionID, studentID) VALUES (:missionID_from_Mission_dropdown_Input, :studentID_from_Student_dropdown_Input);

-- get a single mission's students list
SELECT m.missionID, s.studentID, s.firstName, s.lastName FROM Missions m
INNER JOIN Students_Missions sm on m.missionID = sm.missionID
INNER JOIN Students s on s.studentID = sm.studentID
WHERE m.missionID = :missionID_selected_from_Mission_dropdown_Input
ORDER BY s.firstName, s.lastName ASC;


/* individual mission page */
-- get a single mission's data
SELECT m.missionID, m.name, e.firstName AS leaderFName, e.lastName AS leaderLName FROM Missions m 
INNER JOIN Employees e on m.leader = e.employeeID
WHERE m.missionID = :missionID_selected_from_individual_mission_page;

-- get a mission's students list
SELECT m.missionID, s.studentID, s.firstName, s.lastName FROM Missions m
INNER JOIN Students_Missions sm on m.missionID = sm.missionID
INNER JOIN Students s on s.studentID = sm.studentID
WHERE m.missionID = :missionID_selected_from_Mission_dropdown_Input
ORDER BY s.firstName, s.lastName ASC;

-- dis-associate a student from a mission (M-to-M relationship deletion)
DELETE FROM Students_Missions 
WHERE missionID = :missionID_selected_from_mission_students_list AND studentID = :studentID_selected_from_mission_students_list;


/*employee list page*/
--get all employees and their names
SELECT firstName, lastName FROM Employees ORDER BY firstName, lastName ASC;

--delete an employee
DELETE FROM Employees WHERE employeeID = :employeeID_selected_from_employee_list;

-- get all superpowerIDs, name and levels to populate the Superpower dropdown
SELECT superpowerID, CONCAT(name, ' LEVEL ', level) AS superpower FROM Superpowers ORDER BY name, level ASC;

-- add a new employee
INSERT INTO Employees (firstName, LastName, alias, email, position, area, superpower, home)
VALUES (:firstNameInput, :lastNameInput, :aliasInput, :emailInput, :positionInput, :areaInput, superpowerID_from_Superpower_dropdown_Input, :homeInput);


/* Employee personal info page */
-- get a single employees data for Update Employee form
SELECT * FROM Employees WHERE employeeID = :employeeID_selected_from_employee_personal_info_page;

-- get all superpowerIDs, name and levels to populate the Superpower dropdown
SELECT superpowerID, CONCAT(name,' LEVEL ',level) AS superpower FROM Superpowers ORDER BY ORDER BY name, level ASC;

-- update an employee's data based on the submission of the Update Employee form
UPDATE Employees SET firstName = :firstNameInput, lastName = :lastNameInput, alias = :aliasInput, email = :emailInput, position = :positionInput, area = :areaInput, superpower = :superpowerID_from_dropdown_Input
WHERE employeeID = :employeeID_from_the_update_form;

-- get a single Employee's participated teams
SELECT e.employeeID, t.teamID, t.name FROM Employees e
INNER JOIN Employees_Teams et on e.employeeID = et.employeeID
INNER JOIN Teams t on t.teamID = et.teamID
WHERE e.employeeID = :employeeID_selected_from_employee_personal_info_page
ORDER BY t.name ASC;


/* Teams list page */
-- get all team names
SELECT name FROM Teams ORDER BY name ASC;

-- add a new team
INSERT INTO Teams (name, headquartersLocation, email) 
VALUES (:nameInput, :headquartersLocationInput, :emailInput);

-- get all team IDS, names to populate the Team dropdown
SELECT teamID, name FROM Teams ORDER BY name ASC;

-- get all employee IDs, names to populate Team dropdown
SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC;

-- associate an employee with a team (M-to-M relationship addition)
INSERT INTO Employees_Teams (teamID, employeeID) VALUES (:teamID_from_Team_dropdown_Input, :employeeID_from_Employee_dropdown_Input);

-- get a single team's employee list
SELECT t.teamID, e.employeeID, e.firstName, e.lastName FROM Teams t
INNER JOIN Employees_Teams et on t.teamID = et.teamID
INNER JOIN Employees e on e.employeeID = et.employeeID
WHERE t.teamID = :teamID_selected_from_Team_dropdown_Input
ORDER BY e.firstName, e.lastName ASC;



/* individual team page */
-- get a single team's data
SELECT name, headquartersLocation, email FROM Teams
WHERE teamID = :teamID_selected_from_individual_teams_page;

-- get a teams employee list
SELECT t.teamID, e.employeeID, e.firstName, e.lastName FROM Teams t
INNER JOIN Employees_Teams et on t.teamID = et.teamID
INNER JOIN Employees e on e.employeeID = et.employeeID
WHERE t.teamID = :teamID_selected_from_Team_dropdown_Input
ORDER BY e.firstName, e.lastName ASC;

-- disassociate an employee from a team (M-to-M relationship deletion)
DELETE FROM Employees_Teams
WHERE teamID = :teamID_selected_from_team_employees_list AND employeeID = :employeeID_selected_from_team_employees_list;


/* Superpowers List page */
-- get all superpowers and their levels
SELECT CONCAT(name,' ', level) AS superpower FROM Superpowers ORDER BY name, level ASC;

-- add a superpower
INSERT INTO Superpowers (name, level) VALUES (:nameInput, :levelInput);