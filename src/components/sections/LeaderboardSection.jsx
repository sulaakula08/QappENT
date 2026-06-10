import { useState } from 'react'
import { Trophy, MapPin, School, User, Building2, BookOpen, TrendingUp } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { LEADERBOARD } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

export default function LeaderboardSection() {
  const { t } = useLanguage()
  const [tab, setTab] = useState('students')

  const TABS = [
    { id: 'cities', label: t('leaderboard.cities'), icon: MapPin },
    { id: 'schools', label: t('leaderboard.schools'), icon: School },
    { id: 'students', label: t('leaderboard.students'), icon: User },
    { id: 'universities', label: t('leaderboard.uniTarget'), icon: Building2 },
    { id: 'subjects', label: t('leaderboard.subjects'), icon: BookOpen },
    { id: 'growth', label: t('leaderboard.growth'), icon: TrendingUp },
  ]

  return (
    <section id="leaderboard" className="py-14 sm:py-20 border-t border-gray-100">
      <div className="container-qapp">
        <SectionHeader title={t('leaderboard.title')} subtitle={t('leaderboard.subtitle')} />
        <p className="text-xs text-qapp-gray mb-4 italic">{t('common.mockDisclaimer')}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${tab === tb.id ? 'bg-qapp-blue text-white' : 'bg-white text-qapp-gray border border-gray-200'}`}>
              <tb.icon className="w-3.5 h-3.5" />{tb.label}
            </button>
          ))}
        </div>

        <Card padding="p-0" className="overflow-hidden">
          {tab === 'cities' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.city')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.avgScore')}</th></tr></thead>
              <tbody>{LEADERBOARD.cities.map((c, i) => (
                <tr key={c.name} className="border-b border-gray-50"><td className="px-5 py-3.5 font-medium">#{i+1} {c.name}</td><td className="px-5 py-3.5"><Badge variant="blue">{c.avgScore}</Badge></td></tr>
              ))}</tbody>
            </table>
          )}
          {tab === 'schools' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="px-5 py-3 text-qapp-gray font-medium">#</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.school')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.city')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.avgScore')}</th></tr></thead>
              <tbody>{LEADERBOARD.schools.map((s) => (
                <tr key={s.name} className="border-b border-gray-50"><td className="px-5 py-3.5">{s.rank <= 3 ? <Trophy className="w-4 h-4 text-amber-500" /> : s.rank}</td><td className="px-5 py-3.5 font-medium">{s.name}</td><td className="px-5 py-3.5 text-qapp-gray">{s.city}</td><td className="px-5 py-3.5"><Badge variant="green">{s.avgScore}</Badge></td></tr>
              ))}</tbody>
            </table>
          )}
          {tab === 'students' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="px-5 py-3 text-qapp-gray font-medium">#</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.student')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.school')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.score')}</th></tr></thead>
              <tbody>{LEADERBOARD.students.map((s) => (
                <tr key={s.name} className="border-b border-gray-50"><td className="px-5 py-3.5">{s.rank <= 3 ? <Trophy className="w-4 h-4 text-amber-500" /> : s.rank}</td><td className="px-5 py-3.5 font-medium">{s.name}</td><td className="px-5 py-3.5 text-qapp-gray">{s.school}</td><td className="px-5 py-3.5"><Badge variant="green">{s.score}</Badge></td></tr>
              ))}</tbody>
            </table>
          )}
          {tab === 'universities' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('paidGrant.university')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.applicants')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.avgScore')}</th></tr></thead>
              <tbody>{LEADERBOARD.universities.map((u) => (
                <tr key={u.name} className="border-b border-gray-50"><td className="px-5 py-3.5 font-medium">{u.name}</td><td className="px-5 py-3.5 text-qapp-gray">{u.targetStudents.toLocaleString()}</td><td className="px-5 py-3.5"><Badge variant="blue">{u.avgScore}</Badge></td></tr>
              ))}</tbody>
            </table>
          )}
          {tab === 'subjects' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('breakdown.subject')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.avgScore')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.max')}</th></tr></thead>
              <tbody>{LEADERBOARD.subjects.map((s) => (
                <tr key={s.name} className="border-b border-gray-50"><td className="px-5 py-3.5 font-medium">{s.name}</td><td className="px-5 py-3.5"><Badge variant="amber">{s.avgScore}</Badge></td><td className="px-5 py-3.5 text-qapp-gray">{s.maxScore}</td></tr>
              ))}</tbody>
            </table>
          )}
          {tab === 'growth' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100"><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.student')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.from')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.to')}</th><th className="text-left px-5 py-3 text-qapp-gray font-medium">{t('leaderboard.growthCol')}</th></tr></thead>
              <tbody>{LEADERBOARD.growth.map((s) => (
                <tr key={s.name} className="border-b border-gray-50"><td className="px-5 py-3.5 font-medium">{s.name}</td><td className="px-5 py-3.5 text-qapp-gray">{s.from}</td><td className="px-5 py-3.5 font-medium">{s.to}</td><td className="px-5 py-3.5"><Badge variant="green">+{s.growth}</Badge></td></tr>
              ))}</tbody>
            </table>
          )}
        </Card>
      </div>
    </section>
  )
}
