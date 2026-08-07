import { isAdminAuthenticated } from '@/lib/admin-auth'
import { listChallengeSignups } from '@/lib/challenge-signups'

export const dynamic = 'force-dynamic'

function escapeCsvCell(value: string | number | boolean) {
  const normalized = String(value ?? '')
  return `"${normalized.replaceAll('"', '""')}"`
}

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  const signups = await listChallengeSignups()
  const rows = signups
    .slice()
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((signup) =>
      [
        signup.createdAt,
        signup.updatedAt,
        signup.name,
        signup.telegramUsername,
        signup.willingToBetMoney ? 'Да' : 'Нет',
        signup.hasChallengeIdea ? 'Да' : 'Нет',
      ]
        .map(escapeCsvCell)
        .join(',')
    )

  const csv = [
    [
      'created_at',
      'updated_at',
      'name',
      'telegram_username',
      'willing_to_bet_money',
      'has_challenge_idea',
    ]
      .map(escapeCsvCell)
      .join(','),
    ...rows,
  ].join('\n')

  return new Response(`\uFEFF${csv}`, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="challenge-signups.csv"',
      'Cache-Control': 'no-store',
    },
  })
}
