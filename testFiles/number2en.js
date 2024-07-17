function numberToWords(num) {
  const th = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];
  const dg = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
  const tn = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
  const tw = ['TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
  num = num.toString().replace(/[\, ]/g, '');
  if (num != parseFloat(num)) return 'not a number';
  let x = num.indexOf('.');
  if (x == -1) x = num.length;
  if (x > 15) return 'too big';
  let n = num.split('');
  let str = '';
  let sk = 0;
  for (let i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] == '1') {
        str += tn[Number(n[i + 1])] + ' ';
        i++;
        sk = 1;
      } else if (n[i] != 0) {
        str += tw[n[i] - 2] + ' ';
        sk = 1;
      }
    } else if (n[i] != 0) {
      str += dg[n[i]] + ' ';
      if ((x - i) % 3 == 0) str += 'HUNDRED ';
      sk = 1;
    }
    if ((x - i) % 3 == 1) {
      if (sk) str += th[(x - i - 1) / 3] + ' ';
      sk = 0;
    }
  }
  if (x != num.length) {
    let y = num.length;
    str += 'POINT ';
    for (let i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
  }
  str = str.replace(/\s+/g, ' ').replace('POINT ZERO ZERO', 'ONLY');
  return str.toUpperCase();
}

let num = '231,542,845,246,123.00';
console.log(numberToWords(num));