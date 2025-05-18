import React from 'react';
import { useTipsLogic } from './hooks/useTipsLogic';
import { TipCard } from './ui/tipCard';
import { ProgressBar } from './ui/progressBar';

const TipsScreen: React.FC = () => {
  const { tips, userTips, isCompleted, handleToggleComplete, userData } = useTipsLogic();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-12">
      <h1 className="text-2xl font-bold mb-6">Советы дня</h1>
      <div className="space-y-4">
        {tips.map(tip => (
          <TipCard
            key={tip.id}
            tip={tip}
            isCompleted={isCompleted}
            handleToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
      <ProgressBar tips={tips} userTips={userTips} userId={userData?.id} />
    </div>
  );
};

export default TipsScreen;