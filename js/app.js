/*
app.js - JavaScript-ul aplicatiei DevConnect Static
Vom scrie aici:
- Datele speakerilor si workshopurilor (hardcodate)

- Randarea dinamica a cardurilor
- Validarea si trimiterea formularului de contact
- Functionalitati interactive
Vom completa acest fisier in Laboratorul 4
*/
// Verifica ca fisierul este incarcat corect
console.log("DevConnect app.js incarcat cu succes!");
/*
app.js - JavaScript-ul aplicatiei DevConnect Static
Structura:
1. DATE - speakeri, workshopuri (hardcodate)
2. RANDARE - generare carduri HTML din date
3. VALIDARE - verificare campuri formular
4. FORMULAR - gestionare submit
5. INIT - pornirea aplicatiei
*/
// ============================================================
// 1. DATE - Speakeri si Workshopuri
// ============================================================
// Array de obiecte - fiecare obiect este un speaker
const speakeri = [
    {
        id: 1,
        nume: 'Ana Popescu',
        titlu: 'Senior Frontend Engineer',
        companie: 'Google',
        sesiune: 'React la Scara Mare',
        tip: 'Talk',
        data: '2025-09-15',
        ora: '10:00',
        sala: 'Sala A',
        // Vom folosi o imagine placeholder pana adaugam imagini reale
        poza: 'https://i.pravatar.cc/300?img=1',
        bio: 'Ana lucreaza la Google din 2018 si conduce echipa de frontend pentru Google Maps.',
        twitter: '@AnaPopescuDev',
    },
    {
        id: 2,
        nume: 'Ion Ionescu',
        titlu: 'DevOps Lead',
        companie: 'Microsoft',
        sesiune: 'CI/CD cu GitHub Actions',
        tip: 'Workshop',
        data: '2025-09-15',

        ora: '14:00',
        sala: 'Sala B',
        poza: 'https://i.pravatar.cc/300?img=3',
        bio: 'Ion este expert in DevOps si automatizare, cu 10 ani experienta in infrastructura cloud.',
        twitter: '@IonIonescuOps',
    },
    {
        id: 3,
        nume: 'Maria Constantin',
        titlu: 'AI Researcher',
        companie: 'DeepMind',
        sesiune: 'AI in Dezvoltarea Web',
        tip: 'Talk',
        data: '2025-09-16',
        ora: '11:00',
        sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=5',
        bio: 'Maria cerceteaza aplicatiile AI in interfete utilizator si accesibilitate.',
        twitter: '@MariaConstAI',
    },
    {
        id: 4,
        nume: 'Radu Marin',
        titlu: 'Node.js Core Contributor',
        companie: 'Freelancer',
        sesiune: 'Node.js in Productie',
        tip: 'Talk',
        data: '2025-09-15',
        ora: '14:00',
        sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=8',
        bio: 'Radu contribuie la Node.js core si a construit sisteme pentru 10M+ utilizatori.',
        twitter: '@RaduMarinJS',
    },
    {
        id: 5,
        nume: 'Elena Popa',
        titlu: 'Cloud Architect',
        companie: 'AWS',
        sesiune: 'Docker pentru Dezvoltatori',
        tip: 'Workshop',
        data: '2025-09-15',
        ora: '14:00',
        sala: 'Sala B',
        poza: 'https://i.pravatar.cc/300?img=9',
        bio: 'Elena proiecteaza arhitecturi cloud pentru startup-uri si enterprise la Amazon Web Services.',
        twitter: '@ElenaPopaCloud',
    },
    {
        id: 6,
        nume: 'Mihai Dumitru',
        titlu: 'Security Engineer',
        companie: 'Cloudflare',
        sesiune: 'Securitate Web in 2025',
        tip: 'Talk',
        data: '2025-09-16',
        ora: '14:00',
        sala: 'Sala A',
        poza: 'https://i.pravatar.cc/300?img=12',
        bio: 'Mihai protejeaza infrastructura Cloudflare si tine conferinte despre vulnerabilitati web.',
        twitter: '@MihaiSecurity',
    },
];
// Array de workshopuri

