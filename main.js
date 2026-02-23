document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. NAVBAR SCROLL EFFECT --- */
    const nav = document.getElementById('navbar');
    const navTextGalli = document.getElementById('nav-text-galli');
    const desktopLinks = document.querySelectorAll('.nav-link-desktop');
    const mobileBtn = document.getElementById('mobile-menu-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('bg-white', 'shadow-xl', 'py-2');
            nav.classList.remove('bg-black/40', 'backdrop-blur-sm', 'py-4');
            navTextGalli.classList.add('text-galli-dark'); navTextGalli.classList.remove('text-white');
            mobileBtn.classList.add('text-galli-dark'); mobileBtn.classList.remove('text-white');
            desktopLinks.forEach(link => {
                link.classList.add('text-gray-800');
                link.classList.remove('text-white', 'drop-shadow-md');
            });
        } else {
            nav.classList.remove('bg-white', 'shadow-xl', 'py-2');
            nav.classList.add('bg-black/40', 'backdrop-blur-sm', 'py-4');
            navTextGalli.classList.remove('text-galli-dark'); navTextGalli.classList.add('text-white');
            mobileBtn.classList.remove('text-galli-dark'); mobileBtn.classList.add('text-white');
            desktopLinks.forEach(link => {
                link.classList.remove('text-gray-800');
                link.classList.add('text-white', 'drop-shadow-md');
            });
        }
    });

    /* --- 2. MOBILE MENU --- */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    /* --- 3. ANIMAÇÕES DE SCROLL (FADE-IN UP) --- */
    const animElements = document.querySelectorAll('.scroll-anim');
    animElements.forEach(el => el.classList.add('scroll-hidden'));

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('scroll-hidden');
                entry.target.classList.add('animate-fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do elemento aparece

    animElements.forEach(el => scrollObserver.observe(el));

    /* --- 4. HERO SLIDER --- */
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('opacity-40');
        slides[currentSlide].classList.add('opacity-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-40');
    }, 5000);

    /* --- 5. SERVICES CAROUSEL (COM SWIPE/TOUCH) --- */
    const SOLUTIONS_DATA = [
        { title: "Serviços Patrimoniais", desc: "Prevenção de perdas e proteção de ativos. Controle de acesso rigoroso, vigilância ostensiva e proteção perimetral para sua empresa.", icon: "shield-check", color: "border-galli-gold" },
        { title: "Segurança Condominial", desc: "Tranquilidade para moradores com controle de acesso de visitantes, monitoramento de áreas comuns e profissionais treinados para lidar com o público.", icon: "building-2", color: "border-galli-dark" },
        { title: "Segurança Eletrônica", desc: "Tecnologia de ponta com monitoramento 24h, CFTV inteligente, alarmes e sensores integrados para uma proteção tecnológica completa.", icon: "cctv", color: "border-galli-gold" },
        { title: "Gestão de Segurança", desc: "Análise de riscos, planejamento estratégico e consultoria especializada para identificar vulnerabilidades e criar protocolos eficientes.", icon: "clipboard-list", color: "border-galli-dark" },
        { title: "Conservação e Limpeza", desc: "Serviços de facilities completos: limpeza predial, jardinagem e manutenção, garantindo um ambiente higienizado e agradável.", icon: "sparkles", color: "border-galli-gold" },
        { title: "Segurança Residencial", desc: "Monitoramento e vigilância personalizada para residências, garantindo a proteção da sua família e do seu patrimônio com atendimento 24h.", icon: "home", color: "border-galli-dark" },
        { title: "Segurança Corporativa", desc: "Estratégias avançadas de segurança para o ambiente corporativo, protegendo colaboradores, informações sensíveis e instalações.", icon: "briefcase", color: "border-galli-gold" }
    ];

    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentIndex = 0;
    let itemsPerScreen = window.innerWidth >= 768 ? 3 : 1;

    // Render Cards
    SOLUTIONS_DATA.forEach(sol => {
        track.innerHTML += `
            <div class="flex-shrink-0 px-3 w-full md:w-1/3">
                <div class="bg-gray-50 p-8 rounded-xl border-t-4 ${sol.color} shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div class="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                        <i data-lucide="${sol.icon}" class="text-galli-gold w-8 h-8"></i>
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-4 text-gray-800">${sol.title}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed flex-grow">${sol.desc}</p>
                </div>
            </div>`;
    });

    function updateCarousel() {
        const maxIndex = SOLUTIONS_DATA.length - itemsPerScreen;
        if(currentIndex > maxIndex) currentIndex = maxIndex;
        if(currentIndex < 0) currentIndex = 0;
        
        track.style.transform = `translateX(-${currentIndex * (100 / itemsPerScreen)}%)`;
        
        dotsContainer.innerHTML = '';
        for(let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-galli-gold w-6' : 'bg-gray-300'}`;
            dot.onclick = () => { currentIndex = i; updateCarousel(); };
            dotsContainer.appendChild(dot);
        }
    }
    
    window.addEventListener('resize', () => {
        itemsPerScreen = window.innerWidth >= 768 ? 3 : 1;
        updateCarousel();
    });
    
    document.getElementById('next-slide').onclick = () => {
        currentIndex = currentIndex >= SOLUTIONS_DATA.length - itemsPerScreen ? 0 : currentIndex + 1;
        updateCarousel();
    };
    document.getElementById('prev-slide').onclick = () => {
        currentIndex = currentIndex <= 0 ? SOLUTIONS_DATA.length - itemsPerScreen : currentIndex - 1;
        updateCarousel();
    };
    
    // Suporte a Touch/Arrastar para Celular
    let startX = 0;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, {passive: true});
    
    track.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) { // Arrastou para a esquerda
            document.getElementById('next-slide').click();
        } else if (endX - startX > 50) { // Arrastou para a direita
            document.getElementById('prev-slide').click();
        }
    });

    updateCarousel();

    /* --- 6. LIGHTBOX DA GALERIA --- */
    window.openLightbox = function(el) {
        const imgSrc = el.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer animate-fade-in-up';
        lightbox.innerHTML = `
            <img src="${imgSrc}" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl">
            <button class="absolute top-6 right-6 text-white hover:text-galli-gold transition-colors">
                <i data-lucide="x" class="w-10 h-10"></i>
            </button>
        `;
        lightbox.onclick = () => lightbox.remove();
        document.body.appendChild(lightbox);
        lucide.createIcons(); // Carrega o icone de X
    }

    /* --- 7. CONTACT FORM COM VALIDAÇÃO VISUAL --- */
    let formType = 'client';
    const btnClient = document.getElementById('tab-client');
    const btnCandidate = document.getElementById('tab-candidate');
    const textAreaMsg = document.getElementById('textarea-msg');
    const form = document.getElementById('contactForm');

    function toggleForm() {
        // Toggle campos (limpa os que somem e reseta as bordas)
        resetValidation();
        document.getElementById('field-cnpj').classList.toggle('hidden', formType === 'candidate');
        document.getElementById('field-service').classList.toggle('hidden', formType === 'candidate');
        document.getElementById('buttons-client').classList.toggle('hidden', formType === 'candidate');
        
        document.getElementById('field-role').classList.toggle('hidden', formType === 'client');
        document.getElementById('field-pdf-note').classList.toggle('hidden', formType === 'client');
        document.getElementById('btn-submit-candidate').classList.toggle('hidden', formType === 'client');

        // Toggle "required" em CNPJ para não bloquear form do candidato
        const inputCnpj = document.querySelector('input[name="cnpj"]');
        if(formType === 'client') inputCnpj.setAttribute('required', 'true');
        else inputCnpj.removeAttribute('required');

        textAreaMsg.placeholder = formType === 'client' ? "Como podemos ajudar sua empresa?" : "Fale um pouco sobre sua experiência.";

        btnClient.className = formType === 'client' 
            ? 'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-all bg-galli-dark text-white shadow-md'
            : 'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-all text-gray-500 hover:text-gray-800';
            
        btnCandidate.className = formType === 'candidate'
            ? 'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-all bg-galli-gold text-white shadow-md'
            : 'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-all text-gray-500 hover:text-gray-800';
    }

    btnClient.onclick = () => { formType = 'client'; toggleForm(); };
    btnCandidate.onclick = () => { formType = 'candidate'; toggleForm(); };

    // Função de Validação (Bordas vermelhas)
    function resetValidation() {
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.classList.remove('border-red-500', 'ring-red-500', 'ring-1');
            field.classList.add('border-gray-300');
        });
    }

    function validateForm() {
        let isValid = true;
        resetValidation();
        
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        fields.forEach(field => {
            // Checa apenas campos visíveis
            if (field.offsetParent !== null && !field.value.trim()) {
                field.classList.remove('border-gray-300');
                field.classList.add('border-red-500', 'ring-red-500', 'ring-1');
                isValid = false;
            }
        });
        return isValid;
    }

    function handleSubmit(method) {
        if(!validateForm()) return; // Barra o envio e mostra os vermelhos

        const fd = new FormData(form);
        const name = fd.get('name'), phone = fd.get('phone'), email = fd.get('email'), msg = fd.get('message');
        
        if (formType === 'client') {
            const text = `Olá, vim pelo site do Grupo Galli.\n\n*Gostaria de um orçamento.*\n\n*Nome:* ${name}\n*CNPJ:* ${fd.get('cnpj')}\n*Telefone:* ${phone}\n*Email:* ${email}\n*Serviço de Interesse:* ${fd.get('service')}\n*Mensagem:* ${msg}`;
            if (method === 'whatsapp') {
                window.open(`https://wa.me/5521967472721?text=${encodeURIComponent(text)}`, '_blank');
            } else {
                window.location.href = `mailto:Comercial.grupogalli@gmail.com?subject=${encodeURIComponent('Solicitação de Orçamento - ' + name)}&body=${encodeURIComponent(text.replace(/\*/g, ''))}`;
            }
        } else {
            const role = fd.get('role');
            const body = `Olá, equipe de recrutamento do Grupo Galli.\n\nGostaria de me candidatar para a vaga de ${role}.\n\nMeus Dados:\nNome: ${name}\nTelefone: ${phone}\nEmail: ${email}\n\nMinha Experiência/Mensagem:\n${msg}\n\n(Segue meu currículo em anexo)`;
            window.location.href = `mailto:admissao.grupogalli@gmail.com?subject=${encodeURIComponent('Candidatura para Vaga de ' + role + ' - ' + name)}&body=${encodeURIComponent(body)}`;
        }
    }

    document.getElementById('btn-submit-wpp').onclick = () => handleSubmit('whatsapp');
    document.getElementById('btn-submit-email').onclick = () => handleSubmit('email');
    document.getElementById('btn-submit-candidate').onclick = () => handleSubmit('email');

    // Inicializa todos os ícones do Lucide
    lucide.createIcons();
});