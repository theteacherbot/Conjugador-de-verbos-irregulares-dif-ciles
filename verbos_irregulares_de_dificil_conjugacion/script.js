const verbData = {
    asir: {
        meaning: "Tomar o agarrar a alguien o algo, especialmente con las manos.",
        prompt: "person grabbing a wooden handle tightly",
        presente: ["asgo", "ases", "ase", "asimos", "asís", "asen"],
        preterito: ["así", "asiste", "asió", "asimos", "asisteis", "asieron"],
        futuro: ["asiré", "asirás", "asirá", "asiremos", "asiréis", "asirán"],
        irregulares: [0] // Índice del yo en presente es irregular crítico
    },
    erguir: {
        meaning: "Levantar y poner derecha una cosa. Ponerse derecho o tieso.",
        prompt: "proud person standing tall posture",
        presente: ["yergo / irgo", "yergues / irgues", "yergue / irgue", "erguimos", "erguís", "yerguen / irguen"],
        preterito: ["erguí", "erguiste", "irguió", "erguimos", "erguisteis", "irguieron"],
        futuro: ["erguiré", "erguirás", "erguirá", "erguiremos", "erguiréis", "erguirán"],
        irregulares: [0, 1, 2, 5]
    },
    roer: {
        meaning: "Cortar en trozos muy menudos y superficialmente algo duro con los dientes.",
        prompt: "small rodent gnawing on a piece of wood",
        presente: ["roigo / roo / royo", "roes", "roe", "roemos", "roéis", "roen"],
        preterito: ["roí", "roíste", "royó", "roímos", "roísteis", "royeron"],
        futuro: ["roeré", "roerás", "roerá", "roeremos", "roeréis", "roerán"],
        irregulares: [0]
    },
    yacer: {
        meaning: "Estar echada o tendida una persona. Dicho de un cadáver: Estar en la sepultura.",
        prompt: "ancient stone tomb lying in a forest",
        presente: ["yazco / yazgo / yago", "yaces", "yace", "yacemos", "yacéis", "yacen"],
        preterito: ["yací", "yaciste", "yació", "yacimos", "yacisteis", "yacieron"],
        futuro: ["yaceré", "yacerás", "yacerá", "yaceremos", "yaceréis", "yacerán"],
        irregulares: [0]
    },
    argüir: {
        meaning: "Sacar en claro, deducir como consecuencia natural. Disputar o impugnar.",
        prompt: "philosophers arguing in ancient greece",
        presente: ["arguyo", "arguyes", "arguye", "argüimos", "argüís", "arguyen"],
        preterito: ["argüí", "argüiste", "arguyó", "argüimos", "argüisteis", "arguyeron"],
        futuro: ["argüiré", "argüirás", "argüirá", "argüiremos", "argüiréis", "argüirán"],
        irregulares: [0, 1, 2, 5]
    },
    caber: {
        meaning: "Poder contenerse algo dentro de otra cosa. Ser posible o natural.",
        prompt: "objects fitting perfectly inside a box",
        presente: ["quepo", "cabes", "cabe", "cabemos", "cabéis", "caben"],
        preterito: ["cupe", "cupiste", "cupo", "cupimos", "cupisteis", "cupieron"],
        futuro: ["cabré", "cabrás", "cabrá", "cabremos", "cabréis", "cabrán"],
        irregulares: [0]
    },
    satisfacer: {
        meaning: "Pagar enteramente lo que se debe. Sosegar o solucionar una queja.",
        prompt: "person eating a delicious meal and feeling happy",
        presente: ["satisfago", "satisfaces", "satisface", "satisfacemos", "satisfacéis", "satisfacen"],
        preterito: ["satisfice", "satisficiste", "satisfizo", "satisficimos", "satisficisteis", "satisficieron"],
        futuro: ["satisfaré", "satisfarás", "satisfará", "satisfaremos", "satisfaréis", "satisfarán"],
        irregulares: [0]
    },
    balbucir: {
        meaning: "Hablar con dificultad, alterando o atropellando la articulación de las palabras.",
        prompt: "baby trying to talk and babbling",
        presente: ["balbuceo (def)", "balbuceas", "balbucea", "balbucimos", "balbucís", "balbucean"],
        preterito: ["balbucí", "balbuciste", "balbució", "balbucimos", "balbucisteis", "balbucieron"],
        futuro: ["balbuciré", "balbucirás", "balbucirá", "balbuciremos", "balbuciréis", "balbucirán"],
        irregulares: []
    }
};

const pronouns = ["Yo", "Tú", "Él/Ella", "Nosotros", "Vosotros", "Ellos"];

const verbSelect = document.getElementById('verbSelect');
const currentVerbTitle = document.getElementById('currentVerbTitle');
const verbMeaning = document.getElementById('verbMeaning');
const verbImage = document.getElementById('verbImage');
const presenteList = document.getElementById('presente');
const preteritoList = document.getElementById('preterito');
const futuroList = document.getElementById('futuro');

function updateConjugation(verbKey) {
    const data = verbData[verbKey];
    
    // Update basic info
    currentVerbTitle.textContent = verbKey;
    verbMeaning.textContent = data.meaning;
    
    // Update image
    const encodedPrompt = encodeURIComponent(data.prompt + " artistic oil painting style");
    verbImage.src = `https://enter.pollinations.ai/api/generate/image/${encodedPrompt}?key=sk_4lzdwTdKcXEK2viVNENsab3FsCFO5i7W&model=zimage`;
    
    // Helper function to build lists
    const buildList = (listElement, forms, irregularIndices = []) => {
        listElement.innerHTML = '';
        forms.forEach((form, index) => {
            const li = document.createElement('li');
            const isIrregular = irregularIndices.includes(index) || (verbKey === 'caber' && forms !== data.futuro && index === 0) || (data === verbData.satisfacer && forms !== data.presente);
            
            // Check for irregularity logic (simplified for UI)
            const irregularClass = (index === 0 && (form.includes('g') || form.includes('z') || form.includes('qu'))) ? 'class="irregular"' : '';
            
            li.innerHTML = `<span>${pronouns[index]}</span> <strong ${isIrregular ? 'class="irregular"' : ''}>${form}</strong>`;
            listElement.appendChild(li);
        });
    };

    buildList(presenteList, data.presente, data.irregulares);
    
    // For Preterito and Futuro, highlight according to difficulty
    const pretIrregulars = (verbKey === 'caber' || verbKey === 'satisfacer' || verbKey === 'erguir' || verbKey === 'roer' || verbKey === 'argüir') ? [0,1,2,3,4,5] : [];
    buildList(preteritoList, data.preterito, pretIrregulars);
    
    const futIrregulars = (verbKey === 'caber' || verbKey === 'satisfacer') ? [0,1,2,3,4,5] : [];
    buildList(futuroList, data.futuro, futIrregulars);
}

verbSelect.addEventListener('change', (e) => {
    updateConjugation(e.target.value);
});

// Inicializar con el primero
updateConjugation('asir');