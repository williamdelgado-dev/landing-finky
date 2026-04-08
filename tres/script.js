const programsData = [
    { id: 96, name: "Pack A2", programTypeId: "1" },
    { id: 97, name: "Pack B1", programTypeId: "1" },
    { id: 98, name: "Pack B2", programTypeId: "1" },
    { id: 99, name: "Cursos Individuales", programTypeId: "1" },
];

document.addEventListener('DOMContentLoaded', () => {
    // Selects logic
    const ofertaSelect = document.getElementById('oferta');
    const programasSelect = document.getElementById('programas');

    if (ofertaSelect && programasSelect) {
        ofertaSelect.addEventListener('change', (e) => {
            const typeId = e.target.value;
            programasSelect.innerHTML = '<option value="">Programas de estudio</option>';
            
            if (typeId) {
                const filtered = programsData.filter(p => p.programTypeId === typeId);
                filtered.forEach(program => {
                    const option = document.createElement('option');
                    option.value = program.id;
                    option.textContent = program.name;
                    programasSelect.appendChild(option);
                });
            }
        });
    }

    // Modal Submission
    const submitBtn = document.getElementById('modalSubmit');
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const nameInput = document.getElementById('modalName');
            const phoneInput = document.getElementById('modalPhone');
            const habeasDataInput = document.getElementById('habeasData');

            if (!nameInput || !phoneInput || !habeasDataInput) return;

            const name = nameInput.value;
            const phone = phoneInput.value;
            const habeasData = habeasDataInput.checked;

            if (!name || !phone) {
                alert('Por favor completa todos los campos');
                return;
            }

            if (!habeasData) {
                alert('Debes aceptar la política de privacidad');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const response = await fetch('https://api-production.finky.la/api/user/callback-ai/create-callback-ai-v2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: phone,
                        name: name,
                        Pantalla: 'b4m'
                    })
                });

                if (response.ok) {
                    alert('Solicitud enviada con éxito. Pronto nos contactaremos contigo.');
                    closeModal();
                } else {
                    alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error de conexión. Por favor intenta de nuevo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Llamar';
            }
        });
    }
});

// Modal Logic
window.openModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.add('active');
};

window.closeModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('active');
};
