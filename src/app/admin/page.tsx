import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, LogOut } from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'
import { logoutFromAdmin } from './actions'
import { Button } from '@/components/ui/button'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { listChallengeSignups } from '@/lib/challenge-signups'
import { getWorkshopRegistrationsByWorkshop } from '@/lib/workshop-signups'
import { workshopSlots } from '@/lib/workshops'

export const dynamic = 'force-dynamic'

const allWorkshopIds = workshopSlots.flatMap((slot) => slot.items.map((item) => item.id))

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <section className="relative overflow-hidden border-b border-ink/8 bg-ink text-paper">
          <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
          <div
            className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
          />
          <div className="relative mx-auto max-w-[1280px] px-4 pb-14 pt-24 sm:px-6 lg:px-10">
            <Link
              href="/workshop"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
            >
              <ArrowLeft size={16} />
              К воркшопам
            </Link>
            <div className="mt-8 flex justify-center py-10 sm:py-16">
              <LoginForm />
            </div>
          </div>
        </section>
      </main>
    )
  }

  const registrationsByWorkshop = await getWorkshopRegistrationsByWorkshop(allWorkshopIds)
  const challengeSignups = await listChallengeSignups()
  const workshops = workshopSlots.flatMap((slot) =>
    slot.items.map((item) => ({
      id: item.id,
      speaker: item.speaker,
      title: item.title,
      slot: slot.slot,
      day: slot.day,
      date: slot.date,
      time: slot.time,
      registrations: registrationsByWorkshop[item.id] ?? [],
    }))
  )
  const challenges = challengeSignups
    .slice()
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((signup) => ({
      id: signup.id,
      name: signup.name,
      telegramUsername: signup.telegramUsername,
      willingToBetMoney: signup.willingToBetMoney,
      hasChallengeIdea: signup.hasChallengeIdea,
      createdAt: signup.createdAt,
      updatedAt: signup.updatedAt,
    }))

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden border-b border-ink/8 bg-ink text-paper">
        <div className="absolute inset-0 bg-pixel-grid opacity-100 pointer-events-none" />
        <div
          className="absolute -top-24 right-0 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #7B36FF 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-24 sm:px-6 lg:px-10 lg:pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/workshop"
                className="inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
              >
                <ArrowLeft size={16} />
                К воркшопам
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-paper"
              >
                На главную
              </Link>
            </div>

            <form action={logoutFromAdmin}>
              <Button
                type="submit"
                variant="outline"
                className="h-11 rounded-full border-paper/20 bg-transparent px-5 text-sm uppercase tracking-[0.12em] text-paper hover:bg-paper/10 hover:text-paper"
              >
                <LogOut size={16} />
                Выйти
              </Button>
            </form>
          </div>

          <div className="mt-8 max-w-[980px]">
            <div className="font-mono text-xs uppercase tracking-widest text-vibe">/admin</div>
            <h1 className="mt-5 font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
              Регистрации
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-paper/72 sm:text-lg">
              В админке собраны две воронки: записи на воркшопы и заявки на челленджи. По
              воркшопам видно актуальный выбор по слотам, по челленджам - отдельную форму участия.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <AdminDashboard workshops={workshops} challenges={challenges} />

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Челленджи
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/workshop"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Воркшопы
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/guide/schedule"
              className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-display text-lg text-ink"
            >
              Расписание
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
