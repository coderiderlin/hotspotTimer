export interface TimerItem {
  instanceId: string;
  foodId: string;
  name: string;
  icon: string;
  color: string;
  duration: number; // total in seconds
  startTime: number; // Date.now() timestamp
  endTime: number;   // Date.now() + duration * 1000
  notified?: boolean;
}
