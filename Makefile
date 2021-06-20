build-frontend:
	cd frontend && npm run build

run: build-frontend
	cd backend && go run ./main.go

dev-frontend:
	cd frontend && npm start

dev-backend:
	cd backend && air
