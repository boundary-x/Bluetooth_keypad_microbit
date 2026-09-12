/* Read-only keypad guide: never triggers Bluetooth commands. */
(()=>{'use strict';const $=id=>document.getElementById(id);const support=$('support-card');support.innerHTML="<summary><span><strong>사용 가이드 및 지원</strong><small>사용법 · 예제 코드 · 문제 해결</small></span><span class=\"support-chevron\" aria-hidden=\"true\">⌄</span></summary><div class=\"support-content\"><p class=\"support-intro\">숫자 버튼으로 마이크로비트 프로젝트를 무선 조종해보세요.</p><div class=\"support-actions\"><button type=\"button\" data-tour=\"all\" class=\"support-primary\">사용법 둘러보기 <span aria-hidden=\"true\">→</span></button></div><details class=\"support-section\" id=\"help-examples\"><summary>마이크로비트 예제 코드</summary><div class=\"support-answer example-codes\"><div class=\"example-code\"><a  href=\"https://makecode.microbit.org/S49771-77509-50114-72682\" target=\"_blank\" rel=\"noopener noreferrer\">블루투스 이름 확인 코드 ↗</a><p>연결할 마이크로비트의 장치 이름을 확인합니다. 마이크로비트의 LED 매트릭스에 출력되는 이름(알파벳 소문자 5자리)을 확인한 뒤 아래 프로젝트 코드를 다운로드하세요.</p></div><div class=\"example-code\"><a id=\"project-example-link\" href=\"https://makecode.microbit.org/_aX0DpiRWrFo8\" target=\"_blank\" rel=\"noopener noreferrer\">마이크로비트 프로젝트 예제 코드 ↗</a><p>받은 숫자에 따라 동작하도록 조건문을 구성하세요. 웹앱은 1~12를 문자열과 줄바꿈으로 전송합니다. 정지 동작도 사용할 숫자에 직접 지정하세요.</p></div><p>MakeCode 프로젝트 설정에서 블루투스 페어링을 필요하지 않음으로 설정하세요.</p></div></details><details class=\"support-section\" id=\"help-troubleshooting\"><summary>문제 해결</summary><div class=\"support-answer support-faq\"><details id=\"help-connection\"><summary>마이크로비트가 연결되지 않아요</summary><p>마이크로비트 전원과 UART 프로젝트 코드, 블루투스 페어링 설정을 확인하세요. 다른 앱이나 탭의 연결을 해제한 뒤 장치 이름으로 선택하세요. PC에서는 Chrome·Edge, 안드로이드에서는 Chrome, 아이폰에서는 Bluefy를 사용하세요.</p></details><details><summary>버튼을 눌러도 동작하지 않아요</summary><p>먼저 기기 연결을 누르고 연결 상태를 확인하세요. 마이크로비트 코드가 줄바꿈까지 받은 문자열을 처리하는지, 조건문이 누른 숫자와 일치하는지 확인하세요. 현재 앱의 버튼은 1~12이며 0 버튼은 없습니다.</p></details><details><summary>길게 누르거나 손을 떼면 무엇이 전송되나요?</summary><p>버튼을 누를 때 숫자를 한 번 전송합니다. 길게 눌러도 자동 반복 전송하지 않으며 손을 떼도 stop을 전송하지 않습니다. 정지가 필요하면 예제 코드에서 특정 숫자를 정지 명령으로 정하고 해당 버튼을 누르세요.</p></details><details><summary>Sent Data가 바뀌면 수신이 완료된 건가요?</summary><p>Sent Data는 마지막으로 누른 숫자를 표시하며 실제 기기의 수신 확인은 아닙니다. 전송 오류 안내가 나타나거나 기기가 반응하지 않으면 연결 상태와 마이크로비트 코드를 확인하세요.</p></details><details><summary>사용 중 연결이 끊겼어요</summary><p>전원이나 거리에 따라 연결이 끊겨도 화면에 이전 연결 상태가 남을 수 있습니다. 연결 해제를 누르고 다시 연결하세요. 연결 해제는 정지 명령을 전송하지 않습니다. 동작을 멈춘 뒤 연결을 해제하세요.</p></details></div></details><details class=\"support-section\" id=\"help-updates\"><summary>업데이트 노트</summary><div class=\"support-answer\"><p class=\"support-release\">사용 가이드 및 지원 추가</p><ul><li>예제 준비부터 기기 연결·숫자 전송·연결 해제까지 화면 안내</li><li>장치 이름 확인 코드와 프로젝트 예제 연결</li><li>전송 시점과 연결 문제 해결 안내</li></ul></div></details><a  href=\"https://boundaryx.io/ai/?bmode=view&idx=169833636&t=board\" target=\"_blank\" rel=\"noopener noreferrer\">소개 · 프로젝트 활용 방법 보기 ↗</a></div>";const allSteps=[["#project-example-link","마이크로비트 코드를 준비하세요","장치 이름 확인 코드로 LED의 소문자 5자리를 확인하고 프로젝트 예제를 다운로드하세요. 받은 숫자에 따라 동작하도록 조건문을 구성하세요."],["#bluetooth-control-buttons","마이크로비트를 연결하세요","기기 연결을 누르고 확인한 이름의 마이크로비트를 선택하세요. 아이폰에서는 Bluefy를 사용하세요."],["#bluetoothStatus","연결된 장치를 확인하세요","상태 창이 초록색으로 바뀌고 연결된 마이크로비트 이름이 표시되는지 확인하세요. 연결 실패 시 문제 해결 안내를 참고하세요."],["#keypad-container","숫자 버튼을 눌러보세요","1~12 중 버튼을 누르면 해당 숫자와 줄바꿈을 한 번 전송합니다. 길게 눌러도 자동 반복 전송하지 않고, 손을 떼도 정지 신호를 보내지 않습니다."],[".display-screen","선택한 데이터를 확인하세요","Sent Data에 마지막으로 누른 숫자가 표시됩니다. 실제 수신 확인은 아니므로 마이크로비트의 동작도 함께 확인하세요."],["#bluetooth-control-buttons","동작을 멈춘 뒤 연결을 해제하세요","필요하면 마이크로비트 코드에서 특정 숫자를 정지 명령으로 지정하세요. 해당 버튼으로 동작을 멈춘 뒤 연결 해제를 누르세요. 연결 해제 자체는 stop을 보내지 않습니다."]];const chapters=[{label:'예제 준비',start:0},{label:'기기 연결',start:1},{label:'키패드 사용',start:3}];
const dialog = document.createElement('dialog');
  dialog.id = 'guide-dialog';
  dialog.setAttribute('aria-labelledby', 'guide-title');
  dialog.setAttribute('aria-describedby', 'guide-description');
  dialog.innerHTML = `<div id="guide-spotlight" aria-hidden="true"></div><section id="guide-panel"><div class="guide-topline"><span id="guide-progress"></span><button id="guide-close" type="button" aria-label="화면 안내 종료">닫기 ×</button></div><nav class="guide-chapters" aria-label="안내 구간">${chapters.map((chapter, i) => `<button type="button" data-chapter="${i}" aria-pressed="false">${chapter.label}</button>`).join('')}</nav><div aria-live="polite" aria-atomic="true"><h2 id="guide-title"></h2><p id="guide-description"></p></div><p class="guide-caption">화면 안내입니다. 닫은 뒤 직접 눌러보세요.</p><button id="guide-skip-device" type="button" hidden>기기 연결 건너뛰기 →</button><div class="guide-navigation"><button id="guide-prev" type="button">이전</button><button id="guide-next" type="button">다음</button></div></section>`;
  document.body.appendChild(dialog);
  let steps = [], index = 0, target = null, opener = null, originalScroll = 0, pendingFrame = 0;

  let examplesWereOpen = false;

  function openHelp(section) {
    support.open = true;
    if (section) {
      $('help-troubleshooting').open = true;
      $(section).open = true;
    }
    const heading = (section ? $(section) : support).querySelector('summary');
    heading.scrollIntoView({block: 'center', behavior: 'instant'});
    heading.focus({preventScroll: true});
  }
  document.querySelectorAll('[data-help]').forEach(button => button.addEventListener('click', () => openHelp(button.dataset.help || null)));

  function renderStep() {
    const [selector, title, description] = steps[index];
    if (selector === '#project-example-link') $('help-examples').open = true;
    target = document.querySelector(selector);
    const chapterIndex = index < chapters[1].start ? 0 : index < chapters[2].start ? 1 : 2;
    dialog.querySelectorAll('[data-chapter]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === chapterIndex)));
    $('guide-skip-device').hidden = chapterIndex !== 1;
    $('guide-progress').textContent = `${chapters[chapterIndex].label}${chapterIndex === 1 ? ' · 선택' : ''} · ${index + 1} / ${steps.length}`;
    $('guide-title').textContent = title;
    $('guide-description').textContent = description;
    $('guide-prev').disabled = index === 0;
    $('guide-next').textContent = index === steps.length - 1 ? '안내 마치기' : '다음';
    if (target) target.scrollIntoView({block: 'center', behavior: 'instant'});
    positionGuide(true);
  }

  function positionGuide(reveal = false) {
    if (!dialog.open) return;
    const panel = $('guide-panel'), spot = $('guide-spotlight');
    const width = window.innerWidth, height = window.innerHeight, gap = 16;
    panel.style.width = Math.min(360, width - 24) + 'px';
    const ph = panel.getBoundingClientRect().height, pw = panel.getBoundingClientRect().width;
    const headerBottom = document.querySelector('header').getBoundingClientRect().bottom;
    let r = target ? target.getBoundingClientRect() : null;
    // Narrow screens reserve the lower area for the explanation. A temporary bottom
    // spacer allows the last control to scroll above it without altering saved data.
    const narrow = width < 700;
    if (reveal && r && narrow) {
      const top = Math.max(12, headerBottom + 16);
      window.scrollBy({top: r.top - top, behavior: 'instant'});
      r = target.getBoundingClientRect();
    }
    let x = width - pw - 12, y = height - ph - 12;
    if (r && !narrow) {
      const candidates = [
        [r.left - pw - gap, Math.max(12, Math.min(r.top, height - ph - 12))],
        [r.right + gap, Math.max(12, Math.min(r.top, height - ph - 12))],
        [Math.max(12, Math.min(r.left, width - pw - 12)), r.bottom + gap],
        [Math.max(12, Math.min(r.left, width - pw - 12)), r.top - ph - gap]
      ];
      const fit = candidates.find(([cx, cy]) => cx >= 12 && cy >= 12 && cx + pw <= width - 12 && cy + ph <= height - 12);
      if (fit) [x,y] = fit;
      else if (r.left < x - 28) r = {left:r.left,top:r.top,right:Math.min(r.right,x-16),bottom:r.bottom};
    }
    panel.style.left = x + 'px'; panel.style.top = Math.max(12, y) + 'px';
    if (r) {
      const top = Math.max(4, r.top - 5), left = Math.max(4, r.left - 5);
      const bottom = Math.min(height - 4, narrow ? y - 12 : height - 4, r.bottom + 5);
      spot.hidden = bottom <= top || r.right <= 0 || r.left >= width;
      Object.assign(spot.style, {left: left + 'px', top: top + 'px', width: Math.max(0, Math.min(width - 4, r.right + 5) - left) + 'px', height: Math.max(0, bottom - top) + 'px'});
    } else spot.hidden = true;
  }
  function startTour(kind, button) {
    if (kind !== 'all') return;
    opener = button; originalScroll = window.scrollY;
    steps = allSteps; index = 0;
    examplesWereOpen = $('help-examples').open;
    document.body.classList.add('guide-active');
    dialog.showModal();
    renderStep();
    $('guide-next').focus({preventScroll:true});
  }
  support.querySelectorAll('[data-tour]').forEach(button => button.addEventListener('click', () => startTour(button.dataset.tour, button)));
  $('guide-prev').addEventListener('click', () => { if (index > 0) { index--; renderStep(); } });
  $('guide-next').addEventListener('click', () => { if (index === steps.length - 1) dialog.close(); else { index++; renderStep(); } });
  dialog.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => { index = chapters[Number(button.dataset.chapter)].start; renderStep(); }));
  $('guide-skip-device').addEventListener('click', () => { index = chapters[2].start; renderStep(); $('guide-next').focus({preventScroll:true}); });
  $('guide-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('guide-active');
    $('help-examples').open = examplesWereOpen;
    window.scrollTo({top:originalScroll, behavior:'instant'});
    if (opener) opener.focus({preventScroll:true});
  });
  const reposition = () => {
    if (!dialog.open || pendingFrame) return;
    pendingFrame = requestAnimationFrame(() => { pendingFrame = 0; positionGuide(); });
  };
  window.addEventListener('resize', () => { if (dialog.open) renderStep(); });
  window.addEventListener('scroll', reposition, {passive:true});
  if (location.hash === '#support-card') requestAnimationFrame(() => openHelp());
})();


