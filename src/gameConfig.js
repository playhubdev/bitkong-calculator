const MODES = [
  {
    value: "EASY",
    config: {
      collumns: 4,
      winingCollumns: 3,
      rows: 9
    }
  },
  {
    value: "MEDIUM",
    config: {
      collumns: 3,
      winingCollumns: 2,
      rows: 9
    }
  },
  {
    value: "HARD",
    config: {
      collumns: 2,
      winingCollumns: 1,
      rows: 9
    }
  },
  {
    value: "EXTREME",
    config: {
      collumns: 3,
      winingCollumns: 1,
      rows: 9
    }
  },
  {
    value: "NIGHTMARE",
    config: {
      collumns: 4,
      winingCollumns: 1,
      rows: 9
    }
  }
];

export const GAME_CONFIG = {
  MODES,
  bonusRangeMultiplier: 1000000
};
