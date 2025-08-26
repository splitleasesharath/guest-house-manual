document.addEventListener('DOMContentLoaded', function() {
    const narrationBtn = document.querySelector('.narration-play');
    const verses = document.querySelectorAll('.verse');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const languageSelector = document.getElementById('languageSelector');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    
    let isPlaying = false;
    let currentVerse = 0;
    let speechUtterance = null;
    let selectedVoice = 0;
    let currentLanguage = 'en';
    
    const translations = {
        en: {
            manualText: {
                0: "The entrance code of the building, which grants access to all contractors, is the number 5165.",
                1: "The front entrance shall be used, which is located on Lexington Avenue, and the apartment dwelling is on the fourth floor, being unit 4B.",
                2: "And the check-in time is established after the third hour past noon, and if arriving before this appointed time, Rod must be contacted.",
                3: "Remove work shoes upon entering, or use the covers provided in the entryway.",
                4: "If furniture needs to be moved for the work, it shall be returned to its original position, as it was found.",
                5: "And tools and materials may be stored in the hallway corner, near the coat closet, but must not block the passage.",
                6: "Send a text message to Rod upon arrival each day, and another when departing, that he may know of your presence.",
                7: "The WiFi network is called Apt4B_Guest and the password thereof is NYC2025fix, written without spaces.",
                8: "The circuit breaker is located in the hallway closet, and the water shut-off valve is under the kitchen sink.",
                9: "And the thermostat shall be maintained between sixty-eight and seventy-two degrees, for the comfort of the dwelling.",
                10: "Small debris shall be placed in the kitchen trash bin, but large items must be taken to the basement disposal area using the service elevator.",
                11: "Work hours are from the ninth hour until the seventeenth hour, Monday through Friday, respecting the neighbors' peace.",
                12: "When working with paint or materials that might spill, drop cloths must be used to protect the floors.",
                13: "And all receipts for materials must be photographed and sent to Rod via text message for reimbursement.",
                14: "Before leaving the dwelling, all lights must be turned off, and all appliances disconnected from power.",
                15: "All windows shall be closed and locked, and the thermostat set to sixty-eight degrees.",
                16: "And the door must be locked, and confirmation of departure sent to Rod via text, that all may be secure."
            },
            ui: {
                narration: "Narration",
                jingles: "Jingles",
                reminders: "Reminders",
                completeManual: "Complete Manual",
                minutes: "min",
                doorCode: "Door Code Memory",
                wifiPassword: "WiFi Password",
                departureChecklist: "Departure Checklist",
                dailyArrival: "Daily arrival text to Rod",
                dailyDeparture: "Daily departure confirmation",
                materialReceipts: "Photograph all receipts"
            }
        },
        es: {
            manualText: {
                0: "El código de entrada del edificio, que otorga acceso a todos los contratistas, es el número 5165.",
                1: "Se usará la entrada principal, que se encuentra en la Avenida Lexington, y el apartamento está en el cuarto piso, siendo la unidad 4B.",
                2: "Y la hora de llegada se establece después de las tres de la tarde, y si llega antes de esta hora designada, debe contactar a Rod.",
                3: "Quítese los zapatos de trabajo al entrar, o use las cubiertas proporcionadas en la entrada.",
                4: "Si es necesario mover muebles para el trabajo, deberán ser devueltos a su posición original, como se encontraron.",
                5: "Y las herramientas y materiales pueden almacenarse en la esquina del pasillo, cerca del armario de abrigos, pero no deben bloquear el paso.",
                6: "Envíe un mensaje de texto a Rod al llegar cada día, y otro al partir, para que sepa de su presencia.",
                7: "La red WiFi se llama Apt4B_Guest y la contraseña es NYC2025fix, escrita sin espacios.",
                8: "El interruptor de circuito está ubicado en el armario del pasillo, y la válvula de cierre de agua está debajo del fregadero de la cocina.",
                9: "Y el termostato se mantendrá entre sesenta y ocho y setenta y dos grados, para la comodidad de la vivienda.",
                10: "Los escombros pequeños se colocarán en el cubo de basura de la cocina, pero los artículos grandes deben llevarse al área de desecho del sótano usando el ascensor de servicio.",
                11: "Las horas de trabajo son desde las nueve hasta las diecisiete, de lunes a viernes, respetando la paz de los vecinos.",
                12: "Al trabajar con pintura o materiales que puedan derramarse, se deben usar lonas protectoras para proteger los pisos.",
                13: "Y todos los recibos de materiales deben ser fotografiados y enviados a Rod por mensaje de texto para reembolso.",
                14: "Antes de salir de la vivienda, todas las luces deben apagarse, y todos los electrodomésticos desconectarse.",
                15: "Todas las ventanas deben cerrarse y bloquearse, y el termostato ajustarse a sesenta y ocho grados.",
                16: "Y la puerta debe cerrarse con llave, y enviarse confirmación de salida a Rod por texto, para que todo esté seguro."
            },
            ui: {
                narration: "Narración",
                jingles: "Melodías",
                reminders: "Recordatorios",
                completeManual: "Manual Completo",
                minutes: "min",
                doorCode: "Código de Puerta",
                wifiPassword: "Contraseña WiFi",
                departureChecklist: "Lista de Salida",
                dailyArrival: "Texto diario de llegada a Rod",
                dailyDeparture: "Confirmación diaria de salida",
                materialReceipts: "Fotografiar todos los recibos"
            }
        },
        uk: {
            manualText: {
                0: "Код входу до будівлі, який надає доступ усім підрядникам, це число 5165.",
                1: "Використовується головний вхід, який знаходиться на проспекті Лексінгтон, і квартира знаходиться на четвертому поверсі, блок 4B.",
                2: "І час заселення встановлено після третьої години пополудні, і якщо прибуваєте раніше цього призначеного часу, необхідно зв'язатися з Родом.",
                3: "Зніміть робоче взуття при вході, або використовуйте чохли, що надаються у вхідній зоні.",
                4: "Якщо меблі потрібно перемістити для роботи, вони повинні бути повернуті на початкове місце, як були знайдені.",
                5: "І інструменти та матеріали можуть зберігатися в кутку коридору, біля шафи для одягу, але не повинні блокувати прохід.",
                6: "Надсилайте текстове повідомлення Роду щодня при прибутті, і ще одне при від'їзді, щоб він знав про вашу присутність.",
                7: "Мережа WiFi називається Apt4B_Guest і пароль NYC2025fix, написаний без пробілів.",
                8: "Автоматичний вимикач знаходиться в шафі коридору, а запірний кран води знаходиться під кухонною раковиною.",
                9: "І термостат повинен підтримуватися між шістдесятьма вісьмома і сімдесятьма двома градусами, для комфорту житла.",
                10: "Дрібне сміття слід класти в кухонне сміттєве відро, але великі предмети потрібно відносити в підвальну зону утилізації за допомогою службового ліфта.",
                11: "Робочі години з дев'ятої до сімнадцятої, з понеділка по п'ятницю, поважаючи спокій сусідів.",
                12: "При роботі з фарбою або матеріалами, які можуть пролитися, необхідно використовувати захисні покриття для підлоги.",
                13: "І всі квитанції за матеріали повинні бути сфотографовані та надіслані Роду текстовим повідомленням для відшкодування.",
                14: "Перед виходом з житла всі світла повинні бути вимкнені, а всі прилади відключені від живлення.",
                15: "Усі вікна повинні бути закриті та заблоковані, а термостат встановлений на шістдесят вісім градусів.",
                16: "І двері повинні бути замкнені, і підтвердження виходу надіслано Роду текстом, щоб все було безпечно."
            },
            ui: {
                narration: "Оповідь",
                jingles: "Мелодії",
                reminders: "Нагадування",
                completeManual: "Повний Посібник",
                minutes: "хв",
                doorCode: "Код Дверей",
                wifiPassword: "Пароль WiFi",
                departureChecklist: "Список Виходу",
                dailyArrival: "Щоденне повідомлення Роду про прибуття",
                dailyDeparture: "Щоденне підтвердження виходу",
                materialReceipts: "Фотографувати всі квитанції"
            }
        }
    };
    
    let manualText = translations[currentLanguage].manualText;
    
    // Language switching functionality
    if (languageSelector) {
        languageSelector.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            manualText = translations[currentLanguage].manualText;
            updateUILanguage();
        });
    }
    
    function updateUILanguage() {
        const ui = translations[currentLanguage].ui;
        
        // Update tab labels (tooltips)
        document.querySelector('[data-tab="narration"]')?.setAttribute('title', ui.narration);
        document.querySelector('[data-tab="jingles"]')?.setAttribute('title', ui.jingles);
        document.querySelector('[data-tab="reminders"]')?.setAttribute('title', ui.reminders);
        
        // Update narration card
        const mediaTitle = document.querySelector('.media-title');
        if (mediaTitle) mediaTitle.textContent = 'David Attenborough';
        
        const mediaDuration = document.querySelector('.media-duration');
        if (mediaDuration) mediaDuration.textContent = `8 ${ui.minutes}`;
        
        // Update jingle labels
        const jingleLabels = document.querySelectorAll('.media-label');
        if (jingleLabels[0]) jingleLabels[0].textContent = ui.doorCode;
        if (jingleLabels[1]) jingleLabels[1].textContent = ui.wifiPassword;
        if (jingleLabels[2]) jingleLabels[2].textContent = ui.departureChecklist;
        
        // Update reminder labels
        const reminderLabels = document.querySelectorAll('#reminders-tab .media-label');
        if (reminderLabels[0]) reminderLabels[0].textContent = ui.dailyArrival;
        if (reminderLabels[1]) reminderLabels[1].textContent = ui.dailyDeparture;
        if (reminderLabels[2]) reminderLabels[2].textContent = ui.materialReceipts;
        
        // Update verse content
        verses.forEach((verse, index) => {
            const verseText = verse.querySelector('.verse-text');
            if (verseText && manualText[index]) {
                const verseNum = verseText.querySelector('.verse-num')?.textContent || '';
                verseText.innerHTML = `<span class="verse-num">${verseNum}</span>${manualText[index]}`;
            }
        });
    }
    
    const voiceSettings = {
        attenborough: { rate: 0.85, pitch: 0.9, volume: 0.9 }
    };
    
    const jingles = {
        doorCode: "Five, one, six, five... opens the door alive! Remember: five, one, six, five!",
        wifi: "N Y C, two zero two five fix... connects you quick! The password is NYC2025fix!",
        departure: "Lock the door, text Rod, job well done! Don't forget to lock up and send that text!"
    };
    
    
    function highlightVerse() {
        verses.forEach((verse, index) => {
            if (index === currentVerse) {
                verse.style.background = 'linear-gradient(to right, transparent, #f4f0f8 5%, #f4f0f8 95%, transparent)';
                verse.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                verse.style.background = 'none';
            }
        });
    }
    
    function updateProgress() {
        const progress = ((currentVerse + 1) / Object.keys(manualText).length) * 100;
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        const currentMinutes = Math.floor((currentVerse * 15) / 60);
        const currentSeconds = (currentVerse * 15) % 60;
        if (currentTimeEl) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        }
    }
    
    function nextVerse() {
        if (currentVerse < Object.keys(manualText).length - 1) {
            currentVerse++;
            highlightVerse();
            updateProgress();
            if (isPlaying) {
                pauseNarration();
                playNarration();
            }
        }
    }
    
    function prevVerse() {
        if (currentVerse > 0) {
            currentVerse--;
            highlightVerse();
            updateProgress();
            if (isPlaying) {
                pauseNarration();
                playNarration();
            }
        }
    }
    
    // Single narration playback
    if (narrationBtn) {
        narrationBtn.addEventListener('click', function() {
            if (this.classList.contains('playing')) {
                stopNarration(this);
            } else {
                startNarration(this, 'full');
            }
        });
    }
    
    function startNarration(btn, type) {
        btn.classList.add('playing');
        if (btn.querySelector('span')) {
            btn.querySelector('span').textContent = 'Stop';
        }
        btn.querySelector('svg path').setAttribute('d', 'M6 6h4v12H6zm8 0h4v12h-4z');
        
        let startVerse = 0;
        let endVerse = Object.keys(manualText).length - 1;
        
        if (type === 'arrival') {
            startVerse = 0;
            endVerse = 2;
        } else if (type === 'guidelines') {
            startVerse = 3;
            endVerse = 10;
        }
        
        currentVerse = startVerse;
        isPlaying = true;
        playSequence(startVerse, endVerse, btn);
    }
    
    function stopNarration(btn) {
        btn.classList.remove('playing');
        if (btn.querySelector('span')) {
            btn.querySelector('span').textContent = 'Play Narration';
        }
        btn.querySelector('svg path').setAttribute('d', 'M6 4v8l6-4z');
        
        isPlaying = false;
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        // Clear verse highlighting
        verses.forEach(v => v.style.background = 'none');
    }
    
    function playSequence(start, end, btn) {
        if (!isPlaying || currentVerse > end) {
            stopNarration(btn);
            return;
        }
        
        const text = manualText[currentVerse];
        if (text) {
            const introText = currentVerse === 0 ? "In the dwelling known as Rod House, we begin our journey. " : "";
            speechUtterance = new SpeechSynthesisUtterance(introText + text);
            const settings = voiceSettings.attenborough;
            speechUtterance.rate = settings.rate;
            speechUtterance.pitch = settings.pitch;
            speechUtterance.volume = settings.volume;
            
            speechUtterance.onend = function() {
                if (currentVerse < end && isPlaying) {
                    currentVerse++;
                    playSequence(start, end, btn);
                } else {
                    stopNarration(btn);
                }
            };
            
            window.speechSynthesis.speak(speechUtterance);
            highlightVerse();
        }
    }
    
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            if (tabName === 'narration') {
                document.getElementById('narration-tab').style.display = 'block';
            } else if (tabName === 'jingles') {
                document.getElementById('jingles-tab').style.display = 'block';
            } else if (tabName === 'reminders') {
                document.getElementById('reminders-tab').style.display = 'block';
            }
        });
    });
    
    document.querySelectorAll('.play-jingle').forEach(btn => {
        btn.addEventListener('click', function() {
            const jingleType = this.dataset.jingle;
            const jingleText = jingles[jingleType];
            
            if (jingleText && 'speechSynthesis' in window) {
                const jingleUtterance = new SpeechSynthesisUtterance(jingleText);
                jingleUtterance.rate = 1.1;
                jingleUtterance.pitch = 1.3;
                jingleUtterance.volume = 0.9;
                window.speechSynthesis.speak(jingleUtterance);
                
                const svg = this.querySelector('svg');
                const originalPath = svg.innerHTML;
                svg.innerHTML = '<rect x="6" y="6" width="4" height="12" fill="currentColor"/><rect x="14" y="6" width="4" height="12" fill="currentColor"/>';
                
                setTimeout(() => {
                    svg.innerHTML = originalPath;
                }, 3000);
            }
        });
    });
    
    document.querySelectorAll('.reminder-toggle input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const reminderItem = this.closest('.reminder-item');
            if (this.checked) {
                reminderItem.classList.add('active');
            } else {
                reminderItem.classList.remove('active');
            }
        });
    });
    
    document.querySelectorAll('.verse-text sup').forEach(sup => {
        sup.addEventListener('click', function() {
            const footnotes = document.querySelector('.footer-notes');
            footnotes.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowRight') {
            nextVerse();
        } else if (e.code === 'ArrowLeft') {
            prevVerse();
        }
    });
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width);
        const newVerse = Math.floor(percentage * Object.keys(manualText).length);
        
        currentVerse = Math.max(0, Math.min(newVerse, Object.keys(manualText).length - 1));
        highlightVerse();
        updateProgress();
        
        if (isPlaying) {
            pauseNarration();
            playNarration();
        }
        });
    }
    
    updateProgress();
    
    // Share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    const shareModal = document.getElementById('shareModal');
    const modalClose = document.querySelector('.modal-close');
    const shareOptions = document.querySelectorAll('.share-option');
    const previewContent = document.getElementById('previewContent');
    
    let currentSection = '';
    
    const sectionData = {
        arrival: {
            title: 'Arrival Instructions',
            content: 'Access code: 5165 | Front entrance on Lexington Ave | 4th floor, unit 4B | Check-in after 3 PM'
        },
        guidelines: {
            title: 'House Guidelines',
            content: 'Remove work shoes | Return furniture to original position | Store tools in hallway corner | Text Rod daily'
        },
        utilities: {
            title: 'Utilities and Connections',
            content: 'WiFi: Apt4B_Guest (NYC2025fix) | Circuit breaker in hallway closet | Thermostat: 68-72°F'
        },
        work: {
            title: 'Work Requirements',
            content: 'Hours: 9 AM - 5 PM Mon-Fri | Use drop cloths for paint | Keep noise reasonable | Photo receipts for Rod'
        },
        departure: {
            title: 'Departure Protocol',
            content: 'Turn off lights | Close windows | Set thermostat to 68°F | Lock door and text Rod'
        }
    };
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentSection = this.dataset.section;
            const section = sectionData[currentSection];
            
            previewContent.innerHTML = `
                <h4>Rod House Manual - ${section.title}</h4>
                <p>${section.content}</p>
            `;
            
            if (shareModal) shareModal.classList.add('active');
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (shareModal) shareModal.classList.remove('active');
        });
    }
    
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === shareModal) {
                shareModal.classList.remove('active');
            }
        });
    }
    
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.dataset.type;
            const section = sectionData[currentSection];
            const url = window.location.href + '#' + currentSection;
            const text = `Rod House Manual - ${section.title}\n${section.content}\n\n`;
            
            switch(type) {
                case 'link':
                    navigator.clipboard.writeText(url).then(() => {
                        showToast('Link copied to clipboard!');
                    });
                    break;
                    
                case 'email':
                    const subject = encodeURIComponent(`Rod House Manual - ${section.title}`);
                    const body = encodeURIComponent(text + 'View online: ' + url);
                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                    break;
                    
                case 'sms':
                    const smsBody = encodeURIComponent(text.substring(0, 140) + '...\n' + url);
                    window.location.href = `sms:?body=${smsBody}`;
                    break;
                    
                case 'whatsapp':
                    const whatsappText = encodeURIComponent(text + url);
                    window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
                    break;
                    
                case 'print':
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                        <html>
                        <head>
                            <title>${section.title}</title>
                            <style>
                                body { font-family: Georgia, serif; padding: 40px; }
                                h1 { color: #7d8471; }
                                p { line-height: 1.6; }
                            </style>
                        </head>
                        <body>
                            <h1>Rod House Manual - ${section.title}</h1>
                            <p>${section.content.replace(/\|/g, '<br>')}</p>
                        </body>
                        </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                    break;
                    
                case 'qr':
                    generateQRCode(url);
                    break;
            }
        });
    });
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            z-index: 2000;
            animation: slideUp 0.3s;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    function generateQRCode(url) {
        // In production, you'd use a QR library here
        const qrModal = document.createElement('div');
        qrModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 2000;
            text-align: center;
        `;
        qrModal.innerHTML = `
            <h3>QR Code</h3>
            <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin: 20px 0;">
                <span style="color: #999;">QR Code for:<br>${url}</span>
            </div>
            <button onclick="this.parentElement.remove()" style="padding: 8px 16px; background: #7d8471; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
        `;
        document.body.appendChild(qrModal);
    }
    
    // Mobile panel functionality
    const mediaPanel = document.querySelector('.media-panel');
    const panelHandle = document.querySelector('.media-panel-handle');
    const mobileToggleBtn = document.querySelector('.mobile-media-toggle');
    let isPanelExpanded = false;
    
    // Mobile toggle button functionality
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', function() {
            toggleMobilePanel();
        });
    }
    
    // Toggle panel on mobile
    if (panelHandle) {
        panelHandle.addEventListener('click', function() {
            toggleMobilePanel();
        });
        
        // Swipe up to open panel
        let touchStartY = 0;
        panelHandle.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        panelHandle.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (deltaY > 50 && !isPanelExpanded) {
                toggleMobilePanel();
            } else if (deltaY < -50 && isPanelExpanded) {
                toggleMobilePanel();
            }
        });
    }
    
    function toggleMobilePanel() {
        if (mediaPanel) {
            isPanelExpanded = !isPanelExpanded;
            if (isPanelExpanded) {
                mediaPanel.classList.remove('collapsed');
                // Hide toggle button when panel is open
                if (mobileToggleBtn) {
                    mobileToggleBtn.classList.add('hidden');
                }
                // Prevent body scroll when panel is open
                document.body.style.overflow = 'hidden';
            } else {
                mediaPanel.classList.add('collapsed');
                // Show toggle button when panel is closed
                if (mobileToggleBtn) {
                    mobileToggleBtn.classList.remove('hidden');
                }
                // Restore body scroll
                document.body.style.overflow = '';
            }
        }
    }
    
    // Add click handler for close button (using pseudo-element click area)
    if (mediaPanel) {
        mediaPanel.addEventListener('click', function(e) {
            // Check if click is in the close button area (top-right corner)
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Close button is in top-right corner (roughly 50x50 pixel area)
            if (clickX > rect.width - 60 && clickY < 60 && isPanelExpanded) {
                toggleMobilePanel();
            }
        });
    }
    
    // Check if we're on mobile and set up panel
    if (window.innerWidth <= 768) {
        // Start collapsed on mobile
        if (mediaPanel) {
            mediaPanel.classList.add('collapsed');
            isPanelExpanded = false;
        }
        
        // Ensure controls work on mobile after a brief delay
        setTimeout(() => {
            ensureMobileControls();
        }, 300);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mediaPanel) {
            mediaPanel.classList.remove('collapsed');
        }
    });
    
    // Ensure mobile media controls work
    function ensureMobileControls() {
        // For mobile/touch devices, ensure controls work
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        if (!isMobile) return; // Only run on mobile
        
        // Make sure narration button works on mobile
        const narrationBtns = document.querySelectorAll('.narration-play');
        narrationBtns.forEach(btn => {
            // Remove any existing click handlers first
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.classList.contains('playing')) {
                    this.classList.remove('playing');
                    this.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M6 4v8l6-4z" fill="white"/></svg>';
                    window.speechSynthesis.cancel();
                    isPlaying = false;
                } else {
                    this.classList.add('playing');
                    this.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16"><rect x="5" y="4" width="2" height="8" fill="white"/><rect x="9" y="4" width="2" height="8" fill="white"/></svg>';
                    isPlaying = true;
                    currentVerse = 0;
                    playSequence(0, Object.keys(manualText).length - 1, this);
                }
            });
        });
        
        // Make sure jingle buttons work on mobile (they have play-jingle class)
        const jingleBtns = document.querySelectorAll('.play-jingle, .jingle-play');
        jingleBtns.forEach(btn => {
            // Remove existing listeners and re-attach for mobile
            const newBtn = btn.cloneNode(true);
            // Keep the data-jingle attribute
            if (btn.dataset.jingle) {
                newBtn.dataset.jingle = btn.dataset.jingle;
            }
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const jingleType = this.dataset.jingle;
                const jingleText = jingles[jingleType];
                
                if (jingleText && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    
                    const utterance = new SpeechSynthesisUtterance(jingleText);
                    utterance.rate = 1.1;
                    utterance.pitch = 1.3;
                    utterance.volume = 0.9;
                    
                    // Visual feedback
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16"><rect x="5" y="4" width="2" height="8" fill="white"/><rect x="9" y="4" width="2" height="8" fill="white"/></svg>';
                    
                    utterance.onend = () => {
                        this.innerHTML = originalHTML;
                    };
                    
                    window.speechSynthesis.speak(utterance);
                }
            });
        });
        
        // Make sure reminder toggles work on mobile
        const reminderToggles = document.querySelectorAll('.reminder-toggle input');
        reminderToggles.forEach(toggle => {
            // Clone and replace to remove any existing listeners
            const newToggle = toggle.cloneNode(true);
            newToggle.checked = toggle.checked; // Preserve state
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('change', function() {
                const reminderItem = this.closest('.reminder-item');
                if (this.checked) {
                    reminderItem.classList.add('active');
                } else {
                    reminderItem.classList.remove('active');
                }
            });
        });
    }
    
    // Initialize mobile controls immediately and after a delay
    ensureMobileControls();
    
    // Also ensure tab switching works on mobile
    const mobileTabs = document.querySelectorAll('.tab-btn');
    mobileTabs.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.style.touchAction = 'manipulation';
    });
    
    // Re-run after delay to catch any dynamically loaded content
    setTimeout(() => {
        ensureMobileControls();
    }, 500);
    
    // Also run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureMobileControls);
    }
    
    // Re-initialize when panel is expanded (in case content changes)
    if (panelHandle) {
        panelHandle.addEventListener('click', function() {
            setTimeout(ensureMobileControls, 100);
        });
    }
    
    // Add both touch and click support for all interactive elements on mobile
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        document.addEventListener('touchstart', function(e) {
            const target = e.target.closest('.narration-play, .jingle-play, .play-jingle, .tab-btn');
            if (target) {
                target.style.opacity = '0.7';
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const target = e.target.closest('.narration-play, .jingle-play, .play-jingle, .tab-btn');
            if (target) {
                setTimeout(() => {
                    target.style.opacity = '1';
                }, 100);
            }
        }, { passive: true });
    }
});