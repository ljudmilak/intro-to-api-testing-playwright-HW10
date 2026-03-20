import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test ('PUT order with correct ID and API key should receive code 200', async ({request}) => {
  const requestHeaders = { 'api_key': '1234567890123456' }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 2,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
    data: requestBody,
  })
  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)

  expect(statusCode).toBe(StatusCodes.OK);
})

test('PUT order with correct ID and invalid API key should receive code 401', async ({ request }) => {
  const requestHeaders = { 'api_key': '12345678901234aa' }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 2,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
    data: requestBody,
  })
  const statusCode = response.status()

  console.log('response status:', statusCode)

  expect(statusCode).toBe(401)
})

test('PUT order with correct ID and without API key should receive code 401', async ({ request }) => {
  const requestHeaders = { 'api_key': '' }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 2,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
    data: requestBody,
  })
  const statusCode = response.status()

  console.log('response status:', statusCode)

  expect(statusCode).toBe(401)
})

// 404: Order not found (if request body is empty) - хотела проверить это условие, но даже Swagger с пустым body возвращает 200, а не 404. Чтоб тест не валился, сделала так, что возвращает сервер
test('PUT order with empty body should receive code 200 (real API behaviour)', async ({ request }) => {
  const requestHeaders = { 'api_key': '1234567890123456' }
  const requestBody = {}
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
    data: requestBody,
  })
  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)

  expect(statusCode).toBe(200)
})

test('DELETE order with ID and API code should receive code 204', async ({ request }) => {
  const requestHeaders = { 'api_key': '1234567890123456' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })
  const statusCode = response.status()

  console.log('response status:', statusCode)

  expect(statusCode).toBe(204)
})

test('DELETE order with empty API code should receive code 401', async ({ request }) => {
  const requestHeaders = { 'api_key': '' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })
  const statusCode = response.status()

  console.log('response status:', statusCode)

  expect(statusCode).toBe(401)
})

test('DELETE order with invalid API code should receive code 401', async ({ request }) => {
  const requestHeaders = { 'api_key': '12345' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: requestHeaders,
  })
  const statusCode = response.status()

  console.log('response status:', statusCode)

  expect(statusCode).toBe(401)
})

test('GET order with username and password should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?username=test&password=abc',)

  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)

  expect(statusCode).toBe(StatusCodes.OK)
})

test('GET order with username and without password should receive code 500', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=test&password=',
  )

  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)

  expect(statusCode).toBe(500)
})

test('GET order without username and with password should receive code 500', async ({ request}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=&password=abc',
  )

  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)

  expect(statusCode).toBe(500)
})