import { Send } from 'lucide-react'

/* ============================================================
   Footer
   ============================================================ */
export function Footer() {
  return (
    <footer className="relative bg-ink text-paper border-t border-paper/10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tight text-paper">
                KONSOL
              </span>
              <span className="font-mono text-sm text-vibe font-bold tracking-widest">
                /VIBE-6
              </span>
            </div>
            <p className="mt-3 font-sans text-sm text-paper/60 max-w-xs leading-relaxed">
              31 июля — 2 августа 2026, Les Art Resort. Три дня реального общения,
              мастер-классов и новых знаний.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-3">
              /nav
            </div>
            <ul className="space-y-2">
              <li><a href="#program" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">Программа</a></li>
              <li><a href="/guide" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">База знаний</a></li>
              <li><a href="/challenges" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">Челленджи</a></li>
              <li><a href="#about" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">О мероприятии</a></li>
              <li><a href="#location" className="font-sans text-sm text-paper/80 hover:text-lime transition-colors">Локация</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-mono text-xs text-paper/40 uppercase tracking-widest mb-3">
              /contacts
            </div>
            <ul className="space-y-2">
              <li>
                <span className="inline-flex items-center gap-2 font-sans text-sm text-paper/80">
                  <Send size={14} /> звонить
                </span>
              </li>
              <li>
                <span className="font-sans text-sm text-paper/80">чат</span>
              </li>
              <li>
                <a
                  href="https://t.me/+N_X0TPh1rqVkMTBi"
                  className="font-sans text-sm text-paper/80 hover:text-cyan transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Телеграм-чат
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="font-sans text-sm text-paper/80 hover:text-cyan transition-colors"
                >
                  Вход в админку
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-paper/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="font-mono text-xs text-paper/40">
            © 2026 KONSOL / VIBE-6
          </div>
          <div className="font-mono text-xs text-paper/40">
            connect · create · vibe · chill
          </div>
        </div>
      </div>
    </footer>
  )
}
