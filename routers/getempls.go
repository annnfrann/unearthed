package routers

import (
	"database/sql"
	"fmt"
)

// GetEmployees = fetch all rows for empParm
func GetEmployees(empParm string, db *sql.DB) (employeeList []EmployeeRow, err error) {
	var nextRow = EmployeeRow{}
	var positionID, teamID, locationID string
	rows, err := db.Query("select a.employeeid, a.employeename, a.positionid, a.supervisorid, a.locationid from flrap.employee a where a.employeeid like ?;", empParm)
	if err != nil {
		err = fmt.Errorf("Error in GetEmployees after Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.EmployeeID, &nextRow.EmployeeName, &positionID, &nextRow.SupervisorID, &locationID)
		if err != nil {
			err = fmt.Errorf("Error in GetEmployees after Scan: %s", err.Error())
			return nil, err
		}

		// Get given employee's position
		posNameRow := db.QueryRow("select a.positionname from flrap.position a where a.positionid = ?;", positionID)
		err = posNameRow.Scan(&nextRow.PositionName)
		if err == sql.ErrNoRows {
			nextRow.PositionName = "Unknown"
		} else {
			if err != nil {
				err = fmt.Errorf("Error in GetEmployees after position name QueryRow and Scan: %s", err.Error())
			}
		}

		// Get given employee's team name
		teamNameRow := db.QueryRow("select a.teamname from flrap.team a, flrap.employeeteam b where a.teamid = ? and a.employeeid = b.employeeid and b.employeeid = ?;", teamID, nextRow.EmployeeID)
		err = teamNameRow.Scan(&nextRow.TeamName)
		if err == sql.ErrNoRows {
			nextRow.TeamName = "Unknown"
		} else {
			if err != nil {
				err = fmt.Errorf("Error in GetEmployees after team name QueryRow and Scan: %s", err.Error())
			}
		}

		// Get given employee's location name
		locNameRow := db.QueryRow("select a.locationname from flrap.location a where a.locationid = ?;", locationID)
		err = locNameRow.Scan(&nextRow.LocationName)
		if err == sql.ErrNoRows {
			nextRow.LocationName = "Unknown"
		} else {
			if err != nil {
				err = fmt.Errorf("Error in GetEmployees after location name QueryRow and Scan: %s", err.Error())
			}
		}

		// Get all tasks, risks, and mitigations for a given EmployeeID
		nextRow.Tasks, err = GetEmployeeTasks(nextRow.EmployeeID, db)
		if err != nil {
			err = fmt.Errorf("Error from GetTasks: %s", err.Error())
			return nil, err
		}

		// add this employee record to the list of employees
		employeeList = append(employeeList, nextRow)
	}
	return
}
