import { useCallback, useEffect, useState } from 'react';

type DaysLeftProps = {
  deadline: string;
};

const DaysLeft: React.FC<DaysLeftProps> = ({ deadline }) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [formatedDaysLeft, setFormatedDaysLeft] = useState<string>('-');

  useEffect(() => {
    if (deadline) {
      const date1 = new Date().valueOf();
      const date2 = new Date(deadline).valueOf();
      const diffTime = date2 - date1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    }
  }, [deadline]);

  useEffect(() => {
    daysLeft > 1
      ? setFormatedDaysLeft(`${daysLeft} dni`)
      : daysLeft === 1
      ? setFormatedDaysLeft(`${daysLeft} dzień`)
      : daysLeft === 0
      ? setFormatedDaysLeft('Dzisiaj!')
      : daysLeft === -1
      ? setFormatedDaysLeft(`${Math.abs(daysLeft)} dzień po terminie!`)
      : setFormatedDaysLeft(`${Math.abs(daysLeft)} dni po terminie!`);
  }, [daysLeft]);

  const calculateTextColor = useCallback((): string => {
    return daysLeft > 90
      ? 'text-amber-500'
      : daysLeft > 30
      ? 'text-orange-500'
      : daysLeft > 0
      ? 'text-red-600'
      : 'text-purple-600';
  }, [daysLeft]);

  return (
    <>
      {!!deadline ? (
        <p className={`${calculateTextColor()} font-bold`}>
          {formatedDaysLeft}
        </p>
      ) : (
        '-'
      )}
    </>
  );
};

export default DaysLeft;
