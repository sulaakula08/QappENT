import { Play, Clock } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { VIDEOS } from '../../data/mockData'
import { useLanguage } from '../../context/LanguageContext'

const THUMB_COLORS = {
  math: 'from-blue-500 to-blue-600', physics: 'from-purple-500 to-purple-600',
  history: 'from-amber-500 to-amber-600', informatics: 'from-green-500 to-green-600',
  strategy: 'from-gray-600 to-gray-700', reading: 'from-teal-500 to-teal-600',
}

export default function VideoTipsSection() {
  const { t } = useLanguage()

  return (
    <section id="videos">
      <div className="w-full">
        <SectionHeader title={t('videos.title')} subtitle={t('videos.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDEOS.map((video) => (
            <Card key={video.id} hover padding="p-0" className="overflow-hidden group flex flex-col">
              <div className={`relative h-36 bg-gradient-to-br ${THUMB_COLORS[video.thumbnail]} flex items-center justify-center`}>
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-qapp-blue ml-0.5" fill="currentColor" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />{video.duration}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-sm leading-snug">{video.title}</h3>
                  {video.score !== '—' && <Badge variant="green">{video.score}</Badge>}
                </div>
                <p className="text-xs text-qapp-gray leading-relaxed flex-1">{video.description}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">{t('common.watchTips')}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