const workshopuri = [
    {
        id: 1,
        titlu: 'React Avansat: Hooks si Performance',
        speaker: 'Ana Popescu',
        durata: '3 ore',
        nivel: 'Avansat',
        locuri: 30,
        locuriLibere: 8,
        data: '15 septembrie',
        ora: '10:00 - 13:00',
        sala: 'Sala A',
        descriere: 'Patterns avansate React, optimizare re-randari, Suspense si Concurrent Mode.',
    },
    {
        id: 2,
        titlu: 'CI/CD complet cu GitHub Actions',
        speaker: 'Ion Ionescu',
        durata: '4 ore',
        nivel: 'Intermediar',
        locuri: 25,
        locuriLibere: 0,
        data: '15 septembrie',
        ora: '14:00 - 18:00',
        sala: 'Sala B',
        descriere: 'De la zero la deployment automat cu teste, Docker si GitHub Actions.',
    },
    {
        id: 3,
        titlu: 'Introducere in AI pentru Dezvoltatori Web',
        speaker: 'Maria Constantin',
        durata: '2 ore',
        nivel: 'Incepator',
        locuri: 40,
        locuriLibere: 22,
        data: '16 septembrie',
        ora: '11:00 - 13:00',
        sala: 'Sala A',
        descriere: 'API-uri AI (OpenAI, Gemini) integrate in aplicatii web reale.',
    },
];
console.log('Date incarcate:', speakeri.length, 'speakeri,', workshopuri.length,
    'workshopuri');// ============================================================
