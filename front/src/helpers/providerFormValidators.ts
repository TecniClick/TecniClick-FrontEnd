type dataType = {
  title?: string;
  phone?: number;
  appointmentPrice?: number;
  description?: string;
};

type ValidationErrors = Partial<Record<keyof dataType, string>>;

const providerFormValidators = (input: dataType): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validación para `title`
  if (!input.title || input.title.length < 8 || /\d/.test(input.title)) {
    errors.title = "El título debe tener al menos 8 caracteres y no contener números.";
  }

  // Validación para `phone`
  if (
    input.phone === undefined ||
    input.phone < 1000000 || // mínimo 7 dígitos
    input.phone > 999999999999999 // máximo 15 dígitos
  ) {
    errors.phone = "El teléfono debe ser un número válido entre 7 y 15 dígitos.";
  }

  // Validación para `appointmentPrice`
  if (
    input.appointmentPrice === undefined ||
    input.appointmentPrice <= 0 ||
    !Number.isInteger(input.appointmentPrice)
  ) {
    errors.appointmentPrice = "El precio debe ser un número entero mayor a 0.";
  }

  // Validación para `description`
  if (!input.description || input.description.length <= 20) {
    errors.description = "La descripción debe tener más de 20 caracteres.";
  }

  return errors;
};

export default providerFormValidators;
