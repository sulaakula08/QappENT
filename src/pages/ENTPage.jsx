import { useState, useCallback } from 'react'
import Header from '../components/layout/Header'
import ENTTabNav from '../components/layout/ENTTabNav'
import Footer from '../components/layout/Footer'
import StickyCTA from '../components/layout/StickyCTA'
import { ENTTabContext } from '../context/ENTTabContext'
import ScoreDashboard from '../components/sections/ScoreDashboard'
import AIInsightSection from '../components/sections/AIInsightSection'
import FAQSection from '../components/sections/FAQSection'
import UniversitySection from '../components/sections/UniversitySection'
import CareerNavigatorSection from '../components/sections/CareerNavigatorSection'
import MatchingSection from '../components/sections/MatchingSection'
import LeaderboardSection from '../components/sections/LeaderboardSection'
import PaidGrantSection from '../components/sections/PaidGrantSection'
import ScoreBreakdownSection from '../components/sections/ScoreBreakdownSection'
import ProgressTrackerSection from '../components/sections/ProgressTrackerSection'
import SmartPlannerSection from '../components/sections/SmartPlannerSection'
import Plan21Section from '../components/sections/Plan21Section'
import PrepTimelineSection from '../components/sections/PrepTimelineSection'
import ExamFormatSection from '../components/sections/ExamFormatSection'
import VideoTipsSection from '../components/sections/VideoTipsSection'
import { USER_PROFILE, SUBJECTS } from '../data/mockData'
import { initSubjects, updateSubjectScores } from '../utils/helpers'

export default function ENTPage() {
  const [activeTab, setActiveTab] = useState('score')
  const [currentScore, setCurrentScore] = useState(null)
  const [subjects, setSubjects] = useState(() => initSubjects(SUBJECTS))
  const [targetScore, setTargetScore] = useState(USER_PROFILE.targetScore)
  const [hoursPerDay, setHoursPerDay] = useState(USER_PROFILE.hoursPerDay)
  const [profileCombo, setProfileCombo] = useState('math-physics')
  const [selectedUniversity, setSelectedUniversity] = useState('kbtu')
  const [selectedProgram, setSelectedProgram] = useState('kbtu-cs')
  const [selectedProfession, setSelectedProfession] = useState('software-engineer')

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

  const sharedProps = {
    currentScore,
    targetScore,
    subjects,
    selectedUniversity,
    selectedProgram,
    selectedProfession,
    hoursPerDay,
    profileCombo,
    onScoreChange: handleScoreChange,
    onTargetChange: setTargetScore,
    onSubjectChange: handleSubjectChange,
    onUniversityChange: setSelectedUniversity,
    onProgramChange: setSelectedProgram,
    onProfessionChange: setSelectedProfession,
    onHoursChange: setHoursPerDay,
    onProfileComboChange: setProfileCombo,
    onTabChange: setActiveTab,
  }

  return (
    <ENTTabContext.Provider value={{ activeTab, setActiveTab }}>
    <div className="min-h-screen flex flex-col pb-20">
      <Header />

      <div className="container-qapp py-5 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <ENTTabNav activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 min-w-0 tab-panel">
            {activeTab === 'score' && (
              <div className="space-y-10">
                <ScoreDashboard
                  currentScore={currentScore}
                  targetScore={targetScore}
                  onScoreChange={handleScoreChange}
                  onTargetChange={setTargetScore}
                />
                <AIInsightSection {...sharedProps} />
                <FAQSection
                  currentScore={currentScore}
                  targetScore={targetScore}
                  onTabChange={setActiveTab}
                />
              </div>
            )}

            {activeTab === 'universities' && (
              <div className="space-y-10">
                <UniversitySection
                  currentScore={currentScore}
                  selectedUniversity={selectedUniversity}
                  selectedProgram={selectedProgram}
                  onUniversityChange={setSelectedUniversity}
                  onProgramChange={setSelectedProgram}
                />
                <PaidGrantSection currentScore={currentScore} />
                <CareerNavigatorSection
                  selectedProfession={selectedProfession}
                  onProfessionChange={setSelectedProfession}
                  currentScore={currentScore}
                />
                <MatchingSection
                  selectedProfession={selectedProfession}
                  currentScore={currentScore}
                />
                <LeaderboardSection />
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="space-y-10">
                <ScoreBreakdownSection
                  subjects={subjects}
                  onSubjectChange={handleSubjectChange}
                />
                <PrepTimelineSection />
                <SmartPlannerSection
                  currentScore={currentScore}
                  targetScore={targetScore}
                  hoursPerDay={hoursPerDay}
                  onHoursChange={setHoursPerDay}
                  profileCombo={profileCombo}
                  onProfileComboChange={setProfileCombo}
                  subjects={subjects}
                />
                <ProgressTrackerSection subjects={subjects} />
                <Plan21Section />
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="space-y-10">
                <ExamFormatSection />
                <VideoTipsSection />
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
      <StickyCTA
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentScore={currentScore}
      />
    </div>
    </ENTTabContext.Provider>
  )
}
