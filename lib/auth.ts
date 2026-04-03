import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export interface User {
  pk: number
  email: string
  first_name: string
  last_name: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

export interface AuthError {
  detail?: string
  non_field_errors?: string[]
  email?: string[]
  password?: string[]
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

export function setTokens(access: string, refresh: string): void {
  // Access token - shorter expiry, accessible by JS
  Cookies.set(ACCESS_TOKEN_KEY, access, {
    expires: 1, // 1 day
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  // Refresh token - longer expiry
  Cookies.set(REFRESH_TOKEN_KEY, refresh, {
    expires: 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export function clearTokens(): void {
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error: AuthError = await response.json()
    throw new Error(
      error.detail ||
      error.non_field_errors?.[0] ||
      error.email?.[0] ||
      error.password?.[0] ||
      'Login failed'
    )
  }

  const data: LoginResponse = await response.json()
  setTokens(data.access, data.refresh)
  return data
}

export async function logout(): Promise<void> {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  if (accessToken && refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })
    } catch {
      // Ignore logout errors - we'll clear tokens anyway
    }
  }

  clearTokens()
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      clearTokens()
      return null
    }

    const data = await response.json()
    setTokens(data.access, refreshToken)
    return data.access
  } catch {
    clearTokens()
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  let accessToken: string | null | undefined = getAccessToken()

  if (!accessToken) {
    // Try to refresh
    accessToken = await refreshAccessToken()
    if (!accessToken) {
      return null
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken()
        if (newToken) {
          const retryResponse = await fetch(`${API_BASE_URL}/api/auth/user/`, {
            headers: {
              'Authorization': `Bearer ${newToken}`,
            },
          })
          if (retryResponse.ok) {
            return retryResponse.json()
          }
        }
      }
      clearTokens()
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

export function getAuthHeader(): { Authorization: string } | Record<string, never> {
  const token = getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
