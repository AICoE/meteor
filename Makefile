build-frontend:
	cd frontend && npm run build

run: build-frontend
	cd backend && go run ./main.go
