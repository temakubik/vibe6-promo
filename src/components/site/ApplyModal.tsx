'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SlashPill, TagChip, QrMark } from './Decor'
import { CheckCircle2, ArrowUpRight, Send } from 'lucide-react'

type FormState = {
  firstName: string
  lastName: string
  role: string
  contact: string
  wishes: string
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  role: '',
  contact: '',
  wishes: '',
}

export function ApplyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const update = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Обязательное поле'
    if (!form.contact.trim()) e.contact = 'Укажите почту или Telegram'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // No backend in this single-page build — just simulate submit
    setSubmitted(true)
  }

  const close = (o: boolean) => {
    onOpenChange(o)
    if (!o) {
      // Reset after the close animation
      setTimeout(() => {
        setSubmitted(false)
        setForm(EMPTY)
        setErrors({})
      }, 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-[560px] p-0 overflow-hidden gap-0 bg-paper border-ink/10">
        {/* Header strip */}
        <div className="bg-ink text-paper px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QrMark variant="lime" className="w-10 h-10" seed={5} />
            <div>
              <DialogTitle className="font-display font-extrabold text-xl text-paper">
                {submitted ? 'Заявка отправлена' : '/Подать_заявку'}
              </DialogTitle>
              <DialogDescription className="font-mono text-xs text-paper/50 uppercase tracking-widest mt-0.5">
                vibe.6 · 2026
              </DialogDescription>
            </div>
          </div>
          <TagChip variant="lime">step {submitted ? '2/2' : '1/2'}</TagChip>
        </div>

        {!submitted ? (
          <form onSubmit={onSubmit} className="px-6 py-6 space-y-5">
            <p className="font-sans text-sm text-ink/65 leading-relaxed">
              Заполни коротко — мы сами определим, в какую команду ты подойдёшь.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Имя" required error={errors.firstName}>
                <Input
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  placeholder="Имя"
                  className="bg-white"
                />
              </Field>
              <Field label="Фамилия" required>
                <Input
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  placeholder="Фамилия"
                  className="bg-white"
                />
              </Field>
            </div>

            <Field label="Должность / департамент" hint="необязательно">
              <Input
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                placeholder="Например: разработчик, бэкенд"
                className="bg-white"
              />
            </Field>

            <Field label="Почта или Telegram" required error={errors.contact}>
              <Input
                value={form.contact}
                onChange={(e) => update('contact', e.target.value)}
                placeholder="you@team.com или @username"
                className="bg-white"
              />
            </Field>

            <Field
              label="Пожелания по формату"
              hint="необязательно"
            >
              <Textarea
                value={form.wishes}
                onChange={(e) => update('wishes', e.target.value)}
                placeholder="Хочешь в спокойную или в движовую команду? Есть предпочтения по роли?"
                className="bg-white min-h-[88px] resize-none"
              />
            </Field>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-vibe hover:bg-vibe/90 text-white font-display font-bold text-base px-6 py-4 rounded-full transition-all hover:translate-y-[-1px]"
            >
              Отправить заявку
              <ArrowUpRight size={18} />
            </button>

            <p className="font-mono text-xs text-ink/40 text-center">
              Нажимая «отправить», ты соглашаешься на обработку заявки организаторами.
            </p>
          </form>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime mb-5">
              <CheckCircle2 size={32} className="text-ink" strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-ink">
              Спасибо!
            </h3>
            <p className="mt-3 font-sans text-base text-ink/65 max-w-sm mx-auto leading-relaxed">
              Мы свяжемся с тобой, чтобы подтвердить участие и рассказать детали.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <SlashPill variant="cyan">/Connect</SlashPill>
              <SlashPill variant="vibe">/CREATE</SlashPill>
              <SlashPill variant="lime">/VIBE</SlashPill>
              <SlashPill variant="pink">/Chill</SlashPill>
            </div>

            <button
              onClick={() => close(false)}
              className="mt-7 inline-flex items-center gap-2 text-ink/60 hover:text-ink font-sans text-sm transition-colors"
            >
              Закрыть окно
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-ink/40">
              <Send size={12} /> подтверждение отправлено
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label className="font-display font-bold text-sm text-ink">
          {label}
          {required && <span className="text-vibe ml-1">*</span>}
        </Label>
        {hint && (
          <span className="font-mono text-xs text-ink/40">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="font-mono text-xs text-pink">{error}</p>
      )}
    </div>
  )
}
