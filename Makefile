.PHONY: build run clean

build:
	docker build -t websocket-server .

run:
	docker run -p 3000:3000 websocket-server

clean:
	docker rmi websocket-server

test:
	@echo "Enviando mensaje de prueba al servidor..."
	@curl -X POST -H "Content-Type: application/json" -d '{"message":"Hola, WebSocket!"}' http://localhost:3000/send

.DEFAULT_GOAL := build