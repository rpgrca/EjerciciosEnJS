#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>
#ifdef _WIN32
#include <winsock.h>
#define close closesocket
#else
#include <netinet/in.h>
#include <sys/time.h>
#include <sys/socket.h>
#include <sys/select.h>
#include <unistd.h>
#endif
#include <sys/types.h>
#include <errno.h>

#define SERVER_PORT 8124
#define HEIGHT 30
#define WIDTH 30

enum Movement {
	Top,
	TopRight,
	Right,
	BottomRight,
	Bottom,
	BottomLeft,
	Left,
	TopLeft
};

enum Mode {
	Hover,
	Draw,
	Eraser
};

static int _x = 15, _y = 15;
static char _map[30][30];
static char *_header = "╔══════════════════════════════╗\r\n";
static char *_footer = "╚══════════════════════════════╝\r\n\r\n";
static enum Movement _direction = Top;
static enum Mode _mode = Draw;

#define HEADER_SIZE ((32 * 3) + 2) /* every unicode char is 3 bytes */
#define FOOTER_SIZE ((32 * 3) + 4)

static bool try_send(int s, char *buffer, size_t length) {
	if (send(s, buffer, length, 0) == -1) {
		perror("send() failed");
		return false;
	}

	return true;
}

bool send_handshake(int s) {
	char *handshake_message = "hello\r\n";

	return try_send(s, handshake_message, strlen(handshake_message));
}

static bool build_coordinates(int s) {
	char buffer[16];
	snprintf(buffer, sizeof(buffer), "(%d,%d)\r\n", _x, _y);

	return try_send(s, buffer, strlen(buffer));
}

static bool renderize(int s) {
	char buffer[1400];
	int current = HEADER_SIZE;

	memset(buffer, 0, sizeof(buffer));
	memcpy(buffer, _header, HEADER_SIZE);
	for (int i = 0; i < HEIGHT; i++) {
		memcpy(&buffer[current], "║", 3);
		current += 3;
		memcpy(&buffer[current], _map[i], 30);
		current += 30;
		memcpy(&buffer[current], "║", 3);
		current += 3;
		memcpy(&buffer[current], "\r\n", 2);
		current += 2;
	}

	memcpy(&buffer[current], _footer, FOOTER_SIZE);
	current += FOOTER_SIZE;

	return try_send(s, buffer, current);
}

static void move_to(int new_x, int new_y) {
	switch (_mode) {
		case Draw: _map[_y][_x] = '*'; break;
		case Eraser: _map[_y][_x] = ' '; break;
		case Hover: /* nothing, just move */ break;
	}

	_x = new_x;
	_y = new_y;
}

void advance(int steps) {
	for (int i = 0; i < steps; i++) {
		switch (_direction) {
			case Top: if (_y > 0) move_to(_x, _y - 1); break;
			case TopRight: if (_y > 0 && _x < WIDTH - 1) move_to(_x + 1, _y - 1); break;
			case Right: if (_x < WIDTH - 1) move_to(_x + 1, _y); break;
			case BottomRight: if (_y < HEIGHT - 1 && _x < WIDTH - 1) move_to(_x + 1, _y + 1); break;
			case Bottom: if (_y < HEIGHT - 1) move_to(_x, _y + 1); break;
			case BottomLeft: if (_x > 0 && _y < HEIGHT - 1) move_to(_x - 1, _y + 1); break;
			case Left: if (_x > 0) move_to(_x - 1, _y); break;
			case TopLeft: if (_x > 0 && _y > 0) move_to(_x - 1, _y - 1); break;
		}
	}
}

static void turn_right(int steps) {
	_direction = (_direction + steps) % 8;
}

static void reset_mode() {
	_x = _y = 15;
	_mode = Draw;
	_direction = Top;
}

static void reset_map() {
	memset(_map, ' ', sizeof(_map));
}

