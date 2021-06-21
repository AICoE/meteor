package store

import (
	"time"

	"github.com/patrickmn/go-cache"
)

var globalStore = cache.New(24*time.Hour, 30*time.Minute)

func Set(key, value string) {
	globalStore.Set(key, value, 0)
}

func Get(key string) string {
	val, found := globalStore.Get(key)
	if !found {
		return ""
	}

	str, ok := val.(string)
	if !ok {
		return ""
	}

	return str
}
