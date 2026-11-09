# ESP32 MicroPython: Bluetooth keypad receive test
# Save ble_library.py and this file as main.py on the board.
import bluetooth
import time
from ble_library import BLESimplePeripheral

buffer = ""

def receive(text):
    global buffer
    # This library delivers decoded strings, not bytes.
    buffer += text
    while "\n" in buffer:
        line, buffer = buffer.split("\n", 1)
        command = line.strip()
        if command in ("1", "2", "3", "4", "5", "6",
                       "7", "8", "9", "10", "11", "12"):
            print("Received button:", command)
        else:
            print("Unknown command:", command)
    if len(buffer) > 64:
        buffer = ""

# Keep the advertised name short to fit the BLE advertising packet.
device = BLESimplePeripheral(bluetooth.BLE(), name=b"ESP32")
device.on_write(receive)
print("Select ESP32 in the web app, then connect to ESP32.")
was_connected = False

while True:
    connected = device.is_connected()
    if connected != was_connected:
        print("Connected" if connected else "Disconnected")
        buffer = ""
        was_connected = connected
    time.sleep_ms(100)
