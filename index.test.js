import getRecipes from './pages/api/recipes'

describe('GET /recipes', () => {
  describe('When the request method is PUT', () => {
    test('Returns a 400 Bad Request', () => {
      const request = { method: 'PUT' }
      const response = { status: jest.fn() }

      getRecipes(request, response)

      expect(response.status).toBeCalledWith(400)
    })
  })

  describe('When the request method is POST', () => {
    test('Returns a 400 Bad Request', () => {
      const request = { method: 'POST' }
      const response = { status: jest.fn() }

      getRecipes(request, response)

      expect(response.status).toBeCalledWith(400)
    })
  })

  describe('When the request method is PATCH', () => {
    test('Returns a 400 Bad Request', () => {
      const request = { method: 'PATCH' }
      const response = { status: jest.fn() }

      getRecipes(request, response)

      expect(response.status).toBeCalledWith(400)
    })
  })

  describe('When the request method is GET', () => {
    test('Returns a 200 OK Response', () => {
      const request = { method: 'GET' }
      const response = { status: jest.fn(), json: jest.fn() }

      getRecipes(request, response)

      expect(response.status).toBeCalledWith(200)
      expect(response.json).toBeCalledWith(expect.any(Object))
    })
  })
})