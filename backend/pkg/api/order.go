package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/patrickmn/go-cache"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/uuid"
	"k8s.io/klog/v2"
)

type Order struct {
	Url     string    `json:"url"`
	Uuid    types.UID `json:"uuid"`
	Created time.Time `json:"created"`
	Status  []string  `json:"status"`
}

// In-memory cache. Each entry lasts 24 hours and cache is checked for obsolete entries every 30 mins
var globalStore = cache.New(24*time.Hour, 30*time.Minute)

// Enter order into cache
func Set(order *Order) {
	globalStore.Set(string(order.Uuid), order, 0)
}

// Recall order from cache
func Get(key string) (*Order, error) {
	val, found := globalStore.Get(key)
	if !found {
		return nil, errors.New("Order not found")
	}

	return val.(*Order), nil
}

// HTTP endpoint for order handling
func OrderEndpoint(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	// Submitting a new order
	case http.MethodPost:
		// Initialize Order object with arbitrary values
		order := Order{
			Uuid:    uuid.NewUUID(),
			Created: time.Now(),
			Status:  []string{"Order received"},
		}
		// Update order from request body
		// FIXME: Unsafe, can overwrite initialization above
		err := json.NewDecoder(r.Body).Decode(&order)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		klog.Infof("Storing order %s", order.Uuid)

		// Enter into cache and start async processing
		Set(&order)
		go processOrder(&order)

		w.Header().Set("Location", fmt.Sprintf("/order/%s", order.Uuid))
		w.WriteHeader(http.StatusCreated)

	// Retrieve existing order status
	case http.MethodGet:
		// Get request should contain UUID param
		uuid, ok := r.URL.Query()["uuid"]
		if !ok || len(uuid[0]) < 1 || uuid[0] == "" {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		// Recall from cache
		klog.Infof("Fetching order %s", uuid[0])
		order, err := Get(uuid[0])
		if err != nil {
			klog.Errorf("Order get failed: %s", err)
			w.WriteHeader(http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		// Serialize and return
		data, err := json.Marshal(order)
		if err != nil {
			klog.Errorf("Order get failed: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Write(data)

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

// Order processing wrapper
func processOrder(order *Order) {
	go triggerJupyterBookPipeline(order)
	go triggerImageBuildPipeline(order)
}

// Solve image build problem here
func triggerImageBuildPipeline(order *Order) {
	order.Status = append(order.Status, "Image build started")
}

// Solve jupyter book build problem here
func triggerJupyterBookPipeline(order *Order) {
	order.Status = append(order.Status, "JupyterBook build started")
}
