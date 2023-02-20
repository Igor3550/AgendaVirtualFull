export function notFound() {
  return {
    name: 'NotFound',
    message: 'No results!'
  }
}

export function badRequest() {
  return {
    name: 'BadRequest',
    message: 'Invalid body item!'
  }
}

export function conflict() {
  return {
    name: 'Conflict',
    message: 'Already exists!'
  }
}

export function unauthorizedError() {
  return {
    name: 'Unauthorized',
    message: 'Unauthorized!'
  }
}

