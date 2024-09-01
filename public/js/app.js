let condition = '';

let muestrasDom = [];
let medias = []; //todas las medias muestrales se guardan en esta variable
let mediaPoblacional = 0; //la media de la suma de todas las medias muestrales
let desviacionEstandarPoblacional = 0;
let desviacionEstandardelamedia = 0;
let z = 0
let preZ = 0;
let cantidadTotal = 0;
let datosMuestrales = [];
let preguntar = '';
let cantidad = 0;
let grupos = 0;

let xValue1 = 0;
let xValue2 = 0;



document.getElementById('reporte').addEventListener('click', () => {
    generateReport()
});


document.querySelectorAll('.chart-button').forEach(button => {
    button.addEventListener('click', (evt) => {
        const value = evt.target.getAttribute('data-chart');
        generateChart(value);
    });
});

// Retorna una plantilla de los input para las muestras


const tablaDeDistribucion = [
// z  0.00   0.01   0.02   0.03   0.04   0.05   0.06   0.07   0.08   0.09
    [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359], // 0.0
    [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753], // 0.1
    [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141], // 0.2
    [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517], // 0.3
    [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879], // 0.4
    [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224], // 0.5
    [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549], // 0.6
    [0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852], // 0.7
    [0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133], // 0.8
    [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389], // 0.9
    [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621], // 1.0
    [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830], // 1.1
    [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015], // 1.2
    [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177], // 1.3
    [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319], // 1.4
    [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441], // 1.5
    [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545], // 1.6
    [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633], // 1.7
    [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706], // 1.8
    [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767], // 1.9
    [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817], // 2.0
    [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857], // 2.1
    [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890], // 2.2
    [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916], // 2.3
    [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936], // 2.4
    [0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952], // 2.5
    [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964], // 2.6
    [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974], // 2.7
    [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981], // 2.8
    [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986], // 2.9
    [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990], // 3.0
    [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993], // 3.1
    [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995], // 3.2
    [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997], // 3.3
    [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998], // 3.4
    [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998], // 3.5
    [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999], // 3.6
    [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999], // 3.7
    [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999], // 3.8
    [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000], // 3.9
    [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000], // 4.0
];

function getProbability(z) {
    const zInt = Math.floor(z * 10) / 10; // Parte entera (un decimal)
    const zDec = Math.round((z - zInt) * 100); // Parte decimal convertida a dos decimales

    const rowIndex = Math.round(zInt * 10);
    const colIndex = zDec;

    if (rowIndex < 0 || rowIndex >= tablaDeDistribucion.length || colIndex < 0 || colIndex >= tablaDeDistribucion[0].length) {
       return 0.5000;
    }

    return tablaDeDistribucion[rowIndex][colIndex];
}

// Ejemplo de uso:

function getMuestraHTML(m) {
    return `<div data-muestra="${m}" class="mx-auto w-10/12">
                <small class="input-small"><i class="fa-solid fa-people-group"></i> Muestra #${m}</small>
                <input type="text" name="muestra" placeholder="Ingrese los datos de la muestra" class="input-classes">
            </div>`;
}

function cantidadMuestras(cantidad) {

    grupos = cantidad;
    // Valida que haya datos
    if (cantidad.length === 0) {
        return;
    }
    document.querySelector('#mediaPoblacional b').innerText = '';
    document.querySelector('#desviacionEstandarPoblacional b').innerText = '';
    document.querySelector('#desviacionEstandarDeLaMedia b').innerText = '';
    document.querySelector('#valorZ b').innerText = '';

    // Guardamos el contenedor de las muestras
    var muestrasContainer = document.getElementById('muestrasContainer');
    // Se limpia el contenedor
    muestrasContainer.innerHTML = "";
    // Se pintan los inputs
    for (let i = 1; i <= (+cantidad); i++) {
        muestrasContainer.innerHTML += getMuestraHTML(i);
    }
}