// 2. RANDARE - Generare HTML din date
// ============================================================
// --- 2.1 Randarea speakerilor ---
// Functia primeste un obiect speaker si returneaza HTML ca string
function creeazaCardSpeaker(speaker) {
    // Determinam culoarea badge-ului dupa tipul sesiunii
    const culoareTip = speaker.tip === 'Workshop' ? '#2E5FAC' : '#1A6B6B';
    // Template literal - HTML complet pentru un card
    return `
<article class='card-speaker' data-id='${speaker.id}'>
<figure>
<img
src='${speaker.poza}'
alt='Fotografie ${speaker.nume}, ${speaker.titlu} la
${speaker.companie}'
width='300'
height='300'
loading='lazy'
>
<figcaption>${speaker.companie}</figcaption>
</figure>
<div class='card-body'>
<span class='badge-tip' style='background:${culoareTip}'>
${speaker.tip}
</span>
<h3>${speaker.nume}</h3>
<p class='titlu-job'>${speaker.titlu}</p>
<p class='sesiune'>${speaker.sesiune}</p>
<p class='data-sesiune'>
<time datetime='${speaker.data}T${speaker.ora}'>
${speaker.data.slice(8, 10)} sept. • ${speaker.ora} • ${speaker.sala}
</time>
</p>
<p class='bio'>${speaker.bio}</p>
<a href='https://twitter.com/${speaker.twitter.replace('@', '')}'
class='link-twitter' target='_blank' rel='noopener'>
${speaker.twitter}
</a>

</div>
</article>
`;
}
// Functia care randeaza TOTI speakerii in pagina
function randeazaSpeakeri() {
    // 1. Gasim containerul din HTML (div.grid-speakeri)
    const container = document.querySelector('.grid-speakeri');
    // 2. Verificam ca elementul exista in pagina
    if (!container) {
        console.error('Eroare: .grid-speakeri nu a fost gasit in pagina!');
        return;
    }
    // 3. Generam HTML pentru toti speakerii cu .map() si .join()
    // .map() → transforma fiecare speaker in HTML string
    // .join('') → uneste toate string-urile intr-unul singur
    const htmlSpeakeri = speakeri.map(creeazaCardSpeaker).join('');
    // 4. Inlocuim continutul containerului cu HTML-ul generat
    container.innerHTML = htmlSpeakeri;
    console.log(`Randat ${speakeri.length} carduri de speakeri.`);
}
// --- 2.2 Randarea workshopurilor ---
function creeazaCardWorkshop(workshop) {
    const complet = workshop.locuriLibere === 0;
    const procentOcupat = Math.round(
        ((workshop.locuri - workshop.locuriLibere) / workshop.locuri) * 100
    );
    return `
<article class='card-workshop ${complet ? 'complet' : ''}'>
<div class='workshop-header'>
<span class='badge-nivel nivel-
${workshop.nivel.toLowerCase()}'>${workshop.nivel}</span>
<span class='workshop-durata'>${workshop.durata}</span>
</div>
<h3>${workshop.titlu}</h3>
<p class='workshop-speaker'>cu ${workshop.speaker}</p>
<p class='workshop-descriere'>${workshop.descriere}</p>
<div class='workshop-meta'>
<p>${workshop.data} • ${workshop.ora}</p>
<p>${workshop.sala}</p>
</div>
<div class='workshop-locuri'>
<div class='bara-progres'>
<div class='bara-umpluta' style='width: ${procentOcupat}%'></div>
</div>
<p class='text-locuri'>
${complet
            ? '<strong>Complet</strong> - lista de asteptare disponibila'
            : `<strong>${workshop.locuriLibere}</strong> locuri disponibile din
${workshop.locuri}`
        }
</p>
</div>
<button
class='btn-inscriere ${complet ? 'btn-asteptare' : 'btn-primar'}'
data-workshop-id='${workshop.id}'
${complet ? '' : ''}
>
${complet ? 'Lista de asteptare' : 'Inscrie-te'}
</button>
</article>

`;
}
function randeazaWorkshopuri() {
    // Cautam sectiunea #contact - workshopurile apar inainte de formular
    const sectiuneContact = document.querySelector('#contact .container');
    if (!sectiuneContact) return;
    // Cream un div nou pentru workshopuri si il inseram inaintea formularului
    const divWorkshopuri = document.createElement('div');
    divWorkshopuri.className = 'grid-workshopuri';
    divWorkshopuri.innerHTML = workshopuri.map(creeazaCardWorkshop).join('');
    const titluWorkshopuri = document.createElement('h2');
    titluWorkshopuri.textContent = 'Workshopuri Disponibile';
    titluWorkshopuri.style.textAlign = 'center';
    titluWorkshopuri.style.color = '#1B3A6B';
    titluWorkshopuri.style.marginBottom = '2rem';
    const form = sectiuneContact.querySelector('form');
    sectiuneContact.insertBefore(divWorkshopuri, form);
    sectiuneContact.insertBefore(titluWorkshopuri, divWorkshopuri);
    console.log(`Randat ${workshopuri.length} carduri de workshopuri.`);
}// ============================================================
// 3. VALIDARE - Verificarea campurilor formularului
// ============================================================
// Obiect cu regulile de validare pentru fiecare camp
const reguli = {
    // Functie de validare: primeste valoarea, returneaza string cu eroarea sau '' (valid)
    numeComplet: (val) => {
        if (val.trim().length < 3)
            return 'Numele trebuie sa aiba minim 3 caractere.';
        if (!/^[a-zA-ZáàâäãåæçéèêëíìîïóòôöõúùûüýÿAÂÎȘȚăâîșț\s-]+$/.test(val))
            return 'Numele poate contine doar litere, spatii si cratima.';
        return ''; // valid
    },
    email: (val) => {
        // Regex simplu pentru validare email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
            return 'Adresa de email nu este valida. Exemplu: ana@gmail.com';
        return '';
    },
    telefon: (val) => {
        // Campul este optional - daca e gol, e valid
        if (val.trim() === '') return '';
        // Daca e completat, verifica formatul romanesc
        if (!/^(\+40|0)[0-9]{9}$/.test(val.replace(/\s/g, '')))
            return 'Format: +40 7XX XXX XXX sau 07XX XXX XXX';
        return '';
    },
};
// Afiseaza sau ascunde mesajul de eroare pentru un camp
function afiseazaEroare(idCamp, mesaj) {
    const spanEroare = document.getElementById('eroare-' + idCamp);
    const input = document.getElementById(idCamp);
    if (!spanEroare || !input) return;
    if (mesaj) {
        // Exista eroare: afiseaza mesajul si stilizeaza input-ul
        spanEroare.textContent = mesaj;
        spanEroare.removeAttribute('hidden');
        input.style.borderColor = '#dc3545'; // rosu
        input.setAttribute('aria-invalid', 'true');
    } else {

        // Valid: ascunde mesajul si stilizeaza input-ul verde
        spanEroare.textContent = '';
        spanEroare.setAttribute('hidden', '');
        input.style.borderColor = '#28a745'; // verde
        input.removeAttribute('aria-invalid');
    }
}
// Valideaza UN singur camp si afiseaza rezultatul
function valideazaCamp(idCamp) {
    const input = document.getElementById(idCamp);
    if (!input || !reguli[idCamp]) return true; // campul nu are regula → valid
    // Obtinem valoarea si rulam regula
    const valoare = input.value;
    const eroare = reguli[idCamp](valoare);
    afiseazaEroare(idCamp, eroare);
    return eroare === ''; // true daca valid
}
// Valideaza numarul de workshopuri selectate (max 2)
function valideazaWorkshopuri() {
    const checkboxuri = document.querySelectorAll('input[name="workshop"]:checked');
    if (checkboxuri.length > 2) {
        alert('Poti selecta maximum 2 workshopuri!');
        // Debifam ultimul selectat
        this.checked = false;
        return false;
    }
    return true;
}
// Ataseaza validare in timp real la campurile formularului
function ataseazaValidareTimReal() {
    const campur = ['nume-complet', 'email', 'telefon'];
    campur.forEach(idCamp => {
        const input = document.getElementById(idCamp);
        if (!input) return;
        // 'blur' = eveniment cand utilizatorul paraseste campul (da Tab sau clic in alta parte)
        input.addEventListener('blur', () => valideazaCamp(idCamp));
        // 'input' = eveniment la fiecare tastare (validare live)
        // Validam live doar daca campul a mai fost atins (a primit blur)
        input.addEventListener('input', () => {
            // Validam live numai daca input-ul a fost deja atins
            if (input.dataset.atins === 'true') {
                valideazaCamp(idCamp);
            }
        });
        // Marcam campul ca 'atins' la primul blur
        input.addEventListener('blur', () => {
            input.dataset.atins = 'true';
        }, { once: true }); // { once: true } = se executa o singura data
    });
    // Validare workshopuri la fiecare schimbare
    document.querySelectorAll('input[name="workshop"]').forEach(cb => {
        cb.addEventListener('change', valideazaWorkshopuri);
    });
}// ============================================================
// 4. FORMULAR - Gestionare submit si localStorage
// ============================================================
// Colecteaza toate datele din formular intr-un obiect
function colecteazaDateFormular() {
    // Colectam workshopurile bifate (poate fi un array)
    const workshopuriSelectate = Array.from(
        document.querySelectorAll('input[name="workshop"]:checked')
    ).map(cb => cb.value);
    // Gasim radio-ul selectat pentru tipul de participant
    const tipRadio = document.querySelector('input[name="tipParticipant"]:checked');
    return {
        numeComplet: document.getElementById('nume-complet')?.value.trim() || '',
        email: document.getElementById('email')?.value.trim() || '',
        telefon: document.getElementById('telefon')?.value.trim() || '',
        tipParticipant: tipRadio ? tipRadio.value : 'student',
        workshopuri: workshopuriSelectate,
        mesaj: document.getElementById('mesaj')?.value.trim() || '',
        dataInregistrare: new Date().toISOString(), // timestamp
    };
}
// Salveaza inregistrarea in localStorage

