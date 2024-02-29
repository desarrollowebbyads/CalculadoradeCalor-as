import React, { useState } from "react";
import './App.css';

function Calculator() {
  // Estado inicial que incluye el nuevo campo 'objetivo'
  const [formData, setFormData] = useState({
    edad: "",
    estatura: "",
    sexo: "Hombre",
    peso: "",
    actividad: "Sedentario",
    objetivo: "Mantener", // Nuevo campo para el objetivo
  });

  const [resultados, setResultados] = useState({
    tmb: 0,
    imc: 0,
    consumoCalorico: 0,
  });

  // Maneja el cambio en los campos del formulario, incluyendo el nuevo 'objetivo'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para calcular TMB, IMC y ajustar el consumo calórico según el objetivo
  const calcularResultados = () => {
    const { edad, estatura, sexo, peso, actividad, objetivo } = formData;
    const estaturaEnMetros = estatura / 100;
    let tmb;
    if (sexo === "Hombre") {
      tmb = 88.362 + 13.397 * peso + 4.799 * estatura - 5.677 * edad;
    } else {
      tmb = 447.593 + 9.247 * peso + 3.098 * estatura - 4.33 * edad;
    }

    const imc = peso / (estaturaEnMetros * estaturaEnMetros);

    const factoresActividad = {
      Sedentario: 1.2,
      Ligero: 1.375,
      Moderado: 1.55,
      Activo: 1.725,
      "Muy activo": 1.9,
      "Extremadamente activo": 2.2,
    };

    let consumoCalorico = tmb * factoresActividad[actividad];

    // Ajustes en el consumo calórico basado en el objetivo seleccionado
    const ajustesObjetivo = {
      Mantener: 1,
      Perder: 0.85,
      PerderAgresivo: 0.75,
      Ganar: 1.15,
      GanarAgresivo: 1.25,
    };

    consumoCalorico *= ajustesObjetivo[objetivo];

    setResultados({
      tmb: tmb.toFixed(2),
      imc: imc.toFixed(2),
      consumoCalorico: consumoCalorico.toFixed(2),
    });
  };


  return (
    <div className="calculator-container">
      <form className="calculator-form" onSubmit={(e) => e.preventDefault()}>
        {/* Inputs para capturar los datos */}
        <input
          name="edad"
          type="number"
          value={formData.edad}
          onChange={handleChange}
          placeholder="Edad"
        />
        <input
          name="estatura"
          type="number"
          value={formData.estatura}
          onChange={handleChange}
          placeholder="Estatura en cm"
        />
        <select name="sexo" value={formData.sexo} onChange={handleChange}>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        <input
          name="peso"
          type="number"
          value={formData.peso}
          onChange={handleChange}
          placeholder="Peso en kg"
        />
        <select
          name="actividad"
          value={formData.actividad}
          onChange={handleChange}
        >
          <option value="Sedentario">Sedentario</option>
          <option value="Ligero">Ligero</option>
          <option value="Moderado">Moderado</option>
          <option value="Activo">Activo</option>
          <option value="Muy activo">Muy activo</option>
          <option value="Extremadamente activo">Extremadamente activo</option>
        </select>

        <select name="objetivo" value={formData.objetivo} onChange={handleChange}>
          <option value="Mantener">Mantener peso</option>
          <option value="Perder">Perder peso</option>
          <option value="PerderAgresivo">Perder peso de forma agresiva</option>
          <option value="Ganar">Ganar peso</option>
          <option value="GanarAgresivo">Ganar peso de forma agresiva</option>
        </select>
        <button type="button" onClick={calcularResultados}>
          Calcular
        </button>
      </form>

      <div className="resultados">Tasa de metabolismo basal (BMR): {resultados.tmb}</div>
      <div className="resultados">Índice de masa corporal (BMI):{resultados.imc}</div>
      <div className="resultados">
        Consumo Calórico Diario: {resultados.consumoCalorico}
      </div>
    </div>
  );
}
export default Calculator;