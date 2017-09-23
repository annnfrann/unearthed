package routers

import (
	"database/sql"
	"fmt"
)

// GetMitigations = fetch all rows for risk ID
func GetMitigations(riskID string, db *sql.DB) (mitigationList []MitigationRow, err error) {
	var nextRow = MitigationRow{}
	rows, err := db.Query("select a.mitigationid, b.mitigationname, b.mitigationdesc from flrap.riskmitigation a, flrap.mitigation b where a.mitigationid = b.mitigationid and a.riskid = ?;", riskID)
	if err != nil {
		err = fmt.Errorf("Error after GetMitigations Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.MitigationID, &nextRow.MitigationName, &nextRow.MitigationDesc)
		if err != nil {
			err = fmt.Errorf("Error after GetMitigations Scan: %s", err.Error())
			return nil, err
		}

		// add this mitigation record to the list of mitigations
		mitigationList = append(mitigationList, nextRow)
	}
	return
}
