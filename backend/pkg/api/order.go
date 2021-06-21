package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/operate-first/meteor/pkg/store"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/uuid"
	"k8s.io/klog/v2"
)

type Order struct {
	Url  string
	Uuid types.UID
}

func OrderEndpoint(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var order Order
		err := json.NewDecoder(r.Body).Decode(&order)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		order.Uuid = uuid.NewUUID()
		klog.Infof("Storing order %s", order.Uuid)
		store.Set(fmt.Sprintf("%s", order.Uuid), order.Url)

		w.Header().Set("Location", fmt.Sprintf("/order/%s", order.Uuid))
		w.WriteHeader(http.StatusCreated)

	case http.MethodGet:
		uuid, ok := r.URL.Query()["uuid"]
		if !ok || len(uuid[0]) < 1 {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		klog.Infof("Fetching order %s", uuid[0])
		url := store.Get(uuid[0])
		if url == "" {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"uuid": uuid[0], "url": url})

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
