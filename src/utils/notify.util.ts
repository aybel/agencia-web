// utils/notify.util.ts
// Toasts (vue3-toastify) para avisos no bloqueantes y
// diálogos (SweetAlert2) para confirmaciones y entradas de datos.

import { toast, type ToastOptions } from 'vue3-toastify'
import Swal, { type SweetAlertOptions } from 'sweetalert2'

// ============================================
// TOASTS
// ============================================

const TOAST_DEFAULTS: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  theme: 'auto',
}

export const notifySuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, { ...TOAST_DEFAULTS, ...options })

export const notifyError = (message: string, options?: ToastOptions) =>
  toast.error(message, { ...TOAST_DEFAULTS, autoClose: 5000, ...options })

export const notifyWarning = (message: string, options?: ToastOptions) =>
  toast.warning(message, { ...TOAST_DEFAULTS, ...options })

export const notifyInfo = (message: string, options?: ToastOptions) =>
  toast.info(message, { ...TOAST_DEFAULTS, ...options })

/**
 * Toast de carga ligado a una promesa (útil para guardar ventas, presupuestos, etc.).
 */
export const notifyPromise = <T>(
  promise: Promise<T>,
  messages: { pending: string; success: string; error: string },
) => toast.promise(promise, messages, TOAST_DEFAULTS)

// ============================================
// DIÁLOGOS
// ============================================

type DialogOptions = Pick<
  SweetAlertOptions,
  'icon' | 'confirmButtonText' | 'confirmButtonColor' | 'cancelButtonText'
>

const DIALOG_DEFAULTS = {
  showCancelButton: true,
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
  focusCancel: true,
} satisfies SweetAlertOptions

/**
 * Confirmación genérica. Devuelve `true` si el usuario confirma.
 */
export async function confirmAction(
  title: string,
  text?: string,
  options?: DialogOptions,
): Promise<boolean> {
  const result = await Swal.fire({
    ...DIALOG_DEFAULTS,
    icon: 'question',
    title,
    text,
    ...options,
  })
  return result.isConfirmed
}

/**
 * Confirmación para acciones destructivas (eliminar, cancelar venta, anular presupuesto).
 */
export const confirmDelete = (
  text = 'Esta acción no se puede deshacer.',
  title = '¿Eliminar registro?',
): Promise<boolean> =>
  confirmAction(title, text, {
    icon: 'warning',
    confirmButtonText: 'Sí, eliminar',
    confirmButtonColor: '#dc2626',
  })

type PromptOptions = Pick<
  SweetAlertOptions,
  'text' | 'inputLabel' | 'inputPlaceholder' | 'confirmButtonText' | 'cancelButtonText'
>

/**
 * Solicita un texto al usuario (ej. motivo de cancelación). Devuelve `null` si cancela.
 */
export async function promptText(title: string, options?: PromptOptions): Promise<string | null> {
  const result = await Swal.fire({
    ...DIALOG_DEFAULTS,
    title,
    input: 'text',
    inputValidator: (value) => (value ? null : 'Este campo es obligatorio'),
    ...options,
  })
  return result.isConfirmed ? String(result.value) : null
}
