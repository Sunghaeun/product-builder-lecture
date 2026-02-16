const $ = (sel) => document.querySelector(sel);

    const btnPick = $("#btnPick");
    const btnReroll = $("#btnReroll");
    const btnCopy = $("#btnCopy");
    const btnClear = $("#btnClear");

    const numbersBox = $("#numbers");
    const historyBox = $("#history");
    const lastTime = $("#lastTime");
    const toast = $("#toast");

    let currentNumbers = null;
    let history = [];

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1200);
    }

    // 1~45 배열 만들고 Fisher–Yates 셔플 후 앞 6개 뽑기
    function pickLottoNumbers() {
      const arr = Array.from({ length: 45 }, (_, i) => i + 1);

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      const picked = arr.slice(0, 6).sort((a, b) => a - b);
      return picked;
    }

    function colorClass(n) {
      if (n <= 10) return "c1";
      if (n <= 20) return "c2";
      if (n <= 30) return "c3";
      if (n <= 40) return "c4";
      return "c5";
    }

    function renderNumbers(nums) {
      numbersBox.innerHTML = "";
      nums.forEach((n, i) => {
        const el = document.createElement("div");
        el.className = `ball ${colorClass(n)}`;
        el.textContent = n;
        el.style.animationDelay = `${i * 0.1}s`;
        numbersBox.appendChild(el);
      });
    }

    function nowTimeString() {
      const d = new Date();
      const pad = (x) => String(x).padStart(2, "0");
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    function renderHistory() {
      historyBox.innerHTML = "";

      if (history.length === 0) {
        historyBox.innerHTML = `<div style="color: rgba(233,238,255,0.7); border: 1px dashed rgba(255,255,255,0.2); padding: 14px; border-radius: 14px;">
          아직 기록이 없어요.
        </div>`;
        return;
      }

      history.forEach((item) => {
        const row = document.createElement("div");
        row.className = "hitem";

        const left = document.createElement("div");
        left.className = "hnums";
        left.textContent = item.nums.join(", ");

        const right = document.createElement("div");
        right.className = "htime";
        right.textContent = item.time;

        row.appendChild(left);
        row.appendChild(right);

        row.addEventListener("click", () => {
          currentNumbers = item.nums.slice();
          renderNumbers(currentNumbers);
          lastTime.textContent = `최근 추천: ${item.time} (히스토리에서 선택됨)`;
          btnReroll.disabled = false;
          btnCopy.disabled = false;
        });

        historyBox.appendChild(row);
      });
    }

    function updateButtonsEnabled() {
      const hasNums = Array.isArray(currentNumbers) && currentNumbers.length === 6;
      btnReroll.disabled = !hasNums;
      btnCopy.disabled = !hasNums;
    }

    function addToHistory(nums) {
      history.unshift({ nums: nums.slice(), time: nowTimeString() });
      if (history.length > 10) history.pop();
      renderHistory();
    }

    async function copyCurrent() {
      const text = currentNumbers.join(", ");
      try {
        await navigator.clipboard.writeText(text);
        showToast("복사 완료!");
      } catch (e) {
        // clipboard 권한이 안 되면 fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast("복사 완료!");
      }
    }

    function pickAndRender() {
      const nums = pickLottoNumbers();
      currentNumbers = nums;
      renderNumbers(nums);
      addToHistory(nums);

      const t = nowTimeString();
      lastTime.textContent = `최근 추천: ${t}`;
      updateButtonsEnabled();
    }

    btnPick.addEventListener("click", pickAndRender);
    btnReroll.addEventListener("click", pickAndRender);

    btnCopy.addEventListener("click", () => {
      if (!currentNumbers) return;
      copyCurrent();
    });

    btnClear.addEventListener("click", () => {
      history = [];
      renderHistory();
      showToast("히스토리 삭제됨");
    });

    // 초기 렌더
    renderHistory();
    updateButtonsEnabled();
