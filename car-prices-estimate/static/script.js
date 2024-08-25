document.addEventListener('DOMContentLoaded', function() {
    // Yıl Seçim Listesi Oluşturma
    var yearSelect = document.getElementById('Yil');
    var currentYear = new Date().getFullYear();
    var startYear = 1950;
    for (var year = startYear; year <= currentYear; year++) {
        var option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
});

let currentSection = 'initial-section';
document.getElementById('back-button').addEventListener('click', function() {
    if (currentSection === 'result-section') {
        document.getElementById('result-section').style.display = 'none';
        document.getElementById('paint-section').style.display = 'block';
        currentSection = 'paint-section';
    } else if (currentSection === 'paint-section') {
        document.getElementById('paint-section').style.display = 'none';
        document.getElementById('initial-section').style.display = 'block';
        currentSection = 'initial-section';
    } else if (currentSection === 'initial-section') {
        window.location.href = '/'; 
    }
});



document.addEventListener('DOMContentLoaded', function() {
const carModels = {
    "FIAT": ['MAREA', 'ALBEA', 'DOBLO', '500L', 'EGEA', 'DUCATO', 'LINEA', 'FIORINO', 'PUNTO', 'FREEMONT', 'GRANDE_PUNTO', '500_X', 'BRAVO', 'PALIO_VAN', 'PALIO', 'ALBEA_SOLE', '500X', 'PANDA', 'BRAVA', '500'],
    "PEUGEOT": ['206', '208', '206+', '301', '508', 'BIPPER', 'BOXER', '308', '307', 'RCZ', 'PARTNER', '3008', '207', '407', 'PARTNER_TEPEE', '306', '5008', '2008'],
    "RENAULT": ['KANGOO', 'SYMBOL', 'FLUENCE', 'CLIO_III', 'CLIO', 'MEGANE_III', 'MEGANE_IV', 'CLIO_IV', 'MEGANE_II', 'LATITUDE', 'MEGANE', 'MASTER', 'TRAFIC', 'CAPTUR', 'MODUS', 'TALISMAN', 'LAGUNA', 'LAGUNA_II', 'SCENIC'],
    "HYUNDAI": ['GETZ', 'ACCENT_BLUE', 'I30', 'ACCENT_ERA', 'MATRIX', 'I20', 'SANTA_FE', 'ACCENT', 'TUCSON', 'H_100', 'SONATA', 'IX35', 'ELANTRA', 'I20_TROY', 'I10'],
    "FORD": ['FIESTA', 'FOCUS', 'TRANSIT', 'MONDEO', 'TOURNEO', 'TRANSIT_CUSTOM', 'B_MAX', 'CONNECT', 'C_MAX', 'RANGER', 'FOCUS_C_MAX', 'FOCUS_B_MAX', 'KUGA', 'CARGO', 'COURIER', 'KA'],
    "DACIA": ['LODGY', 'DUSTER', 'SANDERO', 'LOGAN', 'DOKKER', 'MCV_5_KISILIK'],
    "TOYOTA": ['YARIS', 'AURIS', 'COROLLA', 'RAV4', 'VERSO', 'AVENSIS', 'LAND_CRUISER'],
    "VOLKSWAGEN": ['PASSAT', 'JETTA', 'TRANSPORTER', 'AMAROK', 'POLO', 'GOLF', 'TOUAREG', 'BORA', 'TIGUAN', 'PASSAT_CC', 'SCIROCCO', 'CADDY', 'NEW_BEETLE', 'THE_BEETLE'],
    "OPEL": ['ASTRA', 'MERIVA', 'CORSA', 'INSIGNIA', 'MOKKA', 'VECTRA', 'COMBO'],
    "NISSAN": ['MICRA', 'QASHQAI', 'X_TRAIL', 'JUKE', 'NOTE', 'TERRANO_II', 'MURANO', 'ALMERA'],
    "CITROEN": ['C4', 'C5', 'C_ELYSEE', 'BERLINGO', 'C3', 'C4_PICASSO', 'NEMO', 'C1', 'C4_CACTUS', 'DS5', 'JUMPER'],
    "KIA": ["CEE'D", 'SPORTAGE', 'RIO', 'SORENTO', 'CERATO', 'K_2500', 'BONGO'],
    "SKODA": ['OCTAVIA', 'YETI', 'SUPERB', 'FABIA', 'RAPID', 'ROOMSTER'],
    "AUDI": ['A4', 'A3', 'A5', 'A6', 'TT', 'Q5', 'S3', 'A5_SPORTBACK', 'Q7', 'Q3', 'A1'],
    "MERCEDES_BENZ": ['A_SERISI', 'C_SERISI', 'CLA_SERISI', 'GLK_SERISI', 'GLA_SERISI', 'E_SERISI', 'ML', 'SLK_SERISI', 'S_SERISI', 'CLK_SERISI', 'B_SERISI', 'CLC', '1840_LS', 'CLS', 'SPRINTER'],
    "VOLVO": ['S60', 'S80', 'XC60', 'V50'],
    "BMW": ['3_Serisi', '2_Serisi', '5_Serisi', 'X5', '1_Serisi', 'X3', 'X1', '4_Serisi', '7_Serisi', 'X6'],
    "MINI": ['COUNTRYMAN', 'COOPER', 'ONE'],
    "LAND_ROVER": ['DISCOVERY_III', 'RANGE_ROVER_SPORT', 'RANGE_ROVER_EVOQUE', 'RANGE_ROVER', 'FREELANDER', 'DISCOVERY', 'FREELANDER_II'],
    "MAZDA": ['RX_8', 'CX_3', 'BT_50', 'MAZDA3'],
    "MITSUBISHI": ['CARISMA', 'COLT', 'L200', 'OUTLANDER'],
    "LADA": ['VEGA_WAGON'],
    "CHEVROLET": ['SPARK', 'AVEO', 'CAPTIVA', 'CRUZE', 'LACETTI', 'REZZO', 'EPICA'],
    "SEAT": ['LEON', 'ALTEA', 'ALTEA_XL', 'TOLEDO', 'IBIZA'],
    "IVECO": ['DAILY', '35S_13'],
    "HONDA": ['CIVIC', 'CITY', 'JAZZ', 'ACCORD', 'CR_V'],
    "JEEP": ['GRAND_CHEROKEE', 'CHEROKEE', 'RENEGADE', 'COMPASS'],
    "PORSCHE": ['CAYENNE'],
    "ISUZU": ['D_MAX', 'NPR'],
    "LANCIA": ['YPSILON'],
    "JAGUAR": ['XE'],
    "ASTON_MARTIN": ['V8_VANTAGE'],
    "SUBARU": ['FORESTER', 'IMPREZA'],
    "OTOKAR": ['ATLAS'],
    "ALFA_ROMEO": ['Giulietta', 'GIULIETTA'],
    "LINCOLN": ['AVIATOR'],
    "DODGE": ['NITRO'],
    "CHRYSLER": ['300C'],
    "CHERY": ['TAXIM'],
    "SUZUKI": ['JIMNY'],
    "TATA": ['INDIGO', 'INDICA'],
    "TOFAS": ['SAHIN']
};



const selectedBrand = document.getElementById('Marka').textContent.trim();
const modelSelect = document.getElementById('Model');
modelSelect.innerHTML = '<option value="" disabled selected>Model Seçiniz</option>';

if (carModels[selectedBrand]) {
    carModels[selectedBrand].forEach(function(model) {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}


document.getElementById('proceed-button').addEventListener('click', function() {
    document.getElementById('initial-section').style.display = 'none';
    document.getElementById('paint-section').style.display = 'block';
    currentSection = 'paint-section';
});

// Araç Parçası Seçme ve Boya/Değişen Sayısını Hesaplama
let boyaCount = 0;
let degisenCount = 0;

document.querySelectorAll('.car-part').forEach(part => {
    part.addEventListener('click', function() {
        const partName = this.dataset.partName;
        const action = prompt(`${partName} için seçim yapın: "Boya" için 1, "Değişen" için 2'ye basın.`);

        if (action == 1) {
            this.style.backgroundColor = 'yellow';
            boyaCount++;
        } else if (action == 2) {
            this.style.backgroundColor = 'red';
            degisenCount++;
        }

        document.getElementById('Boya').innerText = boyaCount;
        document.getElementById('Degisen').innerText = degisenCount;
    });
});

// Teklif Al Butonu
document.getElementById('submit-details').addEventListener('click', function() {
    const initialForm = document.getElementById('initial-form');
    
    if (initialForm instanceof HTMLFormElement) {
        const formData = new FormData(initialForm);
        formData.append('Boya', boyaCount);
        formData.append('Degisen', degisenCount);

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result-section').style.display = 'block';
            document.getElementById('paint-section').style.display = 'none';
            document.getElementById('initial-section').style.display = 'none';
            document.getElementById('price').textContent = data.price +" ₺";
            document.getElementById('priceAcil').textContent = (data.price * 0.9) +" ₺";
            currentSection = 'result-section';
        })
        .catch(error => {
            console.error('Hata:', error);
        });
    } else {
        console.error('Form bulunamadı veya form bir HTMLFormElement değil.');
    }
});
});


