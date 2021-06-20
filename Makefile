build-frontend:
	cd frontend && npm run build

run: build-frontend
	cd backend && go run ./main.go

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && air

@PHONY: clean
clean:
	rm -rf frontend/dist frontend/.parcel-cache
	rm -rf backend/.air-cache
