export interface Response {
  statusCode: Number;
  headers: Object;
  body: string;
}

interface ValidationError {
  constraints: { [key: string]: string };
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const formatResponse = (statusCode: number, error: unknown, data: unknown): Response => {
  if (data) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        success: true,
        data,
      }),
    };
  } else {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        success: false,
        error,
      }),
    };
  }
};

export const SuccessResponse = (code = 200, data: object) => {
  return formatResponse(code, undefined, data);
};

export const ErrorResponse = (code = 500, error: unknown) => {
  console.log(error);
  if (Array.isArray(error)) {
    if (error.length > 0 && typeof error[0] === 'object' && 'constraints' in error[0]) {
      const errorMessages = error.map((err: ValidationError) => {
        const constraints = err.constraints;
        return Object.values(constraints)[0] || 'Unexpected Error';
      });

      return formatResponse(code, errorMessages, undefined);
    }
  }

  return formatResponse(code, error, undefined);
};
