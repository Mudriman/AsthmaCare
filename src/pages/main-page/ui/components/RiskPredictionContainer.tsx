import { RiskSection, RiskPredictionModal } from '@/pages/main-page/ui';
import { useRiskPrediction } from '@/pages/main-page/hooks';
import { useUserDataStore } from '@/stores/userDataStore';

export const RiskPredictionContainer = () => {
  const { showPrediction, setShowPrediction, handlePredictClick } = useRiskPrediction();
  const { userData } = useUserDataStore();

  const risk = userData?.risk?.value || 60;
  const factors = userData?.risk?.factors || [];

  return (
    <>
      <RiskSection risk={risk} onPredictClick={handlePredictClick} />
      <RiskPredictionModal
        isVisible={showPrediction}
        risk={risk}
        factors={factors}
        onClose={() => setShowPrediction(false)}
      />
    </>
  );
};