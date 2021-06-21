package api

import (
	"fmt"
	"net/http"

	"k8s.io/apimachinery/pkg/util/uuid"
)

func Order(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	order := uuid.NewUUID() // TODO: Store in DB or something

	w.Header().Set("Location", fmt.Sprintf("/order/%s", order))
	w.WriteHeader(http.StatusCreated)
}