static bool process_message(char *buffer, int s) {
	int length = strlen(buffer);
	int index = 0;

	while (index < length) {
		if (buffer[index] == ' ' || buffer[index] == '\r' || buffer[index] == '\n') {
			index++;
			continue;
		}

		switch (buffer[index]) {
			case 'c':
				if (strncmp(&buffer[index], "coord", 5) == 0) {
					if (! build_coordinates(s))
						return false;

					index += 5;
					continue;
				}
				else
					if (strncmp(&buffer[index], "clear", 5) == 0) {
						reset_map();
						index += 5;
						continue;
					}
				break;

			case 'd':
				if (strncmp(&buffer[index], "draw", 4) == 0) {
					_mode = Draw;
					index += 4;
					continue;
				}
				break;

			case 'e':
				if (strncmp(&buffer[index], "eraser", 6) == 0) {
					_mode = Eraser;
					index += 6;
					continue;
				}
				break;

			case 'h':
				if (strncmp(&buffer[index], "hover", 5) == 0) {
					_mode = Hover;
					index += 5;
					continue;
				}
				break;

			case 'l':
				if (strncmp(&buffer[index], "left", 4) == 0) {
					int n = atoi(&buffer[index + 4]);
					if (n == 0) n = 1;
					turn_right(8 - n);

					index += 4;
					while (index < length && buffer[index] != '\r')
						index++;

					continue;
				}
				break;

			case 'q':
				if (strncmp(&buffer[index], "quit", 4) == 0)
					return false;
				break;

			case 'r':
				if (strncmp(&buffer[index], "render", 6) == 0) {
					if (! renderize(s))
						return false;

					index += 6;
					continue;
				}
				else
					if (strncmp(&buffer[index], "right", 5) == 0) {
						int n = atoi(&buffer[index + 6]);
						if (n == 0) n = 1;
						turn_right(n);

						index += 5;
						while (index < length && buffer[index] != '\r')
							index++;

						continue;
					}
				break;

			case 's':
				if (strncmp(&buffer[index], "steps ", 6) == 0) {
					int n = atoi(&buffer[index + 6]);
					advance(n);

					index += 6;
					while (index < length && buffer[index] != '\r')
						index++;

					continue;
				}
				break;
		}

		/* invalid command, discard */
		while (index < length && buffer[index] != '\r')
			index++;
	}

	return true;
}

static bool bind_socket_to_ip(int s) {
	struct sockaddr_in addr;

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_addr.s_addr = INADDR_ANY;
	addr.sin_port = htons(SERVER_PORT);

	return bind(s, (struct sockaddr *)&addr, sizeof(addr)) != -1;
}

static void shutdown_and_exit(int s) {
	if (s != -1)
	{
		close(s);
	}

#if _WIN32
	WSACleanup();
#endif

	exit(-1);
}

static bool receive_message(char *buffer, size_t length, int s) {
	int index = 0;
	bool reading = true;

	while (reading) {
		int bytes = recv(s, &buffer[index], length - index, 0);
		if (bytes == -1) {
			perror("recv() failed");
			close(s);
			return false;
		}

		index += bytes;
		if (buffer[index - 1] == '\n')
			reading = false;
	}

	return true;
}

int main() {
	char buffer[1024];
	int s;

#ifdef _WIN32
	WSADATA wsaData = {0};
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) < 0) {
		perror("WSAStartup() failed");
		exit(-1);
	}
#endif

	s = socket(AF_INET, SOCK_STREAM, 0);
	if (s == -1) {
		perror("socket() failed");
		shutdown_and_exit(s);
		exit(-1);
	}

	if (! bind_socket_to_ip(s)) {
		perror("bind() failed");
		shutdown_and_exit(s);
	}

	if (listen(s, 5) == -1) {
		perror("listen() failed");
		shutdown_and_exit(s);
	}

	printf("Waiting connections at port %d...\n", SERVER_PORT);
	while (true) {
		int new_s = accept(s, NULL, NULL);

		if (new_s == -1) {
			perror("accept() failed");
			shutdown_and_exit(s);
		}

		reset_map();
		reset_mode();

		if (send_handshake(new_s)) {
			while (true) {
				memset(buffer, 0, sizeof(buffer));
				if (!receive_message(buffer, sizeof(buffer), new_s))
				{
					close(new_s);
					break;
				}

				if (! process_message(buffer, new_s))
					break;
			}

			close(new_s);
		}
	}

	close(s);
#if _WIN32
	WSACleanup();
#endif
	exit(0);
}

/*
vim:ts=4:noet:noai:nowrap
*/
