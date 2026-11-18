// ===== TOÀN BỘ CHỨC NĂNG WEB =====

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initPomodoro();
    initMoodJournal();
    initTaskPlanner();
    initStudentCorner();
    loadFavorites();
});

// ========== CHẾ ĐỘ TỐI ==========
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️ Chế độ sáng';
    }

    toggleBtn.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '🌙 Chế độ tối';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '☀️ Chế độ sáng';
        }
    });
}

// ========== BỘ ĐẾM POMODORO ==========
let pomodoroTime = 25 * 60;
let pomodoroInterval = null;
let isBreak = false;

function initPomodoro() {
    const btnStart = document.getElementById('btn-start');
    const btnPause = document.getElementById('btn-pause');
    const btnReset = document.getElementById('btn-reset');
    const btnBreak = document.getElementById('btn-break');
    const timerDisplay = document.getElementById('pomodoro-timer');
    const statusText = document.getElementById('pomodoro-status');

    if (!btnStart) return;

    function updateDisplay() {
        const min = Math.floor(pomodoroTime / 60);
        const sec = pomodoroTime % 60;
        timerDisplay.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (pomodoroInterval) return;
        btnStart.disabled = true;
        btnPause.disabled = false;
        statusText.textContent = isBreak ? '☕ Thư giãn nhé!' : '🎯 Tập trung làm việc!';
        
        pomodoroInterval = setInterval(function() {
            pomodoroTime--;
            updateDisplay();
            
            if (pomodoroTime <= 0) {
                clearInterval(pomodoroInterval);
                pomodoroInterval = null;
                alert(isBreak ? '⏰ Hết giờ nghỉ! Quay lại làm việc thôi!' : '⏰ Tuyệt vời! Đã hoàn thành một phiên! Nghỉ ngắn đi nhé!');
                if (!isBreak) {
                    pomodoroTime = 5 * 60;
                    isBreak = true;
                    updateDisplay();
                    statusText.textContent = 'Sẵn sàng nghỉ ngắn — Nhấn Bắt đầu khi cần!';
                } else {
                    pomodoroTime = 25 * 60;
                    isBreak = false;
                    updateDisplay();
                    statusText.textContent = 'Sẵn sàng — Nhấn Bắt đầu khi bạn đã sẵn sàng!';
                }
                btnStart.disabled = false;
                btnPause.disabled = true;
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        btnStart.disabled = false;
        btnPause.disabled = true;
        statusText.textContent = '⏸ Đã tạm dừng';
    }

    function resetTimer() {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        isBreak = false;
        pomodoroTime = 25 * 60;
        updateDisplay();
        btnStart.disabled = false;
        btnPause.disabled = true;
        statusText.textContent = 'Sẵn sàng — Hãy bắt đầu khi bạn đã sẵn sàng!';
    }

    function startBreak() {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        isBreak = true;
        pomodoroTime = 5 * 60;
        updateDisplay();
        btnStart.disabled = false;
        btnPause.disabled = true;
        statusText.textContent = 'Đặt thành 5 phút nghỉ ngắn nhé ☕';
    }

    btnStart.addEventListener('click', startTimer);
    btnPause.addEventListener('click', pauseTimer);
    btnReset.addEventListener('click', resetTimer);
    btnBreak.addEventListener('click', startBreak);
}

// ========== NHẬT KÝ CẢM XÚC ==========
let selectedMood = null;

function initMoodJournal() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const saveBtn = document.getElementById('save-mood');
    const clearBtn = document.getElementById('clear-records');
    const noteInput = document.getElementById('mood-note');
    const moodList = document.getElementById('mood-list');

    if (!saveBtn) return;

    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            moodBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = {
                value: this.getAttribute('data-mood'),
                emoji: this.getAttribute('data-emoji')
            };
        });
    });

    saveBtn.addEventListener('click', function() {
        if (!selectedMood) {
            alert('Vui lòng chọn cảm xúc của bạn nhé!');
            return;
        }
        const note = noteInput.value.trim();
        const record = {
            date: new Date().toLocaleString('vi-VN'),
            mood: selectedMood,
            note: note
        };
        
        let records = JSON.parse(localStorage.getItem('moodJournal') || '[]');
        records.unshift(record);
        localStorage.setItem('moodJournal', JSON.stringify(records));
        
        noteInput.value = '';
        moodBtns.forEach(b => b.classList.remove('selected'));
        selectedMood = null;
        
        renderMoodRecords();
        alert('✅ Đã lưu nhật ký thành công!');
    });

    clearBtn.addEventListener('click', function() {
        if (confirm('Bạn có chắc muốn xóa tất cả nhật ký không?')) {
            localStorage.removeItem('moodJournal');
            renderMoodRecords();
        }
    });

    renderMoodRecords();
}

function renderMoodRecords() {
    const moodList = document.getElementById('mood-list');
    if (!moodList) return;
    
    const records = JSON.parse(localStorage.getItem('moodJournal') || '[]');
    
    if (records.length === 0) {
        moodList.innerHTML = '<p class="muted">Chưa có nhật ký nào. Hãy viết điều đầu tiên của bạn nhé!</p>';
        return;
    }
    
    moodList.innerHTML = records.map(r => `
        <div class="mood-item">
            <div><strong>${r.mood.emoji} ${r.mood.value.replace('-', ' ')}</strong></div>
            <div class="mood-date">${r.date}</div>
            ${r.note ? `<p style="margin-top:8px;">${r.note}</p>` : ''}
        </div>
    `).join('');
}

// ========== KẾ HOẠCH HỌC TẬP ==========
function initTaskPlanner() {
    const addBtn = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');
    const clearBtn = document.getElementById('clear-tasks');
    
    if (!addBtn) return;
    
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
    clearBtn.addEventListener('click', function() {
        if (confirm('Xóa tất cả nhiệm vụ?')) {
            localStorage.removeItem('taskList');
            renderTasks();
        }
    });
    
    renderTasks();
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const text = taskInput.value.trim();
    if (!text) return;
    
    let tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    tasks.push({ id: Date.now(), text: text, done: false });
    localStorage.setItem('taskList', JSON.stringify(tasks));
    
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const taskDone = document.getElementById('task-done');
    
    if (!taskList) return;
    
    const tasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state muted">Chưa có nhiệm vụ nào. Hãy thêm việc cần làm của bạn!</li>';
        taskCount.textContent = 'Tổng: 0';
        taskDone.textContent = 'Hoàn thành
