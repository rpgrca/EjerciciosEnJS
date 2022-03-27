#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <sys/time.h>
#include <sys/socket.h>
#include <sys/select.h>
#include <unistd.h>
#include <errno.h>

#define SERVER_PORT 8124
#define STDIN 0
#define TIMEOUT 15
#define HEIGHT 30
#define WIDTH 30

static int _x = 15, _y = 15;
static char _map[30][30];
static char *_header = "╔══════════════════════════════╗\r\n";
static char *_footer = "╚══════════════════════════════╝\r\n\r\n";

bool send_handshake(int s) {
    char *handshake_message = "hello\r\n";

	if (send(s, handshake_message, strlen(handshake_message), 0) == -1) {
		perror("send() failed");
		return false;
	}

	return true;
}

bool build_coordinates(int s) {
	char buffer[1024];
	snprintf(buffer, sizeof(buffer), "(%d,%d)\r\n", _x, _y);

	if (send(s, buffer, strlen(buffer), 0) == -1) {
		perror("send() failed");
		return false;
	}

	return true;
}

bool renderize(int s) {
	char buffer[2048];

	memset(buffer, 0, sizeof(buffer));
	memcpy(buffer, _header, 32 * 3 + 2);  // 98
	for (int i = 0; i < HEIGHT; i++) {
		char line[256];
		memset(line, 0, sizeof(line));
		memcpy(line, "║", 3);          //  3
		memcpy(&line[3], _map[i], 30); // 33
		memcpy(&line[33], "║", 3);     // 36
		memcpy(&line[36], "\r\n", 2);  // 38

		memcpy(&buffer[98 + (38 * i)], line, 38);
	}

	memcpy(&buffer[1238], _footer, 32 * 3 + 4);

	if (send(s, buffer, 1338, 0) == -1) {
		perror("send() failed");
		return false;
	}

	return true;
}

bool process_recv(char *buffer, int s) {
	printf("Received \"%s\"\n", buffer);

	int length = strlen(buffer);
	int index = 0;
	bool must_quit = false;

	while (index < length) {
		if (buffer[index] == ' ') {
			index++;
			continue;
		}

		if (strncmp(&buffer[index], "\r\n", 2) == 0) {
			index += 2;
			continue;
		}

		if (strncmp(&buffer[index], "coord", 5) == 0) {
			if (! build_coordinates(s)) {
				return false;
			}

			index += 5;
			continue;
		}

		if (strncmp(&buffer[index], "quit", 4) == 0) {
			must_quit = true;
			break;
		}

		if (strncmp(&buffer[index], "render", 6) == 0) {
			if (! renderize(s)) {
				return false;
			}

			index += 6;
			continue;
		}

		while (index < length && buffer[index] != '\r') {
			index++;
		}
	}

	return !must_quit;
}

static void reset_map() {
	_x = _y = 15;

	for (int y = 0; y < HEIGHT; y++)
		for (int x = 0; x < WIDTH; x++)
			_map[y][x] = (x == _x && y == _y)? ' ' : ' ';
}

int main() {
    char buffer[1024];
    int s;
	int closing_descriptor = false;

    s = socket(AF_INET, SOCK_STREAM, 0);
    if (s == -1) {
        perror("socket() failed");
        exit(-1);
    }

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(SERVER_PORT);

    if (bind(s, (struct sockaddr *)&addr, sizeof(addr))) {
        perror("bind() failed");
        close(s);
        exit(-1);
    }

    if (listen(s, 5) == -1) {
        perror("listen() failed");
        close(s);
        exit(-1);
    }

	printf("Waiting connections at port %d...\n", SERVER_PORT);

	while (true) {
	    int new_s = accept(s, NULL, NULL);

	    if (new_s == -1) {
	        if (errno != EWOULDBLOCK) {
	            perror("accept() failed");
				close(s);
				exit(-1);
	        }
		}

		reset_map();
		if (send_handshake(new_s)) {
			while (true) {
	            memset(buffer, 0, sizeof(buffer));
	            int bytes = recv(new_s, buffer, sizeof(buffer), 0);
	            if (bytes == -1) {
	                if (errno != EWOULDBLOCK) {
	                    perror("recv() failed");
	                    close(new_s);
	                }

					break;
	            }

				closing_descriptor = !process_recv(buffer, new_s);

				if (closing_descriptor) {
					break;
		        }
			}

			close(new_s);
		}
    }

	close(s);
}
