import { useState, useCallback } from 'react'
import Header from '../components/layout/Header'
import ScoreInputBar from '../components/ui/ScoreInputBar'
import Footer from '../components/layout/Footer'
import StickyCTA from '../components/layout/StickyCTA'
import HeroSection from '../components/sections/HeroSection'
import StepsSection from '../components/sections/StepsSection'
import ExamFormatSection from '../components/sections/ExamFormatSection'
import VideoTipsSection from '../components/sections/VideoTipsSection'
import SmartPlannerSection from '../components/sections/SmartPlannerSection'
import ProgressTrackerSection from '../components/sections/ProgressTrackerSection'
import ScoreBreakdownSection from '../components/sections/ScoreBreakdownSection'
import UniversitySection from '../components/sections/UniversitySection'
import CareerNavigatorSection from '../components/sections/CareerNavigatorSection'
import MatchingSection from '../components/sections/MatchingSection'
import AIInsightSection from '../components/sections/AIInsightSection'
import LeaderboardSection from '../components/sections/LeaderboardSection'
import PaidGrantSection from '../components/sections/PaidGrantSection'
import FAQSection from '../components/sections/FAQSection'
import Plan21Section from '../components/sections/Plan21Section'
import { USER_PROFILE, SUBJECTS } from '../data/mockData'
import { initSubjects, updateSubjectScores } from '../utils/helpers'

export default function ENTPage() {
  const [currentScore, setCurrentScore] = useState(null)
  const [subjects, setSubjects] = useState(() => initSubjects(SUBJECTS))
  const [targetScore, setTargetScore] = useState(USER_PROFILE.targetScore)
  const [hoursPerDay, setHoursPerDay] = useState(USER_PROFILE.hoursPerDay)
  const [profileCombo, setProfileCombo] = useState('math-physics')
  const [selectedUniversity, setSelectedUniversity] = useState('kbtu')
  const [selectedProgram, setSelectedProgram] = useState('kbtu-cs')
  const [selectedProfession, setSelectedProfession] = useState('software-engineer')

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleScoreChange = useCallback((raw) => {
    if (raw === '' || raw === null || raw === undefined) {
      setCurrentScore(null)
      return
    }
    const num = Math.min(140, Math.max(0, Number(raw)))
    setCurrentScore(num)
  }, [])

  const handleSubjectChange = useCallback((id, value) => {
    setSubjects((prev) => updateSubjectScores(prev, { [id]: value }))
  }, [])

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header />
      <ScoreInputBar
        currentScore={currentScore}
        targetScore={targetScore}
        onScoreChange={handleScoreChange}
        onTargetChange={setTargetScore}
        onScrollTo={scrollTo}
      />
      <main className="flex-1">
        <HeroSection
          currentScore={currentScore}
          targetScore={targetScore}
          onScoreChange={handleScoreChange}
          onTargetChange={setTargetScore}
          onScrollTo={scrollTo}
        />
        <StepsSection
          currentScore={currentScore}
          targetScore={targetScore}
          onScoreChange={handleScoreChange}
          subjects={subjects}
        />
        <ExamFormatSection />
        <VideoTipsSection />
        <SmartPlannerSection
          currentScore={currentScore}
          targetScore={targetScore}
          hoursPerDay={hoursPerDay}
          onHoursChange={setHoursPerDay}
          profileCombo={profileCombo}
          onProfileComboChange={setProfileCombo}
          subjects={subjects}
        />
        <ProgressTrackerSection
          currentScore={currentScore}
          targetScore={targetScore}
          subjects={subjects}
        />
        <ScoreBreakdownSection
          subjects={subjects}
          onSubjectChange={handleSubjectChange}
        />
        <UniversitySection
          currentScore={currentScore}
          selectedUniversity={selectedUniversity}
          selectedProgram={selectedProgram}
          onUniversityChange={setSelectedUniversity}
          onProgramChange={setSelectedProgram}
        />
        <CareerNavigatorSection
          selectedProfession={selectedProfession}
          onProfessionChange={setSelectedProfession}
          currentScore={currentScore}
        />
        <MatchingSection
          selectedProfession={selectedProfession}
          currentScore={currentScore}
        />
        <AIInsightSection
          currentScore={currentScore}
          targetScore={targetScore}
          selectedUniversity={selectedUniversity}
          selectedProgram={selectedProgram}
          selectedProfession={selectedProfession}
          subjects={subjects}
        />
        <LeaderboardSection />
        <PaidGrantSection currentScore={currentScore} />
        <Plan21Section />
        <FAQSection
          onScrollTo={scrollTo}
          currentScore={currentScore}
          targetScore={targetScore}
        />
      </main>
      <Footer />
      <StickyCTA
        currentScore={currentScore}
        targetScore={targetScore}
        onScrollTo={scrollTo}
      />
    </div>
  )
}