function salveazaInregistrare(date) {
    // Citim inregistrarile existente (sau array gol daca nu exista)
    const existente = JSON.parse(
        localStorage.getItem('devconnect_inregistrari') || '[]'
    );
    // Adaugam noua inregistrare
    existente.push(date);
    // Salvam inapoi ca JSON string
    localStorage.setItem('devconnect_inregistrari', JSON.stringify(existente));
    console.log('Inregistrare salvata:', date);
    console.log('Total inregistrari:', existente.length);
}
// Afiseaza mesajul de succes sau eroare
function afiseazaMesajStatus(tip, mesaj) {
    const div = document.getElementById('mesaj-status');
    if (!div) return;
    div.textContent = mesaj;
    div.removeAttribute('hidden');
    // Stilizam diferit pentru succes vs eroare
    div.style.padding = '1rem';
    div.style.borderRadius = '8px';
    div.style.marginTop = '1rem';
    div.style.fontWeight = '600';
    if (tip === 'succes') {
        div.style.background = '#d4edda';
        div.style.color = '#155724';
        div.style.border = '1px solid #c3e6cb';
    } else {
        div.style.background = '#f8d7da';
        div.style.color = '#721c24';
        div.style.border = '1px solid #f5c6cb';
    }
    // Scroll la mesaj pentru a fi vizibil
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// Gestioneaza submit-ul formularului
function gestioneazaSubmit(eveniment) {
    // CRITIC: previne comportamentul implicit (reload pagina)
    eveniment.preventDefault();
    // 1. Validam toate campurile obligatorii
    const numeValid = valideazaCamp('nume-complet');
    const emailValid = valideazaCamp('email');
    const telefonValid = valideazaCamp('telefon');
    // Marcam toate campurile ca 'atinse' (pentru a afisa erorile)
    ['nume-complet', 'email', 'telefon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.dataset.atins = 'true';
    });
    // Daca oricare camp e invalid, oprim procesarea
    if (!numeValid || !emailValid || !telefonValid) {
        afiseazaMesajStatus('eroare',
            'Formularul contine erori. Verifica campurile marcate cu rosu.'
        );
        // Focus pe primul camp cu eroare
        const primaEroare = document.querySelector('[aria-invalid="true"]');
        if (primaEroare) primaEroare.focus();
        return;

    }
    // 2. Colectam datele din formular
    const date = colecteazaDateFormular();
    // 3. Verificam email duplicat
    const existente = JSON.parse(
        localStorage.getItem('devconnect_inregistrari') || '[]'
    );
    const emailDuplicat = existente.some(r => r.email === date.email);
    if (emailDuplicat) {
        afiseazaMesajStatus('eroare',
            `Adresa ${date.email} este deja inregistrata la DevConnect 2025.`
        );
        return;
    }
    // 4. Salvam in localStorage
    salveazaInregistrare(date);
    // 5. Afisam mesaj de succes
    const numeAfisat = date.numeComplet.split(' ')[0]; // doar prenumele
    afiseazaMesajStatus('succes',
        `Multumim, ${numeAfisat}! Inregistrarea ta a fost primita. ` +
        `Vei primi confirmarea la ${date.email}.`
    );
    // 6. Resetam formularul
    eveniment.target.reset();
    // 7. Resetam stilurile campurilor (eliminam bordura verde/rosie)
    ['nume-complet', 'email', 'telefon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.borderColor = '';
            el.dataset.atins = 'false';
        }
    });
}
// Ataseaza handler-ul de submit la formular
function initFormular() {
    const form = document.getElementById('form-inregistrare');
    if (!form) {
        console.error('Formularul #form-inregistrare nu a fost gasit!');
        return;
    }
    form.addEventListener('submit', gestioneazaSubmit);
    ataseazaValidareTimReal();
    console.log('Formular initializat cu validare.');
}// ============================================================
// 5. INIT - Pornirea aplicatiei
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM gata - initializez aplicatia DevConnect...');
    // 1. Randam speakerii din date in sectiunea #speakeri
    randeazaSpeakeri();
    // 2. Randam workshopurile in sectiunea #contact
    randeazaWorkshopuri();
    // 3. Initializam validarea formularului
    initFormular();
    // 4. Navigatie smooth scroll pentru linkurile ancora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const tinta = document.querySelector(this.getAttribute('href'));
            if (tinta) {
                e.preventDefault();
                tinta.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // 5. Animatie simpla la aparitia elementelor (Intersection Observer)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 } // se declanseaza cand 10% din element e vizibil
    );
    // Aplicam animatia la cardurile de speakeri si workshopuri
    document.querySelectorAll('.card-speaker, .card-workshop').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
    });
    console.log('Aplicatie DevConnect initiata cu succes!');
});
// Functie utilitara: afiseaza inregistrarile salvate (pentru debug)
// Apeleaza devconnect_debug() in Console pentru a vedea toate inregistrarile
window.devconnect_debug = function () {
    const date = JSON.parse(
        localStorage.getItem('devconnect_inregistrari') || '[]'
    );
    console.table(date);
    return date;
};