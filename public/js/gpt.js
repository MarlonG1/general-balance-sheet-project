const apiKey = "Your API KEY here";
const container = document.getElementById("test");

function generateReport() {
  Swal.fire({
    title: "Tu reporte se esta generando...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      getCompletation()
        .then((data) => {
          downloadPdf(data);
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Reporte generado",
            text: "Tu reporte se ha generado correctamente",
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Algo salio mal",
          });
        });
    },
  });
}

async function getCompletation() {
  const data = `Datos: 
  Pregunta de investigacion: ${pregunta}
  Grupos de muestras estudiantiles: ${grupos}
  Cantidad de muestras estudiantiles: ${cantidadTotal}
  Media de cada grupo de muestras: ${medias}
  Media poblacion: ${mediaPoblacional.toFixed(2)}
  Desviacion estandar poblacional: ${desviacionEstandarPoblacional.toFixed(2)}
  Desviacion estandar de la media poblacion: ${desviacionEstandardelamedia.toFixed(2)}
  Z obtenido de la formula de limite central: ${z.toFixed(2)} ~ ${z.toFixed(2) * 100}%`;

  console.log(data);

  const mensaje = `Genera un reporte basado en los siguientes datos, sin incluir saludos,
 despedidas ni comentarios adicionales. Solo el reporte en el siguiente formato y los datos
  proporcionados: Formato: Introduccion, Metodologia, Pasos de desarrollo, Aplicacion del Teorema 
  de Limite Central y Conclusion. Despues de cada titulo haz un salto de linea. Concluye con el porcentaje de estudiantes para responder a la pregunta. Finalmente concluye como investigacion general no con aperturas para realizar investigaciones futuras. ${data}`;

  const requestData = {
    model: "gpt-3.5-turbo-instruct",
    prompt: mensaje,
    max_tokens: 3000,
    temperature: 0.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Error en la petición a OpenAI");
  }

  const responseData = await response.json();
  return responseData.choices[0].text;
}

function downloadPdf(data) {
  var docDefinition = {
    content: [
      {
        text: "Reporte de investigación",
        style: "header",
        alignment: "center",
      },
      { text: data, defaultStyle: {}, alignment: "justify" },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };

  pdfMake.createPdf(docDefinition).print();
}
