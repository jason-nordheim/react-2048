export const createBoard = (x=4, y=4) => {
  return Array.from(Array(x), () => new Array(y).fill({ value: 0, color: getColor(0) }))
} 

export const getColor = (number) => {
  switch (number) {
    case 0: 
      return colors[0]
    case 2:
      return colors[2]
    case 4: 
      return colors[4]
    case 8: 
      return colors[8]
    case 16: 
      return colors[16]
    case 32: 
      return colors[32]
    case 64: 
      return colors[64]
    case 128:
      return colors[128]
    case 256: 
      return colors[256]
    case 512:
      return colors[512]
    case 1024: 
      return colors[1024]
    case 2048:
      return colors[2048]
    default:
      return colors[2048];
  }
}

const colors = {
  0: {
    hex: "F9F3D1",
    rgba: {
      r: 249,
      g: 243,
      b: 209,
      a: 0.98
    },
  },
  2: {
    hex: "F5C931",
    rgba: {
      r: 245,
      g: 201,
      b: 49,
      a: 0.96,
    },
  },
  4: {
    hex: "D49420",
    rgba: {
      r: 212,
      g: 148,
      b: 32,
      a: 0.82,
    },
  },
  8: {
    hex: "EB892F",
    rgba: {
      r: 235,
      g: 137,
      b: 47,
      a: 0.92,
    },
  },
  16: {
    hex: "D45520",
    rgba: {
      r: 212,
      g: 85,
      b: 32,
      a: 0.83,
    },
  },
  32: {
    hex: "F73B25",
    rgba: {
      r: 247,
      g: 59,
      b: 37,
      a: 0.97,
    },
  },
  64: {
    hex: "FA508A",
    rgba: {
      r: 250,
      g: 80,
      b: 138,
      a: 0.98,
    },
  },
  128: {
    hex: "F04005",
    rgba: {
      r: 240,
      g: 64,
      b: 5,
      a: 0.94,
    },
  },
  256: {
    hex: "D91C07",
    rgba: {
      r: 217,
      g: 28,
      b: 7,
      a: 0.85,
    },
  },
  512: {
    hex: "F8072A",
    rgba: {
      r: 248,
      g: 7,
      b: 42,
      a: 0.97,
    },
  },
  1024: {
    hex: "D9074C",
    rgba: {
      r: 217,
      g: 7,
      b: 76,
      a: 0.85,
    },
  },
  2048: {
    hex: "F807CF",
    rgba: {
      r: 248,
      g: 7,
      b: 207,
      a: 0.97,
    },
  },
};

export const getRandomNumber = () => {
  return Math.floor(Math.random()*10) 
}