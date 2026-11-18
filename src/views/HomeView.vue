<script setup lang="ts">
import { IconFileInvoice, IconSettings, IconShoppingCart } from '@tabler/icons-vue'

const modules = [
  {
    title: 'Ventas',
    description: 'Registro y seguimiento de ventas de refacciones y papelería.',
    icon: IconShoppingCart,
  },
  {
    title: 'Presupuestos',
    description: 'Cotizaciones y presupuestos para refacciones y papelería.',
    icon: IconFileInvoice,
  },
  {
    title: 'Administración y control',
    description: 'Catálogos, usuarios y control general de la agencia.',
    icon: IconSettings,
  },
]
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-800">
    <section class="mx-auto max-w-5xl px-6 py-16">
      <header class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight">Agencia</h1>
        <p class="mt-3 max-w-2xl text-lg text-slate-600">
          Sistema de gestión de ventas, presupuestos y control administrativo.
        </p>
      </header>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="module in modules"
          :key="module.title"
          class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
          >
            <component :is="module.icon" :size="26" />
          </div>
          <h2 class="text-lg font-semibold">{{ module.title }}</h2>
          <p class="mt-2 text-sm text-slate-600">{{ module.description }}</p>
          <span
            class="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
          >
            Próximamente
          </span>
        </article>
      </div>
    </section>
  </main>
</template>
