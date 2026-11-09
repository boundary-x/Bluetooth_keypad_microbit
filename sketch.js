/**
 * sketch.js
 * Boundary X Bluetooth Keypad Logic
 */

const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let bluetoothDevice = null;
let rxCharacteristic = null;
let isConnected = false;
let bluetoothStatus = "연결 대기 중"; 

function setup() {
  noCanvas(); 
  createBluetoothUI();
  createKeypadUI(); // 키패드 생성 함수 호출
}

function createBluetoothUI() {
  const statusElement = select("#bluetoothStatus");
  if (statusElement) statusElement.html(`상태: ${bluetoothStatus}`);

  const buttonContainer = select("#bluetooth-control-buttons");
  if (buttonContainer) {
    const connectButton = createButton("기기 연결").addClass("start-button");
    connectButton.mousePressed(connectBluetooth);
    buttonContainer.child(connectButton);

    const disconnectButton = createButton("연결 해제").addClass("stop-button");
    disconnectButton.mousePressed(disconnectBluetooth);
    buttonContainer.child(disconnectButton);
  }
}

// 1~12 키패드 생성 및 이벤트 연결
function createKeypadUI() {
    const keypadContainer = select("#keypad-container");
    if (!keypadContainer) return;

    // 1부터 12까지 버튼 생성
    for (let i = 1; i <= 12; i++) {
        let btn = createButton(String(i)); // 버튼 텍스트
        btn.addClass("key-button");        // CSS 클래스 적용
        
        // 버튼 클릭(터치) 시 이벤트
        btn.mousePressed(() => {
            handleKeypadInput(i);
        });

        keypadContainer.child(btn);
    }
}

// 키패드 입력 처리
async function handleKeypadInput(number) {
    if (!isConnected) {
        alert(`먼저 ${BOARD_PROFILES[selectedBoard].label}와 연결해주세요.`);
        return;
    }

    const dataToSend = String(number);
    if (!await sendBluetoothData(dataToSend)) return;
    
    // UI 업데이트 (확인 창)
    const display = select("#sentDataDisplay");
    if (display) {
        display.html(dataToSend);
        // 시각적 효과 (깜빡임)
        display.style("color", "#fff");
        setTimeout(() => display.style("color", "#0f0"), 200);
    }
}

// UI Color Update Logic
function updateBluetoothStatusUI(type) {
  const el = select("#bluetoothStatus");
  if (el) {
    el.removeClass("status-connected");
    el.removeClass("status-error");
    el.html(`상태: ${bluetoothStatus}`);

    if (type === 'connected') {
      el.addClass("status-connected");
    } else if (type === 'error') {
      el.addClass("status-error");
    }
  }
}


const BOARD_PROFILES = {
 microbit: {label:"마이크로비트", filters:[{namePrefix:"BBC micro:bit"}], write:UART_RX_CHARACTERISTIC_UUID},
 esp32: {label:"ESP32", filters:[{namePrefix:"ESP"},{namePrefix:"MPY"}], write:UART_TX_CHARACTERISTIC_UUID}
};
let selectedBoard="microbit", connecting=false, connectionGeneration=0, writeQueue=Promise.resolve();
function connectionControls() {
 document.getElementById("board-select").disabled=connecting;
 const connect=document.querySelector("#bluetooth-control-buttons .start-button");
 if(connect) connect.disabled=connecting||isConnected;
 const disconnect=document.querySelector("#bluetooth-control-buttons .stop-button");
 if(disconnect) disconnect.disabled=connecting||!isConnected;
}
function clearConnection(message) {
 connectionGeneration++;
 isConnected=false; rxCharacteristic=null; bluetoothDevice=null;
 bluetoothStatus=message; updateBluetoothStatusUI("default");
 document.getElementById("sentDataDisplay").textContent="-";
 connectionControls();
}
async function connectBluetooth() {
 if(connecting||isConnected) return;
 if(!navigator.bluetooth) {
  bluetoothStatus="이 브라우저에서는 블루투스를 사용할 수 없습니다. PC·안드로이드는 Chrome, 아이폰은 Bluefy를 사용해주세요.";
  updateBluetoothStatusUI("error");return;
 }
 connecting=true; connectionControls();
 const profile=BOARD_PROFILES[selectedBoard], generation=++connectionGeneration;
 let device;
 try {
  bluetoothStatus="연결할 기기를 선택해주세요."; updateBluetoothStatusUI("default");
  device=await navigator.bluetooth.requestDevice({filters:profile.filters,optionalServices:[UART_SERVICE_UUID]});
  bluetoothDevice=device;
  device.addEventListener("gattserverdisconnected",()=>{
   if(bluetoothDevice===device) clearConnection("연결이 끊겼습니다. 다시 연결해주세요.");
  });
  const server=await device.gatt.connect();
  const service=await server.getPrimaryService(UART_SERVICE_UUID);
  const characteristic=await service.getCharacteristic(profile.write);
  if(generation!==connectionGeneration) {device.gatt.disconnect();return;}
  rxCharacteristic=characteristic;isConnected=true;
  bluetoothStatus=(device.name||profile.label)+" 연결됨";updateBluetoothStatusUI("connected");
 } catch(error) {
  if(device?.gatt.connected) device.gatt.disconnect();
  clearConnection(error.name==="NotFoundError"?"기기 선택을 취소했습니다.":"연결 실패: 기기 전원과 블루투스 수신 코드를 확인해주세요.");
  if(error.name!=="NotFoundError") updateBluetoothStatusUI("error");
 } finally {connecting=false;connectionControls();}
}
function disconnectBluetooth() {
 const old=bluetoothDevice;
 clearConnection("연결 해제됨");
 if(old?.gatt.connected) old.gatt.disconnect();
}
function selectBoard(board) {
 if(connecting||board===selectedBoard||!BOARD_PROFILES[board]) return;
 if(isConnected&&!confirm("기기 동작을 멈췄나요? 보드를 바꾸면 현재 블루투스 연결이 해제됩니다.")) return;
 disconnectBluetooth();
 selectedBoard=board;
 bluetoothStatus="연결 대기 중";updateBluetoothStatusUI("default");
 document.getElementById("board-select").value=board;
 document.getElementById("connection-description").textContent=board==="microbit"
 ? "마이크로비트와 블루투스로 연결하여 통신을 시작합니다."
 : "ESP32 수신 코드를 실행한 뒤 ESP 또는 MPY로 시작하는 기기를 선택해주세요.";
 window.dispatchEvent(new CustomEvent("boardchange",{detail:{board}}));
}
function sendBluetoothData(data) {
 const characteristic=rxCharacteristic, generation=connectionGeneration;
 const task=writeQueue.then(async()=>{
  if(!isConnected||generation!==connectionGeneration||characteristic!==rxCharacteristic) return false;
  try {
   const bytes=new TextEncoder().encode(data+"\n");
   if(characteristic.properties.write&&characteristic.writeValueWithResponse) await characteristic.writeValueWithResponse(bytes);
   else if(characteristic.properties.writeWithoutResponse&&characteristic.writeValueWithoutResponse) await characteristic.writeValueWithoutResponse(bytes);
   else await characteristic.writeValue(bytes);
   return isConnected&&generation===connectionGeneration;
  } catch(error) {
   if(generation===connectionGeneration) {
    bluetoothStatus="전송 실패: 연결 상태를 확인해주세요.";updateBluetoothStatusUI("error");
   }
   return false;
  }
 });
 writeQueue=task.catch(()=>false);
 return task;
}


