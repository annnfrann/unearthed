package routers

import (
	"database/sql"
	"fmt"
)

// GetRisks = fetch all rows for task ID
func GetRisks(taskID string, db *sql.DB) (riskList []RiskRow, err error) {
	var nextRow = RiskRow{}
	rows, err := db.Query("select a.riskid, b.riskname, b.riskdesc from flrap.taskrisk a, flrap.risk b where a.riskid = b.riskid and a.taskid = ?;", taskID)
	if err != nil {
		err = fmt.Errorf("Error after GetRisks Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.RiskID, &nextRow.RiskName, &nextRow.RiskDesc)
		if err != nil {
			err = fmt.Errorf("Error after GetRisks Scan: %s", err.Error())
			return nil, err
		}

		// Get all mitigations for a given risk
		nextRow.Mitigations, err = GetMitigations(nextRow.RiskID, db)
		if err != nil {
			err = fmt.Errorf("Error from GetMitigations: %s", err.Error())
			return nil, err
		}

		// add this risk record to the list of risks
		riskList = append(riskList, nextRow)
	}
	return
}
