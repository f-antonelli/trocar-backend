const formatResponse = (statusCode: number, message: string, data: unknown) => {
  if (data) {
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        data,
      }),
    };
  } else {
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    };
  }
};

export const SucessResponse = (data: object) => {
  return formatResponse(200, 'success', data);
};

interface ValidationError {
  constraints: { [key: string]: string };
}

export const ErrorResponse = (code = 500, error: unknown) => {
  // Verifica si el error es un array y si es un error de validación
  if (Array.isArray(error)) {
    // Verifica si hay al menos un error y si el primer elemento es un error de validación
    if (error.length > 0 && typeof error[0] === 'object' && 'constraints' in error[0]) {
      // Mapea los mensajes de error de cada elemento del array
      const errorMessages = error.map((err: ValidationError) => {
        const constraints = err.constraints;
        // Extrae y retorna el mensaje de error
        return Object.values(constraints)[0] || 'Unexpected Error';
      });
      // Formatea y retorna la respuesta con todos los mensajes de error
      return formatResponse(code, errorMessages.join('; '), errorMessages);
    }
  }

  // Si no es un error de validación, formatea y retorna la respuesta con un único mensaje de error
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return formatResponse(code, `${error}`, error);
};
