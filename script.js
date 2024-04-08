document.getElementById("calcular").addEventListener("click", function() {
    const edad = document.querySelector("[name='edad']").value;
    const estatura = document.querySelector("[name='estatura']").value;
    const sexo = document.querySelector("[name='sexo']").value;
    const peso = document.querySelector("[name='peso']").value;
    const actividad = document.querySelector("[name='actividad']").value;
    const objetivo = document.querySelector("[name='objetivo']").value;

    const estaturaEnMetros = estatura / 100;
    let tmb = sexo === "Hombre" ?
        88.362 + (13.397 * peso) + (4.799 * estatura) - (5.677 * edad) :
        447.593 + (9.247 * peso) + (3.098 * estatura) - (4.33 * edad);

    const imc = peso / (estaturaEnMetros ** 2);

    const factoresActividad = {
        Sedentario: 1.2,
        Ligero: 1.375,
        Moderado: 1.55,
        Activo: 1.725,
        Muy_activo: 1.9,
        Intenso: 2.2,
    };

    let consumoCalorico = tmb * factoresActividad[actividad];

    let resultadoTexto = '<ul>';

    if (objetivo === 'Bajar_grasa_corporal') {
        resultadoTexto += `<li>Déficit moderado: ${(consumoCalorico * 0.85).toFixed(2)} kcal/día</li>
                          <li>Déficit agresivo: ${(consumoCalorico * 0.75).toFixed(2)} kcal/día</li>`;
    } else if (objetivo === 'Mantener_peso_actual') {
        resultadoTexto += `<li>Equilibrio:  ${consumoCalorico.toFixed(2)} kcal/día</li>`;
    } else if (objetivo === 'Aumentar_masa_muscular') {
        resultadoTexto += `<li>Superávit moderado: ${(consumoCalorico * 1.15).toFixed(2)} kcal/día</li>
                          <li>Superávit agresivo: ${(consumoCalorico * 1.25).toFixed(2)} kcal/día</li>`;
    }

    document.getElementById("tmb").textContent = tmb.toFixed(2);
    document.getElementById("imc").textContent = imc.toFixed(2);
    document.getElementById("consumoCalorico").innerHTML = resultadoTexto;
});