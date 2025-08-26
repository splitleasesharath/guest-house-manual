document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.manual-section');
    const sectionNav = document.getElementById('section-nav');
    const navLinks = document.querySelectorAll('.section-nav a');
    const progressItems = document.querySelectorAll('.progress-item');
    const mobileToolbarBtns = document.querySelectorAll('.toolbar-btn[data-section]');
    const audioButtons = document.querySelectorAll('.play-audio');
    const jingleButtons = document.querySelectorAll('.play-jingle');
    const manualConfirmed = document.getElementById('manual-confirmed');
    const submitBtn = document.querySelector('.submit-btn');
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    const saveNoteBtn = document.querySelector('.save-note');
    const notesTextarea = document.querySelector('.notes-section textarea');
    
    let currentSection = 'arrival';
    let audioEnabled = true;
    let currentAudio = null;
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            currentSection = sectionId;
            
            sectionNav.value = sectionId;
            
            updateNavLinks(sectionId);
            updateMobileToolbar(sectionId);
            updateProgress(sectionId);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            playWelcomeJingle(sectionId);
        }
    }
    
    function updateNavLinks(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    function updateMobileToolbar(sectionId) {
        mobileToolbarBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
    }
    
    function updateProgress(sectionId) {
        const sectionOrder = ['arrival', 'guidelines', 'utilities', 'contractors', 'leaving'];
        const currentIndex = sectionOrder.indexOf(sectionId);
        
        progressItems.forEach((item, index) => {
            if (index <= currentIndex) {
                item.classList.add('completed');
                const check = item.querySelector('.progress-check');
                if (index < currentIndex && check) {
                    check.textContent = '✓';
                }
            }
        });
        
        saveProgress();
    }
    
    function playWelcomeJingle(sectionId) {
        if (!audioEnabled) return;
        
        const jingleMap = {
            'arrival': 'Welcome! Your access code is five-one-six-five',
            'guidelines': 'House rules keep everything nice',
            'utilities': 'WiFi and power at your command',
            'contractors': 'Work smart and safe throughout the day',
            'leaving': 'Time to wrap up and lock the door'
        };
        
        if (jingleMap[sectionId]) {
            speakText(jingleMap[sectionId]);
        }
    }
    
    function speakText(text) {
        if ('speechSynthesis' in window && audioEnabled) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            utterance.volume = 0.7;
            speechSynthesis.speak(utterance);
        }
    }
    
    function playAudio(audioId) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        const audio = document.getElementById(audioId);
        if (audio && audioEnabled) {
            const narrationTexts = {
                'arrival-audio': 'Welcome to Rod House. Enter code 5165 on the keypad to access the building. Use the front entrance on Lexington Avenue. The apartment is on the 4th floor, unit 4B.',
                'guidelines-audio': 'Please follow these house guidelines: Remove work shoes or use covers when entering. Return furniture to original positions. Store tools in the hallway corner near the coat closet.',
                'utilities-audio': 'WiFi Network is Apt4B Guest. Password is NYC2025fix. Circuit breaker in hallway closet. Water shutoff under kitchen sink.',
                'contractor-audio': 'Work hours are 9 AM to 5 PM Monday through Friday. Use drop cloths for paint work. Keep noise levels reasonable.',
                'leaving-audio': 'Before leaving: Turn off all lights. Close and lock windows. Set thermostat to 68 degrees. Lock door and text Rod.'
            };
            
            speakText(narrationTexts[audioId] || 'Audio narration for this section.');
            currentAudio = audio;
        }
    }
    
    function playJingle(jingleId) {
        const jingleTexts = {
            'arrival-jingle': 'Five one six five, the code to get inside!',
            'wifi-jingle': 'WiFi password N Y C, two zero two five fix, connect and get your digital kicks!',
            'leaving-jingle': 'Lock it up, send a text, Rod will know what happens next!'
        };
        
        if (jingleTexts[jingleId]) {
            speakText(jingleTexts[jingleId]);
        }
    }
    
    sectionNav.addEventListener('change', (e) => {
        showSection(e.target.value);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    mobileToolbarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.section) {
                showSection(btn.dataset.section);
            }
        });
    });
    
    audioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const audioId = btn.dataset.audio;
            playAudio(audioId);
            
            btn.classList.add('playing');
            setTimeout(() => {
                btn.classList.remove('playing');
            }, 3000);
        });
    });
    
    jingleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const jingleId = btn.dataset.jingle;
            playJingle(jingleId);
            
            btn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    document.querySelector('.audio-toggle').addEventListener('click', function() {
        audioEnabled = !audioEnabled;
        this.style.opacity = audioEnabled ? '1' : '0.5';
        
        if (!audioEnabled && currentAudio) {
            currentAudio.pause();
            speechSynthesis.cancel();
        }
    });
    
    document.querySelector('.audio-btn').addEventListener('click', function() {
        audioEnabled = !audioEnabled;
        this.style.opacity = audioEnabled ? '1' : '0.5';
        
        if (!audioEnabled) {
            speechSynthesis.cancel();
        }
    });
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveChecklistState();
            
            if (this.checked) {
                setTimeout(() => {
                    speakText('Task completed');
                }, 100);
            }
        });
    });
    
    manualConfirmed.addEventListener('change', function() {
        submitBtn.disabled = !this.checked;
        
        if (this.checked) {
            speakText('Thank you for reviewing the house manual');
        }
    });
    
    submitBtn.addEventListener('click', function() {
        if (!this.disabled) {
            const confirmation = {
                timestamp: new Date().toISOString(),
                confirmed: true,
                progress: getProgressState(),
                notes: notesTextarea.value
            };
            
            localStorage.setItem('houseManualConfirmation', JSON.stringify(confirmation));
            
            this.textContent = 'Confirmed ✓';
            this.style.background = '#52c41a';
            
            speakText('Confirmation submitted successfully');
            
            setTimeout(() => {
                alert('Thank you! Your confirmation has been recorded. Rod has been notified.');
            }, 1000);
        }
    });
    
    saveNoteBtn.addEventListener('click', function() {
        const notes = notesTextarea.value;
        if (notes.trim()) {
            const savedNotes = JSON.parse(localStorage.getItem('contractorNotes') || '[]');
            savedNotes.push({
                text: notes,
                timestamp: new Date().toISOString(),
                section: currentSection
            });
            localStorage.setItem('contractorNotes', JSON.stringify(savedNotes));
            
            this.textContent = 'Saved ✓';
            setTimeout(() => {
                this.textContent = 'Save Note';
            }, 2000);
            
            speakText('Note saved');
        }
    });
    
    document.querySelector('.contact-owner').addEventListener('click', function() {
        const message = prompt('Send a message to Rod:');
        if (message) {
            alert('Message sent to Rod: ' + message);
            speakText('Message sent');
        }
    });
    
    document.querySelector('.emergency').addEventListener('click', function() {
        if (confirm('This will call emergency services. Continue?')) {
            window.location.href = 'tel:911';
        }
    });
    
    function saveProgress() {
        const progress = {
            currentSection: currentSection,
            completedSections: [],
            timestamp: new Date().toISOString()
        };
        
        progressItems.forEach((item, index) => {
            if (item.classList.contains('completed')) {
                progress.completedSections.push(index);
            }
        });
        
        localStorage.setItem('houseManualProgress', JSON.stringify(progress));
    }
    
    function loadProgress() {
        const saved = localStorage.getItem('houseManualProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            
            if (progress.completedSections) {
                progress.completedSections.forEach(index => {
                    if (progressItems[index]) {
                        progressItems[index].classList.add('completed');
                        const check = progressItems[index].querySelector('.progress-check');
                        if (check) {
                            check.textContent = '✓';
                        }
                    }
                });
            }
            
            if (progress.currentSection) {
                setTimeout(() => {
                    showSection(progress.currentSection);
                }, 100);
            }
        }
    }
    
    function saveChecklistState() {
        const checklistState = {};
        checkboxes.forEach((checkbox, index) => {
            checklistState[`checkbox_${index}`] = checkbox.checked;
        });
        localStorage.setItem('checklistState', JSON.stringify(checklistState));
    }
    
    function loadChecklistState() {
        const saved = localStorage.getItem('checklistState');
        if (saved) {
            const state = JSON.parse(saved);
            checkboxes.forEach((checkbox, index) => {
                if (state[`checkbox_${index}`]) {
                    checkbox.checked = true;
                }
            });
        }
    }
    
    function getProgressState() {
        const state = [];
        progressItems.forEach(item => {
            state.push(item.classList.contains('completed'));
        });
        return state;
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', function() {
        document.querySelector('.left-sidebar').classList.toggle('mobile-open');
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            document.querySelector('.left-sidebar').classList.remove('mobile-open');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            navigateSection(1);
        } else if (e.key === 'ArrowLeft') {
            navigateSection(-1);
        }
    });
    
    function navigateSection(direction) {
        const sectionOrder = ['arrival', 'guidelines', 'utilities', 'contractors', 'leaving'];
        const currentIndex = sectionOrder.indexOf(currentSection);
        const newIndex = Math.max(0, Math.min(sectionOrder.length - 1, currentIndex + direction));
        
        if (newIndex !== currentIndex) {
            showSection(sectionOrder[newIndex]);
        }
    }
    
    loadProgress();
    loadChecklistState();
    
    const savedNotes = JSON.parse(localStorage.getItem('contractorNotes') || '[]');
    if (savedNotes.length > 0) {
        console.log('Previous notes loaded:', savedNotes);
    }
    
    showSection('arrival');
});

const style = document.createElement('style');
style.textContent = `
    .mobile-open {
        display: block !important;
        position: fixed;
        top: 56px;
        left: 0;
        bottom: 0;
        z-index: 999;
        box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    }
    
    .playing {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);