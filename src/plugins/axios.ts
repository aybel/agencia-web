// plugins/axios.ts
// Instancia única de Axios para todo el sistema.
// Uso: import { api } from '@/plugins/axios'

import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { App } from 'vue'

import type { ApiResponse } from '@/types/api.types'
import { notifyError } from '@/utils/notify.util'

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Si es `true`, el interceptor no muestra el toast de error automático. */
    skipErrorToast?: boolean
  }
}

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/**
 * Obtiene un mensaje legible a partir de cualquier error de Axios.
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<Partial<ApiResponse<unknown>>>(error)) {
    if (error.response?.data?.message) return error.response.data.message
    if (error.code === 'ECONNABORTED') return 'La solicitud tardó demasiado. Intenta de nuevo.'
    if (!error.response) return 'No se pudo conectar con el servidor.'
    return `Error inesperado (${error.response.status}).`
  }
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const cancelled = axios.isCancel(error)

    // Los 422 (validación) los maneja cada formulario; las cancelaciones no son errores.
    if (!cancelled && status !== 422 && !error.config?.skipErrorToast) {
      notifyError(getErrorMessage(error))
    }

    return Promise.reject(error)
  },
)

// Plugin de Vue opcional: app.use(axiosPlugin) habilita this.$api en las opciones API.
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$api = api
  },
}