function getMuestraData(pasoApaso) {

     muestrasDom = [];
     medias = [];
     mediaPoblacional = 0; 
     desviacionEstandarPoblacional = 0;
     desviacionEstandardelamedia = 0;
     z = 0
     preZ = 0;
     cantidadTotal = 0;
     datosMuestrales = [];

    pregunta = document.getElementById('pregunta').value;


    let pasoApasoContainer = document.querySelector('#pasoapasocontainer');
    pasoApasoContainer.innerHTML ='';
    let valorXinput = document.querySelector('input.selectcambios[required]');
    if (!valorXinput)
        return;
    if (valorXinput.value.length === 0) {
        document.querySelector('form#actionForm').reportValidity()
        return;
    }
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<h1 class="font-semibold text-center text-lg">Paso a Paso</h1><br><p>Como primer paso debemos calcular la media de cada muestra usando la siguiente formula <img style="height:100px;" src="../img/media.jpg"></p><br><hr><br>`;
    }
    var valorX = +valorXinput.value;
    // Se guardan los inputs de las muestras
        muestrasDom = document.querySelectorAll('[data-muestra] input');
    
    for (let i = 0; i < muestrasDom.length; i++) {
        var valores = muestrasDom[i].value.trim().split(',').map(Number); //guardamos el valor numerico de cada muestra
       console.log(valores)
       
        var media = valores.reduce((acc, val) => acc + val, 0) / valores.length; //calculamos la media de la muestra actual
        cantidadTotal += valores.length;
        datosMuestrales.push(...valores)
        medias.push(media); //guardamos la media en la variable medias
        if(pasoApaso)
            pasoApasoContainer.innerHTML+=`<h1>Media de la muestra #${i+1}</h1><p>x̄: <b>${media.toFixed(2)}</b></p><br>`;
    }
    console.log(datosMuestrales)
    console.log(medias,cantidadTotal)
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<hr><br><p>Como segundo paso debemos calcular la media poblacional de cada media muestral usando la misma formula, <img style="height:100px;" src="../img/media.jpg"></p><br>`;
    }

 
    mediaPoblacional = datosMuestrales.reduce((acc, val) => acc + val, 0) / datosMuestrales.length;// calculo de la media poblacional
   
   
   
    if(pasoApaso)
        pasoApasoContainer.innerHTML+=`<h1>Media Poblacional</h1><p>M: <b>${mediaPoblacional.toFixed(2)}</b></p><br><hr>`;
    
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<br><p>Como tercer paso debemos calcular la desviacion estandar de la poblacion usando la siguienre formula, <img style="height:100px;" src="../img/desviacionp.png"></p><br>`;
    }

    datosMuestrales.forEach(dm => {
        desviacionEstandarPoblacional += Math.pow(dm - mediaPoblacional, 2) // (Xi-M)^2
    });
    
   

    desviacionEstandarPoblacional = Math.sqrt(desviacionEstandarPoblacional / cantidadTotal);// raiz de la sumatoria (Xi-M)^2 entre la cantidad de datos muestrales
    desviacionEstandardelamedia = desviacionEstandarPoblacional / Math.sqrt(cantidadTotal)
    
    try {
        z = getProbability(Math.abs((valorX - mediaPoblacional) / desviacionEstandardelamedia));
    } catch (e) {
    }
    
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<h1>Desviacion Estandar Poblacional</h1><p>σ: <b>${desviacionEstandarPoblacional.toFixed(2)}</b></p><br>`;
    }
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<br><p>Como cuarto paso debemos calcular la desviacion estandar de la media usando la siguienre formula, <img style="height:100px;" src="../img/desviacionm.png"></p><br>
        <h1>Desviacion Estandar de la media</h1><p>σ: <b>${desviacionEstandardelamedia.toFixed(2)}</b></p><br>`;
    }
 

    document.querySelector('#mediaPoblacional b').innerText = mediaPoblacional.toFixed(2);
    document.querySelector('#desviacionEstandarPoblacional b').innerText = desviacionEstandarPoblacional.toFixed(2);
    document.querySelector('#desviacionEstandarDeLaMedia b').innerText = desviacionEstandardelamedia.toFixed(2);
    if(pasoApaso){
        pasoApasoContainer.innerHTML+=`<hr><br><p>Como quinto debemos calcular el valor de z con respecto al valor x deseado<br>
        enunciado: <b>${document.querySelector('#pregunta').value}</b>
        </p><br>
        `;
    }
    switch (document.querySelector('#valorXoption').value) {
        case '1': //rango a y b
      
        let valorYinput = document.querySelector('input.selectcambios[required].otro');
        if (valorYinput.value.length === 0) {
            document.querySelector('form#actionForm').reportValidity()
            return;
        }
        var valory = +valorYinput.value;

        xValue1 = valorX;
        xValue2 = valory;

        if(pasoApaso){
            pasoApasoContainer.innerHTML+=`<br><p>Como los valores de la muestra es un rango debemos calcular el valor de z para cada uno de los datos, vamos llamar a ${valorX} como Z1 y a ${valory} como Z2</p><br><h1>Valor de Z1</h1><p>z1 = (${valorX} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z1 = ${z} </b></p><br>`;
        }
        let _z  = getProbability(Math.abs((valory - mediaPoblacional) / desviacionEstandardelamedia));
        if(pasoApaso){
            pasoApasoContainer.innerHTML+=`<br>z2 = (${valory} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z2 = ${_z} </b></p><br><p>Luego debemos sumar z1 y z2</p><p>z = z1 + z2<p/><p>z = ${z.toFixed(4)} + ${_z.toFixed(4)}</p><p>z = ${(z+_z).toFixed(4)}<p/><p>z = ${((z+_z)*100).toFixed(2)+"%"}</p>`;
        }
        
        z += _z;
        break;
        case '2': //menor que
        xValue2 = valorX;
        if(valorX > mediaPoblacional){
            if(pasoApaso){
                pasoApasoContainer.innerHTML+=`<h1>Valor de Z</h1><p>z = (${valorX} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z = ${z} </b></p><br><br><p>Como el valor de la muestra deseada es mayor que la media poblacional se debe sumar 0.50 a z</p><p>z = ${(z).toFixed(4)} + 0.50</p><p>z = ${(z+0.50).toFixed(4)} * 100 = ${((z+0.50)*100).toFixed(2)+"%"}`;
            }
            z+=0.5;
        }else {
            if(pasoApaso){
                pasoApasoContainer.innerHTML+=`<h1>Valor de Z</h1><p>z = (${valorX} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z = ${z} </b></p><br><br><p>Como el valor de la muestra deseada es menor que la media poblacional se debe restar a 0.50 el valor de z</p><p>z = 0.50 - ${(z).toFixed(4)}</p><p>z = ${(0.50-z).toFixed(4)} * 100 = ${((0.50-z)*100).toFixed(2)+"%"}`;
            }
            z=0.5-z;
        }
        break;
        case '3': //mayor que
        xValue1 = valorX;
        if(valorX < mediaPoblacional){
            if(pasoApaso){
                pasoApasoContainer.innerHTML+=`<h1>Valor de Z</h1><p>z = (${valorX} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z = ${z} </b></p><br><br><p>Como el valor de la muestra deseada es menor que la media poblacional se debe sumar 0.50 a z</p><p>z = ${(z).toFixed(4)} + 0.50</p><p>z = ${(z+0.50).toFixed(4)} * 100 = ${((z+0.50)*100).toFixed(2)+"%"}`;
            }
            z+=0.5;
        } else {
            if(pasoApaso){
                pasoApasoContainer.innerHTML+=`<h1>Valor de Z</h1><p>z = (${valorX} - ${mediaPoblacional.toFixed(2)}) / ${desviacionEstandardelamedia.toFixed(2)} </b></p><br><p>z = ${z} </b></p><br><br><p>Como el valor de la muestra deseada es mayor que la media poblacional se debe restar 0.50 a z</p><p>z = ${(z).toFixed(4)} + 0.50</p><p>z = ${(z+0.50).toFixed(4)} * 100 = ${((z+0.50)*100).toFixed(2)+"%"}`;
            }
            z= 0.5-z;
        }
        break;
    }
    console.log(datosMuestrales)
    document.querySelector('#valorZ b').innerText = (z*100).toFixed(2)+"%";
  
 

    // Retornamos un objeto clave valor de los datos 


}
  

//cambia el input de acorde al valor del select segun la pregunta dada
function selectCambiar(opt) {
    console.log(opt)
    document.querySelectorAll('.selectcambios').forEach(o => { o.style.display = 'none'; o.removeAttribute('required', 'true'); });
    switch (opt) {
        case "1":
            document.querySelectorAll('.selectcambios').forEach(o => { o.style.display = ''; o.setAttribute('required', 'true'); });
            condition = 'entre'
            break;
        case "2":
            condition = 'menor'
            document.querySelectorAll('.selectcambios.jone').forEach(o => { o.style.display = ''; o.setAttribute('required', 'true'); });
            break;
        case "3":
            document.querySelectorAll('.selectcambios.jone').forEach(o => { o.style.display = ''; o.setAttribute('required', 'true'); });
            condition = 'mayor'
            break;
    }
    console.log(condition)
}