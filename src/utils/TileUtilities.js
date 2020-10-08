export function colorByValue(value){
  switch (value) {
    case 0:
      return 'zero'
    case 2: 
      return 'two'
    case 4: 
      return 'four'
    case 8: 
      return 'eight'
    case 16: 
      return 'sixteen'
    case 32: 
      return 'thirty-two'
    case 64: 
      return 'sixty-four'
    case 128: 
      return 'one-hundred-twenty-four'
    case 256: 
      return 'two-hundred-fifty-six'
    case 512:
      return 'five-hundred-twelve'
    case 1024:
      return 'one-thousand-twenty-four'
    default:
      return 'zero'
  }
}