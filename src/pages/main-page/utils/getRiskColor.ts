export const getRiskColor = (risk: number) => {
    if (risk < 30) return { color: '#27AE60', text: 'Низкий риск', description: 'Все хорошо' };
    if (risk < 60) return { color: '#F39C12', text: 'Средний риск', description: 'Будьте осторожны' };
    return { color: '#E74C3C', text: 'Высокий риск', description: 'Требуется внимание' };
  };
  