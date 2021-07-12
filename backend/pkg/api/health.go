package api

import (
	"encoding/json"
	"net/http"
)

// Health endpoint. Always resolves to status:ok if the server is running
func Health(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
