import { Null } from "@typing/generic";
import { getCurrentHour } from "@utils/converterutils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TimeTypeMode = "stopwatch" | "clock" | "timer";
export type TimeAction = "play" | "pause" | "clear";
export interface UseTimerReturn {
  laps: number[]
  time: number
  type: Null<TimeTypeMode>
  setTime: (time: number) => void
  speed: number
  handleChangeMode: (mode: TimeTypeMode) => void
  handleChangeSpeed: (speed: number) => void
  handleCreateLap: () => void
  handleStart: () => void
  handleStop: () => void
}

export const useTimer = (): UseTimerReturn => {
  const timerRef = useRef<NodeJS.Timeout>();
  const timeStore = useRef<Record<TimeTypeMode, number>>({
    clock: 0,
    stopwatch: 0,
    timer: 0,
  });
  const [type, setType] = useState<TimeTypeMode>('timer');
  const [laps, setLaps] = useState<number[]>([]);

  const [time, setTime] = useState(0);
  const [action, setAction] = useState<TimeAction>("pause");
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    switch (action) {
      case "play":
        const value = type === 'timer' ? -1 : 1
        timerRef.current = setInterval(() => {
          setTime((state) => state + value);
        }, 1000 * speed);
        break;
      case "pause":
        clearInterval(timerRef.current);
        break;
      case "clear":
        clearInterval(timerRef.current);
        if(type){
          timeStore.current[type] = 0
        }
        setTime(() => 0);
        break;
    }
  }, [speed, action, type]);

  const handleCreateLap = () => {
    if(type !== 'stopwatch' ) return
    setLaps((state) => [...state, time]);
  }

  const onChangeMode = useCallback((mode: TimeTypeMode) => {
    const savedValue = timeStore.current[mode];
    switch (mode) {
      case "stopwatch":
      case "timer":
        return savedValue;
      case "clock":
        return getCurrentHour()
    }
  }, []);

  const handleChangeMode = useCallback(
    (mode: TimeTypeMode) => {
      if (type) {
        timeStore.current = {
          ...timeStore.current,
          [type]: time,
        };
      }
      setTime(onChangeMode(mode));
      setType(mode);
      let action: TimeAction = 'pause'
      if(mode === 'clock') action = 'play'
        setAction(action)
    },
    [setType, type, setTime, onChangeMode]
  );

  const handleChangeSpeed = useCallback(
    (speed: number) => {
      setSpeed(speed);
    },
    [setSpeed]
  );

  const actionFunctions = useMemo(() => {
    const handleStart = () => {
      setAction("play");
    };

    const handleStop = () => {
      setAction("pause");
    };

    return {
      handleStart,
      handleStop,
    };
  }, [setAction]);

  return {
    laps,
    time,
    type,
    setTime,
    speed,
    handleChangeMode,
    handleChangeSpeed,
    handleCreateLap,
    ...actionFunctions,
  };
};
